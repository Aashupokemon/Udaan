const MIGRATIONS = [
  {
    version: 1,
    up: `
      CREATE TABLE IF NOT EXISTS _migrations (
        version INTEGER PRIMARY KEY
      );
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        phone TEXT NOT NULL UNIQUE,
        display_name TEXT,
        language TEXT NOT NULL DEFAULT 'en',
        password_hash TEXT,
        pin_hash TEXT,
        pin_mode TEXT NOT NULL DEFAULT 'none',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE TABLE IF NOT EXISTS otp_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        phone TEXT NOT NULL,
        code TEXT NOT NULL,
        expires_at INTEGER NOT NULL,
        used INTEGER NOT NULL DEFAULT 0,
        attempts INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        expires_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
      CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
      CREATE INDEX IF NOT EXISTS idx_otp_phone_expires ON otp_requests(phone, expires_at);
      CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
      CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);
    `
  }
];

export async function migrate(db) {
  // Ensure the _migrations table exists before querying it. On a fresh local D1
  // (e.g. wrangler dev with an empty database_name), querying a nonexistent table
  // throws, so we create it first.
  await db.exec(`CREATE TABLE IF NOT EXISTS _migrations (version INTEGER PRIMARY KEY)`);
  const current = await db.prepare("SELECT COALESCE(MAX(version),0) as v FROM _migrations").get();
  const version = current?.v ?? 0;
  for (const m of MIGRATIONS) {
    if (m.version <= version) continue;
    await db.exec(m.up);
    await db.prepare("INSERT INTO _migrations (version) VALUES (?1)").run(m.version);
  }
}

export async function withDb(handler, env = {}) {
  // env.DB is bound in production via the D1 binding (wrangler.jsonc uses
  // d1_databases -> DB -> database_name for local dev).
  const db = env?.DB;
  if (!db) {
    throw new Error("DB binding is not configured for this environment");
  }
  await migrate(db);
  return handler(db);
}

export async function getDb(env = {}) {
  const db = env?.DB;
  if (!db) {
    throw new Error("DB binding is not configured for this environment");
  }
  await migrate(db);
  return db;
}

export async function createUser(db, phone, displayName, language = "en") {
  const stmt = db.prepare(
    "INSERT INTO users (phone, display_name, language) VALUES (?1, ?2, ?3)"
  );
  const result = await stmt.run(phone, displayName ?? null, language);
  return Number(result.lastInsertRowid);
}

export async function getUserByPhone(db, phone) {
  return db.prepare("SELECT * FROM users WHERE phone = ?1").get(phone);
}

export async function setPassword(db, userId, passwordHash) {
  return db.prepare(
    "UPDATE users SET password_hash = ?1, updated_at = datetime('now') WHERE id = ?2"
  ).run(passwordHash, userId);
}

export async function setPin(db, userId, pinHash, pinMode = "one_tap") {
  return db.prepare(
    "UPDATE users SET pin_hash = ?1, pin_mode = ?2, updated_at = datetime('now') WHERE id = ?3"
  ).run(pinHash, pinMode, userId);
}

export async function getUserPin(db, userId) {
  return db.prepare("SELECT pin_hash, pin_mode FROM users WHERE id = ?1").get(userId);
}

export async function upsertOtp(db, phone, code, ttlSeconds = 180) {
  const expiresAt = Math.floor(Date.now() / 1000) + ttlSeconds;
  await db.prepare(
    "DELETE FROM otp_requests WHERE phone = ?1 AND (used = 1 OR expires_at < ?2)"
  ).run(phone, expiresAt);
  const existing = await db.prepare(
    "SELECT id, attempts FROM otp_requests WHERE phone = ?1 AND used = 0 AND expires_at > ?2"
  ).get(phone, expiresAt);
  if (existing) {
    await db.prepare(
      "UPDATE otp_requests SET code = ?1, expires_at = ?2, attempts = 0, created_at = datetime('now') WHERE id = ?3"
    ).run(code, expiresAt, existing.id);
    return { id: existing.id, attempts: 0 };
  }
  const result = await db.prepare(
    "INSERT INTO otp_requests (phone, code, expires_at) VALUES (?1, ?2, ?3)"
  ).run(phone, code, expiresAt);
  return { id: Number(result.lastInsertRowid), attempts: 0 };
}

export async function verifyOtp(db, phone, code) {
  const now = Math.floor(Date.now() / 1000);
  const row = await db.prepare(
    "SELECT id, code, attempts, expires_at FROM otp_requests WHERE phone = ?1 AND used = 0 AND expires_at > ?2 ORDER BY expires_at DESC LIMIT 1"
  ).get(phone, now);
  if (!row) return { ok: false, reason: "no_valid_otp" };
  if (row.attempts >= 4) return { ok: false, reason: "too_many_attempts" };
  if (String(row.code) !== String(code)) {
    await db.prepare(
      "UPDATE otp_requests SET attempts = attempts + 1 WHERE id = ?1"
    ).run(row.id);
    return { ok: false, reason: "bad_code" };
  }
  await db.prepare("UPDATE otp_requests SET used = 1 WHERE id = ?1").run(row.id);
  return { ok: true, id: row.id };
}

export async function createSession(db, userId) {
  const id = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  await db.prepare(
    "INSERT INTO sessions (id, user_id, expires_at) VALUES (?1, ?2, ?3)"
  ).run(id, userId, expiresAt);
  return id;
}

export async function getSession(db, sessionId) {
  return db.prepare(
    "SELECT s.*, u.phone, u.display_name, u.language, u.pin_hash, u.pin_mode, u.password_hash FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.id = ?1 AND s.expires_at > datetime('now')"
  ).get(sessionId);
}

export async function deleteSession(db, sessionId) {
  return db.prepare("DELETE FROM sessions WHERE id = ?1").run(sessionId);
}

export async function cleanupExpiredSessions(db) {
  return db.prepare("DELETE FROM sessions WHERE expires_at <= datetime('now')").run();
}

export async function upsertResource(db, kind, payload) {
  await db.prepare(
    "CREATE TABLE IF NOT EXISTS resources (id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL UNIQUE, payload TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT (datetime('now')))"
  );
  const existing = await db.prepare("SELECT id FROM resources WHERE kind = ?1").get(kind);
  if (existing) {
    return db.prepare(
      "UPDATE resources SET payload = ?1, updated_at = datetime('now') WHERE kind = ?2"
    ).run(JSON.stringify(payload), kind);
  }
  await db.prepare(
    "INSERT INTO resources (kind, payload) VALUES (?1, ?2)"
  ).run(kind, JSON.stringify(payload));
  return 1;
}

export async function getResource(db, kind) {
  const row = await db.prepare("SELECT payload FROM resources WHERE kind = ?1").get(kind);
  return row ? JSON.parse(row.payload) : null;
}

export async function seedDefaultResources(db) {
  let alreadySeeded = false;
  try {
    const existing = await db.prepare("SELECT COUNT(*) as c FROM resources").get();
    alreadySeeded = Number(existing.c) > 0;
  } catch {
    // Resources table may not exist yet; upsertResource will create it.
    alreadySeeded = false;
  }
  if (alreadySeeded) return;
  await upsertResource(db, "global.categories", CATEGORIES);
  await upsertResource(db, "global.resources", RESOURCES);
}

const CATEGORIES = [
  { id: "emergency", labelEn: "Emergency & urgent help", labelHi: "तत्काल और आपातकालीन सहायता", icon: "alert" },
  { id: "safety", labelEn: "Safety & harassment", labelHi: "सुरक्षा और परेशानी", icon: "shield" },
  { id: "health", labelEn: "Health & mental well-being", labelHi: "स्वास्थ्य और मानसिक-स्वस्थ्य", icon: "heart" },
  { id: "basic-needs", labelEn: "Food, shelter & essentials", labelHi: "भोजन, आवास और ज़रूरी चीज़ें", icon: "home" },
  { id: "legal", labelEn: "Rights, police & legal help", labelHi: "अधिकार, पुलिस और कानूनी मदद", icon: "scale" },
  { id: "children", labelEn: "Children & students", labelHi: "बच्चे और छात्र", icon: "book" },
  { id: "women", labelEn: "Women & families", labelHi: "महिला और परिवार", icon: "people" },
  { id: "elderly", labelEn: "Older adults & caregivers", labelHi: "बुजुर्ग और देखभालकर्ता", icon: "care" },
  { id: "migrants", labelEn: "Migrants & displaced people", labelHi: "प्रवासी और विस्थापित लोग", icon: "plane" },
  { id: "disability", labelEn: "Disability support", labelHi: "दिव्यांग सहायता", icon: "wheelchair" }
];

const RESOURCES = [
  {
    id: "emergency-112",
    category: "emergency",
    titleEn: "Call 112 for emergencies",
    titleHi: "आपातकालीन स्थिति में 112 पर कॉल करें",
    bodyEn: "112 is the single European emergency number. In many countries it connects police, fire and medical services.",
    bodyHi: "112 यूरोप का एकीकृत आपातकालीन नंबर है। कई देशों में यह पुलिस, फायर और मेडिकल सेवाओं से जोड़ता है।",
    type: "emergency-number",
    value: "112",
    noteEn: "Not a UDAAN service. If you are in immediate danger, call this first.",
    noteHi: "यह UDAAN की सेवा नहीं है। यदि तुम्हें तुरंत खतरा है, तो सबसे पहले इस पर कॉल करें।"
  },
  {
    id: "emergency-local",
    category: "emergency",
    titleEn: "Find your country's emergency numbers",
    titleHi: "अपने देश के आपातकालीन नंबर खोजें",
    bodyEn: "Emergency numbers vary by country. Check your local government or telecom provider for the correct number.",
    bodyHi: "आपातकालीन नंबर देश के हिसाब से अलग होते हैं। सही नंबर के लिए अपने स्थानीय सरकार या टेलिकॉम प्रदाता की जाँच करें।",
    type: "help-center"
  },
  {
    id: "women-india",
    category: "women",
    titleEn: "Women Helpline (India)",
    titleHi: "महिला हेल्पलाइन (भारत)",
    bodyEn: "A 24-hour women's emergency helpline in India.",
    bodyHi: "भारत में महिलाओं के लिए 24 घंटे की आपातकालीन हेल्पलाइन।",
    type: "helpline",
    value: "181",
    region: "IN"
  },
  {
    id: "children-india",
    category: "children",
    titleEn: "Childline (India)",
    titleHi: "चाइल्डलाइन (भारत)",
    bodyEn: "A 24-hour helpline for children in distress in India.",
    bodyHi: "भारत में तकलीफ में होने वाले बच्चों के लिए 24 घंटे की हेल्पलाइन।",
    type: "helpline",
    value: "1098",
    region: "IN"
  },
  {
    id: "mental-general",
    category: "health",
    titleEn: "Talk to someone about how you feel",
    titleHi: "अपनी महसूस के बारे में किसी से बात करें",
    bodyEn: "If you are feeling overwhelmed, a trusted helpline or health worker can help. Many countries run free mental health support lines.",
    bodyHi: "यदि तुम्हें ज़्यादा दबाव या उदासी महसूस हो रही है, तो किसी भरोसेमंद हेल्पलाइन या स्वास्थ्य कर्मी की मदद ले सकते हैं। कई देश मुफ्त मानसिक-स्वास्थ्य सपोर्ट लाइन चलाते हैं।",
    type: "help-center"
  },
  {
    id: "basic-needs-general",
    category: "basic-needs",
    titleEn: "Find food, shelter and essentials near you",
    titleHi: "पास में भोजन, आवास और ज़रूरी चीज़ें खोजें",
    bodyEn: "Local community centres, charities and municipal services often help with food, shelter and essentials. Search for services in your area.",
    bodyHi: "स्थानीय समुदाय केंद्र, धर्मार्थ संस्थान और नगरपालिका की सेवाएँ अक्सर भोजन, आवास और ज़रूरी चीज़ों में मदद करती हैं। अपने क्षेत्र की सेवाएँ खोजें।",
    type: "help-center"
  },
  {
    id: "legal-general",
    category: "legal",
    titleEn: "Know your basic rights",
    titleHi: "अपने मूल अधिकार जानें",
    bodyEn: "You have the right to ask why you are being stopped, to have someone you trust present, and to contact a lawyer where available.",
    bodyHi: "तुम्हें पूछने का अधिकार है कि 왜 तुम्हें रोका जा रहा है, एक भरोसेमंद व्यक्ति को साथ रखने, और जहाँ उपलब्ध हो वहाँ किसी वकील से संपर्क करने का।",
    type: "help-center"
  }
];

// Re-export helpers for tests or other modules.
export { CATEGORIES, RESOURCES };

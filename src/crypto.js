const encoder = new TextEncoder();

async function pbkdf2(key, salt, iterations, length) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );
  const derived = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
  return crypto.subtle.exportKey("raw", derived);
}

export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = encoder.encode(password);
  const derived = await pbkdf2(key, salt, 600000, 32);
  const hash = new Uint8Array(await derived);
  const combined = new Uint8Array(salt.length + hash.length);
  combined.set(salt);
  combined.set(hash, salt.length);
  return base64(combined);
}

export async function verifyPassword(password, stored) {
  const raw = base64Decode(stored);
  if (!raw || raw.length < 32) return false;
  const salt = raw.slice(0, 16);
  const expected = new Uint8Array(raw.length - 16);
  expected.set(raw.slice(16));
  const key = encoder.encode(password);
  const derived = await pbkdf2(key, salt, 600000, 32);
  const actual = new Uint8Array(await derived);
  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}

export async function hashPin(pin) {
  // PINs are short; use a memory-hard-ish approach via higher iterations and a per-pin salt.
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = encoder.encode(pin);
  const derived = await pbkdf2(key, salt, 310000, 32);
  const hash = new Uint8Array(await derived);
  const combined = new Uint8Array(salt.length + hash.length);
  combined.set(salt);
  combined.set(hash, salt.length);
  return base64(combined);
}

export async function verifyPin(pin, stored) {
  const raw = base64Decode(stored);
  if (!raw || raw.length < 32) return false;
  const salt = raw.slice(0, 16);
  const expected = new Uint8Array(raw.length - 16);
  expected.set(raw.slice(16));
  const key = encoder.encode(pin);
  const derived = await pbkdf2(key, salt, 310000, 32);
  const actual = new Uint8Array(await derived);
  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}

function base64(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64Decode(str) {
  try {
    const binary = atob(str);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch {
    return null;
  }
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

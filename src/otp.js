const DIGITS = "0123456789";

export function generateOtp(length = 6) {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += DIGITS[Math.floor(Math.random() * DIGITS.length)];
  }
  return code;
}

export function normalizePhone(phone) {
  const cleaned = phone.trim().replace(/[^0-9+\s]/g, "");
  if (!cleaned) return null;
  if (cleaned.startsWith("+")) {
    const digits = cleaned.slice(1).replace(/\s/g, "");
    if (!/^\d{7,15}$/.test(digits)) return null;
    return "+" + digits;
  }
  const digits = cleaned.replace(/\s/g, "");
  if (!/^\d{7,15}$/.test(digits)) return null;
  return "+" + digits;
}

export function codeMatches(input, expected) {
  if (!input || !expected) return false;
  return String(input).trim() === String(expected);
}

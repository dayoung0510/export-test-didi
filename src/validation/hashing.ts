import CryptoJS from 'crypto-js';

export function hashString(input: string) {
  const hash = CryptoJS.SHA256(input);
  return hash.toString(CryptoJS.enc.Hex);
}

export function verifyHash(input: string, hash: string): boolean {
  const hashedInput = hashString(input);
  return hashedInput === hash;
}

import CryptoJS from 'crypto-js';

const secret = process.env.NEXT_PUBLIC_JWT_SECRET || process.env.JWT_SECRET || '';

// Decrypt
export const decrypt = (message: string) => {
  if (!message) {
    throw new Error('empty message')
  }
  const bytes = CryptoJS.AES.decrypt(message, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
};
// Encrypt
export const encrypt = (message: string) => {
  if (!message) {
    throw new Error('empty message')
  }
  return CryptoJS.AES.encrypt(message, secret).toString();
}

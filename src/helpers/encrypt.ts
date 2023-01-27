import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

type payloadType = { email: string };

const secret = process.env.NEXT_PUBLIC_JWT_SECRET || process.env.JWT_SECRET || '';

export default class JWT {
  private secret: string;

  constructor() {
    this.secret = secret as string;
  }

  sign(payload: payloadType, expiresIn: string) {
    return jwt.sign(payload, this.secret, {
      algorithm: 'HS256',
      expiresIn,
    });
  }

  verify(token: string) {
    return jwt.verify(token, this.secret) as payloadType;
  }

  decode(token: string) {
    return jwt.decode(token) as payloadType;
  }
}

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

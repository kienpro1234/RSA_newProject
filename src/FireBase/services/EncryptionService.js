// encryptionService.js
import { publicEncrypt, privateDecrypt } from 'crypto';

export const encryptMessage = (message, publicKey) => {
  const buffer = Buffer.from(message, 'utf8');
  return publicEncrypt(publicKey, buffer).toString('base64');
};

export const decryptMessage = (encryptedMessage, privateKey) => {
  const buffer = Buffer.from(encryptedMessage, 'base64');
  return privateDecrypt(privateKey, buffer).toString('utf8');
};

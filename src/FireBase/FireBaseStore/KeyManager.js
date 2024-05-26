// KeyManager.js
import React, { useState } from 'react';
import { saveKeys } from '../services/KeyService';
import { generateKeyPairSync } from 'crypto';

const KeyManager = () => {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const handleGenerateKeys = async () => {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });

    await saveKeys(publicKey);
    setPublicKey(publicKey);
    setPrivateKey(privateKey);
  };

  return (
    <div>
      <button onClick={handleGenerateKeys}>Generate Keys</button>
      <textarea value={publicKey} readOnly />
      <textarea value={privateKey} readOnly />
    </div>
  );
};

export default KeyManager;

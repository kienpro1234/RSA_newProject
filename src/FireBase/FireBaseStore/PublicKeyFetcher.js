// PublicKeyFetcher.js
import React, { useState, useEffect } from 'react';
import { getPublicKey } from '../services/KeyService';

const PublicKeyFetcher = ({ receiverId, setPublicKey }) => {
  const [publicKey, setFetchedPublicKey] = useState('');

  useEffect(() => {
    const fetchPublicKey = async () => {
      const key = await getPublicKey(receiverId);
      setFetchedPublicKey(key);
      setPublicKey(key); // Cập nhật khóa công khai cho component cha
    };

    fetchPublicKey();
  }, [receiverId, setPublicKey]);

  return (
    <div>
      <textarea value={publicKey} readOnly />
    </div>
  );
};

export default PublicKeyFetcher;

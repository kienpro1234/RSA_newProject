// MessageReceiver.js
import React, { useEffect, useState } from 'react';
import { getMessages } from '../services/MessageService'; 
import { decryptMessage } from '../services/EncryptionService';

const MessageReceiver = ({ privateKey }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = getMessages((newMessages) => {
      setMessages(newMessages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Received Messages</h2>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            {decryptMessage(msg.encryptedMessage, privateKey)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageReceiver;

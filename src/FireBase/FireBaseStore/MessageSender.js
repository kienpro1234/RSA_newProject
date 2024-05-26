// MessageSender.js
import React, { useState } from 'react';
import { sendMessage } from '../services/MessageService';
import { encryptMessage } from '../services/EncryptionService';

const MessageSender = ({ receiverId, publicKey }) => {
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    const encryptedMessage = encryptMessage(message, publicKey);
    await sendMessage(receiverId, encryptedMessage);
    alert('Tin nhắn đã được gửi!');
  };

  return (
    <div>
      <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSend}>Send Message</button>
    </div>
  );
};

export default MessageSender;

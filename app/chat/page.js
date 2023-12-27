"use client"
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// const socket = io('http://localhost:3001'); // Connect to your server
const socket = io('https://lvf3bd2s-3001.inc1.devtunnels.ms/');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
 
  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      console.log("Received new message:", msg);
    });

    // Clean up the socket event listener when the component unmounts
    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      socket.emit('chat message', inputValue);
      setInputValue('');
      console.log("ssassaas");
    }
 
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
<div className="chat-container">
      <h1 className=' font-bold'>Chat</h1>
      <ul className="chat-messages">
        {messages.map((messages, index) => (
          <li key={index} className="chat-message">
            {messages}
          </li>
        ))}
      </ul>
      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          name="message"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
    </div>
    
  );
};

export default Chat;

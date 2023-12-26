// server.js

const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Allow connections from anywhere (for development)
  },
});

const messages = []; // Store messages in memory

io.on('connection', (socket) => {
  console.log('a user connected');

  // Emit stored messages to the newly connected user
  socket.emit('storedMessages', messages);

  socket.on('chat message', (data) => {
    // Store the received message
    messages.push(data);

    // Broadcast the message to all connected clients
    io.emit('chat message', data);
  });

  socket.on('chat message', (data) => {
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

httpServer.listen(3001, () => {
  console.log('Socket.IO server listening on *:3001');
});

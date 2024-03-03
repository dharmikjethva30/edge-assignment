// server.js
const http = require('http');
const socketIo = require('socket.io');

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.end('Server is running');
});


// Attach Socket.io to the HTTP server
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET']
    }
});

// Listen for incoming connections
io.on('connection', (socket) => {
  console.log('A client connected');

  // Handle messages from clients
  socket.on('message', (data) => {
    console.log('Received message from client:', data);

    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


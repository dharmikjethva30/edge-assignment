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

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('draw', (data) => {
      socket.broadcast.emit('draw', data); // Broadcast drawing data to all other clients except the sender
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


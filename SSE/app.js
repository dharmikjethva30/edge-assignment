const http = require('http');

// Function to generate SSE data format
function generateSSEData(data) {
  return `data: ${JSON.stringify(data)}\n\n`;
}

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set headers for SSE
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // Send an initial message to the client
  res.write(generateSSEData({ message: 'Welcome to SSE!' }));

  // Set up periodic updates
  const interval = setInterval(() => {
    const data = { time: new Date().toLocaleTimeString() };
    res.write(generateSSEData(data));
  }, 1000);

  // Handle client disconnect
  req.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
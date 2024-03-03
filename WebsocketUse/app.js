const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

let highestBid = 0;
let highestBidder = null;

wss.on('connection', function connection(ws) {
  console.log('A new client connected');

  // Send initial highest bid to client
  ws.send(JSON.stringify({ highestBid, highestBidder }));

  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    if (data.type === 'bid' && data.bid > highestBid) {
      highestBid = data.bid;
      highestBidder = data.bidder;
      // Broadcast updated highest bid to all connected clients
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ highestBid, highestBidder }));
        }
      });
    }
  });

  ws.on('close', function() {
    console.log('Client disconnected');
  });
});

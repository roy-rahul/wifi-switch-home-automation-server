const http = require('http');
const WebSocket = require('ws');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve index.html and assets from this folder
app.use(express.static(__dirname));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// Create a single HTTP server for both Express and WS
const server = http.createServer(app);

// Attach WebSocket server to the HTTP server
const wss = new WebSocket.Server({
  server,
  path: '/',                 // WS path
  perMessageDeflate: false,  // safer for embedded clients
});

function clientName(ws) {
  const sock = ws._socket;
  return sock ? `${sock.remoteAddress}:${sock.remotePort}` : 'unknown';
}

wss.on('connection', (ws) => {
  console.log('WS connected:', clientName(ws));

  ws.on('message', (msgBuf) => {
    const msg = msgBuf.toString();
    console.log('server WS message:', msg);
    const parsedMsg = JSON.parse(msg);
    if (parsedMsg.error) {
      console.log('Error from client:');
      return;
    }

    if (parsedMsg.from === 'esp32') {
      console.log('From client:');
      return;
    }

    // Broadcast to everyone (ESP32 + browsers)
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    }
  });

  ws.on('close', () => console.log('WS closed:', clientName(ws)));
  ws.on('error', (err) => console.log('WS error:', clientName(ws), err.message));
});

// Listen on all interfaces so ESP32 can reach us
server.listen(PORT, '0.0.0.0', () => {
  console.log(`HTTP+WS listening: http://<this-host>:${PORT}`);
});

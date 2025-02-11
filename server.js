const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// Sla de status op
let status = {
  'first-floor': 'OFF', // Standaardstatus
  'garage': 'OFF', // Standaardstatus
};

io.on('connection', (socket) => {
  console.log('Een gebruiker is verbonden');

  // Stuur de huidige status naar de imam bij verbinding
  socket.emit('initialStatus', status);

  // Luister naar statusupdates van vrijwilligers
  socket.on('updateStatus', (data) => {
    console.log('Statusupdate ontvangen:', data); // Log de ontvangen data
    status[data.room] = data.status === 'OFF' ? 'grey' : data.status === 'OK' ? 'green' : 'red'; // Sla de status op
    io.emit('statusUpdated', { room: data.room, status: status[data.room] }); // Stuur de update naar alle clients
  });

  socket.on('disconnect', () => {
    console.log('Een gebruiker is verbroken');
  });
});

server.listen(3000, () => {
  console.log('Server draait op http://localhost:3000');
});
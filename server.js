const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const session = require('express-session'); // Voor sessiebeheer
const bodyParser = require('body-parser'); // Voor het verwerken van POST-verzoeken

const app = express();
const server = http.createServer(app);

// WebSocket-server configuratie met CORS
const io = new Server(server, {
  cors: {
    origin: ["https://sufuf-app.vercel.app"], // Vervang dit met je Vercel front-end URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

// Gebruik bodyParser om POST-verzoeken te verwerken
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sessiebeheer configureren
app.use(session({
  secret: 'sufuf-secret-key', // Verander dit naar een sterke geheime sleutel
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Zet naar true voor productie als je HTTPS gebruikt
}));

app.use(express.static(path.join(__dirname, 'public')));

// Status data
let status = {
  'first-floor': 'OFF', // Standaardstatus
  'garage': 'OFF', // Standaardstatus
};

// Fake gebruikers voor demonstratie
const users = {
  'vrijwilliger1': 'wachtwoord123',
  'vrijwilliger2': 'wachtwoord456',
};

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    req.session.loggedIn = true; // Markeer gebruiker als ingelogd
    req.session.username = username;
    return res.redirect('/vrijwilliger.html'); // Redirect naar de vrijwilliger pagina na succesvolle login
  } else {
    return res.status(401).send('Ongeldige gebruikersnaam of wachtwoord');
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Fout bij uitloggen');
    }
    res.redirect('/login.html'); // Redirect naar loginpagina na uitloggen
  });
});

// Controleer of de gebruiker is ingelogd
app.get('/check-login', (req, res) => {
  if (req.session.loggedIn) {
    res.status(200).send('Logged in');
  } else {
    res.status(401).send('Not logged in');
  }
});

// WebSocket-communicatie
io.on('connection', (socket) => {
  console.log('Een gebruiker is verbonden');

  // Stuur de huidige status naar de imam bij verbinding
  socket.emit('initialStatus', status);

  // Luister naar statusupdates van vrijwilligers
  socket.on('updateStatus', (data) => {
    console.log('Statusupdate ontvangen:', data); // Log de ontvangen data
    if (data.status === 'OK') {
      status[data.room] = 'green';
    } else if (data.status === 'NOK') {
      status[data.room] = 'red';
    } else if (data.status === 'OFF') {
      status[data.room] = 'grey'; // OF als de status uitgeschakeld is
    }

    io.emit('statusUpdated', { room: data.room, status: status[data.room] }); // Stuur de update naar alle clients
  });

  socket.on('disconnect', () => {
    console.log('Een gebruiker is verbroken');
  });
});

// Server starten
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});

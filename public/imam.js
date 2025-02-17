// Verbind met de externe Socket.IO-server
const socket = io('https://sufuf-socketio-server.onrender.com'); // Vervang door je eigen server-URL indien nodig

// Luister naar de initiële status en update de UI
socket.on('initialStatus', (data) => {
  updateLight('first-floor', data['first-floor']);
  updateLight('garage', data['garage']);
  updateLight('beneden', data['beneden']);
  updateLight('vrouwen', data['vrouwen']);
});

// Luister naar statusupdates
socket.on('statusUpdated', (data) => {
  updateLight(data.room, data.status);
});

// Functie om het licht en de symbolen bij te werken
function updateLight(room, status) {
  const light = document.getElementById(`${room}-light`);
  const checkIcon = document.getElementById(`${room}-check`);
  const crossIcon = document.getElementById(`${room}-cross`);

  if (light && checkIcon && crossIcon) {
    // Reset kleuren en iconen
    light.classList.remove('green', 'red', 'grey');
    checkIcon.style.display = 'none';
    crossIcon.style.display = 'none';

    // Voeg de juiste klasse en icoon toe
    if (status === 'green') {
      light.classList.add('green');
      checkIcon.style.display = 'inline-block'; // Alternatief voor 'block'
    } else if (status === 'red') {
      light.classList.add('red');
      crossIcon.style.display = 'inline-block'; // Alternatief voor 'block'
    } else {
      light.classList.add('grey');
    }
  }
}

// Debugging: Check of de verbinding werkt
socket.on('connect', () => {
  console.log('Verbonden met de Socket.IO-server');
});

socket.on('disconnect', () => {
  console.log('Verbinding verbroken. Wachten op herverbinding...');
});

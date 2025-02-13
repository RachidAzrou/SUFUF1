// Verbind met de externe Socket.IO-server
const socket = io('https://sufuf-socketio-server.onrender.com');

// Functie om het licht bij te werken
function updateLight(room, status) {
  const light = document.getElementById(`${room}-light`);
  const checkIcon = document.getElementById(`${room}-check`);
  const crossIcon = document.getElementById(`${room}-cross`);

  if (light && checkIcon && crossIcon) {
    // Verwijder alle kleurklassen
    light.classList.remove('green', 'red', 'grey');

    // Voeg de juiste kleurklasse toe
    if (status === 'green') {
      light.classList.add('green');
      checkIcon.style.display = 'block';
      crossIcon.style.display = 'none';
    } else if (status === 'red') {
      light.classList.add('red');
      checkIcon.style.display = 'none';
      crossIcon.style.display = 'block';
    } else {
      light.classList.add('grey');
      checkIcon.style.display = 'none';
      crossIcon.style.display = 'none';
    }
  }
}

// Luister naar de initiële status
socket.on('initialStatus', (data) => {
  console.log('Ontvangen initialStatus:', data);
  updateLight('first-floor', data['first-floor']);
  updateLight('garage', data['garage']);
});

// Luister naar statusupdates
socket.on('statusUpdated', (data) => {
  console.log('Status update ontvangen:', data);
  updateLight(data.room, data.status);
});
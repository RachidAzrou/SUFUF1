// Verbind met de externe Socket.IO-server
const socket = io('https://sufuf-socketio-server.onrender.com'); // Vervang dit door de URL van je Render-server

// Luister naar de initiële status
socket.on('initialStatus', (data) => {
  updateLight('first-floor', data['first-floor']);
  updateLight('garage', data['garage']);
  updateLight('beneden', data['beneden']); // Nieuw toegevoegd
  updateLight('vrouwen', data['vrouwen']); // Nieuw toegevoegd
});

// Luister naar statusupdates
socket.on('statusUpdated', (data) => {
  updateLight(data.room, data.status);
});

// Functie om het licht en symbool bij te werken
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
      checkIcon.style.display = 'block'; // Toon het vinkje
      crossIcon.style.display = 'none'; // Verberg het kruisje
    } else if (status === 'red') {
      light.classList.add('red');
      checkIcon.style.display = 'none'; // Verberg het vinkje
      crossIcon.style.display = 'block'; // Toon het kruisje
    } else {
      light.classList.add('grey');
      checkIcon.style.display = 'none'; // Verberg het vinkje
      crossIcon.style.display = 'none'; // Verberg het kruisje
    }
  }
}

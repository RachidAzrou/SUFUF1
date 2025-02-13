// Verbind met de externe Socket.IO-server
const socket = io('https://sufuf-socketio-server.onrender.com'); // Vervang dit door de URL van je Render-server

const okSwitch = document.getElementById('ok-switch');
const nokSwitch = document.getElementById('nok-switch');

// Laad de opgeslagen status bij het openen van de pagina
socket.on('initialStatus', (data) => {
  if (data['garage'] === 'green') {
    okSwitch.checked = true;
  } else if (data['garage'] === 'red') {
    nokSwitch.checked = true;
  }
});

okSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    nokSwitch.checked = false;
    socket.emit('updateStatus', { room: 'garage', status: 'OK' }); // Verzend 'OK', server verwacht 'green'
  } else if (!okSwitch.checked && !nokSwitch.checked) {
    socket.emit('updateStatus', { room: 'garage', status: 'OFF' });
  }
});

nokSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    okSwitch.checked = false;
    socket.emit('updateStatus', { room: 'garage', status: 'NOK' }); // Verzend 'NOK', server verwacht 'red'
  } else if (!okSwitch.checked && !nokSwitch.checked) {
    socket.emit('updateStatus', { room: 'garage', status: 'OFF' });
  }
});
// Functie om het wachtwoord te controleren
function controleerWachtwoord() {
  const ingevoerdWachtwoord = document.getElementById('wachtwoord').value;
  const foutmelding = document.getElementById('foutmelding');
  const wachtwoordScherm = document.getElementById('wachtwoord-scherm');
  const ruimteScherm = document.getElementById('ruimte-scherm');

  // Stel hier het gewenste wachtwoord in (bijvoorbeeld "1234")
  const correctWachtwoord = "1234";

  if (ingevoerdWachtwoord === correctWachtwoord) {
    // Wachtwoord is correct, toon het ruimtescherm
    wachtwoordScherm.style.display = 'none';
    ruimteScherm.style.display = 'block';
  } else {
    // Wachtwoord is incorrect, toon foutmelding
    foutmelding.textContent = "Ongeldig wachtwoord. Probeer opnieuw.";
  }
}

// Voeg event listeners toe voor de schakelaars
const okSwitch = document.getElementById('ok-switch');
const nokSwitch = document.getElementById('nok-switch');

okSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    nokSwitch.checked = false;
    socket.emit('updateStatus', { room: 'garage', status: 'OK' });
  } else if (!okSwitch.checked && !nokSwitch.checked) {
    socket.emit('updateStatus', { room: 'garage', status: 'OFF' });
  }
});

nokSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    okSwitch.checked = false;
    socket.emit('updateStatus', { room: 'garage', status: 'NOK' });
  } else if (!okSwitch.checked && !nokSwitch.checked) {
    socket.emit('updateStatus', { room: 'garage', status: 'OFF' });
  }
});
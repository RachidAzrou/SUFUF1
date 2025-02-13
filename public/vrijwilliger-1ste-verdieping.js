// Verbind met de externe Socket.IO-server
const socket = io('https://sufuf-socketio-server.onrender.com');

const okSwitch = document.getElementById('ok-switch');
const nokSwitch = document.getElementById('nok-switch');

// Debugging: Controleer of de schakelaars worden gevonden
console.log('OK Switch:', okSwitch);
console.log('NOK Switch:', nokSwitch);

// Functie om het wachtwoord te controleren
function controleerWachtwoord() {
  const ingevoerdWachtwoord = document.getElementById('wachtwoord').value;
  const foutmelding = document.getElementById('foutmelding');
  const wachtwoordScherm = document.getElementById('wachtwoord-scherm');
  const ruimteScherm = document.getElementById('ruimte-scherm');

  const correctWachtwoord = "1234"; // Stel hier het gewenste wachtwoord in

  if (ingevoerdWachtwoord === correctWachtwoord) {
    wachtwoordScherm.style.display = 'none';
    ruimteScherm.style.display = 'block';
  } else {
    foutmelding.textContent = "Ongeldig wachtwoord. Probeer opnieuw.";
  }
}

// Luister naar de initiële status
socket.on('initialStatus', (data) => {
  console.log('Ontvangen initialStatus:', data);
  if (data['first-floor'] === 'green') {
    okSwitch.checked = true;
  } else if (data['first-floor'] === 'red') {
    nokSwitch.checked = true;
  }
});

// Schakelaar voor OK
okSwitch.addEventListener('change', (e) => {
  console.log('OK Switch clicked:', e.target.checked);
  if (e.target.checked) {
    nokSwitch.checked = false;
    socket.emit('updateStatus', { room: 'first-floor', status: 'green' });
  } else if (!okSwitch.checked && !nokSwitch.checked) {
    socket.emit('updateStatus', { room: 'first-floor', status: 'off' });
  }
});

// Schakelaar voor NOK
nokSwitch.addEventListener('change', (e) => {
  console.log('NOK Switch clicked:', e.target.checked);
  if (e.target.checked) {
    okSwitch.checked = false;
    socket.emit('updateStatus', { room: 'first-floor', status: 'red' });
  } else if (!okSwitch.checked && !nokSwitch.checked) {
    socket.emit('updateStatus', { room: 'first-floor', status: 'off' });
  }
});
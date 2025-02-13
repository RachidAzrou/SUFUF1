// Verbind met de externe Socket.IO-server
const socket = io('https://sufuf-socketio-server.onrender.com');

const okSwitch = document.getElementById('ok-switch');
const nokSwitch = document.getElementById('nok-switch');

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

// Luister naar de initiële status
socket.on('initialStatus', (data) => {
  console.log('Ontvangen initialStatus:', data);
  if (data['garage'] === 'green') {
    okSwitch.checked = true;
  } else if (data['garage'] === 'red') {
    nokSwitch.checked = true;
  }
});

// Luister naar statusupdates
socket.on('statusUpdated', (data) => {
  console.log('Status update ontvangen:', data);
  if (data.room === 'garage') {
    if (data.status === 'green') {
      okSwitch.checked = true;
      nokSwitch.checked = false;
    } else if (data.status === 'red') {
      nokSwitch.checked = true;
      okSwitch.checked = false;
    } else {
      okSwitch.checked = false;
      nokSwitch.checked = false;
    }
  }
});

// Schakelaar voor OK
okSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    nokSwitch.checked = false;
    socket.emit('updateStatus', { room: 'garage', status: 'green' });
  } else if (!okSwitch.checked && !nokSwitch.checked) {
    socket.emit('updateStatus', { room: 'garage', status: 'off' });
  }
});

// Schakelaar voor NOK
nokSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    okSwitch.checked = false;
    socket.emit('updateStatus', { room: 'garage', status: 'red' });
  } else if (!okSwitch.checked && !nokSwitch.checked) {
    socket.emit('updateStatus', { room: 'garage', status: 'off' });
  }
});
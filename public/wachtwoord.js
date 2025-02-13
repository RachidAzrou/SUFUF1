document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('wachtwoordForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Haal het wachtwoord op en verwijder eventuele spaties
    var wachtwoord = document.getElementById('wachtwoord').value.trim();
    var errorDiv = document.getElementById('error');

    // Haal de 'ruimte' parameter op uit de URL
    var urlParams = new URLSearchParams(window.location.search);
    var ruimte = urlParams.get('ruimte');

    // Definieer de wachtwoorden voor de ruimtes
    var wachtwoorden = {
      '1ste-verdieping': 'test',
      'garage': 'test'
    };

    // Controleer of het ingevoerde wachtwoord klopt
    if (wachtwoorden[ruimte] && wachtwoord === wachtwoorden[ruimte]) {
      // Als het klopt, doorverwijzen naar de juiste pagina (bijv. vrijwilliger-1ste-verdieping.html)
      window.location.href = 'vrijwilliger-' + ruimte + '.html';
    } else {
      // Als het niet klopt, toon de foutmelding
      errorDiv.style.display = 'block';
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Voeg een submit event listener toe aan het formulier
  document.getElementById('wachtwoordForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Haal de ingevoerde waarde op en verwijder eventuele overtollige spaties
    const wachtwoord = document.getElementById('wachtwoord').value.trim();
    const errorDiv = document.getElementById('error');

    // Log de volledige URL om te controleren of de querystring aanwezig is
    console.log("Volledige URL: ", window.location.href);

    // Haal de 'ruimte' parameter op uit de URL
    const urlParams = new URLSearchParams(window.location.search);
    const ruimte = urlParams.get('ruimte');
    console.log('Ruimte: ', ruimte);

    // Stel de wachtwoorden per ruimte in
    const wachtwoorden = {
      '1ste-verdieping': 'test',
      'garage': 'test'
    };

    // Update de titel op basis van de gekozen ruimte (optioneel)
    if (ruimte) {
      document.getElementById('pageTitle').innerText = `Wachtwoord - ${ruimte}`;
    }

    // Debug logs
    console.log('Ingevoerd wachtwoord: ', wachtwoord);
    console.log('Correct wachtwoord voor ruimte: ', wachtwoorden[ruimte]);

    // Vergelijk het ingevoerde wachtwoord met het verwachte wachtwoord
    if (wachtwoorden[ruimte] && wachtwoord === wachtwoorden[ruimte]) {
      // Als het wachtwoord klopt, doorverwijzen naar de juiste vrijwilligerspagina.
      // Gebruik een absoluut pad indien nodig, bijvoorbeeld: `/vrijwilliger-${ruimte}.html`
      window.location.href = `vrijwilliger-${ruimte}.html`;
    } else {
      // Als het wachtwoord niet klopt, toon de foutmelding
      errorDiv.style.display = 'block';
    }
  });
});

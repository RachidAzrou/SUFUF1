// Zorg ervoor dat de code pas wordt uitgevoerd nadat de DOM volledig is geladen.
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('wachtwoordForm');
  
  // Controleer of het formulier en het input-element bestaan
  if (!form) {
    console.error("Het formulier met id 'wachtwoordForm' is niet gevonden.");
    return;
  }
  
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Haal het wachtwoordveld op
    const wachtwoordInput = document.getElementById('wachtwoord');
    if (!wachtwoordInput) {
      console.error("Het input-element met id 'wachtwoord' is niet gevonden.");
      return;
    }
    // Verwijder overtollige spaties
    //const wachtwoord = wachtwoordInput.value.trim();
    const errorDiv = document.getElementById('error');
    
    // Log de volledige URL voor debugging
    console.log("Volledige URL: ", window.location.href);
    
    // Haal de URL-parameter 'ruimte' op
    const urlParams = new URLSearchParams(window.location.search);
    const ruimte = urlParams.get('ruimte');
    console.log("Ruimte: ", ruimte);
    
    // Stel de wachtwoorden per ruimte in
    const wachtwoorden = {
      '1ste-verdieping': 'test',
      'garage': 'test'
    };
    
    console.log("Ingevoerd wachtwoord: ", wachtwoord);
    console.log("Correct wachtwoord voor ruimte: ", wachtwoorden[ruimte]);
    
    // Als de ingevoerde waarde overeenkomt, doorsturen naar de juiste vrijwilligerspagina
    if (wachtwoorden[ruimte] && wachtwoord === wachtwoorden[ruimte]) {
      // Gebruik een absoluut pad als nodig, bijvoorbeeld: `/vrijwilliger-${ruimte}.html`
      window.location.href = `vrijwilliger-${ruimte}.html`;
    } else {
      // Foutmelding tonen
      errorDiv.style.display = 'block';
    }
  });
});

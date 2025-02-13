document.getElementById('wachtwoordForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Haal het wachtwoord op
    const wachtwoord = document.getElementById('wachtwoord').value;

    // Controleer of het wachtwoord is opgehaald
    console.log('Ingevoerde wachtwoord: ', wachtwoord); // Testen of je de waarde goed krijgt

    const errorDiv = document.getElementById('error');

    // Haal de URL-parameter 'ruimte' op
    const urlParams = new URLSearchParams(window.location.search);
    const ruimte = urlParams.get('ruimte'); // Dit haalt de waarde op, bijvoorbeeld '1ste-verdieping' of 'garage'

    // Log de waarde van de ruimte-parameter om te controleren of deze correct wordt opgehaald
    console.log('Ruimte: ', ruimte);

    // Controleer het wachtwoord voor de juiste ruimte
    const wachtwoorden = {
        '1ste-verdieping': 'test',
        'garage': 'test'
    };

    // Log de ingevoerde wachtwoord en het correcte wachtwoord om te zien of ze overeenkomen
    console.log('Ingevoerd wachtwoord: ', wachtwoord); // Is de waarde van het wachtwoord correct?
    console.log('Correct wachtwoord voor ruimte: ', wachtwoorden[ruimte]); // Moet je de juiste waarde vinden

    if (wachtwoorden[ruimte] && wachtwoord === wachtwoorden[ruimte]) {
        // Wachtwoord klopt, stuur door naar het juiste vrijwilligersscherm
        window.location.href = `vrijwilliger-${ruimte}.html`;  // Dynamisch doorverwijzen
    } else {
        // Wachtwoord is fout
        errorDiv.style.display = 'block';
    }
});

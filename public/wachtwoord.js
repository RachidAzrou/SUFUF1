document.getElementById('wachtwoordForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const wachtwoord = document.getElementById('wachtwoord').value;
    const errorDiv = document.getElementById('error');

    // Haal de URL-parameter 'ruimte' op
    const urlParams = new URLSearchParams(window.location.search);
    const ruimte = urlParams.get('ruimte'); // Dit haalt de waarde op, bijvoorbeeld '1ste-verdieping' of 'garage'

    // Log de waarde van de ruimte-parameter om te controleren of deze correct wordt opgehaald
    console.log('Ruimte: ', ruimte);

    // Controleer het wachtwoord voor de juiste ruimte
    const wachtwoorden = {
        '1ste-verdieping': '1234',
        'garage': 'abcd'
    };

    // Log de ingevoerde wachtwoord en het correcte wachtwoord om te zien of ze overeenkomen
    console.log('Ingevoerd wachtwoord: ', wachtwoord);
    console.log('Correct wachtwoord voor ruimte: ', wachtwoorden[ruimte]);

    if (wachtwoorden[ruimte] && wachtwoord === wachtwoorden[ruimte]) {
        // Wachtwoord klopt, stuur door naar het juiste vrijwilligersscherm
        window.location.href = `vrijwilliger-${ruimte}.html`;  // Dynamisch doorverwijzen
    } else {
        // Wachtwoord is fout
        errorDiv.style.display = 'block';
    }
});

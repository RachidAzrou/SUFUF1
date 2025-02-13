document.getElementById('wachtwoordForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const wachtwoord = document.getElementById('wachtwoord').value;
    const errorDiv = document.getElementById('error');

    // Haal de URL-parameter 'ruimte' op
    const urlParams = new URLSearchParams(window.location.search);
    const ruimte = urlParams.get('ruimte'); // Dit haalt de waarde op, bijvoorbeeld '1ste-verdieping' of 'garage'

    // Controleer het wachtwoord voor de juiste ruimte
    const wachtwoorden = {
        '1ste-verdieping': '1234',
        'garage': 'abcd'
    };

    if (wachtwoorden[ruimte] && wachtwoord === wachtwoorden[ruimte]) {
        // Wachtwoord klopt, stuur door naar het juiste vrijwilligersscherm
        window.location.href = `vrijwilliger-${ruimte}.html`;  // Dynamisch doorverwijzen
    } else {
        // Wachtwoord is fout
        errorDiv.style.display = 'block';
    }
});

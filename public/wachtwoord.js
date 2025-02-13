document.getElementById('wachtwoordForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const wachtwoord = document.getElementById('wachtwoord').value;
    const correcteWachtwoord = '1234'; // Pas dit wachtwoord aan naar wat jij wilt
    const errorDiv = document.getElementById('error');

    if (wachtwoord === correcteWachtwoord) {
        // Wachtwoord klopt, stuur door naar het juiste scherm
        window.location.href = 'vrijwilliger.html';  // Pas dit aan naar het gewenste vrijwilligersscherm
    } else {
        // Wachtwoord is fout
        errorDiv.style.display = 'block';
    }
});

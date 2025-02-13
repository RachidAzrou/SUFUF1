document.getElementById("pincode-button").addEventListener("click", function () {
    const pincodeInput = document.getElementById("pincode-input").value;
    const correctPincode = "1234"; // Stel hier de correcte pincode in
  
    if (pincodeInput === correctPincode) {
      window.location.href = "/vrijwilliger-1ste-verdieping.html"; // Doorsturen bij correcte pincode
    } else {
      const errorMsg = document.getElementById("error-msg");
      errorMsg.style.display = "block"; // Toon foutmelding
      setTimeout(() => {
        errorMsg.style.display = "none"; // Verberg foutmelding na 3 seconden
      }, 3000);
    }
  });
  
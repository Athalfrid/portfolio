/// Initialisation de EmailJS avec votre identifiant utilisateur
emailjs.init("x3nV-XnMz5Bz9ERRN"); // Remplacez 'votre_user_id' par votre identifiant utilisateur EmailJS

$(document).ready(function () {
  // Intercepter la soumission du formulaire
  $("#contactForm").submit(function (event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les valeurs des champs
    var nom = $("#nom").val().trim();
    var prenom = $("#prenom").val().trim();
    var email = $("#email").val().trim();
    var message = $("#message").val().trim();

    // Validation rapide (vous pouvez ajouter plus de validations ici si nécessaire)
    if (nom === "" || prenom === "" || email === "" || message === "") {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    var fullName =
      nom.toUpperCase() +
      " " +
      prenom.charAt(0).toUpperCase() +
      prenom.slice(1).toLowerCase();

    // Préparer les données pour l'envoi avec EmailJS
    var templateParams = {
      from_name: fullName,
      from_email: email,
      message_html: message,
    };

    // Envoyer l'email avec EmailJS
    //emailjs.send('votre_service_id', 'votre_template_id', templateParams)
    emailjs.send("service_240es8d", "template_21p3vkh", templateParams).then(
      function (response) {
        console.log("Email envoyé avec succès !", response);
        alert("Message envoyé avec succès !");
        // Réinitialiser le formulaire après un succès
        $("#contactForm")[0].reset();
      },
      function (error) {
        console.error("Erreur lors de l'envoi de l'email:", error);
        alert(
          "Erreur lors de l'envoi du message. Veuillez réessayer plus tard."
        );
      }
    );
  });
});

//service_240es8d

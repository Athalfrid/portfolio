    // Initialisation de EmailJS avec votre identifiant utilisateur
    emailjs.init("x3nV-XnMz5Bz9ERRN");

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

        // Vérification du domaine de l'adresse email
        async function checkDomainExists(domain) {
          const response = await fetch(`https://dns.google.com/resolve?name=${domain}&type=A`);
          const data = await response.json();
          return data.Status === 0;
        }

        // Extraire le domaine de l'email
        var domain = email.split('@')[1].split('.')[0];

        // Attendre la vérification de l'existence du domaine
        checkDomainExists(domain).then(domainExists => {
          if (!domainExists) {
            alert("Le domaine de l'adresse email est invalide.");
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
          emailjs.send("service_240es8d", "template_21p3vkh", templateParams).then(
            function (response) {
              console.log("Email envoyé avec succès !", response);
              alert("Message envoyé avec succès !");
              // Réinitialiser le formulaire après un succès
              $("#contactForm")[0].reset();
            },
            function (error) {
              console.error("Erreur lors de l'envoi de l'email:", error);
              alert("Erreur lors de l'envoi du message. Veuillez réessayer plus tard.");
            }
          );
        });
      });
    });
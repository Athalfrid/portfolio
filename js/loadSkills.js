// S'assure que le code ne s'exécute qu'une fois que le document est complètement chargé
$(document).ready(function () {
  
  // Détermine l'URL du fichier JSON contenant les compétences
  // Utilise le chemin local "data/skills.json" s'il est disponible, sinon utilise l'URL GitHub
  const data = "data/skills.json"
    ? "data/skills.json"
    : "https://athalfrid.github.io/portfolio/data/skills.json";
  
  // Récupère les données JSON du fichier spécifié
  $.getJSON(data, function (skills) {
    
    // Sélectionne l'élément HTML où les cartes de compétences seront insérées
    var skillsContainer = $("#skills-container");
    
    // Initialise la chaîne HTML pour les cartes de compétences
    var skillCardsHtml = '<div class="skill-card-wrapper">';
    
    // Parcourt chaque compétence dans le fichier JSON
    skills.forEach(function (skill, index) {
      
      // Ajoute une carte de compétence pour chaque entrée dans le JSON
      skillCardsHtml += `
                <div class="skill-card">
                    <img src="${skill.icon}" alt="${skill.title}" class="skill-icon">
                    <p class="skill-description">${skill.description}</p>
                </div>
            `;
      
      // Ferme la rangée après trois compétences et en ouvre une nouvelle
      if ((index + 1) % 3 === 0 && index + 1 !== skills.length) {
        skillCardsHtml += '</div><div class="skill-card-wrapper">';
      }
    });
    
    // Ferme la dernière rangée de cartes
    skillCardsHtml += "</div>";
    
    // Ajoute le contenu HTML généré au conteneur des compétences
    skillsContainer.append(skillCardsHtml);
    
  // Gère les erreurs de la requête JSON
  }).fail(function (jqxhr, textStatus, error) {
    console.error("Request Failed: " + textStatus + ", " + error);
  });
});

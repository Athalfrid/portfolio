$(document).ready(function () {
  const data = "data/skills.json"
    ? "data/skills.json"
    : "https://athalfrid.github.io/portfolio/data/skills.json";
  $.getJSON("data/skills.json", function (skills) {
    var skillsContainer = $("#skills-container");
    var skillCardsHtml = '<div class="skill-card-wrapper">';

    skills.forEach(function (skill, index) {
      skillCardsHtml += `
                <div class="skill-card">
                    <img src="${skill.icon}" alt="${skill.title}" class="skill-icon">
                    <p class="skill-description">${skill.description}</p>
                </div>
            `;

      // Fermer la rangée après trois compétences et en ouvrir une nouvelle
      if ((index + 1) % 3 === 0 && index + 1 !== skills.length) {
        skillCardsHtml += '</div><div class="skill-card-wrapper">';
      }
    });

    skillCardsHtml += "</div>";
    skillsContainer.append(skillCardsHtml);
  }).fail(function (jqxhr, textStatus, error) {
    console.error("Request Failed: " + textStatus + ", " + error);
  });
});

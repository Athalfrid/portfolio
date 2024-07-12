$(document).ready(function () {
  // Définition de l'URL du fichier JSON des projets
  const dataUrl = "data/projects.json"
    ? "data/projects.json"
    : "https://athalfrid.github.io/portfolio/data/projects.json";

  // Récupération des données JSON à partir de l'URL définie
  $.getJSON(dataUrl, function (projects) {
    // Sélection de l'élément conteneur des projets dans le DOM
    var projectsContainer = $("#projects-container");
    var projectHtml = "";

    // Boucle à travers chaque projet dans le JSON
    projects.forEach(function (project, index) {
      // Construction de la structure HTML pour chaque projet
      projectHtml += `
          <div class="project-card" data-index="${index}">
            <div class="project-header">
              <h3 class="project-title">${project.title}</h3>
              <span class="project-toggle">&#9660;</span>
            </div>
            <div class="project-details">
              <p class="project-description"><i style="color:white">${
                project.status ? project.status : ""
              }</i></p>
              <p class="project-description">${project.description}</p>
              <p class="project-technologies"><strong>Technos utilisées:</strong><br> ${project.technologies.join(
                ", "
              )}</p>
        `;

      // Vérification de la présence d'images
      if (project.images && project.images.length > 0) {
        projectHtml += `
            <div class="project-images">
              <span class="image-navigation prev">&#9664;</span>
              <img src="${project.images[0]}" alt="Project Image" class="current-image">
              <span class="image-navigation next">&#9654;</span>
            </div>
          `;
      }

      projectHtml += `
              <a href="${project.github}" class="github-link" target="_blank">
                    <svg class="octicon octicon-mark-github" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                        <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                    Voir sur GitHub
                </a>
            </div>
          </div>
        `;
    });

    // Ajout du HTML généré dans le conteneur des projets
    projectsContainer.append(projectHtml);

    // Gestion de l'événement clic sur .project-header
    $(".project-card").on("click", function () {
      // Sélection du parent .project-card de l'en-tête cliqué
      var projectCard = $(this).closest(".project-card");
      // Sélection des détails du projet spécifique
      var projectDetails = projectCard.find(".project-details");

      // Animation de l'affichage/masquage des détails du projet
      projectDetails.slideToggle("fast", function () {
        // Inversion de la classe .open sur .project-toggle après l'animation
        projectCard.find(".project-toggle").toggleClass("open");
      });
    });

    // Gestion de la navigation des images précédente
    $(".image-navigation.prev").on("click", function () {
      // Sélection de l'image courante dans le projet spécifique
      var currentImage = $(this).siblings(".current-image");
      // Récupération de l'index du projet à partir de l'attribut data-index
      var currentIndex = currentImage.closest(".project-card").data("index");
      // Calcul du nouvel index d'image précédente
      var newIndex =
        (projects[currentIndex].images.indexOf(currentImage.attr("src")) -
          1 +
          projects[currentIndex].images.length) %
        projects[currentIndex].images.length;
      // Mise à jour de la source de l'image avec la nouvelle image précédente
      currentImage.attr("src", projects[currentIndex].images[newIndex]);
    });

    // Gestion de la navigation des images suivante
    $(".image-navigation.next").on("click", function () {
      // Sélection de l'image courante dans le projet spécifique
      var currentImage = $(this).siblings(".current-image");
      // Récupération de l'index du projet à partir de l'attribut data-index
      var currentIndex = currentImage.closest(".project-card").data("index");
      // Calcul du nouvel index d'image suivante
      var newIndex =
        (projects[currentIndex].images.indexOf(currentImage.attr("src")) + 1) %
        projects[currentIndex].images.length;
      // Mise à jour de la source de l'image avec la nouvelle image suivante
      currentImage.attr("src", projects[currentIndex].images[newIndex]);
    });
  }).fail(function (jqxhr, textStatus, error) {
    // Gestion des erreurs lors du chargement du JSON
    console.error("Request Failed: " + textStatus + ", " + error);
  });
});

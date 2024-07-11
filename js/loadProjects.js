$(document).ready(function () {
    // Définition de l'URL du fichier JSON des projets
    const dataUrl = "data/projects.json" ? "data/projects.json" : "https://athalfrid.github.io/portfolio/data/projects.json";
    
    // Récupération des données JSON à partir de l'URL définie
    $.getJSON(dataUrl, function (projects) {
        // Sélection de l'élément conteneur des projets dans le DOM
        var projectsContainer = $('#projects-container');
        var projectHtml = '';

        // Boucle à travers chaque projet dans le JSON
        projects.forEach(function(project, index) {
            // Construction de la structure HTML pour chaque projet
            projectHtml += `
                <div class="project-card" data-index="${index}">
                    <div class="project-header">
                        <h3 class="project-title">${project.title}</h3>
                        <span class="project-toggle">&#9660;</span>
                    </div>
                    <div class="project-details">
                        <p class="project-description"><i>${project.status ? project.status : ''}</i></p>
                        <p class="project-description">${project.description}</p>
                        <p class="project-technologies"><strong>Technos utilisées:</strong><br> ${project.technologies.join(', ')}</p>
                        <div class="project-images">
                            <span class="image-navigation prev">&#9664;</span>
                            <img src="${project.images[0]}" alt="Project Image" class="current-image">
                            <span class="image-navigation next">&#9654;</span>
                        </div>
                        <a href="${project.github}" target="_blank">Voir sur GitHub</a>
                    </div>
                </div>
            `;
        });

        // Ajout du HTML généré dans le conteneur des projets
        projectsContainer.append(projectHtml);

        // Gestion de l'événement clic sur .project-header
        $('.project-card').on('click', function() {
            // Sélection du parent .project-card de l'en-tête cliqué
            var projectCard = $(this).closest('.project-card');
            // Sélection des détails du projet spécifique
            var projectDetails = projectCard.find('.project-details');

            // Animation de l'affichage/masquage des détails du projet
            projectDetails.slideToggle('fast', function() {
                // Inversion de la classe .open sur .project-toggle après l'animation
                projectCard.find('.project-toggle').toggleClass('open');
            });
        });

        // Gestion de la navigation des images précédente
        $('.image-navigation.prev').on('click', function() {
            // Sélection de l'image courante dans le projet spécifique
            var currentImage = $(this).siblings('.current-image');
            // Récupération de l'index du projet à partir de l'attribut data-index
            var currentIndex = currentImage.closest('.project-card').data('index');
            // Calcul du nouvel index d'image précédente
            var newIndex = (projects[currentIndex].images.indexOf(currentImage.attr('src')) - 1 + projects[currentIndex].images.length) % projects[currentIndex].images.length;
            // Mise à jour de la source de l'image avec la nouvelle image précédente
            currentImage.attr('src', projects[currentIndex].images[newIndex]);
        });

        // Gestion de la navigation des images suivante
        $('.image-navigation.next').on('click', function() {
            // Sélection de l'image courante dans le projet spécifique
            var currentImage = $(this).siblings('.current-image');
            // Récupération de l'index du projet à partir de l'attribut data-index
            var currentIndex = currentImage.closest('.project-card').data('index');
            // Calcul du nouvel index d'image suivante
            var newIndex = (projects[currentIndex].images.indexOf(currentImage.attr('src')) + 1) % projects[currentIndex].images.length;
            // Mise à jour de la source de l'image avec la nouvelle image suivante
            currentImage.attr('src', projects[currentIndex].images[newIndex]);
        });

    }).fail(function(jqxhr, textStatus, error) {
        // Gestion des erreurs lors du chargement du JSON
        console.error("Request Failed: " + textStatus + ", " + error);
    });
});

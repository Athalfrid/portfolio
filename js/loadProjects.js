$(document).ready(function () {
  const data = "data/projects.json"
    ? "data/projects.json"
    : "https://athalfrid.github.io/portfolio/data/projects.json";
  $.getJSON(data, function (projects) {
    var projectsContainer = $('#projects-container');
    var projectHtml = '';

    projects.forEach(function(project, index) {
        projectHtml += `
            <div class="project-card" data-index="${index}">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-toggle">&#9660;</span>
                </div>
                <div class="project-details">
                    <p class="project-description">${project.description}</p>
                    <p class="project-technologies"><strong>Technologies utilisées:</strong> ${project.technologies.join(', ')}</p>
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

    projectsContainer.append(projectHtml);

    $('.project-card .project-header').on('click', function() {
        var details = $(this).next('.project-details');
        details.toggleClass('open');
        details.slideToggle();

        $(this).find('.project-toggle').toggleClass('open');
    });

    $('.image-navigation.prev').on('click', function() {
        var currentImage = $(this).siblings('.current-image');
        var currentIndex = projects[currentImage.closest('.project-card').data('index')].images.indexOf(currentImage.attr('src'));
        var newIndex = (currentIndex - 1 + projects[currentImage.closest('.project-card').data('index')].images.length) % projects[currentImage.closest('.project-card').data('index')].images.length;
        currentImage.attr('src', projects[currentImage.closest('.project-card').data('index')].images[newIndex]);
    });

    $('.image-navigation.next').on('click', function() {
        var currentImage = $(this).siblings('.current-image');
        var currentIndex = projects[currentImage.closest('.project-card').data('index')].images.indexOf(currentImage.attr('src'));
        var newIndex = (currentIndex + 1) % projects[currentImage.closest('.project-card').data('index')].images.length;
        currentImage.attr('src', projects[currentImage.closest('.project-card').data('index')].images[newIndex]);
    });
}).fail(function(jqxhr, textStatus, error) {
    console.error("Request Failed: " + textStatus + ", " + error);
});
});
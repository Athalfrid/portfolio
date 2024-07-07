$(document).ready(function () {
  $.getJSON("../data/projects.json", function (projects) {
    var projectsContainer = $("#projects-container");

    projects.forEach(function (project, index) {
        console.log(project);
      var projectHtml = `
                <div class="col-lg-4 col-md-6 project">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-images">
                        <img src="${project.images[0]}" alt="${project.title}${index}" class="project-image" data-index="0">
                    </div>
                    <div class="project-navigation">
                        <button class="prev-image">Précédent</button>
                        <button class="next-image">Suivant</button>
                    </div>
                    <a href="${project.github}" target="_blank">Voir sur GitHub</a>
                </div>
            `;

      projectsContainer.append(projectHtml);
    });

    $(".next-image").click(function () {
      var projectDiv = $(this).closest(".project");
      var imgTag = projectDiv.find(".project-image");
      var currentIndex = parseInt(imgTag.attr("data-index"));
      var projectIndex = $(".project").index(projectDiv);
      var nextIndex = (currentIndex + 1) % projects[projectIndex].images.length;
      imgTag.attr("src", projects[projectIndex].images[nextIndex]);
      imgTag.attr("data-index", nextIndex);
    });

    $(".prev-image").click(function () {
      var projectDiv = $(this).closest(".project");
      var imgTag = projectDiv.find(".project-image");
      var currentIndex = parseInt(imgTag.attr("data-index"));
      var projectIndex = $(".project").index(projectDiv);
      var prevIndex =
        (currentIndex - 1 + projects[projectIndex].images.length) %
        projects[projectIndex].images.length;
      imgTag.attr("src", projects[projectIndex].images[prevIndex]);
      imgTag.attr("data-index", prevIndex);
    });
  });
});

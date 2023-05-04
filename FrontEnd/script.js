// Récupère les images depuis l'API
fetch ("http://localhost:5678/api/works")
    .then(function(reponse) {
        return reponse.json();
    })
    .then(function(projets) {
        let gallerie = document.querySelector(".gallery");
        for (let i = 0; i < projets.length; i++) {
            const figure = document.createElement("figure");
            gallerie.appendChild(figure);
            const image = document.createElement("img");
            image.src = projets[i].imageUrl;
            figure.appendChild(image);
            const figcaption = document.createElement("figcaption");
            figcaption.innerText = projets[i].title;
            figure.appendChild(figcaption);
        }
    });
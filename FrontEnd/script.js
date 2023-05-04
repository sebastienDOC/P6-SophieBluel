// Récupère les images depuis l'API
fetch ("http://localhost:5678/api/works")
    .then(function(reponse) {
        return reponse.json();
    })
    .then(function(projets) {
        let gallerie = document.querySelector(".gallery");
        function projetsAffiches(projets) {
            for (let i = 0; i < projets.length; i++) {
                const figure = document.createElement("figure");
                figure.id = projets[i].id;
                figure.categoryId = projets[i].categoryId;
                gallerie.appendChild(figure);
                const image = document.createElement("img");
                image.src = projets[i].imageUrl;
                figure.appendChild(image);
                const figcaption = document.createElement("figcaption");
                figcaption.innerText = projets[i].title;
                figure.appendChild(figcaption);
            }
        }
        projetsAffiches(projets);

        // Récupère les catégories pour le tri des projets
        fetch ("http://localhost:5678/api/categories")
        .then(function(reponse) {
            return reponse.json();
        })
        .then(function(categories) {
            let filtres = document.querySelector(".filtres");
            const bouton = document.createElement("input");
                filtres.appendChild(bouton);
                bouton.type = 'button';
                bouton.value = "Tous";
                bouton.id = 'btn-tous';
            for (let i = 0; i < categories.length; i++) {
                const bouton = document.createElement("input");
                filtres.appendChild(bouton);
                bouton.type = 'button';
                bouton.value = categories[i].name;
                bouton.id = `btn-${categories[i].id}`;
            }

            const boutonTous = document.getElementById("btn-tous");
            boutonTous.addEventListener("click", function () {
                const tous = projets.filter(function (projet) {
                    return projet.categoryId;
                });
                document.querySelector(".gallery").innerHTML = "";
                projetsAffiches(tous);
            });

            const boutonObjets = document.getElementById("btn-1");
            boutonObjets.addEventListener("click", function () {
                const objets = projets.filter(function (projet) {
                    return projet.categoryId === 1;
                });
                document.querySelector(".gallery").innerHTML = "";
                projetsAffiches(objets);
            });

            const boutonAppartements = document.getElementById("btn-2");
            boutonAppartements.addEventListener("click", function () {
                const appartements = projets.filter(function (projet) {
                    return projet.categoryId === 2;
                });
                document.querySelector(".gallery").innerHTML = "";
                projetsAffiches(appartements);
            });

            const boutonHotels = document.getElementById("btn-3");
            boutonHotels.addEventListener("click", function () {
                const hotels = projets.filter(function (projet) {
                    return projet.categoryId === 3;
                });
                document.querySelector(".gallery").innerHTML = "";
                projetsAffiches(hotels);
            });
        });
    });


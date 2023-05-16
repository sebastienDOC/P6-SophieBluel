export function afficherProjet(projets) {
    let gallerie = document.querySelector(".gallery");
    for (var i = 0; i < projets.length; i++) {
        const figure = document.createElement("figure");
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

export function creerBouton(categories) {
    let filtres = document.querySelector(".filtres");

    const boutonAll = document.createElement("input");
    filtres.appendChild(boutonAll);
    boutonAll.type = 'button';
    boutonAll.value = "Tous";
    boutonAll.id = 'btn-0';

    for (var i = 0; i < categories.length; i++) {
        const bouton = document.createElement("input");
        filtres.appendChild(bouton);
        bouton.type = 'button';
        bouton.value = categories[i].name;
        bouton.id = `btn-${categories[i].id}`;
    }
}

export function tri(projets) {
    const boutonTous = document.getElementById("btn-0");
    boutonTous.addEventListener("click", function () {
        const tous = projets.filter(function (projet) {
            return projet.categoryId;
        });
        document.querySelector(".gallery").innerHTML = "";
        afficherProjet(tous);
    });

    const boutonObjets = document.getElementById("btn-1");
    boutonObjets.addEventListener("click", function () {
        const objets = projets.filter(function (projet) {
            return projet.categoryId === 1;
        });
        document.querySelector(".gallery").innerHTML = "";
        afficherProjet(objets);
    });

    const boutonAppartements = document.getElementById("btn-2");
    boutonAppartements.addEventListener("click", function () {
        const appartements = projets.filter(function (projet) {
            return projet.categoryId === 2;
        });
        document.querySelector(".gallery").innerHTML = "";
        afficherProjet(appartements);
    });

    const boutonHotels = document.getElementById("btn-3");
    boutonHotels.addEventListener("click", function () {
        const hotels = projets.filter(function (projet) {
            return projet.categoryId === 3;
        });
        document.querySelector(".gallery").innerHTML = "";
        afficherProjet(hotels);
    });
}
// -------------------------------------------------------------

export function editionMode() {
    let userId = sessionStorage.getItem('userId');
    let token = sessionStorage.getItem('token');
    if (userId && token) {
        log.innerText = 'logout';
        let barre = document.getElementById('black_bar');
        barre.classList.remove('hide');
        barre.classList.toggle('appearFlex');
        let filtre = document.querySelector(".filtres");
        filtre.classList.toggle('hide');
        let gallery = document.querySelector(".gallery");
        gallery.style.margin = '70px 0 0 0';
        let modifier = document.querySelectorAll(".modifier");
        let modifs = Array.from(modifier);
        modifs.forEach(modif => {
            modif.classList.toggle('appear');
        });
    }
}

// -------------------------------------------------------------

export function updateImageDisplay() {
    let inputAvatar = document.getElementById('avatar')
    let preview = document.querySelector('.preview');
    while(preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    let files = inputAvatar.files;
    let list = document.createElement('ol');
    preview.appendChild(list);
    for(let i = 0; i < files.length; i++) {
        let listItem = document.createElement('li');
        let image = document.createElement('img');
        image.src = window.URL.createObjectURL(files[i]);
        listItem.appendChild(image);
        list.appendChild(listItem);
    }
}

// -------------------------------------------------------------

let modal = null

export function openModal(event) {
    event.preventDefault();
    const target = document.querySelector(event.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modale', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.modale-close').addEventListener('click', closeModal)
    modal.querySelector('.modale-stop').addEventListener('click', stopPropagation)
}

export function closeModal(event) {
    if (modal === null) return
    event.preventDefault()
    window.setTimeout(function () {
        modal.style.display = "none"
        modal = null
    }, 500)
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modale')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.modale-close').removeEventListener('click', closeModal)
    modal.querySelector('.modale-stop').removeEventListener('click', stopPropagation)
}

export function stopPropagation(event) {
    event.stopPropagation()
}

// -------------------------------------------------------------

export function afficherProjetModale(projets) {
    let gallerieModale = document.querySelector(".gallerie-modale");
    for (var i = 0; i < projets.length; i++) {
        const figure = document.createElement("figure");
        figure.id = projets[i].id;
        gallerieModale.appendChild(figure);
        const image = document.createElement("img");
        image.src = projets[i].imageUrl;
        figure.appendChild(image);
        const figcaption = document.createElement("figcaption");
        figcaption.innerText = "éditer";
        figure.appendChild(figcaption);
        const blackBgTrash = document.createElement("div");
        figure.appendChild(blackBgTrash);
        blackBgTrash.classList.add("black-bg-trash");
        const iconTrash = document.createElement("i")
        blackBgTrash.appendChild(iconTrash);
        iconTrash.classList.add("fa-solid", "fa-trash-can", "fa-2xs");
        const blackBgPosition = document.createElement("div");
        figure.appendChild(blackBgPosition);
        blackBgPosition.classList.add("black-bg-position");
        const iconPosition = document.createElement("i")
        blackBgPosition.appendChild(iconPosition);
        iconPosition.classList.add("fa-solid", "fa-up-down-left-right", "fa-2xs");
    }
}

export async function deleteProject(event) {
    event.preventDefault()
    
    let figure = event.target.closest("figure");
    const idFigure = figure.id;
    let token = sessionStorage.getItem("token");

    let urlDelete = `http://localhost:5678/api/works/${idFigure}`;
    await fetch(urlDelete, {
        method: "DELETE",
        headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
        },
    });
}

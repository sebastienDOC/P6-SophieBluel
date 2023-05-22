import { getData } from './fetch.js';

export function afficherProjet(projets) {
    let gallerie = document.querySelector(".gallery");
    projets.forEach(projet => {
        const figure = document.createElement("figure");
        figure.categoryId = projet.categoryId;
        gallerie.appendChild(figure);
        const image = document.createElement("img");
        image.src = projet.imageUrl;
        figure.appendChild(image);
        const figcaption = document.createElement("figcaption");
        figcaption.innerText = projet.title;
        figure.appendChild(figcaption);
    })
}

export function creerBouton(categories, projets) {
    let filtres = document.querySelector(".filtres");

    const boutonAll = document.createElement("input");
    filtres.appendChild(boutonAll);
    boutonAll.type = 'button';
    boutonAll.value = "Tous";
    boutonAll.id = 'btn-0';
    
    categories.forEach(categorie => {
        const bouton = document.createElement("input");
        filtres.appendChild(bouton);
        bouton.type = 'button';
        bouton.value = categorie.name;
        bouton.id = `btn-${categorie.id}`;
    })  
}

export function filtresTri(projets, categories){
    let btnTous = document.getElementById('btn-0')
    btnTous.addEventListener('click', function(){
        let btn = projets.filter(function (projet) {
            return projet.categoryId;                   
        })
        document.querySelector(".gallery").innerHTML = "";
        afficherProjet(btn);
    })

    for (let i = 1; i <= categories.length ; i++) {
        let getBtn = document.getElementById(`btn-${i}`)
        getBtn.addEventListener('click', function(){
            let btn = projets.filter(function (projet) {
                return projet.categoryId === i;                   
            })
            document.querySelector(".gallery").innerHTML = "";
            afficherProjet(btn);
        })
    }
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
        gallery.classList.add('gallery-modif');
        let modifier = document.querySelectorAll(".modifier");
        let modifs = Array.from(modifier);
        modifs.forEach(modif => {
            modif.classList.toggle('appear');
        });
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
    if (modal.querySelector('.modale-close') != null) {
        modal.querySelector('.modale-close').addEventListener('click', closeModal)
        modal.querySelector('.modale-stop').addEventListener('click', stopPropagation)
    }
    if (modal.querySelector('.modale-close-1') != null) {
        modal.querySelector('.modale-close-1').addEventListener('click', closeModal)
        modal.querySelector('.modale-close-2').addEventListener('click', closeModal)
        modal.querySelector('.modale-stop-1').addEventListener('click', stopPropagation)
        modal.querySelector('.modale-stop-2').addEventListener('click', stopPropagation)
    }
    modal.addEventListener('click', function() {
        document.getElementById('form').reset();
    })
}

export function closeModal(event) {
    event.preventDefault()
    let modale1 = document.getElementById('modale-1')
    let modale2 = document.getElementById('modale-2')
    if (modal === null) return
    window.setTimeout(function () {
        modal.style.display = "none"
        modal = null
    }, 500)
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modale')
    modal.removeEventListener('click', closeModal)
    modale2.classList.remove('anim-right')
    modale1.classList.remove('anim-left')
    if (modal.querySelector('.modale-close') != null) {
        modal.querySelector('.modale-close').removeEventListener('click', closeModal)
        modal.querySelector('.modale-stop').removeEventListener('click', stopPropagation)
    }
    if (modal.querySelector('.modale-close-1') != null) {
        modal.querySelector('.modale-close-1').removeEventListener('click', closeModal)
        modal.querySelector('.modale-close-2').removeEventListener('click', closeModal)
        modal.querySelector('.modale-stop-1').removeEventListener('click', stopPropagation)
        modal.querySelector('.modale-stop-2').removeEventListener('click', stopPropagation)
        modale1.classList.remove('hide');
        modale2.classList.add('hide');
    }
    
}

export function stopPropagation(event) {
    event.stopPropagation()
}

// -------------------------------------------------------------

export function afficherProjetModale(projets) {
    let gallerieModale = document.querySelector(".gallerie-modale");
    projets.forEach(projet => {
        const figure = document.createElement("figure");
        figure.id = projet.id;
        gallerieModale.appendChild(figure);
        const image = document.createElement("img");
        image.src = projet.imageUrl;
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
    })
}

// ---------------------------------------------------------------

let urlProjets = "http://localhost:5678/api/works";
let urlAdd = 'http://localhost:5678/api/works';

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
    figure.remove();
    addElements(urlProjets);
}

export async function addProject(event){
    event.preventDefault()
    let image = document.getElementById("add-projet").files;
    let title = document.getElementById("titre-modale-ajout").value;
    let categoryId = document.getElementById("categories").value;
    let token = sessionStorage.getItem("token");
    
    const formData = new FormData();
    formData.append("image", image[0]);
    formData.append("title", title);
    formData.append("category", categoryId);

    await fetch(urlAdd, {
        method: "POST",
        body: formData,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    addElements(urlAdd);
}

function addElements(url) {
    document.querySelector(".gallery").innerHTML = "";
    document.querySelector(".gallerie-modale").innerHTML = "";
    getData(url, projets => {
        afficherProjet(projets)
        afficherProjetModale(projets)

        document.querySelectorAll('.black-bg-trash').forEach(trash => {
            trash.addEventListener('click', deleteProject)
        })
    })
}

// --------------------------------------------------------------

let modale1 = document.getElementById('modale-1')
let modale2 = document.getElementById('modale-2')
export function navModal() {
    let addButton = document.getElementById('ajouter')
    addButton.addEventListener('click', modaleNext)
    let backButton = document.querySelector('.modale-back')
    backButton.addEventListener('click', modaleBefore)
}

function modaleNext() {
    modale1.classList.toggle('hide');
    modale2.classList.toggle('hide');
    modale2.classList.add('anim-right')
}
export function modaleBefore() {
    modale1.classList.toggle('hide');
    modale2.classList.toggle('hide');
    modale1.classList.add('anim-left')
}

// -------------------------------------------------------------

export function showPreview() {
    let addProjet = document.getElementById('add-projet')
    let preview = document.querySelector('.preview');
    while(preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    let files = addProjet.files;
    let list = document.createElement('ul');
    preview.appendChild(list);
    for(let i = 0; i < files.length; i++) {
        let listItem = document.createElement('li');
        let image = document.createElement('img');
        image.src = window.URL.createObjectURL(files[i]);
        listItem.appendChild(image);
        list.appendChild(listItem);
    }
}

//----------------------------------------------------------------

export function logout() {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token');
}
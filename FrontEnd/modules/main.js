import { getData } from './fetch.js';
import { afficherProjet, creerBouton, tri } from './fonctions.js';

let urlProjets = "http://localhost:5678/api/works";
let urlCategories = "http://localhost:5678/api/categories";

getData(urlProjets, projets => {
    afficherProjet(projets)

    getData(urlCategories, categories => {
        creerBouton(categories)
        tri(projets);
    })
})

// -------------------------------------------------------------------------

let log = document.getElementById('log');
log.addEventListener('click', function() {
    window.location = "./login.html"
})

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

// ----------------------------------------------------------------------------

let modal = null

const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modale', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.modale-close').addEventListener('click', closeModal)
    modal.querySelector('.modale-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
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

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.modifier').forEach(a => {
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal(e)
    }
})

// ------------------------------------------------------------------------


let inputAvatar = document.getElementById('avatar')
inputAvatar.addEventListener('change', updateImageDisplay);

function updateImageDisplay() {
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

let changeImage = function (event) {
    let imageProfil = document.getElementById('photo-profil');
    imageProfil.src = URL.createObjectURL(event.target.files[0]);
};

let check = document.getElementById('check');
check.addEventListener('click', changeImage);
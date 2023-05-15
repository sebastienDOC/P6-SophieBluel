import { getData } from './fetch.js';
import { afficherProjet, creerBouton, tri, editionMode, afficherProjetModale, updateImageDisplay, deleteProject, openModal, closeModal, stopPropagation } from './fonctions.js';

//Affichage des projets et des filtres dans la gallerie
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

// Login
let log = document.getElementById('log');
log.addEventListener('click', function() {
    window.location = "./login.html"
})

editionMode();

// ----------------------------------------------------------------------------

// Modales
document.querySelectorAll('.modifier').forEach(a => {
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
        closeModal(event)
    }
})

// ------------------------------------------------------------------------

// Aperçu changement image personnelle modale 
let inputAvatar = document.getElementById('avatar');
inputAvatar.addEventListener('change', updateImageDisplay);

// ---------------------------------------------------------------------------

// Gallerie modale
getData(urlProjets, projets => {
    afficherProjetModale(projets)
})

//Suppression d'un projet modale
window.onload = function () {
    const trashes = document.querySelectorAll('.black-bg-trash');
    let trash = Array.from(trashes);
    for (let i = 0 ; i < trash.length; i++) {
        trash[i].addEventListener('click', deleteProject)
     }
}
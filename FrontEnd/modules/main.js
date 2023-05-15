import { getData } from './fetch.js';
import { afficherProjet, creerBouton, tri, editionMode, afficherProjetModale, updateImageDisplay, deleteProject, openModal, closeModal } from './fonctions.js';

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

window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal(e)
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

// Suppression d'un projet modale
let gallerieModale = document.querySelector(".gallerie-modale");
gallerieModale.addEventListener('click', deleteProject);
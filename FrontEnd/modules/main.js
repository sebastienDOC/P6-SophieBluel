import { getData } from './fetch.js';
import { afficherProjet, creerBouton, tri, editionMode, afficherProjetModale, showPreview, deleteProject, addProject, openModal, closeModal, navModal, modaleBefore, logout } from './fonctions.js';

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

// Mode édition
editionMode();

// Logout
log.addEventListener('click', function() {
    if (log.innerHTML === 'logout') {
        logout();
        window.location = "./index.html";
    }
})

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

// Aperçu ajout projet
let addProjet = document.getElementById('add-projet');
addProjet.addEventListener('change', showPreview);

// ---------------------------------------------------------------------------

// Gallerie modale
getData(urlProjets, projets => {
    afficherProjetModale(projets)

    // Navigation modale ajout photo
    navModal();
    
    // Ajout d'un projet dans la modale
    document.querySelector('#upload').addEventListener('click', addProject)
    document.querySelector('#upload').addEventListener('click', modaleBefore)

    // Suppression d'un projet dans la modale
    document.querySelectorAll('.black-bg-trash').forEach(trash => {
        trash.addEventListener('click', deleteProject)
    })
})

// -----------------------------------------------------------------------------
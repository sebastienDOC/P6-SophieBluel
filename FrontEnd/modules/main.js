import { getData } from './fetch.js';
import { afficherProjet, creerBouton, tri } from './fonctions.js';

let urlProjets = "http://localhost:5678/api/works";
let urlCategories = "http://localhost:5678/api/categories";

getData(urlProjets, projets => {
    afficherProjet(projets)
    let projetsData = projets;

    getData(urlCategories, categories => {
        creerBouton(categories)
        let categoriesData = categories;
        tri(projets);
    })
})

// -------------------------------------------------------------------------

let userId = sessionStorage.getItem('userId');
let token = sessionStorage.getItem('token');
if (userId && token) {
    let log = document.getElementById('log');
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
import { getData } from './fetch.js';
import { afficherProjet, creerBouton, tri } from './fonctions.js';

let urlProjets = "http://localhost:5678/api/works";
let urlCategories = "http://localhost:5678/api/categories";

getData(urlProjets, projets => {
    afficherProjet(projets)
    let projetsData = projets;
    console.log("Projets : ", projetsData);

    getData(urlCategories, categories => {
        creerBouton(categories)
        let categoriesData = categories;
        console.log("Catégories : ", categoriesData);
        tri(projets);
    })
})

// -------------------------------------------------------------------------

let userId = sessionStorage.getItem('userId');
let token = sessionStorage.getItem('token');
console.log('UserId :', userId);
console.log('Token :', token);
if (userId == 1) {
    let log = document.getElementById('log');
    log.innerText = 'logout';
    let barre = document.getElementById('black_bar');
    barre.style.opacity = 1;
    let h1 = document.getElementById('h1');
    h1.style.margin = '50px 0 0 0';
    let nav = document.getElementById('nav');
    nav.style.margin = '50px 0 0 0';
    let filtre = document.querySelector(".filtres");
    filtre.style.display = 'none';
    let gallery = document.querySelector(".gallery");
    gallery.style.margin = '70px 0 0 0';
    let modifier = document.getElementsByClassName("modifier");
    modifier[0].style.opacity = 1;
    modifier[1].style.opacity = 1;
}
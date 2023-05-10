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

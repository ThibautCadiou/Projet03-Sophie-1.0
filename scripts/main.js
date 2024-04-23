import { genererProjets } from "/scripts/gallerie.js";

// ******** Main ********
genererProjets(); // pour générer la page de base

// ******** Login ********
let boutonLogin = document.querySelector(".login");
let boutonProjet = document.querySelector(".projets");

let baliseProjet = document.querySelector("#affichage-projets");
let baliseLogin = document.querySelector("#affichage-login");

let baliseModifier = document.querySelector(".modifier");

baliseLogin.style.display = "none"; // pour éviter la présence de login au chargement de la page initial

/**
 * Affichage de la page de login au click suivant l'état connecté ou deconnecté
 */
function pageLogin() {
    boutonLogin.addEventListener("click", () => {
        if (boutonLogin.innerText === "logout") {
            // alert("Vous avez été déconnecté");
            afficherPageAccueil();
            boutonLogin.innerText = "login";
            localStorage.removeItem("token");
            console.log("fin de la deconnection");
            baliseModifier.style.display = "none";
        } else {
            afficherPageLogin();
            console.log("affichage de la page login car on est deconnecté");
        }
    });
}

/**
 * Affichage de la page login
 */
function afficherPageLogin() {
    boutonLogin.style.fontWeight = "800";
    boutonProjet.style.fontWeight = "400";
    baliseLogin.style.display = "block";
    baliseProjet.style.display = "none";
}

/**
 * Affihage de la page d'accueil sur click du bouton projet
 */
function pageAccueil() {
    boutonProjet.addEventListener("click", (event) => {
        afficherPageAccueil();
    });
}

/**
 * Affichage de la page d'accueil
 */
function afficherPageAccueil() {
    boutonLogin.style.fontWeight = "400";
    boutonProjet.style.fontWeight = "800";

    baliseLogin.style.display = "none";
    baliseProjet.style.display = "block";
}
/**
 * Redirection vers la page d'accueil en, fnction de la validation ou  de l'invalidation a la connexion
 */
function redirectionAccueil() {
    boutonLogin.style.fontWeight = "400";
    boutonProjet.style.fontWeight = "800";

    baliseLogin.style.display = "none";
    baliseProjet.style.display = "block";
}

// partie champs
let baliseFormulaire = document.querySelector("#formulaire");

baliseFormulaire.addEventListener("submit", async (event) => {
    event.preventDefault();
    let connexionStatus = false;

    let baliseMail = document.querySelector("#login-email");
    let balisePassword = document.querySelector("#password");
    let mailValue = baliseMail.value;
    let passwordValue = balisePassword.value;

    try {
        const loginPath = "http://localhost:5678/api/users/login";
        const objetLogin = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: mailValue,
                password: passwordValue,
            }),
        };

        const reponse = await fetch(loginPath, objetLogin);
        const tokenResponse = await reponse.json();

        console.log(tokenResponse.token);
        window.localStorage.setItem("token", tokenResponse.token);

        if (reponse.status !== 200) {
            connexionStatus = false;
            alert("Couple E-mail / Mot de passe invalid");
        } else {
            connexionStatus = true;
            alert("connexion réussi - redirection vers la page d'accueil");
            redirectionAccueil();
            boutonLogin.innerText = "logout";
            baliseModifier.style.display = "flex";
        }
    } catch (error) {
        console.log(error);
    }

    return connexionStatus;
});

pageAccueil();
pageLogin();

// partie champs

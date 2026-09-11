// Le jeu tient en deux nombres : celui à trouver et le compte des essais.
// Tout le reste est de l'affichage.
const MIN = 0;
const MAX = 100;

let nombreSecret = 0;
let essais = 0;

const formulaire = document.getElementById("formulaire");
const champ = document.getElementById("txtNombre");
const boutonVerifier = document.getElementById("btnGo");
const erreur = document.getElementById("error");
const info = document.getElementById("info");

// Entier aléatoire entre min et max, bornes comprises.
function genererNbAleatoire(min, max) {
  const nb = min + (max - min + 1) * Math.random();
  return Math.floor(nb);
}

function afficher(messageErreur, messageInfo) {
  erreur.textContent = messageErreur;
  info.textContent = messageInfo;
}

function reinitialiser() {
  nombreSecret = genererNbAleatoire(MIN, MAX);
  essais = 0;
  champ.value = "";
  champ.disabled = false;
  boutonVerifier.disabled = false;
  afficher("", "");
  champ.focus();
}

// Le champ est de type number, mais une valeur vide, décimale ou hors bornes
// reste possible : on refuse avant de compter l'essai.
function lireSaisie() {
  const brut = champ.value.trim();
  const valeur = Number(brut);

  if (brut === "" || !Number.isInteger(valeur) || valeur < MIN || valeur > MAX) {
    return null;
  }
  return valeur;
}

function verifier(evenement) {
  evenement.preventDefault();

  const proposition = lireSaisie();
  if (proposition === null) {
    afficher(`Entrez un nombre entier entre ${MIN} et ${MAX}.`, "");
    return;
  }

  essais += 1;

  if (proposition < nombreSecret) {
    afficher("Le nombre est trop petit", "");
  } else if (proposition > nombreSecret) {
    afficher("Le nombre est trop grand", "");
  } else {
    afficher("", `Nombre trouvé en ${essais} essai${essais > 1 ? "s" : ""}`);
    champ.disabled = true;
    boutonVerifier.disabled = true;
  }
}

// Ne touche qu'à la ligne d'information : l'indice « trop petit » ou « trop
// grand » reste visible pendant qu'on consulte le compteur.
function afficherEssais() {
  info.textContent = `Vous êtes maintenant rendu à ${essais} essai${essais > 1 ? "s" : ""}`;
}

formulaire.addEventListener("submit", verifier);
document.getElementById("btnReset").addEventListener("click", reinitialiser);
document.getElementById("btnNbEssais").addEventListener("click", afficherEssais);

reinitialiser();

function editNav() {
  const x = document.getElementById("myTopnav");
  x.className = x.className === "topnav" ? "topnav responsive" : "topnav";
}


// Récupération des éléments du DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn"); //ouverture modal
const modalCloseBtn = document.querySelector(".close"); //fermeture modal
const navBtn = document.querySelectorAll(".main-navbar a"); //navigation
//formulaire
const form = document.getElementById('reserve');
const confirmationMessage = document.getElementById('confirmationMessage');
const closeConfirmationBtn = document.getElementById('closeConfirmationBtn');
const confirmationBox = document.getElementById('confirmationMessage');
//barre timer message de confiramtion
const ProgressBar = document.getElementById('progressBar');


function linkActive(event) {
  // Boucle sur tous les liens de navigation pour retirer la classe 'active'
  for(let link of navBtn) {
    link.classList.remove('active'); // Retire la classe 'active' sur tous les liens
  }

  event.currentTarget.classList.add('active'); // Ajoute la classe 'active' sur le lien cliqué
}

navBtn.forEach(link => { // Pour chaque lien de navigation
  link.addEventListener('click', linkActive); // Ajoute un écouteur d'événement 'click' qui appelle la fonction linkActive
});


// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// Close modal event
modalCloseBtn.addEventListener("click", closeModal);


// Ouverture modal
function launchModal() {
  clearErrors(); //on appelle la fonction clearErrors pour réinitialiser les messages d'erreurs
  modalbg.classList.remove('closing'); //on retire la classe animation closing
  modalbg.classList.remove('close'); //on retire la classe animation closing
  modalbg.classList.add('open'); //on ajoute la classe animation open
  modalbg.style.display = "block"; //on affiche le modal
}

// Fonction pour la barre de progression
function makeProgress(){
  //boucle de 0 a 100
  if (i < 100) {
    i = i + 1; //incrémentation de 1
    $(".confirmation-message").css("display", "flex"); //affichage de la boite de confirmation
    $(".progressBar").css("width", i + "%").text(i + " %"); //augmentation de la largeur de la barre de progression a chaque passage
    setTimeout(makeProgress, 20); //délai de 20ms, 20ms*100 = 2s
  } else {
    $(".confirmation-message").css("display", "none"); //on cache la boite de confirmation
    form.reset(); // Réinitialise le formulaire
    // setTimeout(closeModal, 100); // Ferme le modal après un délai
  }
}

function showConfirmationMessage() {
  i = 0; //on initialise la barre de progression a 0
  makeProgress(); //on lance la fonction de progression
}

// Fonction pour fermer le modal
function closeModal() {
  modalbg.classList.remove('open'); //on retire la classe animation open
  modalbg.classList.add('closing'); //on ajoute la classe animation closing

  // Fermeture du modal après l'animation
  modalbg.addEventListener('animationend', () => { //on écoute l'événement animationend
    modalbg.style.display = 'none'; //on cache le modal
    modalbg.classList.remove('closing'); //on retire la classe animation closing
    modalbg.classList.add('close'); //on ajoute la classe animation close
  }, { once: true }); //on retire l'écouteur d'événement après l'animation
}

// Reinitalisation des messages d'erreurs
function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => el.textContent = ''); //on vide les messages d'erreurs
  document.querySelectorAll('.text-control').forEach(el => el.classList.remove('text-control-error')); //on retire la classe text-control-error
}

// Validation des champs nom et prenom du formulaire
function validateField(field, minLength, errorElementId, message) {
  const errorElement = document.getElementById(errorElementId); //on récupère l'élément d'erreur
  if (!errorElement) return false; //si l'élément n'existe pas, on sort de la fonction
  
  if (field.value.length < minLength) { //si la longueur du champ est inférieure à minLength alors...
    errorElement.textContent = message; //on affiche le message d'erreur
    field.classList.add('text-control-error'); //on ajoute la classe text-control-error
    field.focus(); //on met le focus sur le champ
    // return false; //on retourne false
  } else { //sinon...
    field.classList.remove('text-control-error'); //on retire la classe text-control-error
  }
  return true; //on retourne true
}

function validateEmail(emailField, errorElementId) { //fonction de validation de l'email
  const errorElement = document.getElementById(errorElementId); //on récupère l'élément d'erreur
  if (!errorElement) return false; //si l'élément n'existe pas, on sort de la fonction

  const regex = new RegExp("[a-z0-9.-_]+@[a-z]+\\.[a-z]+"); //regex pour valider l'email
  if (!regex.test(emailField.value)) { //si l'email ne correspond pas à la regex alors...
    errorElement.textContent = 'Veuillez entrer une addresse mail valide.'; //on affiche le message d'erreur
    emailField.classList.add('text-control-error');  //on ajoute la classe text-control-error
    emailField.focus(); //on met le focus sur le champ
    // return false; //on retourne false
  } else { //sinon...
    emailField.classList.remove('text-control-error'); //on retire la classe text-control-error
  }
  return true; //on retourne true
}

function validateDate(dateField, errorElementId) { //fonction de validation de la date
  const errorElement = document.getElementById(errorElementId); //on récupère l'élément d'erreur
  if (!errorElement) return false; //si l'élément n'existe pas, on sort de la fonction

  if (dateField.value === "") { //si le champ est vide alors...
    errorElement.textContent = 'Veuillez entrer votre date de naissance.'; //on affiche le message d'erreur
    dateField.classList.add('text-control-error'); //on ajoute la classe text-control-error
    dateField.focus(); //on met le focus sur le champ
    // return false; //on retourne false
  } else {
    dateField.classList.remove('text-control-error'); //on retire la classe text-control-error
  }
  return true; //on retourne true
}

function validateQuantity(quantityField, errorElementId) { //fonction de validation de la quantité
  const errorElement = document.getElementById(errorElementId); //on récupère l'élément d'erreur
  if (!errorElement) return false; //si l'élément n'existe pas, on sort de la fonction

  if (isNaN(quantityField.value) || quantityField.value === "") { //si la quantité n'est pas un nombre ou est vide alors...
    errorElement.textContent = 'Veuillez entrez un nombre.'; //on affiche le message d'erreur
    quantityField.classList.add('text-control-error'); //on ajoute la classe text-control-error
    quantityField.focus(); //on met le focus sur le champ
    // return false; //on retourne false
  } else {
    quantityField.classList.remove('text-control-error'); //on retire la classe text-control-error
  }
  return true; //on retourne true
}

function validateLocation() {
  const errorElement = document.getElementById('location-error'); //on récupère l'élément d'erreur
  if (!errorElement) return false; //si l'élément n'existe pas, on sort de la fonction

  const locations = document.querySelectorAll('input[name="location"]'); //on récupère les éléments de type radio
  for (const location of locations) { //pour chaque élément...
    if (location.checked) { //si l'élément est coché alors...
      return true; //on retourne true
    }
  }
  errorElement.textContent = 'Choisissez une ville.'; //on affiche le message d'erreur
  // return false; //on retourne false
}

function validateConditions(conditionsField, errorElementId) { //fonction de validation des conditions
  const errorElement = document.getElementById(errorElementId); //on récupère l'élément d'erreur
  if (!errorElement) return false; //si l'élément n'existe pas, on sort de la fonction

  if (!conditionsField.checked) { //si les conditions ne sont pas acceptées alors...
    errorElement.textContent = 'Vous devez accepter les conditions d\'utilisation.'; //on affiche le message d'erreur
    // return false; //on retourne false
  }
  return true; //on retourne true
}


// Form submission event
form.addEventListener('submit', (event) => { //on écoute l'événement submit du formulaire
  event.preventDefault(); //on empêche l'envoi du formulaire

  clearErrors(); //on appelle la fonction clearErrors pour réinitialiser les messages d'erreurs

  //on appelle la fonction validateField pour chaque champ
  const isFormValid = 
    //on vérifie le champ nom et le prenom, au moins 2 caractères
    
    validateField(document.getElementById('prenom'), 2, 'prenom-error', '2 caractères minimum pour le champ prénom.') &&
    validateField(document.getElementById('nom'), 2, 'nom-error', '2 caractères minimum pour le champ nom.') &&
    //on appelle la fonction validateEmail
    validateEmail(document.getElementById('email'), 'email-error') && 
    //on appelle la fonction validateDate
    validateDate(document.getElementById('birthdate'), 'birthdate-error') && 
    //on appelle la fonction validateQuantity
    validateQuantity(document.getElementById('quantity'), 'quantity-error') && 
    //on appelle la fonction validateLocation
    validateLocation() && 
    //on appelle la fonction validateConditions
    validateConditions(document.getElementById('checkbox1'), 'conditions-error'); 

  if (isFormValid) {
    closeModal(); //on appelle la fonction closeModal
    showConfirmationMessage(); //on appelle la fonction showConfirmationMessage
  }
});




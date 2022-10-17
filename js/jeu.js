//----------------------------------------------//
//--- Variables nécéssaires au jeu de mémory ---//
//----------------------------------------------//

// cartes du jeu => départ vide
let contenu_cartes = [];
// listes des cartes retounées (max 2)
let cartes_retournees = [];
// récupération des données des cartes "img" dans le tableau "cards"
let img_cartes = document.getElementById("cartes").getElementsByTagName("img");


//---------------------------------------------------//
//--- Variables nécéssaires au chronomètre du jeu ---//
//---------------------------------------------------//
// récupération de chrono
let chrono = document.getElementById("chrono");
let minutes = 0;
let secondes = 0;
let chronoEstArrete =  true;
let timeout;


//-------------------------------------------------------------//
//--- Variables nécéssaires à la création du plateau de jeu ---//
//-------------------------------------------------------------//
// récupération des buttons
let btn3 = document.getElementById("paires3");
let btn6 = document.getElementById("paires6");
let btn8 = document.getElementById("paires8");
let btn10 = document.getElementById("paires10");
let btn12 = document.getElementById("paires12");
let btn15 = document.getElementById("paires15");
let btn18 = document.getElementById("paires18");
// écoute de l'évènement click
btn3.addEventListener("click", function(){creationPlateau(2, 3)});
btn6.addEventListener("click", function(){creationPlateau(3, 4)});
btn8.addEventListener("click", function(){creationPlateau(4, 4)});
btn10.addEventListener("click", function(){creationPlateau(4, 5)});
btn12.addEventListener("click", function(){creationPlateau(4, 6)});
btn15.addEventListener("click", function(){creationPlateau(5, 6)});
btn18.addEventListener("click", function(){creationPlateau(4, 9)});


//-----------------//
//--- Fonctions ---//
//-----------------//


// fonction permettant de calculer de ùamnière aléatoire un nombre entre 1 et Nb
function nb_aleatoire(nb){
  //Génération aléatoire d'un nombre entre 1 et nb
    // la fonctin floor() renvoie le plus gra,nd entier qui est inférieur ou égal à un nombre x
    // la fonction random() renvoie un floattant pseudo-aléatoir compris dans l'intervalle [0,1[
  var nombre = Math.floor(Math.random() * nb);
  //on retour le resultat
  return nombre;
}

function initialiseJeu(nbCartes){
  // réinitialisation
  score = 0;
  let scoreMax = document.getElementById("scoreMax");
  console.log(scoreMax);
  scoreMax.innerHTML = nbCartes/2;
  // création des cartes nécéssaire à la partie
  let numero_cartes = [];
  for (let i = 0 ; i<(nbCartes/2) ; i++){
    numero_cartes.push(i);
    numero_cartes.push(i);
  }

  // initialisation et remplissage du tableau d'états des cartes.
  // Etat ds cartes = par défaut elles sont retournées
  // retournée = 0
  // visible = 1
  // les cartes des paires déjà trouvées seront à -1
  etats_des_cartes = [];
  for (let i = 0 ; i<nbCartes ; i++){
    etats_des_cartes.push(0);
  }

  // On boucle sur chaque cartes pour attribuer un numéro et la fonction de gestion en cas de click
  for(var i=0 ; i<img_cartes.length; i++)
  {
    // ajout de la propriété num_carte à l'objet img
    img_cartes[i].num_carte = i;
    // ajout pour la carte de l'appel à la fonction de contrôle en cas de clic
    img_cartes[i].onclick = function(){controlJeu(this.num_carte, nbCartes);};
  }

  contenu_cartes = [];
  clearTimeout(timeout);
  secondes=0;
  minutes=0;

  var nb_total_cartes = numero_cartes.length;
  // pour mémoriser les places des cartes déjà mises
  var cartes_deja_mise = [];
  // pour le nb aléatoires
  var choix ;
  // todo on peu surement améliorer l'algo
  // pour chaque cartes, prendres une position au hasard dans le tableau
  // en vérifiant que nous ne l'avons pas déjà utilisée
  for(var i=0 ; i<nb_total_cartes ; i++){
    // on effectue un choix au hasard
    choix = nb_aleatoire(nb_total_cartes);
    // tant que cet place a déjà été pris, on refait un tirage au sort
    while(cartes_deja_mise.includes(choix)){
      choix = nb_aleatoire(nb_total_cartes);
    }
    // on a trouvé une nouvelle place => on mémorise la carte et sa palce
    contenu_cartes.push(numero_cartes[choix]);
    cartes_deja_mise.push(choix);
  }

  for (var i=0 ; i<img_cartes.length ; i++){
    img_cartes[i].src="../images/back.png";
    img_cartes[i].style.border="";
  }

  // mise à 0 du chrono est démarrage
  chronoEstArrete = false;
  demarrerTemps();
}

function maj_affichage(num_carte){
  // fonction de mise à jour d'une carte défini par son numéro
  // retournée = 0
  // visible = 1
  // trouvé = -1
  switch(etats_des_cartes[num_carte]){
    case 0: // on affiche le verso de la carte (dos)
            img_cartes[num_carte].src = "../images/back.png";
            break;
    case 1: // on affiche la face de la carte 
            img_cartes[num_carte].src = "../images/card/card-"+contenu_cartes[num_carte]+".png";
            break;
    case -1: // on laisse visible les paires trouvé et on ajoute un border
            img_cartes[num_carte].src = "../images/card/card-"+contenu_cartes[num_carte]+".png";
            img_cartes[num_carte].style.border="1px solid green";
             
            // on masque la carte trouver 
            // img_cartes[num_carte].style.visibility="hidden";
            break;
  }
}

function perdu(){
  // Message de félicitation aprè sune courte pause
  alert("c'est PERDU !!!");
  rejouer();
}

function gagne(){
  // On affiche le feu d'artifice partout (en réafichant les cartes)
  setTimeout(function(){
    // Message de félicitation aprè sune courte pause
    alert("c'est gagné !!!");
    // On recharge une partie après click sur OK
    rejouer();
  }, 700);
  for (var i=0 ; i<img_cartes.length ; i++){
    img_cartes[i].style.border="";
    img_cartes[i].src="../images/win.jpg";
  }
  // On arret le chrono
  chronoEstArrete = true;

  postScore(parseInt(minutes)*60 + parseInt(secondes));
}

function maj_score(score){
  var element = document.getElementById("score");
  element.textContent = score;
}

// function permettant de terminer la partie et de rejouer
function rejouer(){
  //location.reload()
  maj_score(0);
  let scoreMax = document.getElementById("scoreMax");
  console.log(scoreMax);
  scoreMax.innerHTML = "?";
  effacerPlateau(); 
}

function controlJeu(num_carte, nbCartes){
  // Si on a mois de 2 cartes retournée (sinon le programme attend le setTimeout)
  // On a donc aucune carte retorunée ou une seule
  if (cartes_retournees.length<2)
  {
    // cas la cerat cliqué était bien retournée
    // (il ne se passe rien si on clique sur une carte déjà retrounée)
    if (etats_des_cartes[num_carte] === 0)
    {
      etats_des_cartes[num_carte] = 1;
      // on ajoute la carte à la liste des cartes retournées
      cartes_retournees.push(num_carte);
      maj_affichage(num_carte);
    }

    if(cartes_retournees.length===2){
      //variable pour gérer le réaffichage des cartes si pair trouvée
      var nouvel_etat=0;
      if (contenu_cartes[cartes_retournees[0]]===contenu_cartes[cartes_retournees[1]])
      {
        // une paire a été trouvée => on change l'état
        // => carte non visible
        // => score augmente 
        nouvel_etat = -1;
        score++;
        maj_score(score);
      }
      // on change l'état des cartes si nécéssaire
      etats_des_cartes[cartes_retournees[0]]= nouvel_etat;
      etats_des_cartes[cartes_retournees[1]]= nouvel_etat;

      // On attend  700ms avant de gérer le retournement des cartes
      setTimeout(function(){
        // une fois l'attente effectué, on gères les deux cartes
        // retournée et on les sorts du paquet des retournées
        maj_affichage(cartes_retournees[0]);
        maj_affichage(cartes_retournees[1]);
        cartes_retournees=[];
        if(score === (nbCartes/2)){
          // si on a atteint le score maxi (6 paires)
          // => on fini le partie et on rejoue
          gagne();
        }
      }, 700);
    }
  }
}

function demarrerTemps(){

  if (chronoEstArrete) return; 

  // on convertie nos données en chiffre pour éviter toutes erreures
  minutes = parseInt(minutes);
  secondes = parseInt(secondes);

  secondes++;

  if (secondes === 60){
    minutes++;
    secondes = 0;
  }

  //--- affichage ---//
  // on veut toujours deux chiffres en affichage
  if(secondes < 10){
    secondes = "0" + secondes;
  }

  if(minutes < 10){
    minutes = "0" + minutes;
  }

  // le chrono nous coup à 2 minute et 0 seconde
  if((minutes === "02") && (secondes === "01")){
    perdu();
  }

  // affichage dans le dom
  chrono.textContent = `${minutes}min ${secondes}s`

  timeout = setTimeout(demarrerTemps, 1000);
}

function effacerPlateau(){
  let parent = document.getElementById("cartes");
  //suppression de tous les enfants.
  parent.innerHTML='';
}

function creationPlateau(lignes, colonnes){

  let parent = document.getElementById("cartes");
  //suppression de tous les enfants.
  effacerPlateau();

  for(var i=0 ; i<lignes; i++)
  {
    // créer une ligne
    var nouvelleLigne = document.createElement("tr");
    //créer les colonnes
    for(var j=0 ; j<colonnes; j++)
      {
        // créer une colonne
        var nouvelleColonne = document.createElement("td");

        // créer une img
        var nouvelleImg = document.createElement("img");
        // ajouter une class
        nouvelleImg.classList.add("back");
        nouvelleImg.src="../images/back.png";
        nouvelleImg.alt="verso de la carte";
        

        // ajouter l'img dans le colonne
        var imgAjoute = nouvelleColonne.appendChild(nouvelleImg);

        // ajouter la colonne dans la ligne
        var colonneAjoute = nouvelleLigne.appendChild(nouvelleColonne);
      }
    // l'ajouter dans le dom
    var ligneAjoute = parent.appendChild(nouvelleLigne);
  }

  nbCartes = lignes * colonnes;
  initialiseJeu(nbCartes);
}

// récupération et affichahge du meilleur score de la base de donnée
function recupBDD(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let results =  JSON.parse(this.responseText);
      if(results.length>0){
        document.getElementById("time").innerHTML = majTiming(results[0].score);
      }
    }
  };

  xhttp.open("GET", "../api/leaderboard.php", true);
  xhttp.send();
}

function majTiming(time){
  // trouver les minutes
  let minutes = Math.trunc(time/60);
  // trouver les secondes
  let secondes = time%60;
  return minutes + " min " + secondes + " s ! ";
}

// envoye d'un nouveau score en base de donnée
function postScore(scoreValue) {
  var paramObj = { score: scoreValue };
  var params = Object.keys(paramObj).map(
    function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(paramObj[k]) }
  ).join('&');

  var xhr = new XMLHttpRequest();
  xhr.open('POST', "../api/leaderboard.php");
  xhr.onreadystatechange = function() {
    if (xhr.readyState>3 && xhr.status==200) { 
      recupBDD();
    }
  };
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);
  return xhr;
}

recupBDD();

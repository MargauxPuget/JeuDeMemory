//----------------------------------------------//
//--- Variables nécéssaires au jeu de mémory ---//
//----------------------------------------------//

// ensemble des numéros des cartes
let numero_cartes = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
//let numero_cartes = ["abricot", "abricot", "banane", "banane", "brugnion", "brugnion", "cerise-jaune", "cerise-jaune", "cerise-rouge", "cerise-rouge", "citron-jaune", "citron-jaune"];
// cartes du jeu => départ vide
let contenu_cartes = [];
// Etat ds cartes = par défaut elles sont retournées
// retournée = 0
// visible = 1
// les cartes des paires déjà trouvées seront à -1
let etats_des_cartes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// listes des cartes retounées (max 2)
let cartes_retournees = [];
// Nb de pair trouvées
let score = 0;

// récupération des données des cartes "img" dans le tableau "cards"
let img_cartes = document.getElementById("cartes").getElementsByTagName("img");
// On boucle sur chaque cartes pour attribuer un numéro et la fonction de gestion en cas de click
for(var i=0 ; i<img_cartes.length; i++)
{
  // ajout de la propriété num_carte à l'objet img
  img_cartes[i].num_carte = i;
  // ajout pour la carte de l'appel à la fonction de contrôle en cas de clic
  img_cartes[i].onclick = function(){controlJeu(this.num_carte);};
}


//------------------//
//--- Fonctiones ---//
//------------------//


// fonction permettant de calculer de ùamnière aléatoire un nombre entre 1 et Nb
function nb_aleatoire(nb){
  //Génération aléatoire d'un nombre entre 1 et nb
    // la fonctin floor() renvoie le plus gra,nd entier qui est inférieur ou égal à un nombre x
    // la fonction random() renvoie un floattant pseudo-aléatoir compris dans l'intervalle [0,1[
  var nombre = Math.floor(Math.random() * nb);
  //on retour le resultat
  return nombre;
}

function initialiseJeu(){

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

// function permettant de terminer la partie et de rejouer
function rejouer(){
  // On affiche le feu d'artifice partout (en réafichant les cartes)
  setTimeout(function(){
    // Message de félicitation aprè sune courte pause
    alert("c'est gagné !!!");
    // On recharge une partie après click sur OK
    location.reload()
  }, 700);
  for (var i=0 ; i<img_cartes.length ; i++){
    img_cartes[i].style.border="";
    img_cartes[i].src="../images/win.jpg";
  }
}

function controlJeu(num_carte){
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
        if(score === 6){
          // si on a atteint le score maxi (6 paires)
          // => on fini le partie et on rejoue
          rejouer();
        }
      }, 700);
    }
  }
}


initialiseJeu();

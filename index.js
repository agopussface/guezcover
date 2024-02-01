// Mise en place de express
const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;
// Donner l'accès aux fichiers static pour express
app.use(express.static("html"));
app.use(express.static("css"));

// Mise en place de body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Déclaration des variables globales
let nbPlayer = 0;
let countPlayer = 0;

app.get("/", (req, res) => {
  res.redirect("/newgame.html");
});

/* Route defgame - Paramêtres gnéraux de la partie
 * Inscrit le nombre de joueurs dans une variable globale "nbPlayer"
 * Affiche le nombre de joueurs dans la console
 * Redirige vers newplayer
 */
app.get("/defgame", (req, res) => {
  nbPlayer = req.query.inpPlayer;
  console.log("np " + nbPlayer);
  res.redirect("/newplayer");
});

/* Route newplayer - Création du profil joueurs
 * Incrémente countPlayeré
 * Redirige vers newplayer.html tant qu'il y'a des joueurs à créer (countPlayer < nbPlayer)
 * /Crée une session pour chaque nouveau joueurs, un par un)
 * Stocker countPlayer dans un cookie
 */
app.get("/newplayer", (req, res) => {
  countPlayer++;
  if (countPlayer <= nbPlayer) {
    res.cookie('countPlayer', countPlayer); 
    res.redirect("/newplayer.html");
  } else {
    res.redirect("/game");
  }
  console.log("cp " + countPlayer);
});


/* Route game
 * Affiche le jeu
 */
app.get("/game", (req, res) => {
  res.send("Game");
});

app.listen(port, () => {
  console.log(
    `L'application est en cours d'exécution sur http://localhost:${port}`
  );
});

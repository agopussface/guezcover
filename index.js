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
let nbPlayer;
let countPlayer = 0;

app.get("/", (req, res) => {
  res.redirect("/newgame.html");
});

/* Route defgame
 * Inscrit le nombre de joueurs dans une variable globale "nbPlayer"
 */
app.get("/defgame", (req, res) => {
  nbPlayer = req.query.inpPlayer;
  console.log("np " + nbPlayer);
  res.redirect("/newplayer");
});

/* Route newplayer
 * Redirige vers newplayer.html tant qu'il y'a des joueurs à créer (countPlayer < nbPlayer)
 * /Crée une session pour chaque nouveau joueurs, un par un)
 */
app.get("/newplayer", (req, res) => {
  if (countPlayer < nbPlayer) {
    res.redirect("/newplayer.html");
    countPlayer++;
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

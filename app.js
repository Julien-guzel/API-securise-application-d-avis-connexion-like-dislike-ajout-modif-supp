// import plusieurs packages
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
// import des routes
const routesSauce = require('./routes/sauce');
const routesUtilisateur = require('./routes/utilisateur');

require('cors');/* Il s'agit d'un système de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents, ce qui empêche donc les requêtes malveillantes d'accéder à des ressources sensibles */
require('dotenv').config();/* permet de cacher des données sensible */

// connection a mongobd
mongoose
  .connect(
    "mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@"+process.env.DB_HOST+"/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//  appel express
const app = express();

// donne acces au corps de la requete
app.use(express.json());

// middlewear general
// permet a l'application d'acceder à l'api
app.use((req, res, next) => {
  // d'accéder à notre API depuis n'importe quelle origine
  res.setHeader("Access-Control-Allow-Origin", "*");
  // qu'elle header sont autorisé
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  // les methodes possible
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});


/* "/route attendu par le front-end", saucesRoutes */
app.use('/api/sauces', routesSauce);
/* "/route attendu par le front-end", userRoutes */
app.use('/api/auth', routesUtilisateur);
/* indique à Express qu'il faut gérer la ressource images de manière statique (un sous-répertoire de notre répertoire de base, __dirname) à chaque fois qu'elle reçoit une requête vers la route /images */
app.use('/images', express.static(path.join(__dirname, 'images')));

// exports "app"
module.exports = app;
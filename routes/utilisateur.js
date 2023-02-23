// import package
const express = require('express');
const router = express.Router();
const controlUtilisateur = require('../controllers/utilisateur');
const password = require('../middleware/password')

// crée les routes
router.post('/signup', password, controlUtilisateur.signup);/* route qui appelle en méthode POST le middleware "signup" du fichier utilisateur dans dossier controllers et l'envoie sur /signup */
router.post('/login', controlUtilisateur.login);/* route qui appelle en méthode POST le middleware "login" du fichier utilisateur dans dossier controllers et l'envoie sur /login */

// export les routeurs
module.exports = router;
// import des package + models utilisateur
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const modelsUtilisateur = require('../models/Utilisateur');

require('dotenv').config();

// inscription
exports.signup = (req, res, next) => {
    // genere un hash et le hash 10 fois
    bcrypt.hash(req.body.password, 10)
    // recup du hash
    .then(hash => {
        // creation du nouvelle utilisateur avec le models mangoose
      const utilisateur = new modelsUtilisateur({
        // recup l'email
        email: req.body.email,
        // recup le hach
        password: hash
      });
    //   sauvegarde l'utilisateur
      utilisateur.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


// connection
exports.login = (req, res, next) => {
    modelsUtilisateur.findOne({ email: req.body.email })
    .then(utilisateur => {
        if (!utilisateur) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
        }
        bcrypt.compare(req.body.password, utilisateur.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                }
                res.status(200).json({
                    userId: utilisateur._id,
                    token: jwt.sign(
                        { userId: utilisateur._id },
                        process.env.SECRET_KEY,
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
// import "jsonwebtoken"
const jwt = require('jsonwebtoken');
 
require('dotenv').config()

// export la function d'authentification
module.exports = (req, res, next) => {
   try {
    /* sépare avec un espace le token du headers authorization, du bearer. Et on récupère le token */
       const token = req.headers.authorization.split(' ')[1];
       /* on vérifie que le token de l'utilisateur est bien le même que la clé (avec la méthode verify) */
       const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
       /* on récupère le user id du token décodé */
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };/* on le rajoute à l'objet request afin que les routes puissent l'exploiter */
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};
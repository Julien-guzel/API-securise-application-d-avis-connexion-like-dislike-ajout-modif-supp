// appel mackage "multer"
const multer = require('multer');

// dictionnaire mime types, format de fichier defini
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// diskStorage = enregister dans le fichier images
const storage = multer.diskStorage({/* utilisation de la function diskStorage pour dire que l'on va enregistrer sur le disque */
  destination: (req, file, callback) => {/* function qui a besoin de 2 elements : destination et filename */
    callback(null, 'images');/* le callback enregistre l'image sur images */
  },
  filename: (req, file, callback) => {/* argument filename qui explique à multer quel nom de fichier utiliser */
  
    const name = file.originalname.split(' ').join('_');/* genere le nouveau nom, elimine les espaces par des "_"  */
    // genere l'extention des images
    const extension = MIME_TYPES[file.mimetype];
    // Creation nom de fichier unique
    callback(null, name + Date.now() + '.' + extension);
  }
});

// exporte l'élément multer entièrement configuré, passage de la const "storage" et lui indique de gérerer uniquement les fichiers "image"
module.exports = multer({storage: storage}).single('image');
const multer = require('multer');

// Configura el almacenamiento de archivos con Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define la carpeta de destino para almacenar los archivos
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Genera un nombre único para el archivo
    cb(null, Date.now() + '-' + file.originalname);
  }
});

module.exports = multer({ storage: storage });

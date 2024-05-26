const multer = require('multer')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
}
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let folder
    if (req.baseUrl === '/api/user') {
      folder = 'images/profil'
    } else {
      folder = 'images'
    }
    callback(null, folder);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(".")[0];
    const newName = name.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, newName + Date.now() + '.' + extension);
  }
})
module.exports = multer({storage: storage}).single('image')
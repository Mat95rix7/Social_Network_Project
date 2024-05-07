const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth.User')
const multer = require('../middleware/multer-config')
const authentification = require('../middleware/auth.User')

const userAuthCtrl = require('../controllers/user.auth.controller')
const userCtrl = require('../controllers/user.controller')
const uploadCtrl = require('../controllers/upload.controller')


router.post('/signup', userAuthCtrl.signUp)
router.post('/login', userAuthCtrl.login)
router.get('/logout', userAuthCtrl.logout)


router.get('/', auth, userCtrl.getAllUsers)
router.get('/:id', auth, userCtrl.userInfo)
router.delete('/:id', auth, userCtrl.deleteUser)
router.put('/:id', auth, userCtrl.updateUser)


router.post('/upload', multer, uploadCtrl.uploadProfil)


module.exports = router
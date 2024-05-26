const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth.User')
const multer = require('../middleware/multer-config')
const userCtrl = require('../controllers/user.controller')

router.post('/signup', userCtrl.signUp)
router.post('/login', userCtrl.login)
router.get('/logout', userCtrl.logout)

router.get('/', userCtrl.getAllUsers)
router.get('/:id', auth, userCtrl.userInfo)
router.delete('/:id', auth, userCtrl.deleteUser)
router.put('/:id', auth, multer, userCtrl.updateUser)

module.exports = router
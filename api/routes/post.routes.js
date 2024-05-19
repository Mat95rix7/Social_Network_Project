const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post.controller')
const auth = require('../middleware/auth.User')
const multer = require('../middleware/multer-config')

router.post('/', auth, multer, postCtrl.createPost)
router.get('/', auth, postCtrl.getAllPost)
router.get('/:id', auth, postCtrl.getOnePost)
router.put('/:id', auth, multer, postCtrl.updatePost)
router.delete('/:id', auth, postCtrl.deletePost)
router.patch('/like/:id', auth, postCtrl.likePost)
router.patch('/unlike/:id', auth, postCtrl.unlikePost)



module.exports = router
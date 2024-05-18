const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post.controller')
const auth = require('../middleware/auth.User')
const multer = require('../middleware/multer-config')

router.post('/', auth, postCtrl.createPost)
router.get('/', postCtrl.getPost)
router.get('/:id', postCtrl.getOnePost)
router.put('/:id', auth, postCtrl.updatePost)
router.delete('/:id', auth, postCtrl.deletePost)
router.patch('/like/:id', postCtrl.likePost)
router.patch('/unlike/:id', postCtrl.unlikePost)



module.exports = router
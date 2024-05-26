const Post = require('../models/Post')
const User = require('../models/User')
const fs = require('fs')
const ObjectID = require('mongoose').Types.ObjectId

exports.getAllPost = (req, res, next) => {
    Post.find().sort({ createdAt : -1})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({error}) )
}

exports.getOnePost = (req, res, next) => {
    Post.findOne({_id : req.params.id})
    .then(post => {
        if (!post) {
            res.status(400).send("unknown ID : " + req.params.id)
        } else {
            res.status(200).json(post)
        }
    })
    .catch(error => res.status(400).json({error}) )  
}

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post)
    delete postObject.posterId
    const post = new Post({
        ...postObject,
        posterId: req.auth.userId,
        picture: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ''
    });
    post.save()
    .then(() => { res.status(201).json(post)})
    .catch(error => { res.status(400).json( { error })})
 }

exports.updatePost = (req, res, next) => {
    const isAdmin = req.body.role
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : JSON.parse(req.body.post)
    delete postObject.posterId;
    Post.findOne({_id: req.params.id})
    .then((post) => {
        if ((post.posterId != req.auth.userId) && !isAdmin) {
            res.status(401).json({ message : 'Not authorized'})
        } else {
            Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
            .then(() => res.status(200).json(postObject))
            .catch(error => res.status(401).json({ error }))
        }
    })
    .catch((error) => {
        res.status(400).json({ error })
    })
}

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id})
      .then(post => {
          if ((post.posterId != req.auth.userId) && !req.body.role ) {
              res.status(401).json({message: 'Not authorized'})
          } else {
            if (post.picture){ 
              const filename = post.picture.split('/images/')[1]
              fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({_id: req.params.id})
                .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                .catch(error => res.status(401).json({ error }))
              })
            } else {
                Post.deleteOne({_id: req.params.id})
                .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                .catch(error => res.status(401).json({ error }))
            }
          }
      })
      .catch( error => res.status(500).json({ error }))
}

exports.likePost = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    Post.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { likers: req.body.id }},
        { new: true })
    .catch(error => res.status(400).json({error}) )
    User.findByIdAndUpdate(
        req.body.id,
        { $addToSet: { likes: req.params.id }},
        { new: true })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({error}) )
}

exports.unlikePost = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    Post.findByIdAndUpdate(
        req.params.id,
        { $pull: { likers: req.body.id }},
        { new: true })
    .catch(error => res.status(400).json({error}) )
    User.findByIdAndUpdate(
        req.body.id,
        { $pull: { likes: req.params.id }},
        { new: true })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({error}) )    
}


const Post = require('../models/Post')
const User = require('../models/User')
const ObjectID = require('mongoose').Types.ObjectId

exports.createPost = (req, res, next) => {
    if  (   !req.body.message   )   {
        res.status(400).json({message : "Veuillez saisir un message"})
        return
    }
    
    const post = new Post ({
        posterId: req.body.posterId,
        message: req.body.message,
        likers:[]
    })
    post.save()
    .then(() => res.status(201).json(post))
    .catch(( error ) => res.status(400).json({ error }))
}

exports.getPost = (req, res, next) => {
    Post.find().sort({ createdAt : -1})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({error}) )
}

exports.updatePost = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id)
  
    const updatedRecord = {
      message: req.body.message,
    }
  
    Post.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true })
      .then(post => res.status(200).json(post))
      .catch(error => res.status(400).json({error}) )    
  }

exports.deletePost = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    Post.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message : 'Objet supprimé !'}))
    .catch(error => res.status(400).json({error}) )    
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
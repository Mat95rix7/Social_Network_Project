const Post = require('../models/Post')
const User = require('../models/User')
const fs = require('fs')
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

// 
// 

// exports.createPostImage = (req, res, next) => {
//     const postObject = JSON.parse(req.body.post)
//     delete postObject._id
//     delete postObject._userId
//     const post = new Post({
//         ...postObject,
//         userId: req.auth.userId,
//         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     });
  
//     post.save()
//     .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
//     .catch(error => { res.status(400).json( { error })})
//  }

//  exports.modifyPostImage = (req, res, next) => {
//   const postObject = req.file ? {
//       ...JSON.parse(req.body.post),
//       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//   } : { ...req.body }

//   delete postObject._userId;
//   Post.findOne({_id: req.params.id})
//       .then((post) => {
//           if (post.userId != req.auth.userId) {
//               res.status(401).json({ message : 'Not authorized'})
//           } else {
//               Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
//               .then(() => res.status(200).json({message : 'Objet modifié!'}))
//               .catch(error => res.status(401).json({ error }))
//           }
//       })
//       .catch((error) => {
//           res.status(400).json({ error })
//       })
// }

// exports.deletePostImage = (req, res, next) => {
//   Post.findOne({ _id: req.params.id})
//       .then(post => {
//           if (post.userId != req.auth.userId) {
//               res.status(401).json({message: 'Not authorized'})
//           } else {
//               const filename = post.imageUrl.split('/images/')[1]
//               fs.unlink(`images/${filename}`, () => {
//                   Post.deleteOne({_id: req.params.id})
//                       .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
//                       .catch(error => res.status(401).json({ error }))
//               })
//           }
//       })
//       .catch( error => res.status(500).json({ error }))
// }

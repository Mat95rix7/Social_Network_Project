const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { registerErrors, loginErrors } = require('../utils/errors')
require('dotenv').config({path:'../config/'})

const maxAge = 2 * 3600000

module.exports.signUp = async (req, res) => {
    const {username, email, password} = req.body
  
    try {
      const user = await User.create({username, email, password })
      res.status(201).json({ user: user._id})
    }
    catch(err) {
      const errors = registerErrors(err);
      res.status(400).send(errors)
    }
  }
  

exports.login = async (req, res, next) => {
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)
        const token = jwt.sign({ userId: user._id }, process.env.MyToken, {expiresIn: maxAge})
        res.cookie('MyCookie', token, { maxAge: maxAge })
        res.status(200).json({ user, token })
    } catch (err) {
      const errors = loginErrors(err);
        res.status(400).json(errors)
    }
}

exports.logout = (req, res, next) => {
    res.cookie('MyCookie','', {maxAge: 1})
    res.send('Déconnection réussie')
}

exports.updateUser = (req, res, next) => {
    const userObject = req.file ? {
        ...JSON.parse(req.body.user),
        picture: `${req.protocol}://${req.get('host')}/images/profil/${req.file.filename}`
    } : JSON.parse(req.body.user)
    delete userObject._id;
    User.findOne({_id: req.params.id})
        .then((user) => {
            if (user._id != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'})
            } else {
                User.updateOne({ _id: req.params.id}, { ...userObject, _id: req.params.id})
                // console.log(user)
                .then(() => res.status(200).json(user))
                .catch(error => res.status(401).json({ error }))
            }
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
  }

exports.getAllUsers = (req, res, next) => {
  User.find().select('-password')
  .then(users => res.status(200).json(users))
  .catch(error => res.status(400).json({error}) )
}

exports.userInfo = (req, res, next) => {
  User.findOne({_id : req.params.id}).select('-password')
  .then(user => {
      if (!user) {
          res.status(400).send("unknown ID : " + req.params.id)
      } else {
          res.status(200).json(user)
      }
  })
  .catch(error => res.status(400).json({error}) )  
}

exports.deleteUser = (req, res, next) => {
  User.deleteOne({_id : req.params.id})
  .then(() => res.status(200).json({ message : 'success unsubcribe !'}))
  .catch((err) => res.status(400).json({err}))
}
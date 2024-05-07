const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config({path:'../config/'})

const maxAge = 2 * 3600000

module.exports.signUp = async (req, res) => {
    const {username, email, password} = req.body
  
    try {
      const user = await User.create({username, email, password })
      res.status(201).json({ user: user._id})
    }
    catch(err) {
      res.status(200).send(err)
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
        res.status(400).json(err)
    }
}

exports.logout = (req, res, next) => {
    res.cookie('MyCookie','', {maxAge:1})
    res.send('Déconnection réussie')
}
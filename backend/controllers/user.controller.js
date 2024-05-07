const User = require('../models/User')

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

exports.updateUser = (req, res, next) => {

}

const User = require('../models/User')
const fs = require('fs')
const { promisify } = require("util")
const pipeline = promisify(require("stream").pipeline)


exports.uploadProfil = (req, res, next) => {
    const userProfil = req.file ? {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }
    console.log(userProfil._userId)
    delete userObject._Id;
    User.findOne({_id: req.params.id})
        .then((user) => {
            if (user.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'})
            } else {
                User.updateOne({ _id: req.params.id}, { ...userProfil, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Profil modifié!'}))
                .catch(error => res.status(401).json({ error }))
            }
        })
        .catch((error) => {
            res.status(400).json({ error })
        })







    // try {
//     if (
//         req.file.detectedMimeType != "image/jpg" &&
//         req.file.detectedMimeType != "image/png" &&
//         req.file.detectedMimeType != "image/jpeg"
//     ) 
//         throw Error("invalid file")

//     if (req.file.size > 500000)  throw Error("max size")
//     } catch (err) {
//         return res.status(201).send({message : 'error'})
// }

//     const fileName = req.body.name + ".jpg"

//     await pipeline(
//     req.file.stream,
//     fs.createWriteStream(
//     `${__dirname}/../images/profil/${fileName}`
//     )
//     )

 
//     try {
//         User.findByIdAndUpdate(
//             req.body.userId,
//             { $set : {picture: "../images/profil" + fileName}},
//             { new: true, upsert: true, setDefaultsOnInsert: true}
//             )
//         user => res.status(200).json(user)
//     } catch {
//         res.status(400).json({error})
//     }
}

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            validate: [isEmail],
            unique: true,
            lowercase: true,
            trim: true
        },
        password:{
            type: String,
            required: true,
            minlength: 6
        },
        picture:{
            type: String,
            default: "http://localhost:5000/images/profil/star.png"
        },
        likes:{
            type: [String]
        },
        isAdmin:{
            type: Boolean,
            default: false
        }
    },
    {
        timestamps : true
    }
)
userSchema.plugin(uniqueValidator)

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email })
    if (user) {
      const auth = await bcrypt.compare(password, user.password)
      if (auth) {
        return user
      }
      throw Error('incorrect password')
    }
    throw Error('incorrect email')
  }
  module.exports = mongoose.model('User', userSchema)
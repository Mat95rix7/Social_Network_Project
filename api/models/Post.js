const mongoose = require('mongoose')
const postSchema = mongoose.Schema(
    {
        posterId : {
            type: String,
            required: true
        },
        message : {
                type: String,
                required: true,
                trim: true
        },
        picture: {
            type: String,
        },
        likers : {
            type : [String],
            required: true
        }
    },
    {
        timestamps : true,
    }
)

module.exports = mongoose.model('Post', postSchema)
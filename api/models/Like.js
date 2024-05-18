const mongoose = require('mongoose');

const likeSchema = mongoose.Schema(
    {
        article: { 
            type: mongoose.Schema.Types.ObjectId, ref: 'Article',
            required: true 
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            required: true 
        }
    }
)

module.exports = mongoose.model('Like', likeSchema);
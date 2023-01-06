const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  });

const dogSchema = new Schema({
    breed: {
        type: String,
        required: true
    },
    lifespan: {
        type: Number,
    },
    color: [String],
    activity: [{type: Schema.Types.ObjectId, ref: 'Activity'}],
    selectBreed: {type: Boolean, default: false},
    comments: [commentSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Dog', dogSchema)
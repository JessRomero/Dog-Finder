const mongoose = require('mongoose')
// opitonal shortcut to the mongoose.Schema class
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
        // default: function() {
        //     return new Date().getFullYear()
        // }
    },
    color: [String],
    breed: [{type: Schema.Types.ObjectId, ref: 'Activity'}],
    selectBreed: {type: Boolean, default: false},
    comments: [commentSchema]
}, {
    timestamps: true
})

// Compile the schema into a model and export it
module.exports = mongoose.model('Dog', dogSchema)
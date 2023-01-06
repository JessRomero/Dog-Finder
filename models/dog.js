const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
}, {
    timestamps: true
})

module.exports = mongoose.model('Dog', dogSchema)
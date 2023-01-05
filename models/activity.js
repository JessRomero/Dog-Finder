const mongoose = require('mongoose')
const Schema = mongoose.Schema

const activitySchema = new Schema({
    activity: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Activity', activitySchema)
const {Schema, model} = require('mongoose')

const schema = new Schema({
    title:{type: String, required: true},
    author:{type: String, required: true},
    pages:{type: String, default: 'n/a'},
    rating:{type: Number, required: true, min: 1, max: 5},
})

module.exports = model('Book', schema)
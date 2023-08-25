const mongoose = require('mongoose');
const { Schema, model } = require("mongoose")

const CommentSchema = new Schema({
    text: {
        type: String
    },
        
},)

module.exports = model("Comment", CommentSchema)

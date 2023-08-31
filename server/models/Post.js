const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    postText: {
        type: String,
        required: true
    },
    postAuthor: {
        type: String,
        required: true,
        trim: true,
      },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
},
)

module.exports = mongoose.model("Post", PostSchema);
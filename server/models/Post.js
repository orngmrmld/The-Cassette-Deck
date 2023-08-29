const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    id: {
        type: Int,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
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
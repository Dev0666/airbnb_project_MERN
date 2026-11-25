// const { string } = require("joi");
const { types, ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        require: true,
        min: 1,
        max : 5
    },
    comment: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author : {
        type : Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Review", reviewSchema);
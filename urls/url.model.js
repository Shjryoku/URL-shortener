import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    _id: Number,
    originalURL:{
        type: String,
        required: true
    },
    creationDate:{
        type: Date,
        default: Date.now
    },
    clicks:{
        type: Number,
        default: 0
    }
})

export default mongoose.model("ShortURL", urlSchema)
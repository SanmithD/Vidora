import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    video: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    // likes: [{
    //     userId:{
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User',
    //     },
    //     like:{
    //         type: Boolean,
    //         default: false,
    //         count: 0
    //     }
    // }]
},{ timestamps: true });

export const videoModel = mongoose.model('Video', videoSchema);
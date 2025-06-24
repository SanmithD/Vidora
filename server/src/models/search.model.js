import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    searched: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }
},{ timestamps: true });

export const searchModel = mongoose.model('Search', searchSchema);
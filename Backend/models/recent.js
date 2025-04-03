import mongoose from "mongoose";

const recentSchema = new mongoose.Schema({
    user:String,
    bot:String
})

export const createRecentModel = (collectionName) => {
    
    if (mongoose.models[collectionName]) {
        return mongoose.models[collectionName];
    }

    return mongoose.model(collectionName, recentSchema, collectionName);
};
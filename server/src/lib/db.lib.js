import mongoose from 'mongoose';

export const dbConnect = async() =>{
    try {
        const response = await mongoose.connect(process.env.MONGO_URI);
        console.log(response.connection.host);
    } catch (error) {
        console.log(error);
        process.exit();
    }
}
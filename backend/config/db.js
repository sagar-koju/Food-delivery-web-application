import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sagarkoju:mongodb007@cluster0.kxwxita.mongodb.net/food-delivery-app').then(()=>console.log("DB connected"));
};
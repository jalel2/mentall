// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    verificationCode: { type: Number }, // For admin verification
});

export default mongoose.model("User", userSchema);
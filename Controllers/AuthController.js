import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../Utils/TokenGenerator.js"



export const signup = async(req, res) => {
    try {
        const { name, lastname, email, password } = req.body;
        console.log(name,lastname,email,password)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            lastname,
            email,
            password: hashedPassword
        });
        const token = generateToken(user._id);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};







export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const logout = async(req, res) => {
    try {
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
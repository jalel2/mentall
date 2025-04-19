import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const signin = async(req, res) => {
    try {
        const { name, lastname, email, password, isAdmin } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            lastname,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false
        });

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

        // Check if the user is an admin
        if (user.isAdmin) {
            // Generate a verification code
            const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code

            // Save the verification code to the user's record (optional, if you want to persist it)
            user.verificationCode = verificationCode;
            await user.save();

            // Send the verification email
            const transporter = nodemailer.createTransport({
                service: "gmail", // Use your email service provider
                auth: {
                    user: process.env.EMAIL_USER, // Your email address
                    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: "Admin Login Verification Code",
                text: `Your verification code is: ${verificationCode}`,
            };

            await transporter.sendMail(mailOptions);

            return res.status(200).json({ message: "Verification code sent to your email" });
        }

        // Generate a token for non-admin users
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ user, token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const logout = async(req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
export const verifyAdminCode = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.isAdmin) return res.status(403).json({ message: "User is not an admin" });

        // Check if the verification code matches
        if (user.verificationCode !== parseInt(verificationCode)) {
            return res.status(400).json({ message: "Invalid verification code" });
        }

        // Generate a token after successful verification
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ user, token });
    } catch (error) {
        console.error("Error during verification:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
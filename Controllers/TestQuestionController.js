// backend/Controllers/TestQuestionController.js
import TestQuestion from "../Models/TestQuestion.js";

export const createQuestion = async (req, res) => {
    try {
        console.log("Incoming question data:", req.body);
        const question = new TestQuestion(req.body);
        await question.save();
        res.status(201).json(question);
    } catch (err) {
        console.error("Error creating question:", err);
        res.status(500).json({ message: "Server error" });
    }
};


export const getAllQuestions = async (req, res) => {
    try {
        const questions = await TestQuestion.find();
        res.status(200).json({ questions });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving questions" });
    }
};

export const getRandomQuestionsByType = async (req, res) => {
    try {
        const testTypes = ['PHQ-9', 'GAD-7', 'PSS', 'BAI', 'RSES'];
        const randomQuestions = [];
        for (const type of testTypes) {
            const question = await TestQuestion.aggregate([
                { $match: { testType: type } },
                { $sample: { size: 1 } }
            ]);
            if (question.length > 0) {
                randomQuestions.push(question[0]);
            }
        }
        res.status(200).json(randomQuestions);
    } catch (error) {
        console.error("Error fetching random questions:", error);
        res.status(500).json({ message: "Failed to fetch random questions" });
    }
};
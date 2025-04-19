// filepath: c:\Users\jalel\OneDrive\Desktop\projectmentall\backend\Models\TestResult.js
import mongoose from 'mongoose';

const TestResultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name:{ type: String, required: true },
    totalScore: { type: Number, required: true },
    moodCategory: { type: String, required: true },
    moodLabel: { type: String, required: true },
});

const TestResult = mongoose.model('TestResult', TestResultSchema);
export default TestResult;
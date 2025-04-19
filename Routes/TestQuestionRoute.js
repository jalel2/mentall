// backend/Routes/TestQuestionRoute.js
import express from 'express';
import {createQuestion,getAllQuestions,getRandomQuestionsByType} from '../Controllers/TestQuestionController.js';

const router = express.Router();

router.post('/questions', createQuestion); // Route to create a question
router.get('/questions', getAllQuestions); // Route to get all questions
router.get('/random-questions', getRandomQuestionsByType); // Route to get random questions by type

export default router;
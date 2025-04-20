import express from 'express';
import { analyzeScores } from '../Controllers/TestResultController.js';
import { getAllTestResults } from '../Controllers/TestResultController.js';

const router = express.Router();

// Route to analyze scores and return category and label
router.post('/analyze-scores', analyzeScores);
router.get('/all',getAllTestResults);

export default router;
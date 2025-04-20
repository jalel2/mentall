import dotenv from 'dotenv';
import express from 'express';
import authRoute from './Routes/AuthRout.js';
import { connection } from './DB/Connection.js';
import testQuestionRoutes from './Routes/TestQuestionRoute.js';
import testResultRoutes from './Routes/TestResultRoute.js';

// Load environment variables
dotenv.config();

const app = express();

app.use(express.json())

// Routes
app.use('/api/auth', authRoute);
app.use('/api/test-questions', testQuestionRoutes);
app.use('/api/test-results', testResultRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connection(); // Connect to the database
});
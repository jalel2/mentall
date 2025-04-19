import dotenv from 'dotenv';
import express from 'express';
import authRoute from './Routes/AuthRout.js';
import { connection } from './DB/Connection.js';
import testQuestionRoutes from './Routes/TestQuestionRoute.js';
import adminRoute from './Routes/AdminRout.js';
import testResultRoutes from './Routes/TestResultRoute.js';

// Load environment variables
dotenv.config();

const app = express();



// Routes
app.use('/auth', authRoute);
app.use('/api/test-questions', testQuestionRoutes);
app.use('/admin', adminRoute);
app.use('/api/test-results', testResultRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connection(); // Connect to the database
});
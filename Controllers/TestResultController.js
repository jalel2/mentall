import TestResult from '../Models/TestResult.js';
import User from '../Models/User.js';

const analyzeMood = (score) => {
    if (score <= 5) return { category: 'Balanced Mood', label: 'happy' };
    if (score <= 10) return { category: 'Mild Distress', label: 'neutral' };
    if (score <= 15) return { category: 'Moderate Mood Disturbance', label: 'anxious' };
    if (score <= 20) return { category: 'Severe Distress', label: 'sad' };
    return { category: 'Critical Alert', label: 'angry' };
};

export const analyzeScores = async (req, res) => {
    try {
        const { userId, answers } = req.body;

    // Validate input
        if (!userId || !answers || !Array.isArray(answers)) {
            return res.status(400).json({ message: 'Invalid input. userId and answers are required.' });
    }

    // Fetch the user from the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
    }

    // Calculate the total score from the answers
        let totalScore = 0;
        answers.forEach((answer) => {
            if (answer.optionsResponse && typeof answer.optionsResponse.value === 'number') {
                totalScore += answer.optionsResponse.value;
            }
        });

    // Analyze the mood based on the total score
        const { category, label } = analyzeMood(totalScore);

    // Save the result to the TestResult collection
        const testResult = new TestResult({
            userId: user._id,
            name: `${user.name} ${user.lastname}`,
            totalScore,
            moodCategory: category,
            moodLabel: label
    });
    await testResult.save();

    // Return the label to the frontend
    res.status(200).json({ label });
} catch (error) {
    console.error('Error analyzing scores:', error);
    res.status(500).json({ message: 'Failed to analyze scores' });
}
};


export const getAllTestResults = async (req, res) => {
    try {
      const results = await TestResult.find().populate('user', 'name email');
  
      const formattedResults = results.map(result => ({
        user: result.user,
        moodCategory: result.moodCategory,
        moodLabel: result.moodLabel,
        totalScore: result.totalScore,
        createdAt: result.createdAt,
      }));
  
      res.status(200).json({ testResults: formattedResults });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch test results' });
    }
  };
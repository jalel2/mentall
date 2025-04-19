import TestResult from "../Models/TestResult.js";

export const getAllTestResults = async (req, res) => {
  try {
    // Fetch all test results from the database
    const testResults = await TestResult.find();

    // Return the test results to the frontend
    res.status(200).json(testResults);
  } catch (err) {
    console.error("Error fetching test results:", err);
    res.status(500).json({ message: "Error fetching test results" });
  }
};
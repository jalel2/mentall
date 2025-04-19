import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
    option: String,
    value: Number
});

const testQuestionSchema = new mongoose.Schema({
    testType: {
    type: String,
    required: true
},
questionText: {
    type: String,
    required: true
},
optionsResponse: {
type: [optionSchema], // this is KEY
required: true
}
});

export default mongoose.model('TestQuestion', testQuestionSchema);
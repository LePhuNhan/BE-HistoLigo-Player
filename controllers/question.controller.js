import mongoose from "mongoose";
import Test from "../models/test.model.js";
import { BaseQuestion } from "../models/question.model.js";

export const checkAnswers = async (req, res) => {
    try {
        const { answers } = req.body; // answers should be an array of objects { questionId, selectedAnswer }

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ message: "Invalid answers format" });
        }

        let correctCount = 0;
        const results = [];

        for (let i = 0; i < answers.length; i++) {
            const { questionId, selectedAnswer } = answers[i];

            // Find the question by ID
            const question = await BaseQuestion.findById(questionId);

            if (!question) {
                results.push({ questionId, correct: false, message: "Question not found" });
                continue;
            }

            let isCorrect = false;

            // Check the answer based on question type
            switch (question.questionType) {
                case questionType.trueFalse:
                    isCorrect = question.answer === selectedAnswer;
                    break;
                case questionType.multipleChoice:
                    isCorrect = question.answer === selectedAnswer;
                    break;
                case questionType.matching:
                    isCorrect = JSON.stringify(question.answer) === JSON.stringify(selectedAnswer);
                    break;
                case questionType.fillInTheBlank:
                    isCorrect = JSON.stringify(question.answer.sort()) === JSON.stringify(selectedAnswer.sort());
                    break;
                default:
                    break;
            }

            if (isCorrect) correctCount++;

            results.push({ questionId, correct: isCorrect });
        }

        const score = (correctCount / answers.length) * 100;

        return res.status(200).json({
            score,
            results,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTestDetailsAndQuestions = async (req, res) => {
    try {
        const { testId } = req.params;

        const test = await Test.findById(testId);

        if (!test) {
            return res.status(404).json({ message: "Test not found" });
        }

        console.log('Test found:', test);
        console.log('Questions IDs:', test.questionsId);
        if (!test.questionsId || !Array.isArray(test.questionsId)) {
            return res.status(400).json({ message: "Invalid questionsId" });
        }

        const questions = await BaseQuestion.find({
            _id: { $in: test.questionsId },
        });

        console.log('Questions found:', questions);

        return res.status(200).json({
            test,
            questions,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: error.message });
    }
};
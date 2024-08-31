import mongoose from "mongoose";
import Test from "../models/test.model.js";
import {
  BaseQuestion,
  TrueFalseQuestion,
  MultipleChoiceQuestion,
  MatchingQuestion,
  FillInTheBlankQuestion,
} from "../models/question.model.js";

const questionType = {
  trueFalse: 1,
  multipleChoice: 0,
  matching: 2,
  fillInTheBlank: 3,
};

export const checkAnswer = async (req, res) => {
  try {
    const { answer } = req.body;

    if (!answer || typeof answer !== "object") {
      return res.status(400).json({ message: "Invalid answer format" });
    }

    const { questionId, selectedAnswer } = answer;

    const question = await BaseQuestion.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    let isCorrect = false;

    switch (question.questionType) {
      case questionType.trueFalse:
        const trueFalseQuestion = await TrueFalseQuestion.findById(questionId);
        isCorrect = Boolean(selectedAnswer) === trueFalseQuestion.answer;
        break;
      case questionType.multipleChoice:
        const multipleChoiceQuestion = await MultipleChoiceQuestion.findById(
          questionId
        );
        isCorrect = Number(selectedAnswer) === multipleChoiceQuestion.answer;
        break;
      case questionType.matching:
        const matchingQuestion = await MatchingQuestion.findById(questionId);

        // Helper function to format the answers
        const formatAnswer = (answerArray) =>
          answerArray
            .map(({ _id, leftColumn = "", rightColumn = "" }) => ({
              leftColumn,
              rightColumn,
            }))
            .sort(
              (a, b) =>
                a.leftColumn.localeCompare(b.leftColumn) ||
                a.rightColumn.localeCompare(b.rightColumn)
            );

        const storedAnswerFormatted = formatAnswer(matchingQuestion.answer);
        const selectedAnswerFormatted = formatAnswer(selectedAnswer);

        isCorrect =
          JSON.stringify(storedAnswerFormatted) ===
          JSON.stringify(selectedAnswerFormatted);
        break;

      case questionType.fillInTheBlank:
        const fillInTheBlankQuestion = await FillInTheBlankQuestion.findById(
          questionId
        );
        const formatFillInAnswer = (answerArray) => answerArray.sort();

        isCorrect =
          JSON.stringify(formatFillInAnswer(selectedAnswer)) ===
          JSON.stringify(formatFillInAnswer(fillInTheBlankQuestion.answer));
        break;
      default:
        return res.status(400).json({ message: "Invalid question type" });
    }

    return res.status(200).json({
      questions: [
        {
          questionId,
          answer: selectedAnswer,
          isCorrect,
        },
      ],
    });
  } catch (error) {
    console.error("Error checking answer:", error);
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

    if (!test.questionsId || !Array.isArray(test.questionsId)) {
      return res.status(400).json({ message: "Invalid questionsId" });
    }

    const questions = await BaseQuestion.find({
      _id: { $in: test.questionsId },
    }).select("-answer");

    console.log("Questions found:", questions);

    return res.status(200).json({
      test,
      questions,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

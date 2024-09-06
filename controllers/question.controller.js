import mongoose from "mongoose";
import Test from "../models/test.model.js";
import {
  BaseQuestion,
  TrueFalseQuestion,
  MultipleChoiceQuestion,
  MatchingQuestion,
  FillInTheBlankQuestion,
} from "../models/question.model.js";
import { questionType } from "../constants/question.constant.js";
import { shuffle } from "../utils/array.utils.js";

export const checkAnswer = async (req, res) => {
  try {
    const { answer } = req.body;
    const contentLanguage = req.contentLanguage;

    if (!answer || typeof answer !== "object") {
      return res.status(400).json({ message: "Invalid answer format" });
    }

    const { questionId, selectedAnswer } = answer;

    const question = await BaseQuestion.findById(questionId).lean();

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    let isCorrect = false;
    let correctAnswer = "abc";
    let userAnswer = "def";

    switch (question.questionType) {
      case questionType.trueFalse:
        isCorrect = Boolean(selectedAnswer) === question.answer;
        break;
      case questionType.multipleChoice:
        isCorrect = Number(selectedAnswer) === question.answer;
        break;
      case questionType.matching:
        const formatAnswer = (answerArray) =>
          answerArray
            .map((item) => `${item.leftColumn}=${item.rightColumn}`)
            .join(`\n`);
        correctAnswer = formatAnswer(
          question.localeData[contentLanguage].answer
        );
        userAnswer = formatAnswer(selectedAnswer);
        console.log(userAnswer, correctAnswer);
        console.log(contentLanguage);
        
        isCorrect = correctAnswer === userAnswer;
        // const formatAnswer = (answerArray) =>
        //   answerArray
        //     .map(({ _id, leftColumn = "", rightColumn = "" }) => ({
        //       leftColumn,
        //       rightColumn,
        //     }))
        //     .sort(
        //       (a, b) =>
        //         a.leftColumn.localeCompare(b.leftColumn) ||
        //         a.rightColumn.localeCompare(b.rightColumn)
        //     );

        // const storedAnswerFormatted = formatAnswer(matchingQuestion.answer);
        // const selectedAnswerFormatted = formatAnswer(selectedAnswer);

        // isCorrect =
        //   JSON.stringify(storedAnswerFormatted) ===
        //   JSON.stringify(selectedAnswerFormatted);
        break;

      case questionType.fillInTheBlank:
        const formatFillInAnswer = (answerArray) => answerArray.join(`\n`);
        correctAnswer = formatFillInAnswer(
          question.localeData[contentLanguage].answer
        );
        userAnswer = formatFillInAnswer(selectedAnswer);
        isCorrect =
          correctAnswer===userAnswer
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
    const contentLanguage = req.contentLanguage;
    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    if (!test.questionsId || !Array.isArray(test.questionsId)) {
      return res.status(400).json({ message: "Invalid questionsId" });
    }

    const questions = await BaseQuestion.find({
      _id: { $in: test.questionsId },
    }).lean();
    for (const question of questions) {
      question.ask = question.localeData[contentLanguage].ask;

      if (question.questionType == questionType.multipleChoice) {
        question.option = question.localeData[contentLanguage].option;
      }
      if (question.questionType == questionType.matching) {
        question.leftColumn = question.localeData[contentLanguage].answer.map(
          (item) => item.leftColumn
        );
        question.rightColumn = question.localeData[contentLanguage].answer.map(
          (item) => item.rightColumn
        );
        shuffle(question.rightColumn);
      }
      question.answer = undefined;
      question.localeData = undefined;
    }
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

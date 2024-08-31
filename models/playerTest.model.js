import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const playerTestSchema = new Schema(
  {
    playerId: {
      type: Schema.Types.ObjectId,
      ref: 'Player',
      required: true,
    },
    testId: {
      type: Schema.Types.ObjectId,
      ref: 'Test',
      required: true,
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    time: {
      type: Number,
      min: 0,
      required: true,
    },
    doneAt: {
      type: Date,
      required: true,
    },
    questions: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: 'Question',
          required: true,
        },
        answer: {
          type: Schema.Types.Mixed,
        },
        isCorrect: {
          type: Boolean,
        },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const PlayerTest = model('PlayerTest', playerTestSchema);

export default PlayerTest;

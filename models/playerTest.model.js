// sửa playerProcess, làm playerTest trong group zalo
// khi bắt đầu làm test, tạo 1 playerTest, khi bấm answer sẽ update cái mới tạo
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const playerTestSchema = new Schema(
  {
    playerId: {
      type: Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    testId: {
      type: Schema.Types.ObjectId,
      ref: "Test",
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
            ref: "Question",
            required: true,
          },
          answer: {
            type: Schema.Types.Mixed,
          },
          isCorrect: {
            type: Boolean,
          },
        }
      ]
  },
  { timestamps: true }
);

const PlayerTest = model("PlayerTest", playerTestSchema);

export default PlayerTest;

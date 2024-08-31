import mongoose from "mongoose";
const { Schema, model } = mongoose;

const testSchema = new Schema({
  testId: {
    type: Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const topicSchema = new Schema({
  topicId: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  totalTest: {
    type: Number,
    required: true,
  },
  doneTest: {
    type: Number,
    required: true,
  },
  tests: {
    type: [testSchema],
    required: true,
  },
});

const playerProcessSchema = new Schema(
  {
    playerId: {
      type: Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    countryId: {
      type: Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    topics: {
      type: [topicSchema],
      required: true,
    },
  },
  { timestamps: true }
);

const PlayerProcess = model("PlayerProcess", playerProcessSchema);

export default PlayerProcess;

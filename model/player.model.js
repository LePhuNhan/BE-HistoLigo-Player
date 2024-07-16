import mongoose from "mongoose";

const PlayerSchema = mongoose.Schema({
  fullname: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  totalScore: {
    type: Number
  },
  totalTime: {
    type: Number
  },
  rank: {
    type: Number,
  },
  registrationDate: {
    type: Date
  },
  status: {
    type: Number
  },
  locale: {
    type: String
  }
});

const PlayerModel = mongoose.model("user", PlayerSchema);

export default PlayerModel;

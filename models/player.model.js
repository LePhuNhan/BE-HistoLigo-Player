import mongoose from "mongoose";

const PlayerSchema = mongoose.Schema({
  playerId: {
    type: mongoose.Types.ObjectId,
    ref: "player",
  },
  fullname: String,
  dateOfBirth: Date,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: String,
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  totalScore: Number,
  totalTime: Number,
  rank: Number,
  registrationDate: Date,
  status: Number,
  locale: String
});

const PlayerModel = mongoose.model("player", PlayerSchema);

export default PlayerModel;

import mongoose from "mongoose";

const PlayerSchema = mongoose.Schema({
  fullname: {
    type: String,
    maxlength: 100,
    default: null,
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 250,
  },
  phoneNumber: {
    type: String,
    maxlength: 20,
    default: null,
  },
  userName: {
    type: String,
    required: true,
    maxlength: 250,
    default: null,
  },
  password: {
    type: String,
    required: true,
    maxlength: 250,
    default: null,
  },
  avatar: {
    type: String,
    maxlength: 1000,
    default: null,
  },
  totalScore: {
    type: Number,
    default: null,
  },
  totalTime: {
    type: Number,
    default: null,
  },
  rank: {
    type: Number,
    enum: [0, 1, 2, 3, 4],
    default: 0,
    // 0: "Beginner",
    // 1: "Intermediate",
    // 2: "Advanced",
    // 3: "Expert",
    // 4: "Master",
  },
  registrationDate: {
    type: Date,
    default: null,
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  locale: {
    type: String,
    maxlength: 20,
    default: null,
  },
  sex:{
    type: Number,
    enum: [0, 1],
    default: 1,
    // 0: "Female",
    // 1: "Male",
  }
});

const playerModel = mongoose.model("user", PlayerSchema);

export default playerModel;

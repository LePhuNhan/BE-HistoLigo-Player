import { Maximize } from "@mui/icons-material";
import mongoose from "mongoose";

const PlayerSchema = mongoose.Schema({
  playerId: {
    type: mongoose.Types.ObjectId,
    ref: "player",
    maxlength:100
  },
  fullname: {
    type:String,
  },
  dateOfBirth: {
    type:Date,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength:250
  },
  phoneNumber: {
    type: String,
    maxlength:20
  },
  userName: {
    type: String,
    required: true,
    maxlength:250
  },
  password: {
    type: String,
    required: true,
    maxlength:250
  },
  avatar: {
    type:String,
    maxlength:1000
  },
  sex: {
    type: Number,
    enum: [0,1]
  },
  totalScore: {
    type:Number,
  },
  totalTime: {
    type:Number,
  },  
  rank: {
    type:Number,
    enum: [0,1,2,3]
  },
  registrationDate: {
    type:Date,
  },
  status: {
    type: Number,
    enum: [0,1]
  },
  locale: {
    type:String,
    maxlength:20
  }
    
});

const PlayerModel = mongoose.model("player", PlayerSchema);

export default PlayerModel;

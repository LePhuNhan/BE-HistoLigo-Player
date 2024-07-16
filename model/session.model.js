import mongoose from "mongoose";

const SessionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  valid: Boolean,
});

const SessionModel = mongoose.model("session", SessionSchema);
export default SessionModel;

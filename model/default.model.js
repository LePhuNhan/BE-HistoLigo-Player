import mongoose from "mongoose";

const defaultSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: [String],
  /* something: {
        type: mongoose.Types.ObjectId,
        ref: 'user'   //=> other collection
    } */
});

const defaultModel = mongoose.model("default", defaultSchema);
export default defaultModel;

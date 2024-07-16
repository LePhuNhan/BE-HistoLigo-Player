import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: [
    {
      type: String,
      default: "guest",
    },
  ],
});

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;

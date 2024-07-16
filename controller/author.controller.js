import UserModel from "../model/user.model.js";

export const authorization = async (req, res) => {
  const { userId, accessToken, refreshToken } = req.user;
  const user = await UserModel.findOne({ _id: userId });
  if (!user) throw new Error(`User not found`);
  if (user.role.includes("admin")) {
    return res.status(200).send({ isAuthorized: true });
  } else {
    throw new Error(`User not authorized`);
  }
};

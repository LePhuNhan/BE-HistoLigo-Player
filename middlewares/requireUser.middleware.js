import { getSession } from "../Utils/sessionHandler.js";

const requireUser = async (req, res, next) => {
  const session = await getSession(req.user.sessionId);
  if (!session) throw new Error("You must login");
  return next();
};

export { requireUser };

import { getPlayer } from "../utils/PlayerHandler.js";

const requirePlayer = async (req, res, next) => {
  const Player = await getPlayer(req.Player.PlayerId);
  if (!Player) throw new Error("You must login");
  return next();
};

export { requirePlayer };

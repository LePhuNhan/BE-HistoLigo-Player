import PlayerModel from "../models/player.model.js";
export async function createPlayer(userId) {
  const Player = await PlayerModel.create({
    userId,
    valid: true,
  });
  return Player;
}

export async function getPlayer(_id) {
  const Player = await PlayerModel.findOne({ _id });
  return Player && Player.valid ? Player : null;
}


export async function invalidatePlayer(_id) {
  await PlayerModel.findOneAndUpdate({ _id }, { isValid: false });
}


import PlayerModel from "../models/player.model.js";

//coi dùng joi để middleware

export const addPlayerProfile = async (req, res, next) => {
  try {
    const player = new PlayerModel(req.body);
    const { email, username } = req.body;
    const existedPlayer = await PlayerModel.findOne({ email, username });
    if (existedPlayer) {
      return res.status(400).json({ message: "Player already exists!" });
    }
    await player.save();
    res.status(201).json({ message: "Player created successfully", player });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getPlayerProfile = async (req, res, next) => {
  try {
    const playerId = req.user._id;
    const player = await PlayerModel.findById(playerId).select("-password");
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePlayerProfile = async (req, res, next) => {
  try {
    const { email } = req.body;
    const playerId = req.user._id;

    const existedPlayer = await PlayerModel.findOne({
      email,
      _id: { $ne: playerId },
    });

    if (existedPlayer) {
      return res
        .status(400)
        .json({ message: "Email is already in use by another account!" });
    }

    const player = await PlayerModel.findByIdAndUpdate(
      playerId,
      req.body,
      { new: true }
    ).select("-password");

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json({ message: "Player updated successfully", player });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

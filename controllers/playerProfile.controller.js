import PlayerModel from "../models/player.model.js";
import { createPlayerSchema, updatePlayerSchema } from "../validation/player.validation.js";

export const addPlayerProfile = async (req, res, next) => {
  try {
    const { error } = createPlayerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const player = new PlayerModel(req.body);
    await player.save();
    res.status(201).json({ message: "Player created successfully", player });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlayerProfile = async (req, res, next) => {
  try {
    const playerId = req.user._id;
    const player = await PlayerModel.findById(playerId).select('-password');
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePlayerProfile = async (req, res, next) => {
  try {
    const { error } = updatePlayerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const player = await PlayerModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json({ message: "Player updated successfully", player });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import PlayerModel from "../models/player.model.js";
import PlayerProcessModel from "../models/playerProcess.model.js";

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

// export const updatePlayerProfile = async (req, res, next) => {
//   try {
//     const { email } = req.body;
//     const playerId = req.user._id;

//     const existedPlayer = await PlayerModel.findOne({
//       email,
//       _id: { $ne: playerId },
//     });

//     if (existedPlayer) {
//       return res
//         .status(400)
//         .json({ message: "Email is already in use by another account!" });
//     }

//     const player = await PlayerModel.findByIdAndUpdate(
//       playerId,
//       req.body,
//       { new: true }
//     ).select("-password");

//     if (!player) {
//       return res.status(404).json({ message: "Player not found" });
//     }

//     res.status(200).json({ message: "Player updated successfully", player });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const updatePlayerProfileAndRank = async (req, res) => {
  try {
    const playerId = req.user._id;
    const { email, ...updateData } = req.body;

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
      updateData,
      { new: true }
    ).select("-password");

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    const playerProcess = await PlayerProcessModel.findOne({ playerId });
    if (playerProcess) {
      let totalScore = 0;
      let totalTime = 0;
      playerProcess.topics.forEach(topic => {
        topic.tests.forEach(test => {
          totalScore += test.score;
          totalTime += parseInt(test.time);
        });
      });
      player.totalScore = totalScore;
      player.totalTime = totalTime;
      let rank = 0;
      if (totalScore > 300 && totalScore <= 800) rank = 1;
      else if (totalScore > 800 && totalScore <= 1500) rank = 2;
      else if (totalScore > 1500 && totalScore <= 2500) rank = 3;
      else if (totalScore > 2500 && totalScore <= 4000) rank = 4;

      player.rank = rank;
      await player.save();
    }

    res.status(200).json({ message: "Player updated successfully", player });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllPlayersAndRank = async (req, res) => {
  try {
    const players = await PlayerModel.find().select("-password");

    players.sort((a, b) => {
      if (b.totalScore === a.totalScore) {
        return a.totalTime - b.totalTime;
      }
      return b.totalScore - a.totalScore;
    });

    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllPlayersByRank = async (req, res) => {
  try {
    const rank = req.body.rank;
    const players = await PlayerModel.find({ rank }).select("-password");

    players.sort((a, b) => {
      if (b.totalScore === a.totalScore) {
        return a.totalTime - b.totalTime;
      }
      return b.totalScore - a.totalScore;
    });

    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
import PlayerTest from "../models/playerTest.model.js";
import moment from 'moment';

export const createOrUpdatePlayerTest = async (req, res) => {
  try {
    const { testId, doneAt, time, score, questions } = req.body;

    if (!testId) {
      return res.status(400).json({ message: "Test ID is required" });
    }

    const playerId = req.user._id;
    const currentDoneAt = doneAt ? new Date(doneAt) : new Date();

    const existingPlayerTest = await PlayerTest.findOne({ testId, playerId });

    if (existingPlayerTest) {
      const createdAt = moment(existingPlayerTest.createdAt);
      const updatedAt = moment();
      const newTime = moment.duration(updatedAt.diff(createdAt)).asSeconds();
      const newDoneAt = updatedAt.toISOString();

      const updatedPlayerTest = await PlayerTest.findByIdAndUpdate(
        existingPlayerTest._id,
        { questions, score, time: newTime, doneAt: newDoneAt },
        { new: true }
      );

      return res.status(200).json(updatedPlayerTest);
    } else {
      // Create a new PlayerTest
      const newPlayerTest = new PlayerTest({
        playerId,
        testId,
        doneAt: currentDoneAt,
        time,
        score,
        questions,
      });

      const savedPlayerTest = await newPlayerTest.save();
      return res.status(201).json(savedPlayerTest);
    }
  } catch (error) {
    console.error("Error creating or updating PlayerTest:", error);
    res.status(500).json({ message: "Error creating or updating PlayerTest", error: error.message });
  }
};


export const getPlayerTests = async (req, res) => {
  try {
    const playerTest = await PlayerTest.find();

    if (!playerTest) {
      return res.status(404).json({ message: "PlayerTest not found" });
    }

    res.status(200).json(playerTest);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving PlayerTest", error });
  }
};

export const getPlayerTestById = async (req, res) => {
  try {
    const { id } = req.params;

    const playerTest = await PlayerTest.findById(id);

    if (!playerTest) {
      return res.status(404).json({ message: "PlayerTest not found" });
    }

    res.status(200).json(playerTest);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving PlayerTest", error });
  }
};

export const getPlayerTestsByPlayerId = async (req, res) => {
  try {
    const playerId = req.user._id;

    const playerTests = await PlayerTest.find({ playerId });

    res.status(200).json(playerTests);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving PlayerTests", error });
  }
};

export const updatePlayerTest = async (req, res) => {
    try {
      const { id } = req.params;
      const { questions } = req.body;
  
      const playerTest = await PlayerTest.findById(id);
  
      if (!playerTest) {
        return res.status(404).json({ message: "PlayerTest not found" });
      }
  
      const correctAnswersCount = questions.filter(q => q.isCorrect).length;
      const score = (correctAnswersCount / questions.length) * 100;
  
      const createdAt = moment(playerTest.createdAt);
      const updatedAt = moment();
      const time = moment.duration(updatedAt.diff(createdAt)).asSeconds();
      const doneAt = updatedAt.toISOString();
  
      const updatedPlayerTest = await PlayerTest.findByIdAndUpdate(
        id,
        { questions, score, time, doneAt },
        { new: true }
      );
  
      if (!updatedPlayerTest) {
        return res.status(404).json({ message: "PlayerTest not found" });
      }
  
      res.status(200).json(updatedPlayerTest);
    } catch (error) {
      res.status(500).json({ message: "Error updating PlayerTest", error });
    }
  };
  
export const deletePlayerTest = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPlayerTest = await PlayerTest.findByIdAndDelete(id);

    if (!deletedPlayerTest) {
      return res.status(404).json({ message: "PlayerTest not found" });
    }

    res.status(200).json({ message: "PlayerTest deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting PlayerTest", error });
  }
};

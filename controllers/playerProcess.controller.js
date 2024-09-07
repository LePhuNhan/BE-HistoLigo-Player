import PlayerProcess from "../models/playerProcess.model.js";
import Topic from "../models/topic.model.js";
import Test from "../models/test.model.js";

export const createPlayerProcess = async (req, res) => {
  const playerId = req.user._id;
  const { countryId } = req.body;

  try {
    let existingPlayerProcess = await PlayerProcess.findOne({
      playerId,
      countryId,
    });
    if (!existingPlayerProcess) {
      const topics = await Topic.find({ countryId });
      const testCountInTopics = [];
      for (const topic of topics) {
        const testCount = await Test.countDocuments({ topicId: topic.id });
        testCountInTopics.push({
          topicId: topic.id,
          totalTest: testCount,
          doneTest: 0,
          tests: [],
        });
      }

      const newPlayerProcess = new PlayerProcess({
        playerId,
        countryId,
        topics: testCountInTopics,
      });

      existingPlayerProcess = await newPlayerProcess.save();
    }

    res.status(200).json({
      message: "Ok",
      existingPlayerProcess,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating player process", error });
  }
};

export const getCombinedTopicsWithPlayerProgress = async (req, res) => {
  try {
    const playerId = req.user._id;
    const { countryId } = req.query;
    console.log(countryId);

    const playerProcesses = await PlayerProcess.findOne({ playerId,countryId });
    
    if (!playerProcesses) {
      return res.status(200).json([]);
    }

    const topics = await Topic.find({ countryId }).populate("countryId");

    const playerTopicProgressMap = new Map();
    playerProcesses.topics.forEach((topic) => {
      playerTopicProgressMap.set(topic.topicId.toString(), topic);
    });

    const combinedTopics = topics.map((topic) => {
      const progress = playerTopicProgressMap.get(topic._id.toString());

      return {
        _id: topic._id,
        name: topic.name,
        description: topic.description,
        image: topic.image,
        countryId: topic.countryId ? topic.countryId._id : null,
        status: topic.status,
        totalTest: progress ? progress.totalTest : 0,
        doneTest: progress ? progress.doneTest : 0,
        createdAt: topic.createdAt,
        updatedAt: topic.updatedAt,
        __v: topic.__v,
      };
    });

    res.status(200).json(combinedTopics);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching combined topics",
      error: error.message,
    });
  }
};

export const getAllPlayerProcesses = async (req, res) => {
  try {
    const playerId = req.user._id;

    const playerProcesses = await PlayerProcess.findOne({ playerId });

    if (!playerProcesses) {
      return res.status(404).json({ message: "Player process not found" });
    }

    res.status(200).json(playerProcesses);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching player processes",
      error: error.message,
    });
  }
};

export const updatePlayerProcessById = async (req, res) => {
  try {
    const { id } = req.params;
    const { playerId, countryId, topics, tests } = req.body;

    const updatedPlayerProcess = await PlayerProcess.findByIdAndUpdate(
      id,
      { playerId, countryId, topics, tests },
      { new: true }
    );

    if (!updatedPlayerProcess) {
      return res.status(404).json({ message: "Player process not found" });
    }

    res.status(200).json({
      message: "PlayerProcess updated successfully",
      updatedPlayerProcess,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating player process", error });
  }
};

export const deletePlayerProcessById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPlayerProcess = await PlayerProcess.findByIdAndDelete(id);

    if (!deletedPlayerProcess) {
      return res.status(404).json({ message: "Player process not found" });
    }

    res.status(200).json({ message: "Player process deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting player process", error });
  }
};

export const updatePlayerProcessWithPlayerId = async (req, res) => {
  try {
    const playerId = req.user._id;
    const { countryId, topics } = req.body;

    let playerProcess = await PlayerProcess.findOne({ playerId, countryId });
    if (!playerProcess) {
      return res.status(404).json({ message: "Player process not found" });
    }

    for (const topic of topics) {
      const { topicId, tests } = topic;

      // Find the tests for the current topicId
      const foundTests = await Test.find({ topicId });

      // Update or add the topic in playerProcess
      let playerTopic = playerProcess.topics.find(
        (t) => t.topicId.toString() === topicId
      );
      if (!playerTopic) {
        playerTopic = {
          topicId,
          totalTest: foundTests.length,
          doneTest: 0,
          tests: [],
        };
        playerProcess.topics.push(playerTopic);
      } else {
        playerTopic.totalTest = foundTests.length;
      }

      // Create a map of existing test IDs in playerTopic to avoid duplication
      const existingTestIds = new Set(
        playerTopic.tests.map((t) => t.testId.toString())
      );

      // Update or add the tests in the playerTopic
      for (const test of tests) {
        const { testId, score, time } = test;

        if (!existingTestIds.has(testId.toString())) {
          // Add new test
          playerTopic.tests.push({ testId, score, time });
          existingTestIds.add(testId.toString());
        } else {
          // Update existing test
          let playerTest = playerTopic.tests.find(
            (t) => t.testId.toString() === testId
          );
          if (playerTest) {
            playerTest.score = score;
            playerTest.time = time;
          }
        }
      }

      // Update doneTest count
      playerTopic.doneTest = playerTopic.tests.length;
    }

    // Save the updated player process
    await playerProcess.save();

    res
      .status(200)
      .json({ message: "Player process updated successfully", playerProcess });
  } catch (error) {
    res.status(500).json({
      message: "Error updating player process",
      error: error.message,
    });
  }
};

export const saveTestsResult = async (req, res) => {
  try {
    const playerId = req.user._id;
    const { testId, score, time } = req.body;
    const test = await Test.findById(testId);
    const countryId = test.countryId;
    const topicId = test.topicId;
    const playerProcess = await PlayerProcess.findOne({ playerId, countryId });
    if(!playerProcess){
      return res.status(404).json({
        message: "Player Process not found"
      });
      
    }
    console.log(topicId);
    console.log(playerProcess);
    
    const topicProcess = playerProcess.topics.find(
      (item) => item.topicId.toString() == topicId.toString()
    );
    console.log(topicProcess);
    
    const existTestInTopicProcess = topicProcess.tests.find(
      (item) => item.testId.toString() == testId.toString()
    );
    
    if (!existTestInTopicProcess) {
      topicProcess.tests.push({
        testId,
        score,
        time,
      });
    } else {
      existTestInTopicProcess.score = score;
      existTestInTopicProcess.time = time;
    }
    topicProcess.doneTest = topicProcess.tests.length;
    await playerProcess.save();
    return res
      .status(200)
      .json({ message: "Player process updated successfully", playerProcess });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating player process",
      error: error.message,
    });
  }
};

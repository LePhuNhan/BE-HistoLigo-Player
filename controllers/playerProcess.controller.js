import PlayerProcess from "../models/playerProcess.model.js";
import Topic from "../models/topic.model.js";
import Test from "../models/test.model.js";

export const createPlayerProcess = async (req, res) => {
  const { playerId, countryId, topics, tests } = req.body;

  try {
    const existingPlayerProcess = await PlayerProcess.findOne({
      playerId,
    });
    if (existingPlayerProcess) {
      return res.status(400).json({ message: "PlayerProcess already exists" });
    }
    const newPlayerProcess = new PlayerProcess({
      playerId,
      countryId,
      topics,
      tests,
    });

    const savedPlayerProcess = await newPlayerProcess.save();
    res.status(201).json({
      message: "PlayerProcess created successfully",
      savedPlayerProcess,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating player process", error });
  }
};

export const getCombinedTopicsWithPlayerProgress = async (req, res) => {
  try {
    const playerId = req.user._id;

    const playerProcesses = await PlayerProcess.findOne({ playerId });
    console.log(playerProcesses);
    if (!playerProcesses) {
      return res.status(404).json({ message: "Player process not found" });
    }

    const topics = await Topic.find().populate("countryId");

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

export const updatePlayerProcessWithPlayerId = async (req, res) => {
  try {
    const playerId = req.user._id;
    const { countryId, topics } = req.body;

    let playerProcess = await PlayerProcess.findOne({ playerId });

    if (!playerProcess) {
      return res.status(404).json({ message: "Player process not found" });
    }

    // Process each topic from the request
    for (const incomingTopic of topics) {
      const existingTopicIndex = playerProcess.topics.findIndex(
        (topic) => String(topic.topicId) === String(incomingTopic.topicId)
      );
      console.log(playerProcess.topics.map(t => t.topicId));
      
      // Fetch all tests for the current topic
      const testsByTopic = await Test.find({ topicId: incomingTopic.topicId });

      if (existingTopicIndex !== -1) {
        // Update existing topic
        const existingTopic = playerProcess.topics[existingTopicIndex];

        // Add new tests that are not already in the topic
        testsByTopic.forEach((dbTest) => {
          if (!existingTopic.tests.some((test) => String(test.testId) === String(dbTest._id))) {
            existingTopic.tests.push({
              testId: dbTest._id,
              score: 0,
              time: 0,
            });
          }
        });

        // Update existing tests with scores and times from the request
        incomingTopic.tests.forEach((incomingTest) => {
          const existingTest = existingTopic.tests.find(
            (test) => String(test.testId) === String(incomingTest.testId)
          );

          if (existingTest) {
            existingTest.score = incomingTest.score;
            existingTest.time = incomingTest.time;
          }
        });

        // Update topic stats
        existingTopic.totalTest = existingTopic.tests.length;
        existingTopic.doneTest = existingTopic.tests.filter(
          (test) => test.score !== null && test.score > 0
        ).length;

        playerProcess.topics[existingTopicIndex] = existingTopic;
      } else {
        // Add new topic
        const newTopic = {
          topicId: incomingTopic.topicId,
          tests: testsByTopic.map((dbTest) => ({
            testId: dbTest._id,
            score: 0,
            time: 0,
          })),
          totalTest: testsByTopic.length,
          doneTest: 0,
        };

        // Update new topic with scores and times from the request
        incomingTopic.tests.forEach((incomingTest) => {
          const test = newTopic.tests.find(
            (test) => String(test.testId) === String(incomingTest.testId)
          );

          if (test) {
            test.score = incomingTest.score;
            test.time = incomingTest.time;
          }
        });

        playerProcess.topics.push(newTopic);
      }
    }

    // Update countryId if provided
    if (countryId) {
      playerProcess.countryId = countryId;
    }

    // Save updated player process
    const updatedPlayerProcess = await playerProcess.save();

    res.status(200).json({
      message: "PlayerProcess updated successfully",
      updatedPlayerProcess,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating player process",
      error: error.message,
    });
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

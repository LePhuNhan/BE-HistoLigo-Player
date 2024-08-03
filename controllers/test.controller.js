import Test from "../models/test.model.js";

export const createTest = async (req, res) => {
  const { name, createdBy, questionNumber, topicId, countryId, status } =
    req.body;
    
  try {
    const existingTest = await Test.findOne({
      name,
    });
    if (existingTest) {
      return res.status(400).json({ message: "Test already exists" });
    }
    const newTest = new Test({
      name,
      createdBy,
      questionNumber,
      topicId,
      countryId,
      status,
    });

    await newTest.save();
    res.status(201).json({ message: "Test created successfully", newTest });
  } catch (error) {
    res.status(500).json({ message: "Failed to create test", error });
  }
};

export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().populate("topicId countryId");
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: "Failed to get tests", error });
  }
};

export const getTestById = async (req, res) => {
  const { id } = req.params;
  try {
    const test = await Test.findById(id).populate("topicId countryId");
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: "Failed to get test", error });
  }
};

export const updateTest = async (req, res) => {
  const { id } = req.params;
  const { name, createdBy, questionNumber, topicId, countryId, status } =
    req.body;
  try {
    const existingTest = await Test.findOne({
      name,
    });
    if (existingTest) {
      return res.status(400).json({ message: "Test already have this name" });
    }
    const updatedTest = await Test.findByIdAndUpdate(
      id,
      { name, createdBy, questionNumber, topicId, countryId, status },
      { new: true, runValidators: true }
    );
    if (!updatedTest) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json({ message: "Test updated successfully", updatedTest });
  } catch (error) {
    res.status(500).json({ message: "Failed to update test", error });
  }
};

export const deleteTest = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTest = await Test.findByIdAndDelete(id);
    if (!deletedTest) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete test", error });
  }
};

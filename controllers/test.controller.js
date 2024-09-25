import Test from "../models/test.model.js";

export const createTest = async (req, res) => {
  const { name, createdBy, questionNumber, topicId, classId, status } =
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
      classId,
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
    const tests = await Test.find();
    const contentLanguage=req.contentLanguage;
    for (const test of tests ) {
      if(contentLanguage){
        test.name=test.localeData[contentLanguage]?.name;
        test.localeData=undefined;
      }
      
    }
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: "Failed to get tests", error });
  }
};

export const getTestById = async (req, res) => {
  const { id } = req.params;
  try {
    const test = await Test.findById(id);
    const contentLanguage=req.contentLanguage;
    if(contentLanguage){
      test.name=test.localeData[contentLanguage]?.name;
      test.localeData=undefined;
    }
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
  const { name, createdBy, questionNumber, topicId, classId, status, localeData } =
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
      { name, createdBy, questionNumber, topicId, classId, status, localeData },
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
export const getTestsByTopicId = async (req, res) => {
  const { topicId } = req.params;

  try {
    const tests = await Test.find({ topicId });

    const contentLanguage = req.contentLanguage;
    if (contentLanguage) {
      for (const test of tests) {
        test.name = test.localeData[contentLanguage]?.name;
        test.localeData = undefined;
      }
    }

    if (!tests.length) {
      return res.status(404).json({ message: "No tests found for this topic" });
    }

    res.status(200).json(tests);
  } catch (error) {
    console.error("Error in getTestsByTopicId:", error);

    res.status(500).json({ message: "Failed to get tests by topic", error: error.message || error });
  }
};


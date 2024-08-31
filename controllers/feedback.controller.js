import Feedback from "../models/feedback.model.js";


export const createFeedback = async (req, res) => {
  try {
    const { content, testId } = req.body;
    const createdBy = req.user._id;

    const feedback = new Feedback({
      createdBy,
      content,
      testId,
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback created successfully", feedback });
  } catch (error) {
    res.status(500).json({ message: "Error creating feedback", error: error.message });
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('createdBy', 'userName').populate('testId', 'name');
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error: error.message });
  }
};

export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate('createdBy', 'userName').populate('testId', 'name');
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error: error.message });
  }
};

export const updateFeedbackStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback status updated successfully", feedback });
  } catch (error) {
    res.status(500).json({ message: "Error updating feedback", error: error.message });
  }
};

// Delete feedback by ID
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting feedback", error: error.message });
  }
};

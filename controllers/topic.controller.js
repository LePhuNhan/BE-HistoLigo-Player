import Topic from '../models/topic.model.js';
import mongoose from 'mongoose';

export const createTopic = async (req, res) => {
    try {
        const { name, description, image, countryId, status, localeData } = req.body;
        if (!name || !description || !image || status === undefined || !localeData) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (name.length > 250) {
            return res.status(400).json({ message: "Name must be less than 250 characters" });
        }
        if (description.length > 1000) {
            return res.status(400).json({ message: "Description must be less than 1000 characters" });
        }
        if (image.length > 1000) {
            return res.status(400).json({ message: "Image URL must be less than 1000 characters" });
        }
        if (![0, 1].includes(status)) {
            return res.status(400).json({ message: "Status must be 0 or 1" });
        }

        const existingTopic = await Topic.findOne({ name});
        if (existingTopic) {
            return res.status(400).json({ message: "Topic name already exists" });
        }
        const newTopic = new Topic({ name, description, image, countryId, status, localeData });
        
        await newTopic.save();
        res.status(201).json({message: "Topic created successfully", newTopic});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getTopics = async (req, res) => {
    try {
        const topics = await Topic.find().populate('countryId');
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTopicById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Topic not found" });
        }
        const topic = await Topic.findById(id).populate('countryId');
        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTopic = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image, countryId, status, localeData } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Topic not found" });
        }

        if (!name || !description || !image || status === undefined || !localeData) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (name.length > 250) {
            return res.status(400).json({ message: "Name must be less than 250 characters" });
        }
        if (description.length > 1000) {
            return res.status(400).json({ message: "Description must be less than 1000 characters" });
        }
        if (image.length > 1000) {
            return res.status(400).json({ message: "Image URL must be less than 1000 characters" });
        }
        if (![0, 1].includes(status)) {
            return res.status(400).json({ message: "Status must be 0 or 1" });
        }

        const updatedTopic = await Topic.findByIdAndUpdate(
            id,
            { name, description, image, countryId, status, localeData },
            { new: true }
        ).populate('countryId');
        if (!updatedTopic) {
            return res.status(404).json({ message: "Topic not found" });
        }
        res.status(200).json({ message: "Topic updated successfully", updatedTopic });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Duplicate key error: Topic name must be unique." });
        }
        res.status(500).json({ message: error.message });
    }
};


export const deleteTopic = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Topic not found" });
        }
        const deletedTopic = await Topic.findByIdAndDelete(id);
        if (!deletedTopic) {
            return res.status(404).json({ message: "Topic not found" });
        }
        res.status(200).json({ message: "Topic deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

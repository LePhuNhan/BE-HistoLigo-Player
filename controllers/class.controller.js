import Class from '../models/class.model.js';
import mongoose from 'mongoose';

export const createClass = async (req, res) => {
    try {
        const { name, description, image, status, localeData } = req.body;

        if (!name || !description || !image || status === undefined || !localeData) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (name.length > 150) {
            return res.status(400).json({ message: "Name must be less than 150 characters" });
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

        const existingClass = await Class.findOne({ name });
        if (existingClass) {
            return res.status(400).json({ message: "Class name already exists" });
        }

        const newClass = new Class({ name, description, image, status, localeData });
        await newClass.save();
        res.status(201).json({ message: "Class created successfully", newClass });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getClasses = async (req, res) => {
    try {
        const classes = await Class.find();
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getClassById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Class not found" });
        }
        const Class = await Class.findById(id);
        if (!Class) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json(Class);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image, status, localeData } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Class not found" });
        }

        if (!name || !description || !image || status === undefined || !localeData) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (name.length > 150) {
            return res.status(400).json({ message: "Name must be less than 150 characters" });
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

        const existingClass = await Class.findOne({ name});
        if (existingClass) {
            return res.status(400).json({ message: "Class name already exists" });
        }

        const updatedClass = await Class.findByIdAndUpdate(
            id,
            { name, description, image, status, localeData },
            { new: true }
        );
        if (!updatedClass) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json({ message: "Class updated successfully", updatedClass });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Class not found" });
        }
        const deletedClass = await Class.findByIdAndDelete(id);
        if (!deletedClass) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json({ message: "Class deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

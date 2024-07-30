import Language from '../models/language.model.js';
import mongoose from 'mongoose';

export const createLanguage = async (req, res) => {
    try {
        const { name, label, content } = req.body;
        const newLanguage = new Language({ name, label, content });
        await newLanguage.save();
        res.status(201).json(newLanguage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getLanguages = async (req, res) => {
    try {
        const languages = await Language.find();
        res.status(200).json(languages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLanguageById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Language not found" });
        }
        const language = await Language.findById(id);
        if (!language) {
            return res.status(404).json({ message: "Language not found" });
        }
        res.status(200).json(language);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Language not found" });
        }
        const { name, label, content } = req.body;
        const updatedLanguage = await Language.findByIdAndUpdate(
            id,
            { name, label, content },
            { new: true }
        );
        if (!updatedLanguage) {
            return res.status(404).json({ message: "Language not found" });
        }
        res.status(200).json(updatedLanguage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Language not found" });
        }
        const deletedLanguage = await Language.findByIdAndDelete(id);
        if (!deletedLanguage) {
            return res.status(404).json({ message: "Language not found" });
        }
        res.status(200).json({ message: "Language deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

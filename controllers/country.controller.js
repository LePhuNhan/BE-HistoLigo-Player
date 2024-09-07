import Country from '../models/country.model.js';
import mongoose from 'mongoose';

export const createCountry = async (req, res) => {
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

        const existingCountry = await Country.findOne({ name });
        if (existingCountry) {
            return res.status(400).json({ message: "Country name already exists" });
        }

        const newCountry = new Country({ name, description, image, status, localeData });
        await newCountry.save();
        res.status(201).json({ message: "Country created successfully", newCountry });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getCountries = async (req, res) => {
    try {
        const countries = await Country.find();
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCountryById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Country not found" });
        }
        const country = await Country.findById(id);
        if (!country) {
            return res.status(404).json({ message: "Country not found" });
        }
        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCountry = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image, status, localeData } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Country not found" });
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

        const existingCountry = await Country.findOne({ name});
        if (existingCountry) {
            return res.status(400).json({ message: "Country name already exists" });
        }

        const updatedCountry = await Country.findByIdAndUpdate(
            id,
            { name, description, image, status, localeData },
            { new: true }
        );
        if (!updatedCountry) {
            return res.status(404).json({ message: "Country not found" });
        }
        res.status(200).json({ message: "Country updated successfully", updatedCountry });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCountry = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Country not found" });
        }
        const deletedCountry = await Country.findByIdAndDelete(id);
        if (!deletedCountry) {
            return res.status(404).json({ message: "Country not found" });
        }
        res.status(200).json({ message: "Country deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

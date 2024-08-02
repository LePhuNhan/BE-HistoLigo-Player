import Documentation from '../models/documentation.model.js';

export const createDocumentation = async (req, res) => {
  try {
    const documentation = new Documentation(req.body);
    const savedDocumentation = await documentation.save();
    res.status(201).json(savedDocumentation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllDocumentation = async (req, res) => {
  try {
    const documentations = await Documentation.find();
    res.status(200).json(documentations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDocumentationById = async (req, res) => {
  try {
    const documentation = await Documentation.findById(req.params.id);
    if (!documentation) {
      return res.status(404).json({ message: 'Documentation not found' });
    }
    res.status(200).json(documentation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDocumentation = async (req, res) => {
  try {
    const documentation = await Documentation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!documentation) {
      return res.status(404).json({ message: 'Documentation not found' });
    }
    res.status(200).json(documentation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDocumentation = async (req, res) => {
  try {
    const documentation = await Documentation.findByIdAndDelete(req.params.id);
    if (!documentation) {
      return res.status(404).json({ message: 'Documentation not found' });
    }
    res.status(200).json({ message: 'Documentation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Documentation from "../models/documentation.model.js";

export const createDocumentation = async (req, res) => {
  try {
    const documentation = new Documentation(req.body);
    const { name, content } = req.body;
    const existingDocumentation = await Documentation.findOne({
      name,
      content,
    });
    if (existingDocumentation) {
      return res.status(400).json({ message: "Documentation already exists" });
    }
    const savedDocumentation = await documentation.save();
    res
      .status(201)
      .json({
        message: "Documentation created successfully",
        savedDocumentation,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllDocumentation = async (req, res) => {
  try {
    const documentations = await Documentation.find().select('-content');
    // ko lay localeData
    const contentLanguage=req.contentLanguage;
    for (const documentation of documentations ) {
      if(contentLanguage){
        documentation.name=documentation.localeData[contentLanguage]?.name;
        documentation.localeData=undefined;
      }
      
    }
    res.status(200).json(documentations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDocumentationById = async (req, res) => {
  try {
    const documentation = await Documentation.findById(req.params.id);
    const contentLanguage=req.contentLanguage;
    if(contentLanguage){
      documentation.name=documentation.localeData[contentLanguage]?.name;
      documentation.content=documentation.localeData[contentLanguage]?.content;
      documentation.localeData=undefined;
    }
    if (!documentation) {
      return res.status(404).json({ message: "Documentation not found" });
    }
    res.status(200).json(documentation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDocumentation = async (req, res) => {
  try {
    const { name } = req.body;
    const existingDocumentation = await Documentation.findOne({
      name,
    });
    if (existingDocumentation) {
      return res.status(400).json({ message: "Already have this name" });
    }
    const documentation = await Documentation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!documentation) {
      return res.status(404).json({ message: "Documentation not found" });
    }
    res
      .status(200)
      .json({ message: "Documentation updated successfully", documentation });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDocumentation = async (req, res) => {
  try {
    const documentation = await Documentation.findByIdAndDelete(req.params.id);
    if (!documentation) {
      return res.status(404).json({ message: "Documentation not found" });
    }
    res.status(200).json({ message: "Documentation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

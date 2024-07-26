// import Topic from "../models/topic.model.js";

// export const addTopic = async (req, res) => {
//   try {
//     const { name, description, image, countryId, status } = req.body;

//     const newTopic = new Topic({
//       name,
//       description,
//       image,
//       countryId,
//       status,
//     });

//     const savedTopic = await newTopic.save();

//     res
//       .status(201)
//       .json({ message: "Topic added successfully", data: savedTopic });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// export const getTopics = async (req, res) => {
//   try {
//     const topics = await Topic.find().populate("countryId");

//     res.status(200).json({ data: topics });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// export const getTopicById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const topic = await Topic.findById(id).populate("countryId");

//     if (!topic) {
//       return res.status(404).json({ message: "Topic not found" });
//     }

//     res.status(200).json({ data: topic });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

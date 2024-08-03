import mongoose from "mongoose";
const { Schema, model } = mongoose;

const topicSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: "Topic",
        required: true,
    },
    totalTest: {
        type: Number,
        required: true,
    },
    doneTest: {
        type: Number,
        required: true,
    }
});

const playerProcessSchema = new Schema(
    {
        playerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        countryId: {
            type: Schema.Types.ObjectId,
            ref: "Country",
            required: true,
        },
        topics: {
            type: [topicSchema],
            required: true,
        }
    },
    { timestamps: true }
);

const PlayerProcess = model("PlayerProcess", playerProcessSchema);

export default PlayerProcess;

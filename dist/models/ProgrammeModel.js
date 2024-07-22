import mongoose from "mongoose";
const ProgrameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});
const ProgrammeUserTableSchema = new mongoose.Schema({
    programmeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Programme",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});
const Programme = mongoose.model("Programme", ProgrameSchema);
const ProgrammeUserTable = mongoose.model("ProgrammeUserTable", ProgrammeUserTableSchema);
export { Programme, ProgrammeUserTable };

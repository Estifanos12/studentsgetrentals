import mongoose, { Schema, models } from "mongoose";

const quizSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
        },
        options: {
            //value and choice
            type: Array,
            required: true,
        },
        correct_option: {
            //value and choice
            type: Object,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Quiz = models.Quiz || mongoose.model("Quiz", quizSchema);

export default Quiz;

import mongoose, { Schema, models } from "mongoose";

const resultSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
});
const studentSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email_verified: {
            type: Boolean,
            default: false,
        },
        results: {
            //catefory and score
            type: [resultSchema],

            default: [
                {
                    category: "cleaning",
                    score: 0,
                },
                {
                    category: "maintainance",
                    score: 0,
                },
                {
                    category: "plumbing",
                    score: 0,
                },
            ],
        },
        password_reset_token: {
            type: String,
            default: null,
        },
        password_reset_token_expiry: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Student = models.Student || mongoose.model("Student", studentSchema);

export default Student;

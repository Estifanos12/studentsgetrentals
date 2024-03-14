import mongoose, { Schema, models } from "mongoose";

const studentSchema = new Schema(
    {
        name: {
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

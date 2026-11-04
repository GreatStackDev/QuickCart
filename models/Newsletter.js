import mongoose from "mongoose";

const NewsletterSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        subscribedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Newsletter =
    mongoose.models.Newsletter ||
    mongoose.model("Newsletter", NewsletterSchema);

export default Newsletter;
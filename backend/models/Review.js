import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service"
  },
  rating: {
    type: Number,
    required: true
  },
  comment: String
});

export default mongoose.model("Review", reviewSchema);
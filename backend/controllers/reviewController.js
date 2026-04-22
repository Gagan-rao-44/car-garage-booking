import Review from "../models/Review.js";

// ➕ Add Review
export const addReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    res.json({
      message: "Review Added",
      review
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📥 Get Reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "name")
      .populate("serviceId", "name");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
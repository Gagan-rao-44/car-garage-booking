import express from "express";
import {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking
} from "../controllers/bookingController.js";

import { protect } from "../middleware/uthMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/", protect, getBookings);
router.put("/:id", protect, updateBooking);
router.delete("/:id", protect, deleteBooking);

export default router;
import Booking from "../models/Booking.js";


// ➕ Create Booking
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    res.json({
      message: "Booking Created",
      booking
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📥 Get All Bookings
export const getBookings = async (req, res) => {
  try {
    let bookings;

    // 🔥 ADMIN → ALL BOOKINGS
    if (req.user.role === "admin") {
      bookings = await Booking.find()
        .populate("userId", "name email")
        .populate("serviceId", "name price");
    }

    // 🔥 USER → ONLY THEIR BOOKINGS
    else {
      bookings = await Booking.find({ userId: req.user.id })
        .populate("userId", "name email")
        .populate("serviceId", "name price");
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏️ UPDATE BOOKING
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,   // ✅ MUST INCLUDE status
      { returnDocument: "after" }
    );

    res.json({
      message: "Booking Updated",
      booking
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// ❌ DELETE BOOKING
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    // ✅ Check ownership
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.json({ message: "Booking deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
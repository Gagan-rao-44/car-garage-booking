import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

// ✅ EMAIL VALIDATION REGEX
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// 🟢 REGISTER
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  

  try {
    // ✅ Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Enter valid email (example: abc@gmail.com)"
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user"   // ✅ default role
    });

    res.status(201).json({
      message: "Register Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// 🟢 USER LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: "Enter email & password" });
    }

    // ✅ Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },   // ✅ include role
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// 🟢 ADMIN LOGIN
export const adminLoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: "Enter email & password" });
    }

    // ✅ Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const role = String(user.role || "user").toLowerCase();

    if (role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    const token = jwt.sign(
      { id: user._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Admin Login Successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: "admin"
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // 1️⃣ Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Generate token
    const token = crypto.randomBytes(32).toString("hex");

    // 3️⃣ Save token in DB
    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 mins

    await user.save();

    // 4️⃣ Create reset link
    const resetURL = `http://localhost:5173/reset-password/${token}`;

    // 5️⃣ Send email
    await sendEmail(
      user.email,
      "Password Reset Request",
      `Click this link to reset your password:\n\n${resetURL}\n\nThis link expires in 10 minutes.`
    );

    res.json({ message: "Reset link sent to email" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};



export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // 1️⃣ Find user with valid token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token"
      });
    }

    // 2️⃣ Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Update password
    user.password = hashedPassword;

    // 4️⃣ Clear token fields
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
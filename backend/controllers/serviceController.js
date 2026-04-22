import Service from "../models/Service.js";

// ➕ Add Service
export const addService = async (req, res) => {
  try {
    const service = await Service.create(req.body);

    res.json({
      message: "Service Added",
      service
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📥 Get All Services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏️ Update Service
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({
      message: "Service Updated",
      service
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❌ Delete Service
export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
import express from "express";
import {
  addService,
  getServices,
  updateService,
  deleteService
} from "../controllers/serviceController.js";

const router = express.Router();

router.post("/", addService);
router.get("/", getServices);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
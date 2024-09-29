import express from "express";
import AppController from "../controllers/AppController.js";

console.log(AppController.getStatus); // Check if this logs a function
console.log(AppController.getStats); // Check if this logs a function

const router = express.Router();

// Define routes
router.get("/status", AppController.getStatus);
router.get("/stats", AppController.getStats);

export default router;

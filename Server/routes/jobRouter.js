import express from "express";
import {
  getAllJobs,
  createJob,
  getMyJobs,
  updateJob,
  deleteJob,
  getSingleJob,
} from "../controllers/jobController.js";
import { isAuthorized } from "../middleware/Auth.js";

const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post", isAuthorized, createJob);
router.get("/myJob", isAuthorized, getMyJobs);
router.put("/update/:id", isAuthorized, updateJob);
router.delete("/delete/:id", isAuthorized, deleteJob);
router.get("/:id", isAuthorized, getSingleJob);

export default router;

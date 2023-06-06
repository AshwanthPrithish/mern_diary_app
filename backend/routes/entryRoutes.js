const express = require("express");
const {
  getEntries,
  createEntry,
  getEntryById,
  updateEntryById,
  deleteEntryById,
} = require("../controllers/entryController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getEntries);
router.route("/create").post(protect, createEntry);
router
  .route("/:id")
  .get(protect, getEntryById)
  .put(protect, updateEntryById)
  .delete(protect, deleteEntryById);

module.exports = router;

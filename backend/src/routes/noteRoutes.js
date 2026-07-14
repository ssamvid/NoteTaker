import express from "express";
import * as NoteController from "../controllers/noteController.js";
import {
  createNoteRules,
  updateNoteRules,
  handleNoteValidation,
} from "../validator/noteValidator.js";

const router = express.Router();

router.get("/api/notes", NoteController.getNotes);
router.post("/api/notes", createNoteRules, handleNoteValidation, NoteController.addNote);
router.put("/api/notes/:id", updateNoteRules, handleNoteValidation, NoteController.updateNote);
router.delete("/api/notes/:id", NoteController.deleteNote);

export default router;

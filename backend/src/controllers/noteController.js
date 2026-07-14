import * as NoteModel from "../models/noteModel.js";

export async function getNotes(req, res) {
  try {
    const notes = await NoteModel.getAll();
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch notes." });
  }
}

export async function addNote(req, res) {
  try {
    const note = await NoteModel.addNote(req.body);
    return res.status(201).json(note);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create note." });
  }
}

export async function updateNote(req, res) {
  try {
    const updatedNote = await NoteModel.updateNote(req.params.id, req.body);

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found." });
    }

    return res.status(200).json(updatedNote);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update note." });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await NoteModel.deleteNote(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found." });
    }

    return res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete note." });
  }
}

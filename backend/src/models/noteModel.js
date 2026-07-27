import Note from "../../data/note.js";

export async function getAllForUser(userId) {
  return Note.find({ userId }).sort({ updatedAt: -1 });
}

export async function addNote(note) {
  return Note.create(note);
}

export async function getOneForUser(id, userId) {
  return Note.findOne({ _id: id, userId });
}

export async function updateNoteForUser(id, userId, updatedFields) {
  return Note.findOneAndUpdate({ _id: id, userId }, updatedFields, {
    new: true,
    runValidators: true,
  });
}

export async function deleteNoteForUser(id, userId) {
  return Note.findOneAndDelete({ _id: id, userId });
}

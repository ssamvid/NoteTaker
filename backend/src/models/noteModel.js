import Note from "./Note.js";

export async function getAll() {
  return Note.find().sort({ updatedAt: -1 });
}

export async function addNote(note) {
  return Note.create(note);
}

export async function updateNote(id, updatedFields) {
  return Note.findByIdAndUpdate(id, updatedFields, {
    new: true,
    runValidators: true,
  });
}

export async function deleteNote(id) {
  return Note.findByIdAndDelete(id);
}

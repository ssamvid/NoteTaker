import dotenv from "dotenv";
import dbConnection from "./config/db.js";
import Note from "./models/Note.js";
import sampleNotes from "../data/note.js";

dotenv.config();

async function seed() {
  await dbConnection();
  await Note.deleteMany({});
  await Note.insertMany(
    sampleNotes.map(({ id, ...note }) => note),
  );
  console.log("Seeded sample notes.");
  process.exit(0);
}

seed();

import dotenv from "dotenv";
import dbConnection from "./config/db.js";
import Note from "../data/note.js";
import sampleNotes from "../data/sampleNotes.js";

dotenv.config();

async function seed() {
  await dbConnection();
  await Note.deleteMany({});
  await Note.insertMany(sampleNotes);
  console.log("Seeded sample notes.");
  process.exit(0);
}

seed();

import dotenv from "dotenv";
import dbConnection from "./config/db.js";
import Note from "../data/note.js";
import User from "../data/user.js";
import sampleNotes from "../data/sampleNotes.js";

dotenv.config();

async function seed() {
  await dbConnection();

  const seedEmail = process.env.SEED_USER_EMAIL;
  const owner = seedEmail
    ? await User.findOne({ email: seedEmail.toLowerCase() })
    : await User.findOne().sort({ createdAt: 1 });

  if (!owner) {
    console.error("No user found to seed notes for. Register a user first (or set SEED_USER_EMAIL).");
    process.exit(1);
  }

  await Note.deleteMany({});
  await Note.insertMany(sampleNotes.map((note) => ({ ...note, userId: owner._id })));
  console.log("Seeded sample notes.");
  process.exit(0);
}

seed();

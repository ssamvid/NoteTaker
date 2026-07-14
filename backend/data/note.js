import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
      trim: true,
    },
    body: {
      required: true,
      type: String,
      trim: true,
    },
    category: {
      required: true,
      type: String,
      enum: ["Personal", "Work", "Study"],
    },
    pinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: false, updatedAt: true },
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

const Note = mongoose.model("Note", noteSchema);
export default Note;

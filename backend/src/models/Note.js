import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["Personal", "Work", "Study"],
    },
    pinned: { type: Boolean, default: false },
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

export default mongoose.model("Note", noteSchema);

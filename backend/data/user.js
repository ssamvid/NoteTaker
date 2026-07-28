import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true,
    },
    email: {
      required: true,
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    resetPasswordTokenHash: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.resetPasswordTokenHash;
        delete ret.resetPasswordExpires;
        return ret;
      },
    },
  },
);

const User = mongoose.model("User", userSchema);
export default User;

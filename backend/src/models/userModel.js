import User from "../../data/user.js";

export async function findByEmail(email) {
  return User.findOne({ email: email.toLowerCase() });
}

export async function findById(id) {
  return User.findById(id);
}

export async function createUser(user) {
  return User.create(user);
}

export async function setResetToken(userId, tokenHash, expires) {
  return User.findByIdAndUpdate(userId, {
    resetPasswordTokenHash: tokenHash,
    resetPasswordExpires: expires,
  });
}

export async function findByResetTokenHash(tokenHash) {
  return User.findOne({
    resetPasswordTokenHash: tokenHash,
    resetPasswordExpires: { $gt: new Date() },
  }).select("+resetPasswordTokenHash +resetPasswordExpires");
}

export async function resetPassword(userId, passwordHash) {
  return User.findByIdAndUpdate(userId, {
    $set: { password: passwordHash },
    $unset: { resetPasswordTokenHash: "", resetPasswordExpires: "" },
  });
}

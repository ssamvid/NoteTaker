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

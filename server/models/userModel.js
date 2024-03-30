import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user", // VERY IMPORTANT: CHANGE THIS TO "user" ONCE ADMIN IS CREATED
  },
  refreshToken: {
    type: String,
    default: "",
  },
});

userSchema.statics.signup = async function (username, email, password, role) {
  const usernameExists = await this.findOne({ username });
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("Email address is already in use");
  }
  if (usernameExists) {
    throw Error("Username is already in use");
  }
  if (!username || !email || !password) {
    throw Error("Username, email and password are required");
  }
  if (!validator.isLength(username, { min: 8 })) {
    throw Error("Username must be at least 8 characters long");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email address");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is too weak");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash, role });
  return user;
};

userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields are required");
  }

  const user = await this.findOne({ username });
  if (!user) {
    throw Error("Incorrect email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw Error("Incorrect email or password");
  }

  return user;
};

export const User = mongoose.model("User", userSchema);

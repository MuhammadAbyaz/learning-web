import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.statics.findAndValidate = async function (username, password) {
  const user = await this.findOne({ username });
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : false;
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
export const User = mongoose.model("User", userSchema);

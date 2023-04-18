const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
    minLength: 3,
  },
  name: String,
  passwordHash: String,
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (_document, { username, name, _id, notes }) => ({
    username,
    name,
    id: _id.toString(),
    notes,
  }),
});

const User = mongoose.model("User", userSchema);

module.exports = User;

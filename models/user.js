const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

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

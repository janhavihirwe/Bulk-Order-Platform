const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  email:{type:String,required:true},
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
}, { versionKey: false });

const User = mongoose.model("User", UserSchema);
module.exports = User;

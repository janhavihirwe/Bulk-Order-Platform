const mongoose = require("mongoose");
const bcrypt=require("bcrypt")

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  email:{type:String,required:true,unique: true},
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
}, { versionKey: false });

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  

const User = mongoose.model("User", UserSchema);
module.exports = User;

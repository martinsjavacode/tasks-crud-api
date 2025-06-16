import mongoose from "mongoose";

const Userschema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  created: {
    type: Date,
  },
});

const User = mongoose.model("User", Userschema);

export default User;

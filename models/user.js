import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt", deletedAt: "deletedAt" }, collection:"new_users" }
);

const User = mongoose.model("User", UserSchema);
export default User;

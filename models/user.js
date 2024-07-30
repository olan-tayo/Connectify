import mongoose from "mongoose";
const { Schema, model } = mongoose;

const profileSchema = new Schema({
  bios: {
    type: String,
    required: [true, "Bios is required"],
    unique: true,
  },
  profilePicture: {
    type: String,
    required: [true, "Profile picture is required"],
    unique: true,
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    unique: true,
  },
  userId: {
    type: Schema.Types.id,
    required: [true, "User is required"],
    unique: true,
  },
});

const profile = model("profile", profileSchema);
export default profile;

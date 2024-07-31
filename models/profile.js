import mongoose from "mongoose";
const { Schema, model } = mongoose;

const profileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User is required"],
      ref: "users",
      unique: true,
    },
    bios: {
      type: String,
      required: [true, "Bios is required"],
    },
    profilePicture: {
      type: String,
      required: [true, "Profile picture is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
  },
  { timestamps: true }
);

const Profile = model("profile", profileSchema);
export default Profile;

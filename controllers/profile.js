import createUser from "../models/auth.js";
import Profile from "../models/profile.js";
import { ObjectId } from "mongodb";

export const createProfile = async (req, res) => {
  const id = req.params.id;
  const { bios, profilePicture, location } = req.body;
  try {
    if (bios !== "" && profilePicture !== "" && location !== "") {
      const createUserProfile = new Profile({
        bios,
        profilePicture,
        location,
        userId: new ObjectId(id),
      });

      const createdProfile = await createUserProfile.save();
      if (!createdProfile) {
        return res
          .status(500)
          .json({ error: "Could not create profile. Try again later." });
      }

      res.status(201).json({ message: "Profile created successfully!" });
    }
    res.status(500).json({ error: "All the fields are important" });
  } catch (err) {
    console.log(err.errorResponse);
    if (err.errorResponse) {
      res.status(400).json({ error: "This user has a profile already" });
    }

    res
      .status(500)
      .json({ error: "Something went wrong.Please try again now" });
  }
};

export const updateProfile = async (req, res) => {
  const id = req.params.id;
  const { bios, profilePicture, location } = req.body;
  try {
    const foundProfile = await Profile.findOne(new ObjectId(id));

    if (!foundProfile) {
      return res.status(400).json({
        message: "Can not update this profile because it doesn't exist!",
      });
    }
    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      { bios, profilePicture, location },
      { new: true }
    );
    if (!updatedProfile) {
      res.status(500).json({
        message:
          "Something went wrong while updating this profile. Try again now",
      });
    }
    res.status(200).json({ message: "Profile was updated successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "An error occurred while updating the profile.",
    });
  }
};

export const GetAllProfiles = async (req, res) => {
  const id = req.params.id;

  try {
    const profiles = await Profile.find({
      _id: { $ne: new ObjectId(id) },
    }).populate("userId", "-password -__v");
    res.status(200).json({ data: profiles });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong while fetching all profiles. Try again now",
    });
  }
};

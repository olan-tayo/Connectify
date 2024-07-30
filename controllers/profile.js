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
    res
      .status(500)
      .json({ error: "Something went wrong.Please try again now" });
  }
};

export const GetAllProfiles = async (req, res) => {
  // const db = "";
  // const id = req.params.id;
  // try {
  //   const users = await db
  //     .collection("auth")
  //     .find()
  //     .sort({ author: 1 })
  //     .toArray();
  //   if (users.length === 0) {
  //     res
  //       .status(404)
  //       .json({ data: [], message: "There are no profiles at the momemt" });
  //   }
  //   users.forEach((user) => {
  //     delete user.password;
  //   });
  //   const filteredUser = users.filter((user) => user._id.toString() !== id);
  //   res.status(200).json({ data: filteredUser, total: filteredUser.length });
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({ error: "Could not retrieve users. Try again now" });
  // }
};

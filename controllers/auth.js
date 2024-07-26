import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import createUser from "../models/auth/signUp.js";

export const SignUp = async (req, res) => {
  const { firstName, lastName, email, username, phoneNumber, password } =
    req.body;

  try {
    const existingUser = await createUser.findOne({
      $or: [{ phoneNumber }, { email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        error:
          "User already exists! Try using a different phone number, email, or username",
      });
    }

    const newUser = new createUser({
      firstName,
      lastName,
      email,
      username,
      phoneNumber,
      password,
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      return res
        .status(500)
        .json({ error: "Could not create user. Try again later." });
    }

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({
      error:
        "Something went wrong while creating this user. Please try again later.",
      details: error.message,
    });
  }
};

export const SignIn = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  try {
    const existingUser = await createUser.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ error: "Email is invalid" });
    }
    const passwordCompare = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCompare) {
      return res.status(400).json({ error: "Password is invalid" });
    }

    const user = {
      _id: existingUser._id,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      username: existingUser.username,
      phoneNumber: existingUser.phoneNumber,
    };

    const token = jwt.sign({ user_details: user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ token: token, message: "User signed in successfully!" });
  } catch (err) {
    res.status(500).json({
      error:
        "Something went wrong while trying to log this user in. Please try again now",
    });
  }
};

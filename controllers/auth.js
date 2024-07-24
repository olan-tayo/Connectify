import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const SignUp = async (req, res) => {
  const db = req.db;
  try {
    if (!req.body.password) {
      return res.status(400).json({ error: "Password is compulsory!" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    const body = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      phone_number: req.body.phone_number,
      password: secPass,
    };

    const existingUser = await db.collection("auth").findOne({
      $or: [
        { phone_number: body.phone_number },
        { email: body.email },
        { username: body.username },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        error:
          "User already exist! Try using a different phone number, email or username",
      });
    }

    const createUser = await db.collection("auth").insertOne(body);

    if (!createUser) {
      return res
        .status(500)
        .json({ error: "Could not create user. Try again now" });
    }
    res.status(201).json({ data: body, message: "User created successfully!" });
  } catch {
    res.status(500).json({
      error:
        "Something went wrong while creating this user. Please try again now",
    });
  }
};

export const SignIn = async (req, res) => {
  const db = req.db;
  const body = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const existingUser = await db
      .collection("auth")
      .findOne({ email: body.email });
    if (!existingUser) {
      return res.status(400).json({ error: "Email is invalid" });
    }
    const passwordCompare = await bcrypt.compare(
      body.password,
      existingUser.password
    );
    if (!passwordCompare) {
      return res.status(400).json({ error: "Password is invalid" });
    }

    const user = {
      _id: existingUser._id,
      first_name: existingUser.first_name,
      last_name: existingUser.last_name,
      username: existingUser.username,
      phone_number: existingUser.phone_number,
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

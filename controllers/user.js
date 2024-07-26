import createUser from "../models/auth/signUp.js";

export const GetAllUsers = async (req, res) => {
  try {
    const users = await createUser.find().sort({ author: 1 });
    if (users.length === 0) {
      res
        .status(404)
        .json({ data: [], message: "There are no users at the momemt" });
    }
    users.forEach((user) => {
      delete user.password;
    });
    res.status(200).json({ data: users, total: users.length });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Could not retrieve users. Try again now" });
  }
};

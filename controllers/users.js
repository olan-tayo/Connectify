// import pkg from "mongodb";
// const { ObjectId } = pkg;

export const GetAllUsers = async (req, res) => {
  const db = "";
  try {
    const users = await db
      .collection("auth")
      .find()
      .sort({ author: 1 })
      .toArray();
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

export const GetAllProfiles = async (req, res) => {
  const db = "";
  const id = req.params.id;
  try {
    const users = await db
      .collection("auth")
      .find()
      .sort({ author: 1 })
      .toArray();
    if (users.length === 0) {
      res
        .status(404)
        .json({ data: [], message: "There are no profiles at the momemt" });
    }
    users.forEach((user) => {
      delete user.password;
    });
    const filteredUser = users.filter((user) => user._id.toString() !== id);
    res.status(200).json({ data: filteredUser, total: filteredUser.length });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Could not retrieve users. Try again now" });
  }
};

export const GetUsers = (req, res) => {
  const db = req.db;
  const users = [];
  db.collection("auth")
    .find()
    .sort({ author: 1 })
    .forEach((user) => users.push(user))
    .then(() => {
      res.status(200).json({ data: users, total: users.length });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Could not retrieve users. Try again now" });
    });
};

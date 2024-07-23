export const SignUp = (req, res) => {
  const body = req.body;
  const db = req.db;
  const phoneNumber = req.body.phone_number;

  db.collection("auth")
    .findOne({ phone_number: phoneNumber })
    .then((result) => {
      if (!result || !result.phone_number) {
        db.collection("auth")
          .insertOne(body)
          .then((result) => {
            res
              .status(201)
              .json({ data: body, message: "User created successfully!" });
          })
          .catch((err) => {
            res
              .status(500)
              .json({ error: "Could not create user. Try again now" });
          });
      } else {
        res.status(400).json({
          error: "User already exist! Try using a different phone number",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error:
          "Something went wrong while creating this user. Please try again now",
      });
    });
};

export const SignIn = (req, res) => {
  const body = req.body;
  const db = req.db;
  const phoneNumber = req.body.phone_number;

  db.collection("auth")
    .findOne({ phone_number: phoneNumber })
    .then((result) => {
      if (!result || !result.phone_number) {
        db.collection("auth")
          .insertOne(body)
          .then((result) => {
            res
              .status(201)
              .json({ data: body, message: "User created successfully!" });
          })
          .catch((err) => {
            res
              .status(500)
              .json({ error: "Could not create user. Try again now" });
          });
      } else {
        res.status(400).json({
          error: "User already exist! Try using a different phone number",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error:
          "Something went wrong while creating this user. Please try again now",
      });
    });
};

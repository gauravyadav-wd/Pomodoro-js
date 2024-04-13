import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/login", async (req, res) => {
  const reqUser = req.body.username;
  const reqPass = req.body.password;

  try {
    // Read file synchronously
    const data = JSON.parse(fs.readFileSync("./content/data.json", "utf8"));
    const foundUser = data.find(
      (user) => user.user === reqUser && user.password === reqPass
    );

    if (!foundUser)
      return res.status(404).json({
        status: "not found",
      });
    else {
      return res.status(200).json({
        status: "success",
        user: foundUser,
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: "something went wrong",
    });
  }
});

app.post("/api/signup", async (req, res) => {
  if (
    !(
      req.body.user &&
      req.body.password &&
      req.body.confirmPassword &&
      req.body.image &&
      req.body.profession
    )
  )
    return res.json("provide all data");

  if (req.body.password !== req.body.confirmPassword) {
    return res.json("passwrods must match");
  }

  const user = {
    user: req.body.user,
    password: req.body.password,
    image: req.body.image,
    profession: req.body.profession,
    id: Math.random(),
  };

  fs.promises
    .readFile("./content/data.json", "utf8")
    .then((data) => {
      const updatedFileData = JSON.parse(data);
      updatedFileData.push(user);
      return fs.promises.writeFile(
        "./content/data.json",
        JSON.stringify(updatedFileData),
        "utf8"
      );
    })
    .then(() => {
      console.log("done");
      return res.json({ status: "success", user });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(400)
        .json({ status: "error", message: "something went wrong" });
    });
});

app.get("/users", async (req, res) => {
  const data = await pool.query("SELECT * FROM users");
  res.status(200).json(data.rows);
});

app.listen(4000, () => {
  console.log("server is running on", 4000);
});

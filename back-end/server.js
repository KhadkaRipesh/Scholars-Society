const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const bcrypt = require("bcrypt");
const { pool } = require("./dbConfig");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello");
});
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(email)) {
    const domain = email.split("@")[1];
    return domain === "iic.edu.np";
  }
  return false;
}
function validatePassword(password) {
  const regex = /^[a-zA-Z\d]{8,}$/;
  return regex.test(password);
}
app.post("/auth/register", async (req, res) => {
  const user = req.body.user;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  let errors = [];

  if (!user || !name || !email || !password) {
    errors.push({ message: "Missing required fields" });
  }
  if (!validateEmail(email)) {
    errors.push({ message: "Email address is not valid. " });
    errors.push({ message: "iic.edu.np domain required." });
  }
  if(!validatePassword(password)){
    errors.push({ message: "Choose strong password." });
  }
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    let hashedPassword = await bcrypt.hash(password, 10);
    pool.query(
      `Select * from users WHERE email =$1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        if (results.rows.length > 0) {
          errors.push({ message: "Email Already Registered." });
          res.status(400).json({ errors });
        } else {
          pool.query(
            `INSERT INTO users (name,email,password,roles)
        VALUES ($1,$2,$3,$4)
        RETURNING id,password`,
            [name, email, hashedPassword, user],
            (err, results) => {
              if (err) {
                throw err;
              }
              res.send({ message: "register success" }).status(201);
              console.log("Successfully registered.");
            }
          );
        }
      }
    );
  }
});

app.post("/auth/login", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  let errors = [];
  let success = [];

  if (!email || !password) {
    errors.push({ message: "Missing required fields" });
  }
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    pool.query(
      `SELECT * FROM users WHERE  email= $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        if (results.rows.length > 0) {
          const user = results.rows[0];
          console.log(user);
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              const jwtdata = jwt.sign(
                { email },
                secretKey,
                { expiresIn: "3d" },
                (err, token) => {
                  res
                    .send({
                      message: "login success",
                      token,
                      name: user.name,
                      role: user.roles,
                    })
                    .status(200);
                  console.log(" Logged in after password matched.");
                }
              );
            } else {
              console.log("Password not macth");
              errors.push({ message: "Password doesnot matched" });
              res.status(400).json({ errors });
            }
          });
        } else {
          console.log("email not registered");
          errors.push({ message: "Email is not registered" });
          res.status(400).json({ errors });
        }
      }
    );
  }
});

app.post("/addPost", async (req, res) => {
  // console.log(req.body);
  const title = req.body.title;
  const description = req.body.description;
  const poster = req.body.userName;
  let errors = [];
  if (!title || !description) {
    errors.push({ message: "Missing Required Fields" });
  }
  if (errors.length > 0) {
    res.status(400).json({ errors });
    // console.log(errors);
  } else {
    pool.query(
      `Insert into news (title,description,poster)
    VALUES ($1,$2,$3)`,
      [title, description, poster],
      (err, results) => {
        if (err) {
          throw err;
        }
        res.send({ message: "Added Successfully" }).status(201);
      }
    );
  }
});

const getRecords = async () => {
  const { rows } = await pool.query(
    `SELECT title, description,poster FROM news`
  );
  return rows.map(({ title, description, poster }) => ({
    title,
    description,
    poster,
  }));
};

app.get("/api/records", async (req, res) => {
  const records = await getRecords();
  res.json(records);
});

const getPostsByAdminId = async (userName) => {
  const posts = await pool.query(`SELECT * FROM news WHERE poster = $1`, [
    userName,
  ]);
  return posts.rows;
};

app.get("/api/posts/:userName", async (req, res) => {
  const userName = req.params.userName;
  const posts = await getPostsByAdminId(userName);
  res.json(posts);
});

app.delete("/api/posts/:postID", async (req, res) => {
  const { postID } = req.params;
  await pool.query(`DELETE FROM news WHERE id = $1`, [postID]);
  res.send("Post deleted successfully");
});

app.put("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // Query to update post in database
  const updateQuery =
    "UPDATE news SET title = $1, description = $2 WHERE id = $3";

  const values = [title, description, id];

  // Execute query
  pool.query(updateQuery, values, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send("Post updated successfully");
    }
  });
});

app.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Query to retrieve post from database
    const postQuery = `SELECT * FROM news WHERE id = ${id}`;

    // Execute query
    const result = await pool.query(postQuery);

    // Extract post data from query result
    const post = result.rows[0];

    res.render("edit-post", { post });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on  Port ${PORT}`);
});

//creating the todos in which every user has there own todos

import express from "express";
require("dotenv").config();
const PORT = process.env.PORT;
import { getClient } from "./database/connection";
import { createTodoTable, createUserTable } from "./models";
import { todoRoutes, userRoutes } from "./routes";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use("/auth", userRoutes);
app.use("/todo", todoRoutes);

// test api
app.get("/", (req, res) => {
  res.send("Hello");
});

//database connection
const initDb = async () => {
  try {
    await createUserTable();
    await createTodoTable();

    console.log("Database initialized");
  } catch (err) {
    console.log("Could not connect to database" + err);
    process.exit(1);
  }
};

app.listen(PORT || 8080, async () => {
  console.log("Backend listening on port " + PORT);
  console.clear();
  await initDb();
});

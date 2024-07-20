const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app = express();

app.use(express.json());

app.post("/todo", async function (req, res) {
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);
  if (!parsePayload.success) {
    res.status(400).send(parsePayload.error.issues[0].message);
    return;
  }

  await todo.create({
    title: parsePayload.data.title,
    description: parsePayload.data.description,
    completed: false,
  });

  res.status(201).send("Todo created");
});

app.get("/todo", async function (req, res) {
  const todos = await todo.find({});
  res.json({
    todos,
  });
});

app.put("/completed", async function (req, res) {
  const updatePayload = req.body;
  const parsePayload = updateTodo.safeParse(updatePayload);
  if (!parsePayload.success) {
    res.status(400).send(parsePayload.error.issues[0].message);
    return;
  }

  await todo.update(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );
  res.status(200).send("Todo updated");
});

app.listen(3000);

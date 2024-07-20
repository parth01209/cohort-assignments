const zod = require("zod");

const createTodo = zod.object({
  title: zod.string().min(1, "Title is required"),
  description: zod.string().min(1, "Description is required"),
});

const updateTodo = zod.object({
  id: zod.string(),
});

module.exports = {
  createTodo,
  updateTodo,
};

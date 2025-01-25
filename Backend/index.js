import express from "express";
import cors from "cors";
import "./database.js";
import { todoModel } from "./models/server.js";

const app = express();
const port = 5002;
app.use(cors());
app.use(express.json());

const Todos = [];

app.listen(port, () => {
  console.log(`server is serving at ${port}`);
});

app.get(`/`, (req, res) => {
  res.send("Hello This is a  Port");
});

app.get(`/api/v1/Todos`, async (req, res) => {
  const Todos = await todoModel.find();
  const message =
    Todos.length > 0 ? "Todos are available" : "No Todos available";
  res.send({
    data: Todos,
    message: message,
  });
});

app.post(`/api/v1/Todos`, async (req, res) => {
  const obj = {
    todoContent: req.body.todo,
    ip: req.ip,
  };
  const result = await todoModel.create(obj);

  // Todos.push(obj);
  res.send({ message: "Todo Added Successfully", data: result });
});

app.patch(`/api/v1/Todos/:id`, async (req, res) => {
  const id = req.params.id;
  const result = await todoModel.findByIdAndUpdate(id, {
    todoContent: req.body.todoContent,
  });
  console.log(result)
  // let isFound = false;
  if (result) {
    res.status(201).send({
      data: {
        id: id,
        todoContent: req.body.todoContent,
      },
      message: "Todo Updated Successfully",
    });
  } else {
    res.status(200).send({
      message: "Todo not Found",
      data: {
        todoContent: null,
        id: null,
      },
    });
  }
});

app.delete("/api/v1/Todos/:id", async(req, res) => {
  const id = req.params.id
  const result = await todoModel.findByIdAndDelete(id)
  if (result) {
    res.status(200).send("Todo Deleted Successfully");
  } else {
    res.status(200).send("Todo Not Found");
  }
});

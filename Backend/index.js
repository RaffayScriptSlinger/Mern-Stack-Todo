import express from "express";
import cors from "cors";
import "./database.js"
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

app.get(`/api/v1/Todos`, (req, res) => {
  const message =
    Todos.length > 0 ? "Todos are available" : "No Todos available";
  res.send({
    data: Todos,
    message: message,
  });
});

app.post(`/api/v1/Todos`, (req, res) => {
  const obj = {
    todoContent: req.body.todo,
    // id: new Date().getTime(),
    ip : req.ip
  };
  const result =  todoModel.create(obj)
  console.log(result)
  // Todos.push(obj);
  res.send({ message: "Todo Added Successfully", data: obj });
});

app.patch(`/api/v1/Todos/:id`, (req, res) => {
  const id = parseInt(req.params.id);
  let isFound = false;
  for (let i = 0; i < Todos.length; i++) {
    if (Todos[i].id === id) {
      Todos[i].todoContent = req.body.todoContent;
      isFound = true;
      break;
    }
  }
  if (isFound) {
    res.status(201).send({ data:{
      id : id,
      todoContent : req.body.todoContent

    },
     message: "Todo Updated Successfully"});
  } else {
    res.status(200).send({
      message:"Todo not Found",
      data : {
        todoContent : null,
        id : null
      }
    });
  }
});

app.delete("/api/v1/Todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let isDeleted = false
  for (let i = 0; i < Todos.length; i++) {
    if (Todos[i].id === id) {
      Todos.splice(i,1)
      isDeleted = true
      break
    }    
  }
  if(isDeleted){
    res.status(200).send("Todo Deleted Successfully");
  }else{
    res.status(200).send("Todo Not Found")
  }
});

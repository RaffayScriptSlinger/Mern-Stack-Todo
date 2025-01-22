import express from "express";

const app = express();
const port = 5002;
const Todos = [];
app.use(express.json())

app.listen(port, () => {
  console.log(`server is serving at ${port}`);
});

app.get(`/`, (req, res) => {
  res.send("Hello Raffay Port");
});

app.get(`/api/v1/Todos`, (req, res) => {
  const message =
    Todos.length > 0 ? "Todos are available" : "No Todos available";
  res.send({
    data: Todos,
    message: message,
  });
});
app.post(`/api/v1/Todos`,(req,res)=>{
    const obj = {
        todoContent : req.body.todo,
        id : new Date().getTime()
    }
    Todos.push(obj);
    res.send({message : "Todo Added Successfully",data : obj})
    // Todos.push(req.body.todo)
    // res.send("Todo Added Successfully")
})
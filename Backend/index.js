import express from "express";
import cors from "cors";

const app = express();
const port = 5002;
app.use(cors({ origin: ["http://localhost:5173"] }));
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
app.patch(`/api/v1/Todo:id`,(req,res)=>{
  const id = req.params.id;
  for( let i = 0 ; i < Todos.length ; i++){
    if(Todos[i] === id){
      Todos[i].todoContent =  req.body.todoContent
    }

  }

})
// app.delete(`/api/v1/Todos:id`,(req,res)=>{
//   const id = parseInt( req.params.id)

//   const TodoIndex = Todos.findIndex((todo)=> todo.id === id)
//   if(TodoIndex !== -1){
//     Todos.splice(TodoIndex,1)
//     return res.status(404).send({ message: "Todo not found" });
//   }


 
// })
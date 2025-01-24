import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

function App() {
  const [todos, setTodos] = useState([]);

  const BASE_URL = "http://localhost:5002";

  const getTodo = async () => {
    const res = await axios(`${BASE_URL}/api/v1/Todos`);
    const todosFromServer = res?.data?.data;
    const editInTodosFromServer = todosFromServer.map((todo) => {
      return { ...todo, isEditable: false };
    });
    setTodos(editInTodosFromServer);
  };

  const editTodo = async (event, todoId) => {
    try {
      event.preventDefault();
      console.log(todoId);
      const todoValue = event.target[0].value;
      console.log(todoValue);

      await axios.patch(`${BASE_URL}/api/v1/Todos/${todoId}`, {
        todoContent: todoValue,
      });
      getTodo();
    } catch (err) {
      console.log(err);
    }
  };

  const addTodo = async (event) => {
    const todoValue = event.target.children[0];
    event.preventDefault();

    await axios.post(`${BASE_URL}/api/v1/Todos`, {
      todo: todoValue.value,
    });
    getTodo();
    event.target.reset();
  };

  const deleteTodo = async (todoId) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/api/v1/Todos/${todoId}`);
      getTodo();
      toast.success("Todo Deleted");
    
    } catch (err) {
      console.log(err);
    }
  };

  console.log(todos);

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-red-500 mb-6 text-center">
          Todo List
        </h1>
        {/* Input Section */}
        <form className="flex items-center space-x-2 mb-6" onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Add a new task..."
            className="w-full px-4 py-2 rounded-md text-black"
          />
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
            Add
          </button>
        </form>
        Todo List Section
        {todos.map((todo, index) => (
          <div className="space-y-4 p-2" key={todo.id}>
            <div className="flex items-center justify-between bg-gray-800 p-4 rounded-md shadow-md ">
              {todo.isEditable ? (
                <form
                  onSubmit={(event) => {
                    editTodo(event, todo.id);
                   
                  }}
                >
                  <input
                    type="text"
                    className="text-black"
                    defaultValue={todo.todoContent}
                  />
              
                  <button type="submit" className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-gray-800 transition">Save</button>
                  <button className="px-3 py-1 text-sm bg-gray-700 text-white rounded-md hover:bg-gray-800 transition">
                    cancel
                  </button>
                  
                </form>
              ) : (
                <span className="text-white ">{todo?.todoContent}</span>
              )}

              <div className="space-x-2">
                {!todo.isEditable ? (
                  <button
                    onClick={() => {
                      // todos[index].isEditable = true;

                      const newTodos = todos.map((todo, i) => {
                        if (i === index) {
                          todo.isEditable = true;
                        } else {
                          todo.isEditable = false;
                        }
                        return todo;
                      });
                      setTodos([...newTodos]);
                    }}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Edit
                  </button>
                ) : null}
                {todo.isEditable ? null : (
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-3 py-1 text-sm bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const BASE_URL = "http://localhost:5002";

  const getTodo = async () => {
    const res = await axios(`${BASE_URL}/api/v1/Todos`);
    const todosFromServer = res?.data?.data;
    setTodos(todosFromServer);
  };

  useEffect(() => {
    getTodo();
  }, []);

  console.log(todos);

  const addTodo = async (event) => {
    const todoValue = event.target.children[0];
    event.preventDefault();

    await axios.post(`${BASE_URL}/api/v1/Todos`, {
      todo: todoValue.value,
    });
    getTodo();
  };


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
        {todos.map((todo) => (
          <div className="space-y-4" key={todo.id}>
            <div className="flex items-center justify-between bg-gray-800 p-4 rounded-md shadow-md">
              <span className="text-white">{todo?.todoContent}</span>
              <div className="space-x-2">
                <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-gray-700 text-white rounded-md hover:bg-gray-800 transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

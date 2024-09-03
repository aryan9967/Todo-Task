import { useEffect, useState } from "react";
import Task from "../components/Task";
import axios from "axios";

export default function TaskPage() {
  const [name, setName] = useState(null);
  const [desc, setDesc] = useState(null);
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    getTodo();
  }, []);

  async function getTodo() {
    const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/get-todo`);
    console.log(data);
    setTodo(data);
  }

  async function addTodo() {
    const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/create-todo`, {
      name: name,
      description: desc,
    });
    console.log(data);
    setName("");
    setDesc("");
    getTodo();
  }

  async function deleteTodo(id) {
    const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/delete-todo`, {
      _id: id,
    });
    console.log(data);
    getTodo();
  }

  async function completeTodo(id) {
    const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/complete-todo`, {
      _id: id,
    });
    console.log(data);
    getTodo();
  }

  async function editTodo(id, name, description) {
    const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/update-todo`, {
      _id: id,
      name: name,
      description: description,
    });
    console.log(data);
    getTodo();
  }

  return (
    <div className="main_page">
      <div className="heading">My Todos</div>
      <div className="new_task_form">
        <div className="left">
          <div className="input_field">
            <div className="input_heading">Name</div>
            <div className="act_input">
              <input
                value={name}
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="input_field">
            <div className="input_heading">Description</div>
            <div className="act_input">
              <input
                value={desc}
                type="text"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="right">
          <button onClick={addTodo}>Add Todo</button>
        </div>
      </div>
      <div className="task_container">
        {todo?.map((todo, index) => (
          <Task
            todo={todo}
            key={index}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
            editTodo = {editTodo}
          />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

export default function Task({ todo, deleteTodo, completeTodo, editTodo }) {
  const [editpopup, setEditpopup] = useState(false);
  const [name, setName] = useState(todo?.name);
  const [description, setDesc] = useState(todo?.description);

  const complete_style = {
    color: "rgb(120, 120, 120)",
    "text-decoration": "line-through",
  };

  function handleComplete(id) {
    completeTodo(id);
  }

  return (
    <>
      {editpopup ? (
        <div className="backdrop">
          <div className="update_form">
            <div className="form_line">
              <label htmlFor="name">Name : </label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                id="name"
              />
            </div>
            <div className="form_line">
              <label htmlFor="desc">Description : </label>
              <input
                value={description}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                type="text"
                id="desc"
              />
            </div>
            <div className="btn_container">
              <button
                onClick={() => {
                  setEditpopup(false);
                  editTodo(todo?._id, name, description);
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="task">
        <div className="task_left">
          {todo?.status == "complete" ? (
            <>
              <div className="task_heading" style={complete_style}>
                {todo?.name}
              </div>
              <div className="task_description" style={complete_style}>
                {todo?.description}
              </div>
            </>
          ) : (
            <>
              <div className="task_heading">{todo?.name}</div>
              <div className="task_description">
                <p>{todo?.description}</p>
              </div>
            </>
          )}
        </div>
        <div className="task_right">
          {todo?.status == "complete" ? (
            <>
              <button
                className="dlt_btn"
                onClick={() => {
                  deleteTodo(todo?._id);
                }}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                className="edit_btn"
                onClick={() => {
                  setEditpopup(true);
                }}
              >
                Edit
              </button>
              <button
                className="complete_btn"
                onClick={() => {
                  handleComplete(todo?._id);
                }}
              >
                Complete
              </button>
              <button
                className="dlt_btn"
                onClick={() => {
                  deleteTodo(todo?._id);
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

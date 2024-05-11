import React from "react";
import "../styles/Note.css";

function Task({ task, onDelete }) {
  const formattedDate = new Date(task.created_at).toLocaleDateString("en-US");

  return (
    <>
      <div className="note-container">
        <h2 className="note-title">{task.task}</h2>
        <p className="note-content">{task.description}</p>
        <p className="note-content">{task.category}</p>
        <p className="note-date">{formattedDate}</p>
        <button className="delete-button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </>
  );
}

export default Task;

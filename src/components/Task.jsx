import React from "react";
import "../styles/Note.css";
// import LoadingIndicator from "@/components/LoadingIndicator";
// {
//   loading && <LoadingIndicator />;
// }

function Task({ task, onDelete }) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Use 12-hour format
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    new Date(task.created_at)
  );

  return (
    <>
      <div className="note-container sm:w-[45%] m-4 w-[80%] bg-gray-800 text-white mx-auto">
        <h1>Task:</h1>
        <h2 className="note-title">{task.task}</h2>
        <h2>Description:</h2>
        <p className="note-content">{task.description}</p>
        <h2>Category:</h2>
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

import React from "react";
import "../styles/Note.css";
// import LoadingIndicator from "@/components/LoadingIndicator";
// {
//   loading && <LoadingIndicator />;
// }
import UpdateTask from "@/components/UpdateTask";
function Task({
  tasks,
  onDelete,
  onTaskUpdated,
  // onUpdate,
}) {
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
    new Date(tasks.created_at)
  );

  return (
    <>
      <div className="note-container sm:w-[45%] m-4 w-[80%] bg-gray-800 text-white mx-auto">
        <h1>Task:</h1>
        <h2 className="note-title">{tasks.task}</h2>
        <h2>Description:</h2>
        <p className="note-content">{tasks.description}</p>
        <h2>Category:</h2>
        <p className="note-content">{tasks.category}</p>
        <p className="note-date">{formattedDate}</p>
        <div className=" mt-1 flex">
          <button
            className="delete-button mr-2"
            onClick={() => onDelete(tasks.id)}
          >
            Delete
          </button>
          <div></div>

          <button className="update-button">
            <UpdateTask tasks={tasks} getTask={onTaskUpdated}>
              Update
            </UpdateTask>
          </button>
        </div>
      </div>
    </>
  );
}

export default Task;

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/Note.css";
import { getToken } from "../jwt";
import { liveLink, localLink } from "../api";
import UpdateTask from "@/components/UpdateTask";
function Task({
  tasks,
  onDelete,
  onTaskUpdated,
  getTask,
  onUpdateStatus,
  // onUpdate,
}) {
  // const [status, setStatus] = useState("pending");

  const token = getToken();

  const [status, setStatus] = useState(tasks.status);

  // useEffect(() => {
  //   setStatus(tasks.status);
  // }, [tasks.status]);

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
  console.log(`this are the task`);
  console.log(tasks);

  const updateStatus = async (id) => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      };
      const response = await fetch(
        `${localLink}/task/updateStatus`,
        requestOptions
      );
      const data = await response.json();
      if (data.message === "Status Updated") {
        // Refresh task list after updating task
        setStatus("completed");

        getTask();
        console.log("updated");
      } else {
        console.error("Failed to update status:", data); // Log error response
        // alert("Failed to update Task");
      }
    } catch (error) {
      console.error("Update Task Error:", error);
      // alert("Failed to update Task: " + error.message);
    }
  };

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
        <div className=" mt-1 flex items-center">
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => onDelete(tasks.id)}
            className="delete-button mr-2"
          />

          <button className="update-button flex items-center">
            <UpdateTask
              tasks={tasks}
              getTask={onTaskUpdated}
              status={setStatus}
            >
              Update
            </UpdateTask>
          </button>

          <button
            className={
              status === "completed"
                ? "status bg-green-600 text-white p-2 ml-3 rounded-lg"
                : "status bg-red-600 text-white p-2 ml-3 rounded-lg"
            }
            onClick={() => updateStatus(tasks.id)}
          >
            {status === "completed" ? <p>completed</p> : <p>pending</p>}
          </button>
        </div>
      </div>
    </>
  );
}

export default Task;

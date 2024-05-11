import Task from "@/components/Task";
import React, { useState, useEffect } from "react";
import "../styles/Home.css";

function Home() {
  const [Tasks, setTasks] = useState([]);
  const [content, setContent] = useState("");
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNodXJjaGlsbEBmYWtlLmNvbSIsImlkIjoxLCJpYXQiOjE3MTU0MTY0OTEsImV4cCI6MTcxNTQyMzY5MX0.gwY17AnkkXhj48irB2ADIWlDcX3Zh2P0s8CIpfreIho";
  // 1.34
  const getTask = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:3000/task/getAllTask", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const deleteTask = () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    };

    fetch("http://localhost:3000/task/delete", requestOptions)
      .then((res) => {
        if (res.message === "Successful") {
          alert("Task deleted");
          getTask(); // Refresh task list after deleting task
        } else {
          alert("Failed to delete Task");
        }
      })
      .catch((error) => {
        console.error("Delete Task Error:", error);
        alert("Failed to delete Task: " + error.message);
      });
  };

  const createTask = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: task,
        description: description,
        category: category,
      }),
    };
    fetch(`http://localhost:3000/task/addTask`, requestOptions)
      .then((res) => {
        if ((res.message = "Successful")) {
          alert("Task Created");
          getTask(); // Refresh task list after creating task
        } else {
          res.json().then((data) => {
            console.error("Failed to create Task:", data); // Log error response
            alert("Failed to create Task");
          });
        }
      })
      .catch((error) => {
        alert();
      });
    setCategory("");
    setTask("");
    setDescription("");
  };

  useEffect(() => {
    getTask();
  }, []);
  return (
    <>
      <div>
        <h2>Tasks</h2>
        <div className="flex flex-wrap">
          {Tasks.map((task) => (
            <Task task={task} onDelete={deleteTask} key={task.id} />
          ))}
        </div>
      </div>
      <h2>Create Task</h2>
      <form onSubmit={createTask}>
        <label htmlFor="task">Task:</label>
        <br />
        <input
          type="text"
          name="task"
          value={task}
          id="task"
          required
          onChange={(e) => setTask(e.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          name="description"
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <label htmlFor="category">Category:</label>
        <br />
        <input
          type="text"
          name="category"
          value={category}
          id="category"
          required
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        {/* <input type="submit" value="Submit"></input> */}
        <button onClick={createTask}>Submit</button>
      </form>
    </>
  );
}

export default Home;

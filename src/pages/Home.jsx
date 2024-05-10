import React, { useState, useEffect } from "react";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNodXJjaGlsbEBmYWtlLmNvbSIsImlkIjoxLCJpYXQiOjE3MTUzNTQ3MzQsImV4cCI6MTcxNTM2MTkzNH0.6Dch5_LLCVReygeHtxuyGwPkd53BLvItNCKjstv83Xw";

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
        setNotes(data.quote ? [data.quote] : []);
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
    };
    fetch("http://localhost:3000/task/delete", {
      requestOptions,
      body: JSON.stringify({
        id: id,
      }),
    }).then((res) => {
      if (res.status === 204) {
        alert("Task deleted");
      } else {
        alert("Failed to delete Task");
      }
    });
    getTask();
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
    getTask();
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
      </div>
      <h2>Create Task</h2>
      <form onSubmit={createTask} className=" bg-black">
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
        <button className=" text-white" onClick={createTask}>
          Submit
        </button>
      </form>
    </>
  );
}

export default Home;

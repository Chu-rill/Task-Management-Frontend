import Task from "@/components/Task";
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import AddTask from "@/components/AddTask";
import { getToken } from "../jwt";

function Home() {
  const [Tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const token = getToken();

  // 1.34
  // const getTask = () => {
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   fetch(
  //     "https://task-management-api-node-js-ten.vercel.app/task/getAllTask",
  //     requestOptions
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTasks(data.data);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };

  // const deleteTask = (id) => {
  //   // Ensure that id is not undefined
  //   if (typeof id === "undefined") {
  //     throw new Error("id is required");
  //   }
  //   const requestOptions = {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: id,
  //     }),
  //   };

  //   fetch(
  //     "https://task-management-api-node-js-ten.vercel.app/task/delete",
  //     requestOptions
  //   )
  //     .then((res) => {
  //       if (res) {
  //         alert("Task deleted");
  //         getTask(); // Refresh task list after deleting task
  //       } else {
  //         alert("Failed to delete Task");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Delete Task Error:", error);
  //       alert("Failed to delete Task: " + error.message);
  //     });
  // };

  // const createTask = (e) => {
  //   e.preventDefault();
  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       task: task,
  //       description: description,
  //       category: category,
  //     }),
  //   };
  //   fetch(
  //     `https://task-management-api-node-js-ten.vercel.app/task/addTask`,
  //     requestOptions
  //   )
  //     .then((res) => {
  //       if ((res.message = "Successful")) {
  //         alert("Task Created");
  //         getTask(); // Refresh task list after creating task
  //       } else {
  //         res.json().then((data) => {
  //           console.error("Failed to create Task:", data); // Log error response
  //           alert("Failed to create Task");
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       alert();
  //     });
  //   setCategory("");
  //   setTask("");
  //   setDescription("");
  // };

  const getTask = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        "https://task-management-api-node-js-ten.vercel.app/task/getAllTask",
        requestOptions
      );
      const data = await response.json();
      setTasks(data.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      // Ensure that id is not undefined
      if (typeof id === "undefined") {
        throw new Error("id is required");
      }

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
      const response = await fetch(
        "https://task-management-api-node-js-ten.vercel.app/task/delete",
        requestOptions
      );
      if (response.ok) {
        alert("Task deleted");
        await getTask(); // Refresh task list after deleting task
      } else {
        alert("Failed to delete Task");
      }
    } catch (error) {
      console.error("Delete Task Error:", error);
      alert("Failed to delete Task: " + error.message);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
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
      const response = await fetch(
        "https://task-management-api-node-js-ten.vercel.app/task/addTask",
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        alert("Task Created");
        await getTask(); // Refresh task list after creating task
      } else {
        console.error("Failed to create Task:", data); // Log error response
        alert("Failed to create Task");
      }
    } catch (error) {
      console.error("Create Task Error:", error);
      alert("Failed to create Task: " + error.message);
    }
    setCategory("");
    setTask("");
    setDescription("");
  };

  useEffect(() => {
    getTask();
  }, []);
  return (
    <div className=" bg-neutral-800 overflow-hidden">
      <div>
        <div className=" mt-3 flex justify-around">
          <h2 className=" font-mono text-3xl text-white ml-2">Tasks</h2>
          <AddTask
            createTask={createTask}
            setTask={setTask}
            setDescription={setDescription}
            setCategory={setCategory}
            task={task}
            description={description}
            category={category}
          />
        </div>
        <div className=" sm:flex sm:flex-wrap">
          {Tasks.length === 0 ? (
            <h1 className=" text-black">No tasks available</h1>
          ) : (
            Tasks.map((task) => (
              <Task
                tasks={task}
                onDelete={deleteTask}
                key={task.id}
                onTaskUpdated={getTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

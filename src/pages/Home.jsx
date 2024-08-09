import Task from "@/components/Task";
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import AddTask from "@/components/AddTask";
import { getToken } from "../jwt";
import { liveLink, localLink } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {
  const [Tasks, setTasks] = useState([]);
  const [searched, setSearched] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  let status;

  const token = getToken();

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
        `${localLink}/task/getAllTask`,
        requestOptions
      );
      const data = await response.json();
      setTasks(data.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const getSingleTask = async (task) => {
  //   try {
  //     // Ensure that id is not undefined
  //     if (typeof task === "undefined") {
  //       throw new Error("id is required");
  //     }

  //     const requestOptions = {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         task: task,
  //       }),
  //     };
  //     console.log(search);
  //     const response = await fetch(
  //       `${localLink}/task/getSingleTask`,
  //       requestOptions
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch task");
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //     // Handle the fetched task data as needed
  //   } catch (error) {
  //     console.error("Failed to get Task:", error);
  //     alert("Failed to get Task");
  //   }
  // };

  const getSingleTask = async (task) => {
    try {
      // Ensure that task is not undefined
      if (typeof task === "undefined") {
        throw new Error("Task is required");
      }

      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${localLink}/task/getSingleTask?task=${task}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to fetch task");
      }

      const data = await response.json();
      console.log(data);
      // Handle the fetched task data as needed
    } catch (error) {
      console.error("Failed to get Task:", error);
      alert("Failed to get Task");
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
      const response = await fetch(`${localLink}/task/delete`, requestOptions);
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

  const deleteUser = async () => {
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
        // body: JSON.stringify({
        //   id: id,
        // }),
      };
      const response = await fetch(
        `${liveLink}/task/deleteUser`,
        requestOptions
      );
      if (response.ok) {
        alert("User deleted");
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
      const response = await fetch(`${localLink}/task/addTask`, requestOptions);
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
    <div
      className={
        Tasks.length === 0
          ? "h-screen bg-neutral-800 p-2"
          : "h-full bg-neutral-800 p-2"
      }
      // className="h-full bg-neutral-800 p-2"
    >
      <div className=" h-full bg-neutral-800">
        <div className=" mt-3 sm:flex  sm:justify-around">
          <h2 className=" text-center font-mono text-3xl text-white ml-2">
            Tasks
          </h2>
          <div className="relative bg-gray-200 rounded-md flex mb-4 items-center ">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-md px-4 py-2 overflow-x-auto bg-gray-200 text-gray-800 focus:outline-none focus:ring focus:border-purple-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute right-0 mr-3 text-xl hover:cursor-pointer "
              onClick={togglePasswordVisibility}
            /> */}

            <p
              className="absolute right-0 mr-3 w-6 h-6  text-xl hover:cursor-pointer "
              onClick={() => getSingleTask(search)}
            >
              🔍
            </p>
          </div>
          <div className=" flex">
            <AddTask
              createTask={createTask}
              setTask={setTask}
              setDescription={setDescription}
              setCategory={setCategory}
              task={task}
              description={description}
              category={category}
            />
            {console.log(Tasks)}
            {/* <button
              className=" bg-red-700 text-white p-2 ml-8 rounded-lg"
              onClick={() => deleteUser()}
            >
              Delete Account
            </button> */}
          </div>
        </div>
        <div className=" sm:flex sm:flex-wrap">
          {/* {Tasks.length === 0 ? (
            <h1 className=" text-center text-5xl text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Add Task
            </h1>
          ) : (
            Tasks.map((task) => (
              <Task
                tasks={task}
                onDelete={deleteTask}
                key={task.id}
                onTaskUpdated={getTask}
                getTask={getTask}
              />
            ))
          )} */}
          {searched &&
            searched.map((search) => {
              <Task
                tasks={search}
                onDelete={deleteTask}
                onTaskUpdated={getTask}
              />;
            })}
          {!searched && Tasks.length === 0 ? (
            <h1 className=" text-center text-5xl text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Add Task
            </h1>
          ) : (
            Tasks.map((task) => (
              <Task
                tasks={task}
                onDelete={deleteTask}
                key={task.id}
                onTaskUpdated={getTask}
                getTask={getTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

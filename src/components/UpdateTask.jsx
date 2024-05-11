import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

export function UpdateTask({
  //   onUpdate,
  tasks,
  getTask,
  //   setTask,
  //   setDescription,
  //   setCategory,
  //   task,
  //   description,
  //   category,
}) {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNodXJjaGlsbEBmYWtlLmNvbSIsImlkIjoxLCJpYXQiOjE3MTU0NTMyNjcsImV4cCI6MTcxNTQ2MDQ2N30.igpUnRyX7MA5Rh0H93cILQRwLHpg9EFc8ip5Vilt2jM";
  // 1.34

  const updateTask = (e, id) => {
    // e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        task: task,
        description: description,
        category: category,
      }),
    };
    fetch(`http://localhost:3000/task/update`, requestOptions)
      .then((res) => {
        if ((res.message = "Successful")) {
          alert("Task Updated");
          // Refresh task list after creating task
        } else {
          res.json().then((data) => {
            console.error("Failed to create Task:", data); // Log error response
            alert("Failed to create Task");
          });
        }
      })
      .then(() => getTask())
      .catch((error) => {
        console.error("Update Task Error:", error);
        alert("Failed to update Task: " + error.message);
      })
      .finally(() => {
        setCategory("");
        setTask("");
        setDescription("");
      });
  };

  //   const getTask = () => {
  //     const requestOptions = {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     fetch("http://localhost:3000/task/getAllTask", requestOptions)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setTasks(data.data);
  //         console.log(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   };
  return (
    <Dialog className=" custom-dialog">
      <DialogTrigger asChild>
        <Button variant="outline">Update Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <form className=" bg-gray-600">
          <h2>Update Task</h2>
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
        </form>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
          <button className="button" onClick={() => updateTask(null, tasks.id)}>
            Submit
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateTask;

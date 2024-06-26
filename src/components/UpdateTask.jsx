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
import { getToken } from "../jwt";
import LoadingIndicator from "@/components/LoadingIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { liveLink, localLink } from "../api";

export function UpdateTask({
  //   onUpdate,
  tasks,
  getTask,
  // status,
}) {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const token = getToken();

  const updateTask = async (e, id) => {
    // e.preventDefault();
    try {
      setLoading(true);
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
      const response = await fetch(`${liveLink}/task/update`, requestOptions);
      const data = await response.json();
      if (response.ok) {
        alert("Task Updated");
        // status("pending");
        tasks.status = "pending";

        console.log("update");
        getTask(); // Refresh task list after updating task
      } else {
        console.error("Failed to update Task:", data); // Log error response
        alert("Failed to update Task");
      }
    } catch (error) {
      console.error("Update Task Error:", error);
      alert("Failed to update Task: " + error.message);
    } finally {
      setLoading(false);
    }

    setCategory("");
    setTask("");
    setDescription("");
  };

  return (
    <Dialog className=" custom-dialog">
      <DialogTrigger asChild>
        {/* <Button variant="outline"></Button> */}
        {/* <button>Update Task</button> */}
        <FontAwesomeIcon icon={faPenToSquare} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-neutral-800">
        <DialogHeader>
          <DialogTitle className=" text-white">Update Task</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <form className=" ">
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
          <button
            className="button mx-auto"
            onClick={() => updateTask(null, tasks.id)}
          >
            Submit
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateTask;

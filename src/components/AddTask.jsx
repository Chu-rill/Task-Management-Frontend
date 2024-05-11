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
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

export function AddTask({
  createTask,
  setTask,
  setDescription,
  setCategory,
  task,
  description,
  category,
}) {
  return (
    <Dialog className=" bg-neutral-800 custom-dialog">
      <DialogTrigger asChild>
        <Button variant="outline">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-neutral-800">
        <DialogHeader>
          <DialogTitle className=" text-white">Add Task</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <form onSubmit={createTask} className=" ">
          <h2>Create Task</h2>
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
          <button className="button mx-auto" onClick={createTask}>
            Submit
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddTask;

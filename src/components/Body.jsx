import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from 'react-toastify';

const url = "https://backend-mjac.onrender.com";

export default function Body({ onAddTask }) {
  const [task, setTask] = useState("");

  const onChange = ({ target }) => setTask(target.value);

  const addTask = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${url}/api/tasks`,
        {
          title: task,
          status: false,
        },
        config
      );
      setTimeout(() => {
        toast.success("Task added successfully!")
      }, 500);
     
      console.log(response.data);
      setTask("");
      onAddTask(); // Call the callback function to trigger re-fetching of tasks
    } catch (error) {
      console.error(error);
      toast.error("Can't add empty!")
    }
  };

  return (
    <div className="relative flex justify-center items-center w-full max-w-[53rem] m-auto">
      <Input
        type="text"
        label="Task"
        value={task}
        onChange={onChange}
        className="rounded-r"
        containerProps={{
          className: "min-w-0",
        }}
        required
      />
      <Button
        size="sm"
        color="blue"
        className="rounded-l h-[2.50rem]"
        onClick={addTask}
      >
        Add
      </Button>
    </div>
  );
}

// props validation
Body.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

import { Card, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import {InfinitySpin} from 'react-loader-spinner'

const url = "https://backend-mjac.onrender.com";

export default function Table({ tableKey }) {
  const [tasks, setTasks] = useState([]);
  const [loading,setLoading] = useState(false);

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${url}/api/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      toast.warning("Task Deleted !");
    } catch (error) {
      console.error(error);
      toast.error("Error Deleting Task!");
    }
  };

  const completeTask = async (taskId) => {
    try {
      await axios.put(`${url}/api/tasks/${taskId}`, { status: true });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: true } : task
        )
      );
      toast.info("Task Completed!");
    } catch (error) {
      console.error(error);
      toast.error("Server Error!");
    }
  };


  const TABLE_HEAD = ["Task", "Completed", "Actions"];

  const TABLE_ROWS = tasks.map(({ _id, title, status }) => {
    return {
      name: title,
      stat: status ? "Yes" : "No",
      id: _id,
    };
  });

  return (
    <>
    
      {loading ? (
        <Card className="w-full md:w-4/6 mx-auto flex justify-center items-center">
          <InfinitySpin 
            width='200'
            color="#4fa94d"
          />
        </Card>
      ) : (
        <Card className="overflow-scroll w-full md:w-4/6 mx-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ name, stat, id }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {stat}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex justify-center items-end space-x-2">
                        <Button
                          size="sm"
                          color="green"
                          onClick={() => completeTask(id)}
                        >
                          Complete
                        </Button>

                        <Button
                          size="sm"
                          color="red"
                          onClick={() => deleteTask(id)}
                          className="mr-2"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    
    </>
  );
}

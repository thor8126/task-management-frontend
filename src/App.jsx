import Body from "./components/Body";
import Navigation from "./components/Navigation";
import Table from "./components/Table";
import {  useState } from "react";

export default function App() {
  const [tableKey, setTableKey] = useState(0);

  const handleAddTask = () => {
    setTableKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <Navigation />
      <div className="p-12">
        <Body onAddTask={handleAddTask} />
        <br />
        <Table key={tableKey} />
      </div>
    </>
  );
}

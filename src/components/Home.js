import React, { useEffect, useState } from "react";
import Create from "./Create";
import { CheckCircleFill, Circle, TrashFill } from "react-bootstrap-icons";
import axios from "axios";
import { baseurl } from "../backendurl";

function Home() {
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    await axios
      .get(`${baseurl}/get`)
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  const handleEdit = async (id) => {
    await axios
      .put(`${baseurl}/update/` + id)
      .then((result) => {
        //location.reload();
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = async (id) => {
    try {
      console.log("ihewhfhf");
      await axios.delete(`${baseurl}/delete/` + id).then((result) => {});
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };
  const handleTaskClick = (id, done) => {
    axios
      .put(`${baseurl}/update/${id}`, { done: !done })
      .then(() => {
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };
  console.log(todos);
  return (
    <div className="home">
      <h2>To Do List</h2>
      <h4> Write Your Task, What are you Doing Today</h4>
      <Create onAddTodo={fetchTodos} />
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div
            className="task"
            onclick={() => handleEdit(todo._id)}
          >
            {todo.done ? (
              <CheckCircleFill className="icon" />
            ) : (
              <Circle
                className="icon"
                id="red"
                onClick={() => handleTaskClick(todo._id, todo.done)}
              />
            )}
            <div className="checkbox">
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                {" "}
                <TrashFill
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default Home;

import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //get the latest todos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos", {
          method: "GET",
        });
        const responseData = await response.json();
        setTodos(responseData);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    // Cleanup the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  function handlePost() {
    console.log(title, description);

    fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      response.json().then((responseData) => {
        if (responseData.message === "Todo Saved") {
          console.log("success ");
        } else {
          console.log("failed ");
        }
      });
    });
  }

  //input filling logics
  function handleChange(e) {
    if (e.target.name == "title") {
      setTitle(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  }

  //handle delete
  function handleDelete(id) {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Success!");
        } else {
          console.log("Failed to delete todo!");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <>
      <section className="header">
        <h1>Todo App</h1>
      </section>

      <section className="container">
        <section className="input">
          <h1>Please Enter the Title And the Description</h1>
          <div className="form">
            <div className="title">
              <label htmlFor="title">Todo Title</label>
              <input
                type="text"
                name="title"
                className="titleInput"
                id="titleInput"
                onChange={handleChange}
              />
            </div>
            <div className="description">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                className="descriptionInput"
                id="descriptionInput"
                onChange={handleChange}
              />
            </div>
            <button className="submit" onClick={handlePost}>
              Submit
            </button>
          </div>
        </section>
        <section className="todoList">
          <h1>Todo List</h1>
          <div className="list">
            <ul>
              {todos.map((todo, index) => (
                <li key={index}>
                  Title : {todo.title}
                  <br />
                  <br />
                  Description : {todo.description}
                  <button onClick={() => handleDelete(todo._id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </>
  );
};

export default App;

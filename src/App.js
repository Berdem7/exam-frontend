import "./App.css";
import SingleList from "./components/SingleList";
import { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [update, setUpdate] = useState(true);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    axios.get("http://13.229.92.112:3000/api/list").then((res) => {
      const data = res.data;
      console.log(data.length);
      setTodoList([...data]);
    });
  }, [update]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    // let r = (Math.random() + 1).toString(36).substring(10);

    axios
      .post(`http://13.229.92.112:3000/api/list`, {
        title: e.target[0].value,
        description: (Math.random() + 1).toString(36).substring(10),
      })
      .then(function (res) {
        console.log(res);
        setUpdate(!update);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(e.target.parentNode.childNodes[0].alt);
    const idToDelete = e.target.parentNode.childNodes[0].alt;
    axios
      .delete(`http://13.229.92.112:3000/api/list/${idToDelete}`)
      .then((res) => {
        setUpdate(!update);
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(
      e.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[1]
        .disabled
    );
    console.log(e);
  };
  return (
    <div className="max-w-4xl m-auto">
      <div className="bg-purple-500 text-white flex justify-between px-6 py-5">
        <h1 className="text-4xl font-semibold">My To Do List</h1>
        <div className="align-bottom">
          <p className="rounded-3xl bg-purple-700 w-fit px-4 py-1 inline m-auto">
            0/{todoList.length}
          </p>
        </div>
      </div>
      {todoList.map((e, i) => {
        return (
          <SingleList
            title={e.title}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            id={e._id}
            disabled={disabled}
            key={i}
          />
        );
      })}
      <Form className="m-5 p-3" onSubmit={handleSubmit}>
        <Form.Group
          className="mb-3 border-b-2 border-b-purple-300 block"
          controlId="formTitle"
        >
          <Form.Control
            className="text-md font-semibold w-full"
            type="text"
            placeholder="what's next?"
          />
        </Form.Group>

        <div className="flex justify-center">
          <button
            // onClick={handleSubmit}
            type="submit"
            className="rounded-full leading-none sticky bottom-6 text-end px-5 py-3 text-md font-bold text-white bg-purple-400"
          >
            Add Task
          </button>
        </div>
      </Form>
    </div>
  );
}

export default App;

import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
// import "/styles/list.css";
import "../list.css";

function SingleList(props) {
  return (
    <div className="flex flex-row m-4 p-5 border-b-2 border-b-slate-300">
      <div className="flex flex-row basis-4/5">
        <div className="round">
          <input type="checkbox" defaultChecked id="checkbox" />
          <label htmlFor="checkbox"></label>
        </div>
        <h1 className="mx-7">{props.title}</h1>
        {/* <input
          className="mx-7"
          type="text"
          placeholder={props.title}
          disabled={props.disabled ? "disabled" : ""}
          onBlur={(e) => (e.target.disabled = true)}
          // ref={inputValue}
        ></input> */}
      </div>
      <div className="flex flex-row basis-1/5">
        <div onClick={props.handleEdit}>
          <img className="w-5 mx-4" src="/images/edit.svg" alt={props.id} />
        </div>
        <div onClick={props.handleDelete}>
          <img className="w-5 mx-4" src="/images/bin.svg" alt={props.id} />
        </div>
      </div>
    </div>
  );
}

export default SingleList;

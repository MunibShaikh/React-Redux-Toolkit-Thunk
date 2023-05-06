import React from "react";
import "./CustomModal.css";
import { useSelector } from "react-redux";
export const CustomModal = ({ Id, showPopup, setshowPopup }) => {
  const users = useSelector((state) => state.app.users);

  const user = users.find((element) => element.id === Id);
  console.log(user);
  return (
    <div id="popup1" className="overlay">
      <div className="popup">
        <h2>{user.name}</h2>
        <span className="close" onClick={() => setshowPopup(false)}>
          &times;
        </span>
        <div className="content">
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
          <p>Age: {user.age}</p>
        </div>
      </div>
    </div>
  );
};

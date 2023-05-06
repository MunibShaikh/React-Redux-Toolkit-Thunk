import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../app/features/userDetailSlice";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const [users, setUsers] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    // use preventDefault because page refresh on form submit
    e.preventDefault();
    //call Action or dispatch action and sending data
    dispatch(createUser(users));
    navigate("/read");
  };

  return (
    <>
      <div className="container w-50 mt-5 pt-5">
        <div className="border border-secondary rounded px-5 py-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                <span className="badge bg-dark">Name</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Munib Shaikh.."
                onChange={getUserData}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <span className="badge bg-dark">Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="name@example.com"
                onChange={getUserData}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <span className="badge bg-dark">Age</span>
              </label>
              <input
                type="number"
                name="age"
                className="form-control"
                placeholder="20"
                onChange={getUserData}
              />
            </div>

            <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={getUserData}
                />
                <label className="form-check-label">Male</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={getUserData}
                />
                <label className="form-check-label">Female</label>
              </div>
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-dark">
                <strong>+</strong> Add Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;

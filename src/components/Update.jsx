import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../app/features/userDetailSlice";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.app?.users);
  const [userData, setuserData] = useState();

  useEffect(() => {
    const user = users?.filter((item) => item.id === id)[0] || null;
    setuserData(user);
  }, []);

  const getUserData = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(userData));
    navigate("/read");
  };

  return (
    <>
      {userData && (
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
                  value={userData.name}
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
                  value={userData.email}
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
                  value={userData.age}
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
                    checked={userData.gender === "male"}
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
                    checked={userData.gender === "female"}
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
      )}
    </>
  );
};

export default Update;

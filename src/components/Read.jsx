import React, { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, readUser } from "../app/features/userDetailSlice";
import { CustomModal } from "./CustomModal";

export const Read = () => {
  const dispatch = useDispatch();
  const { users, loading, searchUsers } = useSelector((state) => state.app);
  const [gender, setGender] = useState("");
  var IsEmpty = true;
  useEffect(() => {
    dispatch(readUser());
  }, []);
  const [Id, setId] = useState();
  const [showPopup, setshowPopup] = useState();
  const tagId = useId();
  if (loading) {
    return <h1>loading</h1>;
  } else {
    return (
      <>
        {showPopup && (
          <CustomModal
            Id={Id}
            showPopup={showPopup}
            setshowPopup={setshowPopup}
          />
        )}
        <div className="container mt-3">
          <h2>Users Records</h2>
          <div className="text-end">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="maleId"
                value="male"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="femaleId"
                value="female"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="allId"
                value=""
                checked={gender === ""}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="all">
                All
              </label>
            </div>
          </div>
          {users &&
            users
              .filter((item) => {
                if (item.gender === gender) {
                  IsEmpty = false;
                  return item;
                }
                if ("" === gender) {
                  IsEmpty = !Object.keys(item)?.length > 0 || false;
                  return item;
                }
              })
              .filter((item) => {
                if (searchUsers?.length === 0) {
                  return item;
                } else {
                  return item.name
                    .toLowerCase()
                    .includes(searchUsers.toLowerCase());
                }
              })
              .map((item) => (
                <div
                  className="card w-50 mx-auto my-2"
                  key={item.id + tagId}
                  id={"card-" + tagId}
                >
                  <div className="card-body" id={"card-body-" + tagId}>
                    <h5 className="card-title" id={"card-title-" + tagId}>
                      {item.name}
                    </h5>
                    <h6
                      className="card-subtitle mb-2 text-body-secondary"
                      id={"card-subtitle-" + tagId}
                    >
                      <strong>Gender:</strong> {item.gender} |{" "}
                      <strong>Age:</strong> {item.age}
                    </h6>
                    <p id={"card-text" + tagId} className="card-text">
                      {item.email}
                    </p>
                    <button
                      id={"card-view-" + tagId}
                      type="button"
                      className="btn p-0 card-link btn-link text-primary"
                      onClick={() => [setId(item.id), setshowPopup(true)]}
                    >
                      View
                    </button>
                    {/* <span className="card-link">Edit</span> */}
                    <button
                      id={"card-delete-" + tagId}
                      type="button"
                      className="btn p-0 card-link btn-link text-danger"
                      onClick={() => dispatch(deleteUser(item.id))}
                    >
                      Delete
                    </button>
                    <Link
                      id={"card-update-" + tagId}
                      type="button"
                      className="btn p-0 card-link btn-link text-info"
                      to={"/update/" + item.id}
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
          {IsEmpty && <h1>No Record Found</h1>}
        </div>
      </>
    );
  }
};

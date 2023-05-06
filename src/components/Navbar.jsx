import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUsers } from "../app/features/userDetailSlice";
const Navbar = () => {
  const allUsers = useSelector((state) => state.app.users);

  const [searchQuery, setsearchQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchUsers(searchQuery));
  }, [searchQuery]);

  return (
    <>
      <nav className="navbar-expand-lg navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-info">
            RTK TODO APP
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/read" className="nav-link">
                  Users <span> </span>
                  <span className="badge bg-primary border border-light rounded-circle">
                    {allUsers?.length || 0}
                  </span>
                </Link>
              </li>
            </ul>
            <form className="d-flex w-25">
              <input
                className="form-control me-3"
                type="search"
                placeholder="Search"
                onChange={(e) => {
                  setsearchQuery(e.target.value);
                }}
              />
              {/* <button className="btn btn-outline-success" type="submit">
                Search
              </button> */}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

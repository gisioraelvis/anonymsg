import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import styled from "styled-components";
import Button from "./Button";
import { useHistory } from "react-router";

const UserAvatar = ({ history }) => {
  const [isDropdownVisible, setDropDownVisible] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem("Access-Token");
    if (accessToken) {
      const getToken = async () => {
        const decodedToken = await jwtDecode(accessToken);
        setUserData(decodedToken.id);
      };
      getToken();
    }
  }, []);

  const handleAvatarClick = (e) => {
    setDropDownVisible(() => !isDropdownVisible);
  };

  const usehistory = useHistory();
  const handleLogoutClick = () => {
    localStorage.removeItem("Access-Token");
    usehistory.push("/login");
    return;
  };

  return (
    <>
      <StyledAvatar>
        <div className="avatar" onClick={handleAvatarClick}>
          <i className="far fa-user"></i>
        </div>
        {isDropdownVisible && (
          <div className="avatar-dropdown" id="dropdown">
            <div className="dropdown-head">
              <h3>{userData.username.toUpperCase()}</h3>
            </div>
            <ul className="links">
              <li>
                <Link onClick={handleAvatarClick} to="/dashboard">
                  <i className="fas fa-columns dashboard-icon"></i>&nbsp;
                  Dashboard
                </Link>
              </li>
              <li>
                <Link onClick={handleAvatarClick} to="/updateprofile">
                  <i className="fas fa-key password-icon"></i>&nbsp; Update
                  Profile
                </Link>
              </li>
            </ul>
            <Button
              style={{ backgroundColor: "#0fa958" }}
              onClick={handleLogoutClick}
            >
              <i className="fas fa-sign-out-alt"></i>&nbsp;Logout
            </Button>
          </div>
        )}
      </StyledAvatar>
    </>
  );
};

const StyledAvatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .avatar {
    background-color: #007acc;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 50px;
  }
  .fa-user {
    margin: 17px;
  }
  .avatar-dropdown {
    border-radius: 2rem 0 2rem 2rem;
    width: auto;
    box-shadow: 0 0 10px -3px #010101;
    background-color: #2d2d30;
    transition: 0.5s;
    position: absolute;
    top: 4rem;
    right: 5rem;
    padding: 3rem 4rem 4rem;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  li {
    list-style: none;
    margin: 0.5rem;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default UserAvatar;

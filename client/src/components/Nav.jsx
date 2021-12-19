import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import { Link } from "react-router-dom";
import UserAvatar from "./Avatar";
import { UserAuthStatus } from "../UserAuthContext";
import { useLocation } from "react-router-dom";

const Nav = ({ history }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 const location = useLocation();
  const {isUserLoggedIn} = useContext(UserAuthStatus);
  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, [location, isUserLoggedIn]);

  return (
    <>
      <StyledNav>
        <div className="logo">
          <h3>
            <Link to="/">AnonyMsg</Link>
          </h3>
        </div>
        {isLoggedIn ? (
          <UserAvatar history />
        ) : (
          <div className=" btns">
            <Link to="/login">
              <Button
                style={{ backgroundColor: "#454e56", display: "inline-block" }}
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                style={{ backgroundColor: "#0fa958", display: "inline-block" }}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </StyledNav>
    </>
  );
};

const StyledNav = styled.nav`
  height: 70px;
  background-color: #252526;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row nowrap;
  padding: 0 1.2rem;
  .btns {
    display: flex;
    flex-flow: row nowrap;
    width: auto;
    margin-right: 3.5rem;
  }

  a {
    marign: 0;
    text-decoration: none;
  }
  i {
    color: #fff;
  }
  img {
    width: 50px;
  }
  @media screen and (max-width: 600px) {
    padding: 0 5%;
    .btns {
      margin: 0;
    }
  }
`;

export default Nav;

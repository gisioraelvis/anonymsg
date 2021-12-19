import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import StyledCard from "../components/Card";
import { UserAuthStatus } from "../UserAuthContext";

const Home = () => {
  useEffect(() => {
    document.title = "AnonyMsg | Receive Anonymouse Messages";
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isUserLoggedIn } = useContext(UserAuthStatus);
  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, [isUserLoggedIn]);

  return (
    <div>
      <StyledCard height="80vh" width="85vw" margin="5px">
        <img src="./logo.png" alt="logo" style={{ width: "50px" }}></img>
        <h1>Welcome To AnonyMsg</h1>
        <h3>Receive Secret Anonymous Messages</h3>
        <hr style={HrStyles} />
        <p>
          AnonyMsg is an interactive anonymous messaging app as a dare game.
          <br />
          On registering you get a Link that you can share with your friends
          <br />
          to recieve anonymous messages easily for free!
        </p>
        {isLoggedIn ? (
          <Link to="/dashboard">
            <Button bgcolor="secondary-color" style={{ fontSize: "1.2rem" }}>
              <i class="fa-solid fa-right-to-bracket"></i>
              Dashboard
            </Button>
          </Link>
        ) : (
          <Link to="/signup">
            <Button bgcolor="secondary-color" style={{ fontSize: "1.2rem" }}>
              <i class="fa-solid fa-right-to-bracket"></i>
              Register
            </Button>
          </Link>
        )}
      </StyledCard>
    </div>
  );
};

const HrStyles = {
  width: "70%",
  border: "3px solid #3E3E42",
};

export default Home;

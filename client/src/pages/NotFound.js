import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import StyledCard from "../components/Card";

const StyledImg = {
  width: "30%",
  height: "60%",
  margin: "1px ",
};

const NotFound = () => {
  useEffect(() => {
    document.title = "Not Found | You Got Lost";
  }, []);
  return (
    <div>
      <StyledCard height="80vh" width="80vw" margin="10px">
        <h1>Seems You Got Lost </h1>
        <img src="./404.webp" alt="404-Img" style={StyledImg}></img>
        <div>
          <p>The page you are looking for was Not Found </p>
          <Link to="/">
            <Button bgcolor="secondary-color">Home</Button>
          </Link>
        </div>
      </StyledCard>
    </div>
  );
};

export default NotFound;

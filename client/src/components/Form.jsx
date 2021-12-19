import React from "react";
import StyledCard from "./Card";

const Form = ({ title, children }) => {
  return (
    <div>
      <StyledCard height="auto" width="30vw" margin="10px">
        <h1>{title}</h1>
        <div>{children}</div>
      </StyledCard>
    </div>
  );
};

export default Form;

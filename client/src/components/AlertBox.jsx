import React from "react";
import Button from "./Button";
import styled from "styled-components";

const StyledAlertBox = styled.div`
  .alert-box {
    width: 50%;
    z-index: 998;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 60px 50px #7c7c7c15;
    border-radius: 20px;
    background-color: var(--primary-background);
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 5px;
    text-align: center;
    i {
      font-size: 5rem;
      margin-bottom: 1rem;
    }
    .success {
      color: var(--success-color);
    }
    .warning {
      color: var(--warning-color);
    }
    .error {
      color: var(--error-color);
    }
    h3 {
      margin-bottom: 0.5rem;
      font-size: 3.2rem;
    }
    p {
      color: var(--primary-secondary);
      margin-bottom: 3rem;
      font-size: 1.6rem;
    }
  }
`;

const AlertBox = ({ type, title, content, buttonName, clickEvent }) => {
  return (
    <>
      <StyledAlertBox>
        <div className="alert-box">
          <div className="icon">
            {type === "success" && (
              <i className="fas fa-check-circle success"></i>
            )}
            {type === "error" && (
              <i className="fas fa-exclamation-circle error"></i>
            )}
            {type === "warning" && (
              <i className="fas fa-exclamation-triangle warning"></i>
            )}
          </div>
          <h3 style={{ color: `var(--${type}-color)` }}>{title}</h3>
          <p>Error</p>
          <Button bgcolor="secondary-color" onClick={clickEvent}>
            {buttonName}
          </Button>
        </div>
        <div className="overlay"></div>
      </StyledAlertBox>
    </>
  );
};

export default AlertBox;

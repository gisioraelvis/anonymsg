import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  padding: 5px;
  font-size: 16px;
  text-align: center;
  background-color: #252526;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
`;

const Footer = () => {
  //Get current year
  const year = new Date().getFullYear();
  return (
    <StyledFooter>
      {year} Developed By <a href="https://github.com/gisioraelvis">Gisiora</a>
    </StyledFooter>
  );
};

export default Footer;

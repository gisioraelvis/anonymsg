import styled from "styled-components";

const Button = styled.button`
  color: #fff;
  padding: 15px 30px;
  border-radius: 10px;
  margin: 5px;
  background-color: var(--${({ bgcolor }) => bgcolor});
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.75);
  i{
    margin-right: 7px;
  }
  @media screen and (max-width: 600px) {
      transform: scale(0.6);
      margin: 0;
      flex-wrap: nowrap;
    }
  }
  &:hover{
    cursor: pointer;
  }
`;

export default Button;

import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background-color: #2d2d30;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  padding: 10px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.75);
  //media querie for mobile
  @media (max-width: 768px) {
    width: auto;
    height: auto;
  }
`;

export default StyledCard;

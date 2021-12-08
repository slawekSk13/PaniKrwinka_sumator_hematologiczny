import styled, { keyframes } from "styled-components";

const animation = keyframes`
0% {}
50%{
    border-color: transparent;
    transform: rotate(-135deg) scale(90%);
    box-shadow: none;
}
100% {}`;

const LoadingStyled = styled.div`
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  border-radius: 100% 100% 0 100% / 100% 100% 0% 100%;
  border: 50px solid ${(props) => props.colors.primaryColor};
  background-color: ${(props) => props.colors.accentColor};
  transform: rotate(-135deg);
  animation-name: ${animation};
  animation-duration: 5s;
  animation-iteration-count: infinite;
  box-shadow: 0 0 15px 10px ${(props) => props.colors.shadowColor};
`;

export { LoadingStyled };

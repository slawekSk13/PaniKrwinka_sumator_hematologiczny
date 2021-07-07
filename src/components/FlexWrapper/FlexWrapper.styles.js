import styled from "styled-components";

const FlexWrapperStyled = styled.div`
display: flex;
  flex-direction: column;
  justify-content: ${props => props.justify === 'between' ? 'space-between': 'space-around'};
  align-items: center;
  flex-wrap: wrap;
  min-height: ${props => props.height}
`;

export {FlexWrapperStyled}
import styled from "styled-components";

const FlexWrapperStyled = styled.div`
display: flex;
  flex-direction: column;
  justify-content: ${props => props.justify === 'between' ? 'space-between': (props.justify === 'around' ? 'space-around' : (props.justify === 'center' ? 'center' : 'flex-start'))};
  align-items: center;
  flex-wrap: wrap;
  min-height: ${props => props.height};
  min-width: 100%;
`;

export {FlexWrapperStyled}
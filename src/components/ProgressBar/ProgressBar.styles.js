import styled from 'styled-components';

const ProgressBarStyled = styled.div.attrs(props => ({
    color: props.color,
    width: props.width
}))`
  height: 10px;
  width: ${props => props.width};
  display: inline-block;
  background-color: ${props => props.color};
`;

export {ProgressBarStyled}
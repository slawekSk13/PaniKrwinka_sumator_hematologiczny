import styled from 'styled-components';

const ButtonStyled = styled.button`
  margin: 0 1rem;
  border: none;
  padding: .5rem 2.5rem;
  font-size: 1.5em;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 4px 4px 0 hsla(0, 0%, 0%, .25);
  border-radius: 11px;
  color: ${props => props.theme.color};
  background-color: ${props => props.theme.backgroundColor};
  transition: .4s;
  &:hover, &:active {
    background-color: ${props => props.theme.hoverColor};
    box-shadow: inset 0 4px 4px 0 hsla(0, 0%, 0%, .25);
  }
`;

ButtonStyled.defaultProps = {
    theme: {
        color: '#E5E5E5',
        backgroundColor: '#951B81',
        hoverColor: '#CD1719'
    }
}

export {ButtonStyled};

// .attrs(props => ({
//     color: props.primary === true ? "black": '#951B81',
// }))

// #E5E5E5
// #CD1719
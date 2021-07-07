import styled from 'styled-components';

const ButtonStyled = styled.button`
  text-transform: uppercase;
  width: ${props => props.size === 'big' ? '75%' : '35%'};
  margin: 1rem;
  border: none;
  padding: ${props => props.size === 'big' ? '1.2rem 0' : '.5rem 0'};
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
    cursor: pointer;
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
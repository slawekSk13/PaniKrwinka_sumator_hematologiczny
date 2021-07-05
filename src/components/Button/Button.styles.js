import styled from 'styled-components'

const ButtonStyled = styled.button.attrs(props => ({
    color: props.primary === true ? "black": '#951B81',
}))`
  margin: 0 1rem;
  border: none;
  padding: .5rem 2.5rem;
  font-size: 1.5em;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 4px 4px 0 hsla(0, 0%, 0%, .25);
  border-radius: 11px;
  color: #E5E5E5;
  background-color: ${props => props.color};
  transition: .4s;
  &:hover {
    background-color: #CD1719;
  }
`;

export default ButtonStyled;
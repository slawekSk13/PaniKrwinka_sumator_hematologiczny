import styled from 'styled-components';

const InputStyled = styled.input.attrs({
    autocomplete: 'off'
})`
  width: 75%;
  font-size: 1.5rem;
  text-transform: uppercase;
  text-align: center;
  color: ${props => props.colors.primaryColor};
  padding: 1rem 0;
  background: ${props => props.colors.progressBarNegativeColor};
  border: 2px solid ${props => props.colors.primaryColor};
  box-shadow: 0 4px 4px ${props => props.colors.shadowColor};
  border-radius: 10px;
  margin: 1rem;

  &::placeholder {
    font-size: 1.3rem;
    text-transform: ${props => props.up ? 'none' : 'lowercase'};
    color: ${props => props.colors.placeholderPrimaryColor};
  }

  &:focus {
    outline: none;
    border: 2px solid ${props => props.colors.accentColor};
    box-shadow: inset 0 4px 4px ${props => props.colors.shadowColor};
    color: ${props => props.colors.accentColor};

    &::placeholder {
      color: ${props => props.colors.placeholderAccentColor};
    }
  }
`;

export {InputStyled};
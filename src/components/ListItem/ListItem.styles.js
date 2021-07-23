import styled from 'styled-components'

const ListItemStyled = styled.li`
  font-size: 1.3rem;
  color: ${props => props.colors.primaryColor};
  margin-bottom: 1rem;
  &:hover {
    color: ${props => props.colors.accentColor};
    cursor: pointer;
  }
`;

export {ListItemStyled}
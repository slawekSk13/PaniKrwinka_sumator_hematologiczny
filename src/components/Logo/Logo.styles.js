import styled from 'styled-components'

import logoSrc from '../../assets/logo.png';

const LogoStyled = styled.img.attrs({
    src: `${logoSrc}`
})`
  filter: drop-shadow(0 6px 6px ${props => props.colors.shadowColor});
  max-width: 100%;
  margin: 0 auto;
  &:hover {
    cursor: pointer;
  }
`;

export {LogoStyled};
import styled from 'styled-components'

import logoSrc from '../../assets/logo.png';

const LogoStyled = styled.img.attrs({
    src: `${logoSrc}`
})`
  filter: drop-shadow(0 6px 6px rgba(0, 0, 0, .4));
  max-width: 100%;
  margin: 0 auto;
`;

export {LogoStyled};
import styled, { keyframes } from 'styled-components';

const animation = keyframes`
0% {
    border-width: 30px;
    transform: rotate(0deg);
}
50%{
    border-width: 50px;
    transform: rotate(180deg);
}
100% {
    border-width: 30px;
    transform: rotate(360deg);
}`

const LoadingStyled = styled.div`
box-sizing: border-box;
width: 100px;
height: 100px;
border-radius: 50%;
border: 40px solid ${props => props.colors.primaryColor};
border-bottom-color: ${props => props.colors.accentColor};
border-top-color: ${props => props.colors.accentColor};
background-color: ${props => props.colors.accentColor};
animation-name: ${animation};
animation-duration: 5s;
animation-iteration-count: infinite;
`;

export {LoadingStyled}
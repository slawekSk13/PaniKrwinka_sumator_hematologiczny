import React from 'react';
import {ThemeProvider} from 'styled-components';

 const Wrapper = (props) => {
     const theme = {
         default: {
             color: '#E5E5E5',
             backgroundColor: '#951B81',
             hoverColor: '#CD1719'
         },
         reversed: {
             color: '#E5E5E5',
             backgroundColor: '#CD1719',
             hoverColor: '#951B81'
         },
         dark: {
             color: '#951B81',
             backgroundColor: '#E5E5E5',
             hoverColor: '#E5E5E5'
         }
     }
     return(
         <ThemeProvider theme={theme.default}>
             {props.children}
         </ThemeProvider>
     );
}

export default Wrapper;


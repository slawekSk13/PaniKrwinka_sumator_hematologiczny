import React from 'react';
import {ThemeProvider} from 'styled-components';

 const Wrapper = (props) => {
     const theme = {
         color: '#E5E5E5',
         backgroundColor: '#CD1719',
         hoverColor: '#951B81'
     }
     return(
         <ThemeProvider theme={theme}>
             {props.children}
         </ThemeProvider>
     );
}

export default Wrapper;


import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  caption-side: top;
  border-bottom: none;
  border-collapse: collapse;
  /* border-collapse: separate; */
  /* border-spacing: 5px 10px; */

  caption-side: bottom;
  margin: 2rem;
  /* empty-cell: show | hide;  */
  /* empty-cell is a property of table or the cells themselves */

  /* vertical-align: baseline | sub | super | text-top | 
                text-bottom | middle | top | bottom | 
                <percentage> | <length> */

  /* tbody {
    vertical-align: top;
  }              */
  color: #951B81;
  td,
  th {
    border: none;
    /* border-bottom: 10px solid brown; */
  }
  /* td,
  th {
    border: 1px solid;
  } */

  td {
    padding: .5rem 1rem;
    :first-of-type {
      font-weight: 600;
    }
  }
  
  tr {
    border-bottom: 1px solid #951B81;
  }

  tr {
    :nth-of-type(odd) {
      background-color: #F9F9F9;
    }
    :nth-of-type(4) {
      border-top: 2px solid #951B81;
    }
    :hover {
      box-shadow: inset 0 4px 4px rgba(0, 0, 0, .25);
    }
  }
  //thead > tr {
  //  background-color: #c2c2c2;
  //}
  //caption {
  //  font-size: 0.9em;
  //  padding: 5px;
  //  font-weight: bold;
  //}
`;

export {StyledTable}

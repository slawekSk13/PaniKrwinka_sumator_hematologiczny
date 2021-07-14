import styled from "styled-components";

const StyledTable = styled.table`
  border: none;
  border-collapse: collapse;
  margin: 2rem;
  color: #951B81;
  td {
    border: none;
    padding: .5rem;

    :first-of-type {
      font-weight: 600;
    }
  }

  tr {
    border-bottom: 1px solid #951B81;

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
`;

export {StyledTable}

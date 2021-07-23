import styled from "styled-components";

const StyledTable = styled.table`
  border: none;
  border-collapse: collapse;
  margin: 2rem;
  color: ${props => props.colors.primaryColor};
  td {
    border: none;
    padding: .5rem;
    text-align: left;
    :first-of-type {
      font-weight: 600;
      padding-left: 1.5rem;
    }
  }

  tr {
    border-bottom: 1px solid ${props => props.colors.primaryColor};

    :nth-of-type(odd) {
      background-color: ${props => props.colors.progressBarNegativeColor};
    }

    :nth-of-type(4) {
      border-top: 2px solid ${props => props.colors.primaryColor};
    }

    :hover {
      box-shadow: inset 0 4px 4px ${props => props.colors.shadowColor};
    }
  }
`;

export {StyledTable}

import { useState } from "react";
import { ListStyled } from "./List.styles";
import { ListItem } from "../ListItem/ListItem";
import { Link } from "react-router-dom";
import { TipText } from "../TipText/TipText";

import ReactPaginate from "react-paginate";

const List = ({ results }) => {
  const revResults = [...results].sort((a, b) => (a.id > b.id ? -1 : 1));
  const perPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [resultsToShow, setResultsToShow] = useState(
    revResults.slice(0, perPage)
  );
 
  const pageCount = Math.ceil(revResults.length / perPage);

  const handlePaginate = ({ selected }) => {
    setResultsToShow([
      ...revResults.slice(selected * perPage, selected * perPage + perPage),
    ]);
    setCurrentPage(selected);
  };

  return results.length > 0 ? (
    <>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePaginate}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        containerClassName={"pagination"}
        activeClassName={"pagination__active"}
        nextLabel={">>"}
        previousLabel={"<<"}
        forcePage={currentPage}
      />
      <ListStyled>
        {resultsToShow.map((result) => (
          <Link
            key={result.id}
            style={{ width: "100%", textDecoration: "none" }}
            to="/history"
          >
            <ListItem result={result} results={results} />
          </Link>
        ))}
      </ListStyled>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePaginate}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        containerClassName={"pagination"}
        activeClassName={"pagination__active"}
        nextLabel={">>"}
        previousLabel={"<<"}
        forcePage={currentPage}
      />
    </>
  ) : (
    <TipText text="Brak danych, zmień wyszukiwanie" />
  );
};

export { List };

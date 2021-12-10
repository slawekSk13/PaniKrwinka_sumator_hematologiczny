import { ListStyled } from "./List.styles";
import { ListItem } from "../ListItem/ListItem";
import { Link } from "react-router-dom";
import { TipText } from "../TipText/TipText";

const List = ({ results, handleClick, regEx, historicalResults, historicalPatients }) => (
  results.length > 0 ? <ListStyled>
    {results.map((result) => (
      <Link
        key={result.id}
        style={{ width: "100%", textDecoration: "none" }}
        to="/history"
      >
        <ListItem onClick={handleClick} result={result} results={results}/>
      </Link>
    ))}
  </ListStyled> : <TipText text='Brak danych, zmień wyszukiwanie'/>
);

export { List };

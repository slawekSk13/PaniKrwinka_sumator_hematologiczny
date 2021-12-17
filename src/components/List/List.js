import { ListStyled } from "./List.styles";
import { ListItem } from "../ListItem/ListItem";
import { Link } from "react-router-dom";
import { TipText } from "../TipText/TipText";


const List = ({ results }) => {
  
const revResults = [...results].sort((a, b) => a.id > b.id ? -1 : 1);
  
  return results.length > 0 ? (
    <ListStyled>
      {revResults.map((result) => (
        <Link
          key={result.id}
          style={{ width: "100%", textDecoration: "none" }}
          to="/history"
        >
          <ListItem result={result} results={results} />
        </Link>
      ))}
    </ListStyled>
  ) : (
    <TipText text="Brak danych, zmień wyszukiwanie" />
  );
};

export { List };

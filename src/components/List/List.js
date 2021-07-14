import {ListStyled} from "./List.styles";
import propTypes from "prop-types";
import {ListItem} from "../ListItem/ListItem";
import {Link} from "react-router-dom";

const List = ({results, handleClick}) => <ListStyled>{results.map(result => <Link key={result.id} style={{width: '100%', textDecoration: 'none'}} to='/history'><ListItem onClick={handleClick} result={result}/></Link>)}</ListStyled>

export {List}
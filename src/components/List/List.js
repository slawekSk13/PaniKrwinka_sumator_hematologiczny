import {ListStyled} from "./List.styles";
import propTypes from "prop-types";
import {ListItem} from "../ListItem/ListItem";

const List = ({results}) => <ListStyled>{results.map(result => <ListItem key={result.id} result={result}/>)}</ListStyled>

export {List}
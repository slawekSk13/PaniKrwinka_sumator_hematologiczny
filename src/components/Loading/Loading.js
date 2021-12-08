import { LoadingStyled } from "./Loading.styles"
import {ColorTheme} from "../../utilities/ColorTheme";
const Loading = () => {
    return (
        <ColorTheme.Consumer>
       {colors => <LoadingStyled colors={colors}/>}
        </ColorTheme.Consumer>)}

export {Loading}
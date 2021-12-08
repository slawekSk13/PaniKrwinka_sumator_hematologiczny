import { LoadingStyled } from "./Loading.styles"
import {ColorTheme} from "../../utilities/ColorTheme";
import { FlexWrapper } from "../FlexWrapper/FlexWrapper";
const Loading = () => {
    return (
        <ColorTheme.Consumer>
       {colors => <FlexWrapper><LoadingStyled colors={colors}/></FlexWrapper>}
        </ColorTheme.Consumer>)}

export {Loading}
import { TipTextStyled } from "./TipText.styles";
import propTypes from "prop-types";
import { ColorTheme } from "../../utilities/ColorTheme";

const TipText = ({ text, onClick }) => {
  const handleClick = () => {
    onClick && typeof onClick === "function" && onClick();
  };
  return (
    <ColorTheme.Consumer>
      {(colors) => (
        <TipTextStyled colors={colors} onClick={handleClick}>
          {text}
        </TipTextStyled>
      )}
    </ColorTheme.Consumer>
  );
};

TipText.propTypes = {
  /** text to show as a content */
  text: propTypes.string,
};

export { TipText };

import React from "react";
import { SelectStyled } from "./Select.styles";
// import propTypes from "prop-types";
import { ColorTheme } from "../../utilities/ColorTheme";

const Select = ({ options, handleSelect }) => {

  const sortedOptions = options.sort((a,b) => a.patName > b.patName ? 1 : -1 )

  return (
    <ColorTheme.Consumer>
      {(colors) => (
        <SelectStyled
          colors={colors}
          value={false}
          onChange={handleSelect}
        >
          <option value={false}>
            --- wybierz z historii ---
          </option>
          {sortedOptions.map((option) => {
            const { id, patName, patOwnerName, patOwnerLname, species } =
              option;
            return (
              <option key={id} value={id}>
                {patName} - {species} - {patOwnerName} {patOwnerLname}
              </option>
            );
          })}
        </SelectStyled>
      )}
    </ColorTheme.Consumer>
  );
};

export { Select };

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Results } from "./Results";
import { sum } from "../utilities/helpers";

const HistoricalResults = ({ resultsToShowArray }) => {
  return (
    <Carousel
      infiniteLoop
      showIndicators={false}
      showThumbs={false}
      showStatus={false}
    >
      {resultsToShowArray.map((result) => (
        <Results
          key={result.id}
          results={result}
          patient={result.patient}
          progress={Object.values(result.leukogram.relative).reduce(sum)}
          calcFinished={true}
        />
      ))}
    </Carousel>
  );
};

export { HistoricalResults };

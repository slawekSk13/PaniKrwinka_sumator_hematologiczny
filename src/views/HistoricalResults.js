import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Results} from './Results'

const HistoricalResults = ({resultsToShowArray, sum}) => {

    return(
        <Carousel infiniteLoop showIndicators={false} showThumbs={false} showStatus={false}>
            {resultsToShowArray.map(result => <Results key={result.id} results={result} patient={result.patient} date={result.date} progress={Object.values(result.leukogram.relative).reduce(sum)} calcFinished={true} save={()=>console.log('Already saved')}/>)}
        </Carousel>
        )
}

export  {HistoricalResults}

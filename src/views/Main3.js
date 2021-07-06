import React from 'react';
import {Button} from "../components/Button/Button";

const Main3 = (props) => {
    const text = props.match.params.text;
    return (
        <>
            <Button text="NRBC"/>
            <Button text={text} primary={true}/>
        </>
    );
};

export {Main3};
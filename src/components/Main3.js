import React from 'react';
import Button from "./Button/Button";

const Main3 = (props) => {
    const text = props.match.params.text;
    return (
        <>
            <Button text="NRBC"/>
            <Button text={text} primary={true}/>
        </>
    );
};

export default Main3;
import React from 'react';
import Button from "./Button/Button";

const Main3 = (props) => {
    const text = props.match.params.text;
    return (
        <div style={{padding: "25%"}}>
            <Button text="NRBC"/>
            <Button text={text} primary={true}/>
        </div>
    );
};

export default Main3;
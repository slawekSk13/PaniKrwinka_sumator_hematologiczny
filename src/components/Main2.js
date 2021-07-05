import React from 'react';
import Button from "./Button/Button";

const Main2 = () => {
    return (
        <div style={{padding: "25%"}}>
            <Button text="NRBC"/>
            <Button text="NRBC" primary={true}/>
        </div>
    );
};

export default Main2;
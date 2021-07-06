import {useState} from "react";

import {Input, Label, Indicator} from './RadioButton.styles'

const SingleRadioButton = ({id, onChange, name, label, checked, value}) => {
    return (
        <Label htmlFor={id}>
            {label}
            <Input  id={id}
                    type="radio"
                    role="radio"
                    name={name}
                    value={value}
                    onChange={onChange}
                    checked={checked}
            />
            <Indicator />
        </Label>
    );
}

const RadioButtonGroup = () => {
    const [radioValue, setRadioValue] = useState('pies');
    return (
        <>
            <SingleRadioButton id={1} onChange={() => {
                setRadioValue('pies');
            }} name="pies" label="pies" checked={radioValue === 'pies'} value={radioValue}/>
            <SingleRadioButton id={2} onChange={() => {
                setRadioValue('kot');
            }} name="kot" label="kot" checked={radioValue === 'kot'} value={radioValue}/>
            <SingleRadioButton id={3} onChange={() => {
                setRadioValue('inny');
            }} name="inny" label="inny" checked={radioValue === 'inny'} value={radioValue}/>
        </>
    );
}

export {RadioButtonGroup}
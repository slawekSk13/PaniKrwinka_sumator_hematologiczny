import {useState} from "react";

import {Input, Label, Indicator} from './RadioButton.styles'
import propTypes from 'prop-types'

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

const RadioButtonGroup = ({onChange}) => {
    const [radioValue, setRadioValue] = useState('pies');

    const handleChange = (value) => {
        onChange(value);
        setRadioValue(value);
    }

    return (
        <div style={{width: '80%', position: 'relative', left: '1.5rem'}}>
            <SingleRadioButton id={1} onChange={() => {
                handleChange('pies');
            }} name="pies" label="pies" checked={radioValue === 'pies'} value={radioValue}/>
            <SingleRadioButton id={2} onChange={() => {
                handleChange('kot');
            }} name="kot" label="kot" checked={radioValue === 'kot'} value={radioValue}/>
            <SingleRadioButton id={3} onChange={() => {
                handleChange('inny');
            }} name="inny" label="inny" checked={radioValue === 'inny'} value={radioValue}/>
        </div>
    );
}

RadioButtonGroup.propTypes = {
    /** function to handle change */
    onChange: propTypes.func
}

RadioButtonGroup.defaultProps = {
    onChange: e => console.log(e)
}

export {RadioButtonGroup}
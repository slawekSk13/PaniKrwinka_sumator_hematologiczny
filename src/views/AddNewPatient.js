import {Input} from "../components/Input/Input";
import {RadioButtonGroup} from "../components/RadioButtonGroup/RadioButtonGroup";
import {Button} from "../components/Button/Button";
import {TipText} from "../components/TipText/TipText";
import {FlexWrapper} from "../components/FlexWrapper/FlexWrapper";
import {useState} from "react";
import {Link} from 'react-router-dom'

const AddNewPatient = ({confirmPatient, patient}) => {
    const [localPatient, setLocalPatient] = useState({
        id: patient.id,
        patName: patient.patName,
        patOwnerName: patient.patOwnerName,
        patOwnerLname: patient.patOwnerLname,
        species: patient.species
    });

    const handleLocalPatientChange = e => {
        const {name, value} = e.target;
        setLocalPatient(prevState => (
            {
                ...prevState,
                [name]: capitalizeFirstLetter(value)
            }

        ));
    }

    const handleRadioChange = species => {
        setLocalPatient(prevState => (
            {
                ...prevState,
                species: species
            }
        ));
    }

    const handleClick = () => {
        typeof confirmPatient === 'function' ? confirmPatient(localPatient) : console.warn(`confirmPatient must be a function, patientToSave could not be saved`);
    }

    const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

    return (
        <FlexWrapper>
            <FlexWrapper justify='around' height='65vh'>
                <Input onChange={handleLocalPatientChange} name={'patName'} value={localPatient.patName}
                       placeholder='imię pacjenta'/>
                <Input onChange={handleLocalPatientChange} name={'patOwnerName'} value={localPatient.patOwnerName}
                       placeholder='imię właściciela'/>
                <Input onChange={handleLocalPatientChange} name={'patOwnerLname'} value={localPatient.patOwnerLname}
                       placeholder='nazwisko właściciela'/>
                <RadioButtonGroup onChange={handleRadioChange}/>
                <Link style={{width: '100%', textAlign: 'center'}} to='/leukogram'>
                    <Button onClick={handleClick} size='big' text='dalej'/>
                </Link>
            </FlexWrapper>
            <TipText text='Wprowadź dane pacjenta'/>
        </FlexWrapper>
    );
}

export {AddNewPatient}
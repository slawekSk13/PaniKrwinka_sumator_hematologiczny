import {Input} from "../components/Input/Input";
import {RadioButtonGroup} from "../components/RadioButtonGroup/RadioButtonGroup";
import {Button} from "../components/Button/Button";
import {TipText} from "../components/TipText/TipText";
import {FlexWrapper} from "../components/FlexWrapper/FlexWrapper";
import {useState} from "react";
import {Link} from 'react-router-dom'

const AddNewPatient = ({confirmPatient}) => {
    const [localPatient, setLocalPatient] = useState({
        name: '',
        ownerName: '',
        ownerSurname: '',
        species: 'pies',
        date: new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    });

    const handleLocalPatientChange = e => {
        const {name, value} = e.target;
        setLocalPatient(prevState => (
            {
                ...prevState,
                [name]: value
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
        const patientToSave = {
            name: capitalizeFirstLetter(localPatient.name),
            owner: {
                name: capitalizeFirstLetter(localPatient.ownerName),
                surname: capitalizeFirstLetter(localPatient.ownerSurname)
            },
            species: localPatient.species,
            date: localPatient.date
        }
        typeof confirmPatient === 'function' ? confirmPatient(patientToSave) : console.warn(`confirmPatient must be a function, patientToSave could not be saved`);
    }

    const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

    return (
        <FlexWrapper>
            <FlexWrapper justify='around' height='65vh'>
                <Input onChange={handleLocalPatientChange} name={'name'} value={localPatient.name}
                       placeholder='imię pacjenta'/>
                <Input onChange={handleLocalPatientChange} name={'ownerName'} value={localPatient.ownerName}
                       placeholder='imię właściciela'/>
                <Input onChange={handleLocalPatientChange} name={'ownerSurname'} value={localPatient.ownerSurname}
                       placeholder='nazwisko właściciela'/>
                <RadioButtonGroup onChange={handleRadioChange}/>
                <Link style={{width: '100%', textAlign: 'center'}} to='/leukogram' >
                <Button onClick={handleClick} size='big' text='dalej'/>
                </Link>
            </FlexWrapper>
            <TipText text='Wprowadź dane pacjenta'/>
        </FlexWrapper>
    );
}

export {AddNewPatient}
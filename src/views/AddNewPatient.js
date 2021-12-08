import {Input} from "../components/Input/Input";
import {RadioButtonGroup} from "../components/RadioButtonGroup/RadioButtonGroup";
import {Button} from "../components/Button/Button";
import {TipText} from "../components/TipText/TipText";
import {FlexWrapper} from "../components/FlexWrapper/FlexWrapper";
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom'

const AddNewPatient = ({confirmPatient, patient, historicalPatients}) => {
    const [localPatient, setLocalPatient] = useState({
        id: patient.id,
        patName: patient.patName,
        patOwnerName: patient.patOwnerName,
        patOwnerLname: patient.patOwnerLname,
        species: patient.species
    });

    const [matchingPatient, setMatchingPatient] = useState([]);

    const handleLocalPatientChange = e => {
        const {name, value} = e.target;
        setLocalPatient(prevState => (
            {
                ...prevState,
                [name]: capitalizeFirstLetter(value)
            }));
    }

    useEffect(() => {
        if (historicalPatients) {
            const checkMatch = element => {
                if (element.patName === localPatient.patName && element.patOwnerName === localPatient.patOwnerName && element.patOwnerLname === localPatient.patOwnerLname && element.species === localPatient.species) {
                    return element
                }
            }
            const foundPatient = historicalPatients.filter(checkMatch)
            setMatchingPatient(foundPatient);
        }
    }, [localPatient])

    const handleRadioChange = species => {
        setLocalPatient(prevState => (
            {
                ...prevState,
                species: species
            }
        ));
    }

    const handleClick = () => {
        if (typeof confirmPatient === 'function') {
            const {patName, patOwnerName, patOwnerLname} = localPatient;
            patName.length > 0 && patOwnerName.length > 0 && patOwnerLname.length > 0 && confirmPatient(localPatient, matchingPatient);
        } else console.warn(`confirmPatient must be a function, patientToSave could not be saved`);
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
                <Link className='link' to='/leukogram'>
                    <Button onClick={handleClick} size='big' text={matchingPatient.length === 0 ? 'dalej' : 'tak'}/>
                </Link>
            </FlexWrapper>
            <TipText
                text={matchingPatient.length === 0 ? 'Wprowadź dane pacjenta' : `${capitalizeFirstLetter(localPatient.species)} ${localPatient.patName} należący do właściciela o imieniu i nazwisku ${localPatient.patOwnerName} ${localPatient.patOwnerLname} jest już w bazie. Czy to ten sam? Jeśli tak, przejdź dalej, aby dodać kolejne badanie dla tego pacjenta. Jeśli nie, dodaj jakiś wyróżnik do danych, żeby móc w przyszłości odróżnić pacjentów.`}/>
        </FlexWrapper>
    );
}

export {AddNewPatient}
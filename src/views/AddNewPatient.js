import {Input} from "../components/Input/Input";
import {RadioButtonGroup} from "../components/RadioButtonGroup/RadioButtonGroup";
import {Button} from "../components/Button/Button";
import {TipText} from "../components/TipText/TipText";

const AddNewPatient = () => {
    const data = ['imię pacjenta', 'imię właściciela', 'nazwisko właściciela'];
    const style = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        minHeight: '75vh'
    }
    return (
        <div style={style}>
            <div style={{...style, minHeight: '65vh', justifyContent: 'space-around'}}>
            {data.map((element, i) => <Input key={i} placeholder={element} />)}
            <RadioButtonGroup />
            <Button width='big' text='dalej' />
            </div>
            <TipText text='Wprowadź dane pacjenta'/>
        </div>
    );
}

export {AddNewPatient}
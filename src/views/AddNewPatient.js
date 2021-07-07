import {Input} from "../components/Input/Input";
import {RadioButtonGroup} from "../components/RadioButtonGroup/RadioButtonGroup";
import {Button} from "../components/Button/Button";
import {TipText} from "../components/TipText/TipText";
import {FlexWrapper} from "../components/FlexWrapper/FlexWrapper";

const AddNewPatient = () => {
    const data = ['imię pacjenta', 'imię właściciela', 'nazwisko właściciela'];
     return (
        <FlexWrapper>
            <FlexWrapper justify='around' height='65vh'>
            {data.map((element, i) => <Input key={i} placeholder={element} />)}
            <RadioButtonGroup />
            <Button width='big' text='dalej' />
            </FlexWrapper>
            <TipText text='Wprowadź dane pacjenta'/>
        </FlexWrapper>
    );
}

export {AddNewPatient}
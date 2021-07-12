import {Button} from "../components/Button/Button";
import {FlexWrapper} from "../components/FlexWrapper/FlexWrapper";
import {ProgressBar} from "../components/ProgressBar/ProgressBar";
import {Table} from "../components/Table/Table";
import {Center} from "../components/Center/Center";
import {Input} from "../components/Input/Input";
import {TipText} from "../components/TipText/TipText";
import {useState} from "react";
import {Link} from "react-router-dom";

const Leukogram = ({patient, progress, handleAddCell, results, date}) => {
    const [localWbc, setLocalWbc] = useState(results.wbc !== 0 ? results.wbc.toString() : '');
    const [calcFinished, setCalcFinished] = useState(false);
    const handleLocalWbc = e => {
        const newValue = e.target.value;
        const regex = /^\d*(\.|,?)\d{0,2}$/;
        const isValid = () => newValue.match(regex);
        setLocalWbc(prevState => {
            if(isValid()) {
                return newValue;
            } return prevState;
        });
    }
    const handleMultiClick = e => {
        typeof handleAddCell === 'function' ? handleAddCell(e.target.innerText.toLowerCase()) : console.warn('handleAddCell must be a function');
        setCalcFinished(false);
        progress >= 99 && setCalcFinished(true);
    }
    const handleWbcClick = () => {
        const newValue = Number.parseFloat(localWbc.replace(',', '.'));
        handleAddCell('wbc', newValue);
        setLocalWbc(results.wbc);
    }

    const leuko = <>
        {Object.keys(results).slice(0,-2).map((element, i) => <Button key={i} text={element} name={element} onClick={handleMultiClick} />)}
        <Button onClick={()=> setCalcFinished(true)} text='dalej' size='big' />
    </>


    return (
        <FlexWrapper justify='around'>
            <Table patient={patient} date={date}/>
            <ProgressBar progress={progress} />
            <Center>
            {!calcFinished || progress < 1 ? leuko : (
                <FlexWrapper height='40vh'>
                    <Center>
                        <Input onChange={handleLocalWbc} name='wbc' value={localWbc} placeholder='WBC (G/l)' up={true}/>
                        <Link to={localWbc === ''? '/leukogram' : '/results'} >
                        <Button onClick={handleWbcClick} text='dalej' size='big' />
                        </Link>
                    </Center>
                    <TipText text='Dzięki wprowadzeniu WBC będziemy mogli podać Ci wartość bezwzględną i w razie potrzeby wartość skorygowaną WBC'/>
                </FlexWrapper>
            )}
            </Center>
        </FlexWrapper>
    );
}

export {Leukogram}
import {Button} from "../components/Button/Button";
import {FlexWrapper} from "../components/FlexWrapper/FlexWrapper";
import {ProgressBar} from "../components/ProgressBar/ProgressBar";
import {Table} from "../components/Table/Table";
import {Center} from "../components/Center/Center";

const Leukogram = ({patient, progress, handleAddCell, results}) => {
    const handleClick = e => {
        typeof handleAddCell === 'function' ? handleAddCell(e.target.innerText.toLowerCase()) : console.warn('handleAddCell must be a function');
    }

    return (
        <FlexWrapper justify='around'>
            <Table patient={patient}/>
            <ProgressBar progress={progress} />
            <Center>
            {Object.keys(results).slice(0,-1).map((element, i) => <Button key={i} text={element} name={element} onClick={handleClick} />)}
            </Center>
        </FlexWrapper>
    );
}

export {Leukogram}
import {Button} from "../components/Button/Button";
import {FlexWrapper} from "../components/FlexWrapper/FlexWrapper";
import {ProgressBar} from "../components/ProgressBar/ProgressBar";
import {Table} from "../components/Table/Table";
import {Center} from "../components/Center/Center";

const Leukogram = () => {
    const data = ['band', 'seg', 'lym', 'mon', 'eos', 'bas', 'pml', 'mie', 'met', 'mlb', 'inne', 'nrbc'];
    return (
        <FlexWrapper justify='around'>
            <Table />
            <ProgressBar progress={30} />
            <Center>
            {data.map((element, i) => <Button key={i} text={element} />)}
            </Center>
        </FlexWrapper>
    );
}

export {Leukogram}
import {Button} from "../components/Button/Button";
import {FlexWrapper} from "../components/FlexWrapper/FlexWrapper";
import {ProgressBar} from "../components/ProgressBar/ProgressBar";
import {Table} from "../components/Table/Table";

const Leukogram = () => {
    const data = ['band', 'seg', 'lym', 'mon', 'eos', 'bas', 'pml', 'mie', 'met', 'mlb', 'inne', 'nrbc'];
    return (
        <FlexWrapper justify='around'>
            <Table />
            <ProgressBar progress={30} />
            <div style={{textAlign: 'center'}}>
            {data.map((element, i) => <Button key={i} text={element} />)}
            </div>
        </FlexWrapper>
    );
}

export {Leukogram}
import {Table} from "../components/Table/Table";
import {FlexWrapper} from "../components/FlexWrapper/FlexWrapper";
import {Center} from "../components/Center/Center";
import {Icon} from "../components/Icon/Icon";
import {TipText} from "../components/TipText/TipText";

const Results = () => {
    const results = [
        {
            band: 15,
            seg: 6,
            lym: 10,
            mon: 15,
            eos: 1,
            bas: 12,
            pml: 10,
            mie: 7,
            met: 12,
            mlb: 2,
            inne: 2
        },
        {wbc: 13.5},
        {
            nrbc: 5
        }
    ]
    return (
        <FlexWrapper>
            <Table results={results} />
            <Center>
                <Icon icon='pdf' />
                <Icon icon='print' />
                <Icon icon='add' />
            </Center>
            <TipText text='Możesz zapisać wynik badania w formacie PDF lub od razu go wydrukować'/>
        </FlexWrapper>
    );
}

export {Results}
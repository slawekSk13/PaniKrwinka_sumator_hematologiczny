import {Table} from "../components/Table/Table";
import {FlexWrapper} from "../components/FlexWrapper/FlexWrapper";
import {Center} from "../components/Center/Center";
import {Icon} from "../components/Icon/Icon";
import {TipText} from "../components/TipText/TipText";
import {download, print} from "../utilities/pdf";

const Results = ({patient, results, save, progress, calcFinished, history}) => {
    return (
        <FlexWrapper>
            <Table results={results} patient={patient} date={results.date} progress={progress} calcFinished={calcFinished} />
            <Center>
                <Icon onClick={() => download(patient, results, (results.date), progress)} icon='pdf' />
                <Icon onClick={() => print(patient, results, (results.date), progress)} icon='print' />
                    {!history && <Icon onClick={save} icon='save'/>}
            </Center>
            <TipText text='Możesz zapisać wynik badania w formacie PDF lub od razu go wydrukować, a także zresetować wyniki i zacząć nowe badanie'/>
        </FlexWrapper>
    );
}

export {Results}
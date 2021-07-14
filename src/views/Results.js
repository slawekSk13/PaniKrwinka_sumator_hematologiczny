import {Table} from "../components/Table/Table";
import {FlexWrapper} from "../components/FlexWrapper/FlexWrapper";
import {Center} from "../components/Center/Center";
import {Icon} from "../components/Icon/Icon";
import {TipText} from "../components/TipText/TipText";
import {Link} from "react-router-dom";
import {download, print} from "../utilities/pdf";

const Results = ({patient, results, save, date, progress, calcFinished}) => {
    return (
        <FlexWrapper>
            <Table results={results} patient={patient} date={date} progress={progress} calcFinished={calcFinished} />
            <Center>
                <Icon onClick={() => download(patient, results, progress)} icon='pdf' />
                <Icon onClick={() => print(patient, results, progress)} icon='print' />
                <Link to='/'>
                <Icon onClick={() => save('results')} icon='save' />
                </Link>
            </Center>
            <TipText text='Możesz zapisać wynik badania w formacie PDF lub od razu go wydrukować, a także zresetować wyniki i zacząć nowe badanie'/>
        </FlexWrapper>
    );
}

export {Results}
import {Table} from "../components/Table/Table";
import {FlexWrapper} from "../components/FlexWrapper/FlexWrapper";
import {Center} from "../components/Center/Center";
import {Icon} from "../components/Icon/Icon";
import {TipText} from "../components/TipText/TipText";
import {Link} from "react-router-dom";

const Results = ({results, reset}) => {

    return (
        <FlexWrapper>
            <Table results={results} />
            <Center>
                <Icon icon='pdf' />
                <Icon icon='print' />
                <Link to='/'>
                <Icon onClick={reset} icon='add' />
                </Link>
            </Center>
            <TipText text='Możesz zapisać wynik badania w formacie PDF lub od razu go wydrukować, a także zresetować wyniki i zacząć nowe badanie'/>
        </FlexWrapper>
    );
}

export {Results}
import {FlexWrapper} from "../components/FlexWrapper/FlexWrapper";
import {Button} from "../components/Button/Button";
import {Input} from "../components/Input/Input";
import {Link} from "react-router-dom";
import {useState} from "react";
import {TipText} from "../components/TipText/TipText";


const NewOrHistory = () => {
    const [historySearch, setHistorySearch] = useState('');
    const handleHistorySearch = e => {
        setHistorySearch(e.target.value);
    }

    return (
        <FlexWrapper>
            <FlexWrapper justify='start' height={historySearch === '' ? '35vh' : '65vh'}>
                {historySearch === '' && <Link style={{width: '100%', textAlign: 'center'}} to='/addnewpatient'>
                    <Button text='nowe badanie' size='big'/>
                </Link>}
                <Input name='historySearch' onChange={handleHistorySearch} placeholder='szukaj w historii'
                       value={historySearch} />
            </FlexWrapper>
            <TipText text={historySearch === '' ? 'Zacznij nowe badanie lub szukaj po imieniu pacjenta albo imieniu i nazwisku właściciela' : 'Do wyszukiwania możesz użyć imienia pacjenta lub imienia i nazwiska właściciela'}/>
        </FlexWrapper>
    )
}

export {NewOrHistory}
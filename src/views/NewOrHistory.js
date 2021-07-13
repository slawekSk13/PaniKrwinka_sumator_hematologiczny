import {FlexWrapper} from "../components/FlexWrapper/FlexWrapper";
import {Button} from "../components/Button/Button";
import {Input} from "../components/Input/Input";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {TipText} from "../components/TipText/TipText";
import {List} from "../components/List/List";


const NewOrHistory = ({historicalPatients, historicalResults}) => {
    const [historySearch, setHistorySearch] = useState('');
    const [regEx, setRexEx] = useState()
    const handleHistorySearch = e => {
        setHistorySearch(e.target.value);
    }

    useEffect(() => {
        setRexEx(new RegExp(`.{0,}${historySearch}.{0,}`, 'gi'))
    }, [historySearch])

    const findMatchingPatient = () => {
        if (historicalPatients) {
            const checkMatch = el => {
                if ((el.patName.match(regEx) || el.patOwnerName.match(regEx) || el.patOwnerLname.match(regEx)) && historySearch.length > 0) {
                    return el
                }
            }
            return historicalPatients.filter(checkMatch)
        }
    }

    const showHistoricalResults = () => {
        const matchingPatients = findMatchingPatient();
        if (historicalResults) {
            let matchingResults = [];
            matchingPatients.forEach(matchingPatient => {
                const resultsToAdd = historicalResults.filter(historicalResult => historicalResult.patientId === matchingPatient.id);
                const resulultsWithPatient = resultsToAdd.map(result => ({...result, patient: {...matchingPatient}}))
                matchingResults = [...matchingResults, ...resulultsWithPatient];
            })
            return matchingResults;
        }
    }




    return (
        <FlexWrapper>
            <FlexWrapper justify='start' height={historySearch === '' ? '35vh' : '65vh'}>
                {historySearch === '' && <Link style={{width: '100%', textAlign: 'center'}} to='/addnewpatient'>
                    <Button text='nowe badanie' size='big'/>
                </Link>}
                <Input name='historySearch' onChange={handleHistorySearch} placeholder='szukaj w historii'
                       value={historySearch}/>
                {historySearch !== '' && <List results={showHistoricalResults()}/>}
            </FlexWrapper>
            <TipText
                text={historySearch === '' ? 'Zacznij nowe badanie lub szukaj po imieniu pacjenta albo imieniu i nazwisku właściciela' : 'Do wyszukiwania możesz użyć imienia pacjenta lub imienia i nazwiska właściciela'}/>
        </FlexWrapper>
    )
}

export {NewOrHistory}
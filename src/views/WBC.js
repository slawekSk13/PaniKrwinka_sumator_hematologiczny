import {Button} from "../components/Button/Button";
import {FlexWrapper} from "../components/FlexWrapper/FlexWrapper";
import {ProgressBar} from "../components/ProgressBar/ProgressBar";
import {Table} from "../components/Table/Table";
import {TipText} from "../components/TipText/TipText";
import {Input} from "../components/Input/Input";

const WBC = () => {
    return (
        <FlexWrapper height='65vh'>
            <FlexWrapper justify='start' height='65vh'>

                <Table/>
                <ProgressBar progress={100}/>
                <div style={{textAlign: 'center'}}>
                <Input placeholder='WBC (G/l)' up={true}/>
                <Button text='dalej' size='big'/>
                </div>
            </FlexWrapper>
            <TipText text='Dzięki wprowadzeniu WBC będziemy mogli podać Ci wartość bezwzględną i w razie potrzeby wartość skorygowaną WBC
'/>
        </FlexWrapper>
    );
}

export {WBC}
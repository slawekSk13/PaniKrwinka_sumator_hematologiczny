import { Table } from "../components/Table/Table";
import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";
import { Center } from "../components/Center/Center";
import { Icon } from "../components/Icon/Icon";
import { TipText } from "../components/TipText/TipText";

const Results = ({ patient, results, progress, calcFinished, historical }) => {
    
  return (
    <FlexWrapper>
      <Table
        results={results}
        patient={patient}
        date={results.date}
        progress={progress}
        calcFinished={calcFinished}
      />
      <Center>
        <Icon icon="pdf" results={results} patient={patient} progress={progress} />
        <Icon icon="print" results={results} patient={patient} progress={progress} />
        {!historical && <Icon icon="save" results={results}/>}
      </Center>
      <TipText text="Możesz zapisać wynik badania w formacie PDF lub od razu go wydrukować, a także zresetować wyniki i zacząć nowe badanie" />
    </FlexWrapper>
  );
};

export { Results };

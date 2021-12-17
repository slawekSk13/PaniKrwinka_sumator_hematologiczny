import { TipText } from "../components/TipText/TipText";
import { FlexWrapper } from "../components/FlexWrapper/FlexWrapper";

const Success = ({ message }) => {
    window.setTimeout(function() {
        window.location.href = '/';
    }, 5000);
  return <FlexWrapper>
      <TipText text={message} />
  </FlexWrapper>;
};

export { Success };

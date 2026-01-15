import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { Step01 } from "./Step01";
import { Step02 } from "./Step02";

export const MspForm = () => {
  const {
    activeStep,
  } = useZMspRegisterPage();


  return (
    activeStep === 0 ? <Step01/> : <Step02/>
  );
};

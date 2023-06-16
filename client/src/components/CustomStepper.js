import React from "react";
import { Stepper, StepLabel, Step } from "@material-ui/core";

const CustomStepper = ({ activeStep, steps }) => {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CustomStepper;

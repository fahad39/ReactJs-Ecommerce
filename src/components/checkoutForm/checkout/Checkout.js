import React, { useState } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import useStyles from "./styles.js";
import AddressForm from "../AddressForm.js";
import PaymentForm from "../PaymentForm.js";

function Checkout() {
  const steps = ["Shipping Address", "Payment Details"];
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();

  const Form = () => (activeStep === 0 ? <AddressForm /> : <PaymentForm />);
  const Confirmation = () => {
    return <div>Confirmation</div>;
  };

  return (
    <>
      <div className={classes.toolbar}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="Center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? <Confirmation /> : <Form />}
          </Paper>
        </main>
      </div>
    </>
  );
}

export default Checkout;

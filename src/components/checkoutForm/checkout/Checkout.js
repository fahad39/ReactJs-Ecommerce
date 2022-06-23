import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from "@material-ui/core";
import useStyles from "./styles.js";
import AddressForm from "../AddressForm.js";
import PaymentForm from "../PaymentForm.js";
import { commerce } from "../../../lib/commerce";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../common/Routes.js";

function Checkout({ cart, order, onCaptureHandle, error }) {
  const steps = ["Shipping Address", "Payment Details"];
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const navigate = useNavigate();

  const nextStep = () => setActiveStep((prevStep) => prevStep + 1);
  const backStep = () => setActiveStep((prevStep) => prevStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {
        navigate(ROUTES.HOME);
      }
    };
    generateToken();
  }, [cart]);

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        onCaptureHandle={onCaptureHandle}
        nextStep={nextStep}
      />
    );
  const Confirmation = () => {
    return (
      <>
        <CssBaseline />
        <div>
          <Typography variant="h5">Thank you for your purchase</Typography>
          <Divider className={classes.divider} />
          {/* <Typography variant="subtitle2">Order ref: ref</Typography> */}
        </div>
        <br />
        <Button
          component={Link}
          to={ROUTES.HOME}
          variant="outlined"
          type="button"
          onClick={onCaptureHandle}
        >
          Back to Home
        </Button>
      </>
    );
  };

  return (
    <>
      <div className={classes.toolbar}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Confirmation />
            ) : (
              checkoutToken && <Form />
            )}
          </Paper>
        </main>
      </div>
    </>
  );
}

export default Checkout;

import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Typography, Link } from '@mui/material';
import ImageButton from '../ImageButton/ImageButton';
import PortalInitialize from '../PortalInitialize/PortalInitialize';
import styles from './PortalStepper.module.css';
import data from '../../data/data';
import FormRedirect from '@/libs/FormRedirect';
import RequestRedirect from '../RequestRedirect/RequestRedirect';

export default function PortalStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPortal, setSelectedPortal] = useState(-1)
  const [initiatePayRequest, setInitiatePayRequest] = useState([]);
  
  const portals = data.portals;
  const steps = data.steps;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      handle_request();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSelectedPortal = (a_value) => {
    setSelectedPortal(a_value)
    handleNext()
  };

  function processPayGateString(input) {
    // Remove the trailing '&' if it exists
    if (input.endsWith('&')) {
        input = input.slice(0, -1);
    }

    // Split the string at '='
    const parts = input.split('=');

    return parts;
  }

  const handle_request = async () => {
    // Initial reguest to start the redirect
    if (portals[selectedPortal].name === "paygate") {
      let redirect_data = {
        "submit_url": "https://secure.paygate.co.za/payweb3/process.trans",
        "form_list": []
      }

      for (const item of initiatePayRequest) {
        if (item.includes("PAY_REQUEST_ID") || item.includes("CHECKSUM")) {
          const parts = processPayGateString(item);
          if (parts) {
            const form_item = {"key": parts[0], "value": parts[1]};
            redirect_data["form_list"].push(form_item);
          }
        }
      }

      // Now redirect using the form function
      await FormRedirect(redirect_data)
    }
  }

  return (
    <Box className={styles.main_stepper_box}>
      <Stepper activeStep={activeStep} orientation="vertical" className={styles.stepper_component}>
        {steps.map((step, index) => (
          <Step key={step}>
            <StepLabel
              optional={
                index === 4 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step}
            </StepLabel>
            <StepContent>
                {activeStep === 0 && (
                    <Paper square elevation={1} sx={{ p: 3 }}>
                      <Box className={styles.project_description}>
                        {
                          data.project_description.map((item, idx) => (
                            <Typography
                              key={idx}
                              variant={item.type}
                            >
                              {item.value}
                            </Typography>
                          ))
                        }
                      </Box>
                    </Paper>
                )}
                {activeStep === 1 && (
                    <Paper square elevation={1} sx={{ p: 3 }}>
                        <Box className={styles.stepper_portals_box}>
                        {
                            portals.map((portal,idx) => (
                                <ImageButton key={idx} id={idx} name={portal.name} src={portal.img} setSelected={handleSelectedPortal} />
                            ))
                        }
                        </Box>
                    </Paper>
                )}
                {activeStep === 2 && (
                    <Paper square elevation={1} sx={{ p: 3 }}>
                      <Typography variant="h5">Rundown</Typography>
                      <Typography variant="body1">
                        {data[portals[selectedPortal].name].portal_info.map((item, idx) => (
                          "link" in item ? (
                            <span key={idx}>
                              <Link href={item.src} className={styles.typography_link} target="_blank" rel="noopener noreferrer">
                                {item.value}
                              </Link>
                            </span>
                          ) : (
                            <span key={idx}>
                              {item.value}
                            </span>
                          )
                        ))}
                      </Typography>
                    </Paper>
                )}
                {activeStep === 3 && (
                    <Paper square elevation={1} sx={{ p: 3 }}>
                      <PortalInitialize portal={portals[selectedPortal]} initiatePayRequest={initiatePayRequest} setInitiatePayRequest={setInitiatePayRequest} />
                    </Paper>
                )}
                {activeStep === 4 && (
                    <Paper square elevation={1} sx={{ p: 3 }}>
                      <RequestRedirect portal={portals[selectedPortal]} initiatePayRequest={initiatePayRequest} />
                    </Paper>
                )}
                <Box sx={{ mb: 2 }}>
                    <div>
                    {activeStep !== 1 && (
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                            disabled={activeStep === 3 && initiatePayRequest.length < 1}
                        >
                            {index === steps.length - 1 ? 'Redirect' : 'Continue'}
                        </Button>
                    )}
                    <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Back
                    </Button>
                    </div>
                </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

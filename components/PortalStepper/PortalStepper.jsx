import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ImageButton from '../ImageButton/ImageButton';
import styles from './PortalStepper.module.css';

const portals = [
    {"name":"paygate", "img": "https://avatars.githubusercontent.com/u/10938121?s=280&v=4"},
    {"name":"enets", "img": "https://www.ppro.com/wp-content/uploads/2021/06/eNETS_Logo.png"}
]

const ProjectDescription = () => {
  return (
    <Box className={styles.project_descryption}>
      <Typography variant="h5" gutterBottom>
        Payment Portals Showcase: PayGate and eNets
      </Typography>
      <Typography variant="body1" paragraph>
        This project is designed to demonstrate the integration and functionality of two popular payment portals: PayGate and eNets. The objective is to provide a comprehensive guide on how to implement these portals to handle transaction requests, manage user redirections to the respective payment portals, and process query responses effectively.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Implementation Details
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Transaction Requests:</strong> The project includes detailed examples of how to configure and send transaction requests to both PayGate and eNets. It covers the necessary API endpoints, required parameters, and how to securely transmit transaction data.
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Redirects to Portals:</strong> Upon initiating a transaction, users are seamlessly redirected to the appropriate payment portal (PayGate or eNets) to complete their payment. The project demonstrates how to handle these redirects and ensure a smooth user experience.
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Handling Queries:</strong> Post-transaction, the project provides examples of how to handle queries from the payment portals. This includes confirming the status of transactions, handling successful payments, and managing failed or incomplete transactions.
      </Typography>
      <Typography variant="body1" paragraph>
        This project is intended for educational purposes, offering developers a clear and concise reference for integrating PayGate and eNets into their own applications.
      </Typography>
    </Box>
  );
};

const steps = ['General Information','Select Payment Provider','Initiate Transaction','Request result','Redirect'];
  

export default function PortalStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPortal, setSelectedPortal] = useState(-1)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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

  return (
    <Box className={styles.main_stepper_box}>
      <Stepper activeStep={activeStep} orientation="vertical" sx={{
        width: '80%'
      }}>
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
                      <ProjectDescription />
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
                <Box sx={{ mb: 2 }}>
                    <div>
                    {activeStep !== 1 && (
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                        >
                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
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

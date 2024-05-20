import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ImageButton from './ImageButton/ImageButton';

const portals = [
    {"name":"paygate", "img": "https://avatars.githubusercontent.com/u/10938121?s=280&v=4"},
    {"name":"enets", "img": "https://www.ppro.com/wp-content/uploads/2021/06/eNETS_Logo.png"}
]

const steps = [
    {
        label: 'General Information'
    },
    {
      label: 'Select Payment Provider'
    },
    {
      label: 'Initiate Transaction'
    },
    {
      label: 'Request result'
    },
    {
      label: 'Redirect'
    }
  ];
  

export default function PortalStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedPortal, setSelectedPortal] = React.useState(-1)

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
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 4 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
                {activeStep === 0 && (
                    <Paper square elevation={1} sx={{ p: 3 }}>
                    <Typography>Why and What for</Typography>
                    </Paper>
                )}
                {activeStep === 1 && (
                    <Paper square elevation={1} sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-around' }}>
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

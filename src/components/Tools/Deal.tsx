import * as React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// styles props 
const styles = createStyles({
  root: {
    width: '90%',
  },
  button: {
    marginTop:'10px',
    marginRight: '10px',
  },
  actionsContainer: {
    marginBottom: '20px',
  },
  resetContainer: {
    padding: '30px',
  },
});
// props from parent component
interface Title{
  stepsTitle: string[],
  stepsContent: string[]
}
// combine two props to one interface
interface Props extends Title, WithStyles<typeof styles> {}
// state interface
interface AppState {
  activeStep: number
}

class Deal extends React.Component<Props, AppState> {

  state: AppState = {
    activeStep: 0
  }
    
  getSteps() {
    return this.props.stepsTitle;
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  
  render() {
    const steps = this.getSteps();
    const activeStep = this.state.activeStep;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <div>{this.props.stepsContent[index]}</div>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square={true} elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Deal);

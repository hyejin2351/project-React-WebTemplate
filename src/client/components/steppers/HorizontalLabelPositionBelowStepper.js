import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "90%"
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

//getSteps
function getSteps() {
  return [
    "alternativeLabel 속성을 썼더니 텍스트가 stepper 아이콘 밑에 배치되었다!",
    "텍스트 배열은 getSteps()에 들어간다.",
    "마지막 stepper"
  ]; //3개의 배열을 출력한다.
}

//getStepContent()
function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0: //stepIndex가 0이면
      return "stepper1"; //case 0에 맞는 텍스트 출력
    case 1: //stepIndex가 1이면
      return "stepper2"; //case 1에 맞는 텍스트 출력
    case 2: //stepIndex가 2이면
      return "stepper3"; //case 2에 맞는 텍스트 출력
    default:
      return "Uknown stepIndex";
  }
}

//HorizontalLabelPositionBelowStepper 클래스
class HorizontalLabelPositionBelowStepper extends React.Component {
  state = {
    //HorizontalLabelPositionBelowStepper의 초기값
    activeStep: 0 //0
  };

  //다음으로
  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1 //현재상태에서 activeStep + 1
    }));
  };

  //뒤로가기
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1 //현재상태에서 activeStep - 1
    }));
  };

  //리셋하기
  handleReset = () => {
    this.setState({
      activeStep: 0 //현재상태 0
    });
  };

  //그리기
  render() {
    const { classes } = this.props; //classes 사용
    const steps = getSteps(); //getSteps()의 배열을 steps에 선언
    const { activeStep } = this.state; //상태값 activeStep 사용

    return (
      <div className={classes.root}>
        {/* alternativeLabel: 'true'로 설정하고 방향이 수평이면 단계 레이블이 아이콘 아래에 배치됩니다. */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div>
          {this.state.activeStep === steps.length ? ( //현재의 activeStep 상태가 배열 steps의 총 개수랑 같으면?
            <div>
              <Typography className={classes.instructions}>
                모든 step이 completed 되었습니다.
              </Typography>
              {/* 버튼 클릭 시, handleReset 실행 */}
              <Button onClick={this.handleReset}>리셋</Button>
            </div>
          ) : (
            //현재의 activeStep 상태가 배열 steps의 총 개수랑 같지 않으면? (=step의 끝까지 도달하지 않았다면?)
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0} //리셋되지 않음
                  onClick={this.handleBack} //클릭 시, 뒤로가기
                  className={classes.backButton}
                >
                  뒤로가기
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext} //클릭 시, 다음으로
                >
                  {/* activeStep가 전체 steps개수 - 1 이면 ? Finish 아니면: Next */}
                  {activeStep === steps.length - 1 ? "끝" : "다음으로"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

HorizontalLabelPositionBelowStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(HorizontalLabelPositionBelowStepper);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "90%"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

//getSteps 메서드
function getSteps() {
  return ["Select campaign settings", "Create an ad group", "Create an ad"]; //배열을 출력한다.
}

//getStepContent 메서드
function getStepContent(step) {
  switch (step) {
    case 0: //step이 0일 때
      return "Step 1: 스텝 1 텍스트 입니다."; //Step 1 텍스트를 반환
    case 1: //step이 1일 때
      return "Step 2: 스텝 2 텍스트 입니다."; //Step 2 텍스트를 반환
    case 2: //step이 2일 때
      return "Step 3: 스텝 3 텍스트 입니다."; //Step 3 텍스트를 반환
    default:
      //step이 비어있는 값이 있으면
      return "Unknown step"; //default 텍스트를 반환
  }
}

//HorizontalNonLinearStepper 클래스
class HorizontalNonLinearStepper extends React.Component {
  state = {
    //HorizontalNonLinearStepper 초기값
    activeStep: 0, //0
    completed: {} //비어있음
  };

  totalSteps = () => getSteps().length; //getSteps 배열의 총 개수

  //다음으로
  handleNext = () => {
    let activeStep; //0 ; 이 값은 바뀔 수 있음

    if (this.isLastStep() && !this.allStepsCompleted()) {
      //마지막 step이긴 한데 완전히 모든 step이 끝난게 아니면
      const steps = getSteps(); //steps = getSteps의 모든 배열
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed)); //activeStep = steps에서 첫번째 값의 index 값을 반환 => completed가 비어있는 값의 상태가 아니다.
    } else {
      //completed가 만약 비어있는 상태가 맞으면
      activeStep = this.state.activeStep + 1; //activeStep = 현재 step + 1
    }
    this.setState({
      activeStep //조건에 맞는 결과 값을 출력
    });
  };

  //뒤로가기
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1 //현재 step - 1
    }));
  };

  //핸들 스텝
  handleStep = step => () => {
    this.setState({
      activeStep: step // step
    });
  };

  //핸들 컴플릿
  handleComplete = () => {
    const { completed } = this.state; //상태값은 completed
    completed[this.state.activeStep] = true; //현재 스텝 상태를 알려주는 activeStep 인덱스 값을 completed[i] 배열 안에 넣음
    this.setState({
      completed //completed가 비어있지 않게 됨// completed[i] 출력
    });
    this.handleNext(); //다음으로 메서드 실행
  };

  //핸들 리셋
  handleReset = () => {
    this.setState({
      activeStep: 0, //0
      completed: {} //비어있는 값
    });
  };

  //스텝 완료
  completedSteps() {
    return Object.keys(this.state.completed).length; //상태가 completed 된 key값의 총 개수를 객체화한다.
  }

  //마지막 스텝
  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1; //activeStep 값이 (getSteps 배열의 총 개수) - 1 와 같은 값을 반환한다.
  }

  //모든 스텝이 종료
  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps(); //모든 스텝이 종료되면 getSteps 배열의 총 개수를 반환한다.
  }

  render() {
    const { classes } = this.props; //classes를 사용하겠다.
    const steps = getSteps(); //모든 getSteps() 배열의 값을 steps에 넣어 사용하겠다.
    const { activeStep } = this.state; //상태값 activeStep를 사용하겠다

    return (
      <div className={classes.root}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              {/* 스텝 버튼 */}
              <StepButton
                onClick={this.handleStep(index)} //클릭 시, 해당 인덱스 핸들 스텝
                completed={this.state.completed[index]} //종료 시, 해당 인덱스 completed 처리
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.allStepsCompleted() ? ( //모든 스텝이 종료되면?
            <div>
              <Typography className={classes.instructions}>
                모든 스텝이 끝났습니다.
              </Typography>
              <Button onClick={this.handleReset}>리셋 버튼</Button>
            </div>
          ) : ( //모든 스텝이 종료되지 않았으면?
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0} //activeStep 을 0으로 돌아가게 하지 않음
                  onClick={this.handleBack} //클릭 시, 뒤로가기
                  className={classes.button}
                >
                  뒤로가기
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext} //클릭 시, 다음으로
                  className={classes.button}
                >
                  다음으로
                </Button>

                {activeStep !== steps.length && //activeStep이 모든 단계의 끝에 도달하지 않았고,
                  (this.state.completed[this.state.activeStep] ? ( //현재의 activeStep가 completed된 상태가 아니면?
                    <Typography variant="caption" className={classes.completed}>
                      Step {activeStep + 1} 이미 completed 표시가 완료되었습니다.
                    </Typography>
                  ) : ( //activeStep이 모든 단계의 끝에 도달했고, 현재의 activeStep가 completed된 상태이면?
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleComplete} //클릭 시, 완료 상태로 업데이트
                    >
                      {this.completedSteps() === this.totalSteps() - 1 //completedSteps가 totalSteps() - 1 이면
                        ? "끝"
                        : "step completed 표시하기"}
                    </Button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

HorizontalNonLinearStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(HorizontalNonLinearStepper);

/*
컴포넌트의 목적:
일종의 체크리스트
체크 완료한 것은 completed 표시를 하고 넘어감

참고자료: 
in: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/in
*/

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
    width: "100%"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  backButton: {
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

//getSteps()
function getSteps() {
  return ["Select campaign settings", "Create an ad group", "Create an ad"]; //배열 3개 출력
}

//getStepContent()
function getStepContent(step) {
  switch (step) {
    case 0: //step이 0이면
      return "Step 1: 부가 텍스트"; //step1 텍스트 출력
    case 1: //step이 1이면
      return "Step 2: 부가 텍스트"; //step2 텍스트 출력
    case 2: //step이 2이면
      return "Step 3: 부가 텍스트"; //step3 텍스트 출력
    default:
      return "Unknown step";
  }
}

//HorizontalNonLinearAlternativeLabelStepper 클래스
class HorizontalNonLinearAlternativeLabelStepper extends React.Component {
  state = {
    //초기화
    activeStep: 0, //0
    completed: new Set(), //new Set()
    skipped: new Set() //new Set()
  };

  //totalSteps()
  totalSteps = () => getSteps().length; //getSteps() 배열의 총 개수 반환

  isStepOptional = step => step === 1; //선택적인 step에 step 값은 1

  //handleSkip
  handleSkip = () => {
    const { activeStep } = this.state; //activeStep 상태값을 사용
    if (!this.isStepOptional(activeStep)) {
      //만약 activeStep이 optional이 아니면?
      throw new Error("optional이 아니라 skip할 수 없습니다."); //에러 메세지 출력
    }

    this.setState((state) => {
      const skipped = new Set(state.skipped.values()); //skipped = 현재의 반복 객체를 새로운 반복 객채로 반환
      skipped.add(activeStep); //반복 객체에 새로운 activeStep 추가
      return {
        activeStep: state.activeStep + 1, //activeStep + 1
        skipped //새로운 activeStep 객체 값을 반환
      };
    });
  };

  //다음으로
  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      //마지막 step이고, 모든 스텝이 completed 된 상태가 아니면?
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !this.state.completed.has(i)); //steps 배열의 첫번째 요소의 index 값을 반환 => completed 상태이면 true, completed가 안된 상태이면 false를 반환
    } else {
      //마지막 step이 아니고, 모든 스텝이 completed 된 상태라면?
      activeStep = this.state.activeStep + 1; //activeStep + 1
    }
    this.setState({
      activeStep //위의 조건에 맞는 값 출력
    });
  };

  //뒤로가기
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1 //현재 activeStep - 1
    }));
  };

  //스텝 다루기
  handleStep = step => () => {
    this.setState({
      activeStep: step //activeStep: step
    });
  };

  //완료된 애들 다루기
  handleComplete = () => {
    const completed = new Set(this.state.completed); //completed된 step의 객체들을 배열화하여 묶음
    completed.add(this.state.activeStep); //배열한 것들에 activeStep를 추가
    this.setState({
      completed //위의 값을 반환
    });

    /**
     * 한숨... 다음 코드로 쓰면 더 좋았겠지만 `if (!this.allStepsComplete())`
     * status를 앞서 선언하지 않았으므로,
     * 정석대로 dry하게 썼다.
     */
    if (completed.size !== this.totalSteps() - this.skippedSteps()) {
      //만약 완료된 스텝 != 전체 스텝 - 스킵한 스텝 이라면?
      this.handleNext(); //다음으로
    }
  };

  //리셋 다루기
  handleReset = () => {
    this.setState({
      //handleReset()이 호출되면
      activeStep: 0, //0
      completed: new Set(), //completed 상태였던 배열을 처음 상태로 업데이트함
      skipped: new Set() //skipped 상태였던 배열을 처음 상태로 업데이트함
    });
  };

  //스킵하기
  skippedSteps() {
    //skippedSteps()이 호출되면
    return this.state.skipped.size; //skipped 개수를 반환함
  }

  //스킵 처리됨
  isStepSkipped(step) {
    return this.state.skipped.has(step); //skipped가 step을 포함하면 true 값을 반환함
  }

  //완료하기
  isStepComplete(step) {
    return this.state.completed.has(step); //completed가 step을 포함하면 true값을 반환함
  }

  //완료 처리됨
  completedSteps() {
    return this.state.completed.size; //completed의 개수를 반환함
  }

  //모든 steps이 완료 처리됨
  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps(); //완료된 스텝 = 전체 스텝 - 스킵한 스텝 //true or false
  }

  //마지막 스텝
  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1; //activeStep으로 모든 스텝 - 1 값을 반환함
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const buttonProps = {};
            if (this.isStepOptional(index)) {
              //만약 해당 index가 optional이면?
              buttonProps.optional = (
                <Typography variant="caption">Optional</Typography>
              ); //buttonProps가 optional인 값에 typo 추가
            }
            if (this.isStepSkipped(index)) {
              //만약 해당 index가 skipped된 상태이면?
              props.completed = false; //completed 상태가 아님
            }
            return (
              <Step key={label} {...props}>
                <StepButton
                  onClick={this.handleStep(index)} //클릭 시, 해당 인덱스 값을 그대로 반환
                  completed={this.isStepComplete(index)} //완료 시, 해당 인덱스가 있으면 true 값 반환
                  {...buttonProps}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>

        <div>
          {this.allStepsCompleted() ? ( //모든 steps가 완료되면?
            <div>
              <Typography className={classes.instructions}>
                모든 steps가 완료되었습니다.
              </Typography>
              {/* 버튼 클릭 시, handleReset() = skipped도 completed된 상태도 다 초기화 */}
              <Button onClick={this.handleReset}>리셋 버튼</Button>
            </div>
          ) : (
            //모든 steps가 완료된 상태가 아니면?
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0} //리셋 불가능
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

                {this.isStepOptional(activeStep) && //activeStep이 optional이고, activeStep이 완료된 상태가 아니면?
                  !this.state.completed.has(this.state.activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip} //클릭 시, 스킵하기
                    className={classes.button}
                  >
                      스킵하기
                  </Button>
                )}
                {activeStep !== steps.length && //activeStep이 optional이고, activeStep이 완료된 상태가 아니면?
                  (this.state.completed.has(this.state.activeStep) ? (
                    <Typography variant="caption" className={classes.completed}>
                      Step {activeStep + 1}는 이미 완료처리 되었습니다.
                    </Typography>
                  ) : ( //activeStep이 optional이 아니고, activeStep이 완료된 상태이면?
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleComplete} //클릭 시, 완료 처리
                    >
                      {this.completedSteps() === this.totalSteps() - 1 //완료된 모든 스텝의 개수 = (전체 스텝 개수 - 1) 이면?
                        ? "끝"
                        : "모든 스텝 완료됨"}
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

HorizontalNonLinearAlternativeLabelStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(HorizontalNonLinearAlternativeLabelStepper);

/*
컴포넌트 목적:
skip과 complete step을 할 수 있는 Stepper

참고 자료:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
*/

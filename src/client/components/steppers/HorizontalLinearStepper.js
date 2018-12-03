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
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

//getSteps()
//세가지 배열을 출력한다.
function getSteps() {
  return ["Select campaign settings", "Create an ad group", "Create an ad"];
}

//getStepContent()
//step에 따라서 다른 4가지 메세지를 출력한다.
function getStepContent(step) {
  switch (step) {
    case 0:
      return "Select campaign settings...";
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Unknown step";
  }
}

//HorizontalLinearStepper 클래스
class HorizontalLinearStepper extends React.Component {
  state = {
    activeStep: 0,
    skipped: new Set()
    /*
      Set 객체는 어떤형이든 유일한 값을 저장할 수 있음.
      iterable 객체가 전달된 경우, 그 요소는 모두 새로운 Set에 추가됩니다. 
      만약 매개변수를 명시하지 않거나 null을 전달하면, 
      새로운 Set은 비어 있는 상태가 됩니다. 
      https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set
    */
  };

  isStepOptional = step => step === 1;

  //앞으로가기
  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;

    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values()); //삽입 순으로 Set 객체 내 각 요소에 대한 값을 포함하는 새로운 Iterator 객체를 반환
      skipped.delete(activeStep); //value와 관련된 요소를 제거하고 Set.prototype.has(value)가 이전에 반환했던 값을 반환합니다. Set.prototype.has(value)는 그 뒤에 false를 반환합니다.
    }
    this.setState({
      activeStep: activeStep + 1, // 1,2,3 // 초기 시작점 0에서 + 1
      skipped //false
    });
  };

  //뒤로가기
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1 //현재 상태값에서 activeStep - 1
    }));
  };

  //건너뛰기
  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      //현재 step이 optional이 아니면
      throw new Error("optional이 아니면 건너뛸 수 없습니다."); //다음 Error 객체를 출력함
    }

    this.setState((state) => {
      const skipped = new Set(state.skipped.values()); //삽입 순으로 Set 객체 내 각 요소에 대한 값을 포함하는 새로운 Iterator 객체를 반환
      skipped.add(activeStep); //Set 객체에 주어진 값을 갖는 새로운 요소를 추가합니다. Set 객체를 반환
      return {
        activeStep: state.activeStep + 1, //현재 상태값에서 activeStep + 1
        skipped //true
      };
    });
  };

  //리셋하기
  handleReset = () => {
    this.setState({
      activeStep: 0 //activeStep 은 0
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step); //Set 객체 내 주어진 값(step)을 갖는 요소가 있는지를 나타내는 boolean을 반환
    //true면 skip
    //false면 activeStep + 1
  }

  //그리기
  render() {
    const { classes } = this.props; //{ classes } 사용할거임
    const steps = getSteps(); //steps 사용할거임
    const { activeStep } = this.state; //{ activeStep } 사용할거임

    return (
      <div className={classes.root}>
        {/* Stepper */}
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            //Map 객체는 삽입 순서대로 그것의 element 들을 순회한다.
            const props = {};
            const labelProps = {};

            if (this.isStepOptional(index)) {
              //만약 해당 index가 optional이면
              labelProps.optional = (
                <Typography variant="caption">옵션 </Typography> //<Typhography>
              );
            }

            if (this.isStepSkipped(index)) {
              //해당 optional 값의 skipped 상태는
              props.completed = false; // false 임
            }

            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div>
          {activeStep === steps.length ? ( //현재 step이 마지막 step에 와있다면?
            <div>
              <Typography className={classes.instructions}>
                모든 단계 끝
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                리셋 버튼
              </Button>
            </div>
          ) : (
            //현재 step이 마지막 step이 아니라면?
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0} //리셋 불가능
                  onClick={this.handleBack} //뒤로가기
                  className={classes.button}
                >
                  뒤로가기 버튼
                </Button>

                {this.isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip} //스킵하기 버튼
                    className={classes.button}
                  >
                    스킵하기 버튼
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  {/* 마지막 단계 - 1 이면 끝내기 버튼 뜨기, -1 이 아니면 다음 버튼 */}
                  {activeStep === steps.length - 1
                    ? "끝내기 버튼"
                    : "다음 버튼"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

HorizontalLinearStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(HorizontalLinearStepper);

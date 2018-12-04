/* eslint-disable import/no-unresolved */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
//transition
import SwipeableViews from "react-swipeable-views";
//auto play
import { autoPlay } from "react-swipeable-views-utils"; //{}는 메서드를 의미

//autoplay + swipeable 기능
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

//모든 라벨과 이미지
const tutorialSteps = [
  {
    label: "라벨1",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
  },
  {
    label: "라벨2",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60"
  },
  {
    label: "라벨3",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80"
  },
  {
    label: "라벨4",
    imgPath:
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60"
  },
  {
    label: "라벨5",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60"
  }
];

const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: 255,
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "100%"
  }
});

//SwipeableTextMobileStepper 클래스
class SwipeableTextMobileStepper extends React.Component {
  state = {
    //초기값
    activeStep: 0 //0
  };

  //다음으로
  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1 // activeStep + 1
    }));
  };

  //뒤로가기
  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1 // activeStep - 1
    }));
  };

  //스텝 체인지 다루기
  handleStepChange = (activeStep) => {
    this.setState({ activeStep }); // activeStep
  };

  //그리기
  render() {
    //사용할 것들
    const { classes, theme } = this.props; //속성 값 = classes, theme
    const { activeStep } = this.state; //현재 상태 값 = activeStep
    const maxSteps = tutorialSteps.length; //모든 라벨과 이미지의 개수 = maxSteps

    return (
      <div className={classes.root}>
        {/* 해더 */}
        <Paper square elevation={0} className={classes.header}>
          {/* 모든 라벨과 이미지[현재 값]의 라벨*/}
          <Typography>{tutorialSteps[activeStep].label}</Typography>
        </Paper>

        {/* autoplay + swipeable 기능 구현 영역 */}
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={this.handleStepChange} //변화 값: handleStepChange
          enableMouseEvents //마우스로 넘기고 싶으면 enableMouseEvents 속성 사용
        >
          {/* tutorialSteps */}
          {tutorialSteps.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? ( //(현재 인덱스 값 - 인덱스)의 양의 정수 값이 2보다 작거나 같으면 //true 값을 반환
                <img //이미지를 띄운다.
                  className={classes.img}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>

        {/* MobileStepper : 자체에 dot 기능이 내장되어 있음 */}
        <MobileStepper
          variant="progress" //dots, text
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          //다음으로 버튼 속성
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext} //클릭 시, 다음으로
              disabled={activeStep === maxSteps - 1} //activeStep와 전체 스텝 수 - 1 갑싱 같으면 버튼을 비활성화 시킴
            >
              다음으로
              {theme.direction === "rtl" ? ( //stepper 가 흘러가는 방향이 정방향이면?
                <KeyboardArrowLeft />
              ) : (
                //화살표 방향
                <KeyboardArrowRight />
              )}
            </Button>
          }
          //뒤로가기 버튼 속성
          backButton={
            <Button
              size="small"
              onClick={this.handleBack} //클릭 시, 뒤로가기
              disabled={activeStep === 0} //activeStep가 0이면 버튼 비활성화
            >
              {theme.direction === "rtl" ? ( //stepper 가 흘러가는 방향이 정방향이면?
                <KeyboardArrowRight />
              ) : (
                //화살표 방향
                <KeyboardArrowLeft />
              )}
              뒤로가기
            </Button>
          }
        />
      </div>
    );
  }
}

SwipeableTextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(
  SwipeableTextMobileStepper
);

/*
참고 자료: 
https://github.com/oliviertassinari/react-swipeable-views

rlt:
https://developer.mozilla.org/en-US/docs/Web/CSS/direction
*/

/* eslint-disable import/no-unresolved */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
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
      "https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    text: "Title",
    subText: "Subtext"
  },
  {
    label: "라벨2",
    imgPath:
      "https://images.unsplash.com/photo-1504672281656-e4981d70414b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    text: "Title",
    subText: "Subtext"
  },
  {
    label: "라벨3",
    imgPath:
      "https://images.unsplash.com/photo-1530020793049-23eafadd208b?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    text: "Title",
    subText: "Subtext"
  }
];

const styles = theme => ({
  root: {
    maxWidth: "100%",
    flexGrow: 1
  },
  img_wrap: {
    width: "100%",
    height: "65vh", //reponsive height unit
    overflow: "hidden",
    position: "relative"
  },
  img: {
    objectFit: "cover",
    width: "100%",
    height: "100%"
  },
  //캐러셀 타이포
  typoPaper: {
    position: "absolute",
    top: "38%",
    left: "41%",
    zIndex: 1,
    textAlign: "center",
    backgroundColor: "transparent"
  },
  mainTypo: {
    fontSize: "4vw", //reponsive font-size unit
    color: "white"
  },
  subTypo: {
    fontSize: "2vw", //reponsive font-size unit
    color: "white"
  },
  //캐러샐 black 덮개
  black_wrap: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute"
  },
  //Stepper
  mobileStepper: {
    top: -350,
    left: 0,
    backgroundColor: "transparent",
    position: "relative"
  },
  //arrow
  arrowColor: {
    color: "white"
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
    const springConfig = {
      duration: "2.5s", //easeFunction이 작동하는 기간
      easeFunction: "cubic-bezier(0.15, 0.3, 0.25, 1)", //넘어가는 느낌
      delay: "0.5s" //넘어가는 시간이 지연됨. 버튼을 눌러도 delay되는 시간만큼 늦게 넘어감
      //infinite carousel은 코드 분석해야함
    };

    return (
      <div className={classes.root}>
        {/* autoplay + swipeable 기능 구현 영역 */}
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={this.handleStepChange} //변화 값: handleStepChange
          enableMouseEvents //마우스로 넘기고 싶으면 enableMouseEvents 속성 사용
          springConfig={springConfig}
        >
          {/* tutorialSteps */}
          {tutorialSteps.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? ( //(현재 인덱스 값 - 인덱스)의 양의 정수 값이 2보다 작거나 같으면 //true 값을 반환
                <div className={classes.img_wrap}>
                  <div className={classes.black_wrap} />
                  <img //이미지를 띄운다.
                    className={classes.img}
                    src={step.imgPath}
                    alt={step.label}
                  />
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Paper elevation="0" className={classes.typoPaper}>
                      <Typography
                        gutterBottom
                        variant="h2"
                        className={classes.mainTypo}
                      >
                        {step.text}
                      </Typography>
                      <Typography variant="h6" className={classes.subTypo}>
                        {step.subText}
                      </Typography>
                    </Paper>
                  </Grid>
                </div>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>

        {/* MobileStepper : 자체에 dot 기능이 내장되어 있음 */}
        <MobileStepper
          infinite
          variant="text" //dots, text, progress
          steps={maxSteps}
          activeStep={activeStep}
          className={classes.mobileStepper}
          //다음으로 버튼 속성
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext} //클릭 시, 다음으로
              disabled={activeStep === maxSteps - 1} //activeStep와 전체 스텝 수 - 1 갑싱 같으면 버튼을 비활성화 시킴
            >
              {theme.direction === "rtl" ? ( //stepper 가 흘러가는 방향이 정방향이면?
                <KeyboardArrowLeft
                  className={classes.arrowColor}
                  fontSize="large"
                />
              ) : (
                //화살표 방향
                <KeyboardArrowRight
                  color="disabled"
                  className={classes.arrowColor}
                  fontSize="large"
                />
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
                <KeyboardArrowRight
                  className={classes.arrowColor}
                  fontSize="large"
                />
              ) : (
                //화살표 방향
                <KeyboardArrowLeft
                  className={classes.arrowColor}
                  fontSize="large"
                />
              )}
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

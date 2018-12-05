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
      "https://images.unsplash.com/photo-1462518461546-dfaf9f1a616a?ixlib=rb-0.3.5&s=c98b64ef8005a895a89d590f01ecf0ed&auto=format&fit=crop&w=1350&q=80",
    text: "인덱스1",
    subText: "서브텍스트1"
  },
  {
    label: "라벨2",
    imgPath:
      "https://images.unsplash.com/photo-1504462357410-c9058337b1c8?ixlib=rb-0.3.5&s=ee8817bb67121c1bdd6fb49e2baad6e0&auto=format&fit=crop&w=1351&q=80",
    text: "인덱스2",
    subText: "서브텍스트2"
  },
  {
    label: "라벨3",
    imgPath:
      "https://images.unsplash.com/photo-1464869372688-a93d806be852?ixlib=rb-0.3.5&s=39045b93169f7a2b8fc8d77eabee87a5&auto=format&fit=crop&w=1350&q=80",
    text: "인덱스3",
    subText: "서브텍스트3"
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
      easeFunction: 'cubic-bezier(0.42, 0, 0.58, 1)',
      duration: '3s', //easeFunction duration
      delay: '0s' //현재 슬라이드에 머무는 시간 //delay를 사용하면 왜 화면이 깨질까?
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

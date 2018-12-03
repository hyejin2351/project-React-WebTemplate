import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

//TransitionLeft 메서드
//Slide 태그에 속성들이 올 수 있고, 필수 속성은 등장 위치를 나타내는 direction이다.
function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

//DirectionSnackbar 클래스
//초기값: 닫혀있음, transition 움직임: 없음
class DirectionSnackbar extends React.Component {
  state = {
    open: false,
    Transition: null
  };

  //handleClick 메서드
  //handleClick 실행 시, 창이 열림, Transition 실행됨
  //매개 변수를 state 내부로 전달하기 위한 방법으로 => 화살표를 두개 사용한다.
  /* 
    handleClick = (Transition) => {
    this.setState({ open: true });
  };
  */
  handleClick = Transition => () => {
    this.setState({ open: true, Transition });
  };

  //handleClose 메서드
  //handleClose 클릭 시, 창이 닫힘
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClick(TransitionLeft)}>Right</Button>
        <Button onClick={this.handleClick(TransitionUp)}>Up</Button>
        <Button onClick={this.handleClick(TransitionRight)}>Left</Button>
        <Button onClick={this.handleClick(TransitionDown)}>Down</Button>

        {/* 스낵바 */}
        <Snackbar
          //open
          open={this.state.open}
          //onClose
          onClose={this.handleClose}
          //TransitionComponent
          TransitionComponent={this.state.Transition}
          //message
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">I love snacks</span>}
        />
      </div>
    );
  }
}

export default DirectionSnackbar;

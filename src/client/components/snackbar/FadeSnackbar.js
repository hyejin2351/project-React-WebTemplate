import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";

//FadeSnackbar 클래스
//초기값: 창이 닫혀있다.
class FadeSnackbar extends React.Component {
  state = {
    open: false
  };

  //handleClick 메서드
  //handleClick 실행 시, 창을 연다.
  handleClick = () => {
    this.setState({ open: true });
  };

  //handleClose 메서드
  //handleClick 실행 시, 창을 닫는다.
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>Fade Transition</Button>

        {/* 스낵바 */}
        <Snackbar
          //open
          open={this.state.open}
          //onClose
          onClose={this.handleClose}
          //TransitionComponent
          //TransitionComponent의 속성값으로 Fade API를 사용하면 흐릿한 Transition 효과를 줄 수 있다.
          //API를 그대로 사용할 시에는 {}객체 안에 API를 담는다.
          TransitionComponent={Fade}
          //message
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">흐릿하게 나타나는 스낵바</span>}
        />
      </div>
    );
  }
}

export default FadeSnackbar;

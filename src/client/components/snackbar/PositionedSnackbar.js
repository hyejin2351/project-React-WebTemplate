import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

//PositionedSnackbar 클래스
//PositionedSnackbar의 초기 상태값 = open: false 열려있지 않고, 시작위치는 top, center 임
class PositionedSnackbar extends React.Component {
  state = {
    open: false,
    vertical: "top",
    horizontal: "center"
  };

  //handleClick 메서드
  //handleClick() 실행 시 open: true 열리게되고, state의 나머지 verticla과 horizontal 값은 일단 그대로 가고 이벤트 핸들러를 작성할 때 업데이트한다.
  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  //handleClose 메서드
  //handleClose() 실행시 open: false; 닫히게 된다.
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    //vertical, horizontal, open 은 모두 PositionedSnackbar 컴포넌트의 상태값으로 앞으로 이벤트 핸들러를 작성할 때 쓸 것이다.
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
        <Button
          //Button 클릭 시, handleClick() 실행; 열림; top, center 위치에서
          onClick={this.handleClick({ vertical: "top", horizontal: "center" })}
        >
          Top-Center
        </Button>

        <Button
          //Button 클릭 시, handleClick() 실행; 열림; top, right 위치에서
          onClick={this.handleClick({ vertical: "top", horizontal: "right" })}
        >
          Top-Right
        </Button>

        <Button
          //Button 클릭 시, handleClick() 실행; 열림; bottom, right 위치에서
          onClick={this.handleClick({
            vertical: "bottom",
            horizontal: "right"
          })}
        >
          Bottom-Right
        </Button>

        <Button
          //Button 클릭 시, handleClick() 실행; 열림; bottom, center 위치에서
          onClick={this.handleClick({
            vertical: "bottom",
            horizontal: "center"
          })}
        >
          Bottom-Center
        </Button>

        <Button
          //Button 클릭 시, handleClick() 실행; 열림; bottom, left 위치에서
          onClick={this.handleClick({ vertical: "bottom", horizontal: "left" })}
        >
          Bottom-Left
        </Button>

        <Button
          //Button 클릭 시, handleClick() 실행; 열림; top, left 위치에서
          onClick={this.handleClick({ vertical: "top", horizontal: "left" })}
        >
          Top-Left
        </Button>

        {/* Snackbar */}
        {/* Snackbar의 props: anchorOrigin, open, onClose, ContentProps, message */}
        <Snackbar
          //팝업 위치 설정
          anchorOrigin={{ vertical, horizontal }}
          //이벤트 핸들러: 연다
          open={open}
          //이벤트 핸들러: 닫는다
          onClose={this.handleClose}
          //메세지 작성
          ContentProps={{ //SnackbarContent의 속성들인 classes, message, action을 위해 사용되는 속성이다.
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">I love snacks</span>}
        />
      </div>
    );
  }
}

export default PositionedSnackbar;

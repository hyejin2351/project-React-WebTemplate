/* eslint-disable react/sort-comp */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

//ConsecutiveSnackbars 클래스
//queue 배열에 아무 값도 없다.
//ConsecutiveSnackbars 의 초기값은 open: false; 닫혀있다.
//messageInfo 값이 비어있다.
class ConsecutiveSnackbars extends React.Component {
  queue = [];

  state = {
    open: false,
    messageInfo: {}
  };

  //handleClick 메서드
  //message와 key 값을 입력한다.
  handleClick = message => () => {
    //배열에 새로운 요소들을 추가한다.
    this.queue.push({
      message,
      //시간 값을 밀리초 단위로 가져온 값을 key에 입력한다.
      key: new Date().getTime()
    });

    // immediately begin dismissing current message
    // to start showing new one
    if (this.state.open) {
      //만약 상태가 열려있으면
      this.setState({ open: false });
      //open 상태를 false로 업데이트한다.
    } else {
      this.processQueue();
      //상태가 닫혀있으면
      //processQueue 메서드를 실행한다.
    }
  };

  //processQueue 메서드
  //queue 배열 내에 요소가 하나라도 있을 시에 processQueue 실행 시 다음 배열의 messageInfo로 변경되고 open된다.
  //shift() : removes first element from an array and returns it.
  //배열 queue의 총 개수가 0보다 클 때
  //queue 배열의 첫번째 배열을 없앤 값을 messageInfo 에 입력한다.
  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true
      });
    }
  };

  //handleClose 함수
  //먄약 reason이 영역 내이면 그대로 유지하고, 영역 밖이면 snackbar를 닫는다.
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  //handleExited 함수
  //processQueue 메서드를 실행한다.
  handleExited = () => {
    this.processQueue();
  };

  render() {
    //props와 state를 아래에 가져다 쓰기 위해 선언
    const { classes } = this.props;
    const { messageInfo } = this.state;

    return (
      <div>
        <Button onClick={this.handleClick("메세지 A")}>메세지 A</Button>
        <Button onClick={this.handleClick("메세지 B")}>메세지 B</Button>

        {/* 스낵바 */}
        <Snackbar
          //key
          key={messageInfo.key}
          //anchorOrigin
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          //open
          open={this.state.open}
          //autoHideDuration
          autoHideDuration={6000}
          //onClose
          onClose={this.handleClose}
          //onExited //Snackbar가 Close된 후에 발생하는 종료 이벤트
          onExited={this.handleExited}
          //message
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{messageInfo.message}</span>}
          //action
          action={[
            //UNDO 액션
            <Button
              key="undo"
              color="primary"
              size="small"
              onClick={this.handleClose}
            >
              실행취소
            </Button>,
            //닫기 액션
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

ConsecutiveSnackbars.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConsecutiveSnackbars);

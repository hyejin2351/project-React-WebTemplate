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

//SimpleSnackbar 클래스
class SimpleSnackbar extends React.Component {
  //SimpleSnackbar 초기값 열려있지 않음
  state = {
    open: false
  };

  //handleClick 메서드
  //open 상태를 true로 업데이트함
  handleClick = () => {
    this.setState({ open: true });
  };

  //handleClose 메서드
  //event, reason 매개변수가 들어감.
  //만약 reason이 clickaway(마우스가 컴포넌트 밖에 있으면)이면 clickaway를 반환하고
  //만약 reason이 clickaway가 아니면 open 상태를 false로 업데이트한다.
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* 버튼 클릭 시, handleClick 메서드 실행 */}
        {/* handleClick 메서드 역할: this.state.open: true로 업데이트해줌 */}
        <Button onClick={this.handleClick}>simple snackbar 띄우기</Button>
        <Snackbar
          //팝업이 띄워지는 위치를 정한다. = {{bottom, left}}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          //자동으로 띄어지는 시간을 정한다 = {6000s}
          autoHideDuration={6000}
          //닫는다 = {handleClose 메서드 실행}
          onClose={this.handleClose}
          //컨텐츠 속성을 정한다 = {{}}
          //aria-describedby: object를 그려내는 element를 식별함
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">팝업 노트</span>}
          
          //액션 버튼
          action={[
            <Button
              key="undo"
              color="primary"
              size="small"
              onClick={this.handleClose}
            >
              취소
            </Button>,

            //닫기 아이콘
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

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSnackbar);

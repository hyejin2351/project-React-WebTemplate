import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { SnackbarProvider, withSnackbar } from "notistack";
//notistack 속성 : https://github.com/iamhosseindhv/notistack

//App 클래스
class App extends React.Component {
  //handleClick 메서드
  //일반 스낵바를 보여줌
  handleClick = () => {
    //handleClick() 실행 시, enqueueSnackbar() 메서드 실행
    //this.props.enqueueSnackbar(message, options)
    this.props.enqueueSnackbar("스낵바");
  };

  //handleClickVariant 메서드
  //다양한 variant 스낵바를 보여줌
  handleClickVariant = variant => () => {
    // variant could be success, error, warning or info
    //props.enqueueSnackbar의 option 값으로 전달
    this.props.enqueueSnackbar("경고 메시지!", { variant });
  };

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.handleClick}>스낵바 보여주기</Button>
        <Button onClick={this.handleClickVariant("warning")}>
          경고 스낵바 보여주기
        </Button>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
};

const MyApp = withSnackbar(App);

//IntegrationNotistack 함수
function IntegrationNotistack() {
  return (
    //쌓을 수 있는 Snack 최대 개수
    <SnackbarProvider maxSnack={3}>
      {/* 위에서 정의한 스낵바 이벤트 메서드들을 포함함 */}
      <MyApp />
    </SnackbarProvider>
  );
}

export default IntegrationNotistack;

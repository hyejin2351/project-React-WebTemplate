/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
//core Icons
import NaturePeopleIcon from "@material-ui/icons/NaturePeople";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
//core colors
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
//core Components
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { withStyles } from "@material-ui/core/styles";

//variantIcon 를 선언한다 = 총 4가지의 아이콘을 가진다.
const variantIcon = {
  success: NaturePeopleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

//styles1을 선언한다 = material-ui에서 기본적으로 제공하는 테마를 사용한다.
//예) theme.palette.error.main
const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.main
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    //iconVariant 오른쪽으로 마진을 준다. = 기본 unit 만큼.
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

//MySnackbarContent 메서드 = snackbar 안에 공통적으로 무엇이 들어가는지 정의함★★★★★★
//MySnackbarContent의 매개변수에는 props(속성)이 들어간다.
//{ classes, className, message, onClose, variant, ...other }은 props 안에 들어간다.
//위의 props들은 공통적으로 바뀌는 요소들이다. 스타일링을 위한 클래스네임, 메세지, 닫히는거, variant이름, 기타 등등 (...other)
//아이콘은 variantIcon[variant]이다. variant 에 따라서 아이콘이 달라진다.
function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  //모든 API 마다 고유의 props(속성)을 갖는다. ex) SnackbarContent는 className, aria-describedby, message, action
  return (
    <SnackbarContent
      //SnackbarContent는 className을 갖는다 = [variant]와 모든 className안의 속성들
      className={classNames(classes[variant], className)}
      //Content 영역에 뜰 element를 설명하겠다. = clinet-snackbar라고 불리는 아이다.
      aria-describedby="client-snackbar"
      //메세지 + 아이콘
      message={
        <span id="client-snackbar" className={classes.message}>
          {/* 아이콘 */}
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      //스낵바 액션
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          //클릭 시, 닫힘
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

//MySnackbarContent의 propTypes는 다음에 해당한다.
//classes는 object(객체)가 필수
//classname은 string(문자)
//message는 node(노드)
//onClose는 func(함수)
//variant는 배열(["success", "warning", "error", "info"]) 중에 하나가 필수
MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

//~ styles1 + MySnackbarContent()

//MySnackbarContentWrapper는 다음을 포함한다 = styles1 스타일과 MySnackbarContent 메서드
//이제부터 위에서 커스터마이징한 MySnackbarContentWrapper는 MySnackbarContent와 styles1에 정의된 속성들을 같이 쓸 수 있다.
const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

//styles2
const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

//CustomizedSnackbars 클래스 = 열고 닫는 이벤트에 신경씀★★★★★★★★
class CustomizedSnackbars extends React.Component {
  //CustomizedSnackbars의 초기 상태를 정의한다. = open: false
  state = {
    open: false
  };

  //handleClick 메서드
  //handleClick 메서드가 실행된다 = state가 open: true로 업데이트된다.
  handleClick = () => {
    this.setState({ open: true });
  };

  //handleClose 메서드
  //먄약 reason이 마우스가 컴포넌트 이외의 것을 누른 상태와 같으면 reason이 반환됨
  //만약 reason이 마우스가 컴포넌트에 머물러 있으면 state가 open: false로 업데이트됨
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  // ~ 이벤트 핸들링 메서드 작성
  render() {
    const { classes } = this.props;

    //이벤트 핸들러 작성 ~ = 이벤트 핸들러를 이용해서 이벤트 메서드를 구현함★★★★★★★
    //이벤트 핸들러는 Material-UI 사이트에 있는 각 컴포넌트 별 API 속성을 참고한다
    return (
      <div>
        <Button className={classes.margin} onClick={this.handleClick}>
          Open success snackbar
        </Button>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          {/* Sanckbar 태그 안에 커스터마이징한 MySnackbarContentWrapper를 넣는다 */}
          <MySnackbarContentWrapper
            //이벤트 핸들러로 바꿔야하는 요소들 : { classes, className, message, onClose, variant, ...other } = props;
            onClose={this.handleClose}
            variant="success"
            message="This is a success message!"
          />
        </Snackbar>

        <MySnackbarContentWrapper
          variant="error"
          className={classes.margin}
          message="This is an error message!"
        />
        <MySnackbarContentWrapper
          variant="warning"
          className={classes.margin}
          message="This is a warning message!"
        />
        <MySnackbarContentWrapper
          variant="info"
          className={classes.margin}
          message="This is an information message!"
        />
        <MySnackbarContentWrapper
          variant="success"
          className={classes.margin}
          message="This is a success message!"
        />
      </div>
    );
  }
}

CustomizedSnackbars.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles2)(CustomizedSnackbars);

//몰라도 기록을 따라가면 된다. 답은 한 페이지 안에 다 있다.

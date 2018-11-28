/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

//Core 컴포넌트
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

//컴포넌트
import CheckboxLabels from "../../components/checkbox";

//이미지
const imgUrl = "/static/images/line.png";

//스타일링
const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    paddingTop: theme.spacing.unit * 20,
    backgroundColor: "#f5f6f8",
    paddingBottom: theme.spacing.unit * 20
  },
  paper: {
    width: 350,
    paddingBottom: theme.spacing.unit * 5,
    margin: "0 auto",
    backgroundColor: "#f5f6f8",
    boxShadow: "none",
    overflow: "hidden"
  },
  input: {
    display: "block",
    width: 350,
    height: 40,
    marginTop: theme.spacing.unit * 2
  },
  bold: {
    fontWeight: "bold",
    paddingBottom: theme.spacing.unit * 1
  },
  signUp: {
    color: "#3e9bff"
  },
  signUpBtn: {
    height: 40,
    marginTop: theme.spacing.unit * 2
  },
  notYet: {
    marginTop: theme.spacing.unit * 2
  },
  social: {
    width: "100%"
  },
  or: {
    backgroundImage: `url(${imgUrl})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden"
  },
  container: {
    paddingBottom: theme.spacing.unit * 2
  },

  //sns 버튼
  sns: {
    margin: theme.spacing.unit * 3,
    width: 50,
    height: 50
  },
  sns_1: {
    "&": {
      backgroundColor: "#3b5999"
    },
    "&:hover": {
      backgroundColor: "#3b5999"
    }
  },
  sns_2: {
    "&": {
      backgroundColor: "#dc4e41"
    },
    "&:hover": {
      backgroundColor: "#dc4e41"
    }
  },
  sns_3: {
    "&": {
      backgroundColor: "#ffde00"
    },
    "&:hover": {
      backgroundColor: "#ffde00"
    }
  },
  paper_trans: {
    background: "transparent"
  },
  sns_img_size: {
    width: 25
  }
});

function signUp(props) {
  const {
    classes,
    onChange,
    onChangeCheck,
    onSubmit,
    onFacebook,
    onGoogle,
    onKakao
  } = props;

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.login}>
            <Typography variant="h6" align="left" className={classes.bold}>
              회원가입
            </Typography>
            <Typography variant="caption" align="left">
              회원가입 후 웹 사이트의 다양한 서비스를 이용하세요.
            </Typography>
          </div>

          <div className={classes.container}>
            <form noValidate autoComplete="off">
              <TextField
                fullWidth
                autoComplete="on"
                placeholder="성명"
                className={classes.input}
                type="text"
                name="name"
                onChange={onChange}
              />

              <TextField
                fullWidth
                autoComplete="on"
                placeholder="닉네임"
                className={classes.input}
                type="text"
                name="nickName"
                onChange={onChange}
              />
            </form>
          </div>

          <div>
            <form noValidate autoComplete="off">
              <TextField
                fullWidth
                autoComplete="on"
                placeholder="이메일"
                className={classes.input}
                type="text"
                name="email"
                onChange={onChange}
              />

              <TextField
                fullWidth
                autoComplete="off"
                placeholder="비밀번호"
                className={classes.input}
                type="password"
                name="password"
                onChange={onChange}
              />

              <TextField
                fullWidth
                autoComplete="off"
                placeholder="비밀번호 재확인"
                className={classes.input}
                type="password"
                name="confirmPassword"
                onChange={onChange}
              />
            </form>
          </div>

          <CheckboxLabels
            componentName={"serviceCheck"}
            onChange={onChangeCheck}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.signUpBtn}
            onClick={onSubmit}
          >
            회원가입하기
          </Button>

          <Typography align="right" className={classes.notYet}>
            이미 계정이 있으신가요? &nbsp;
            <a href="/users/signin" className={classes.signUp}>
              로그인
            </a>
          </Typography>
        </Paper>

        <Paper className={classes.paper}>
          <Typography variant="caption" className={classes.or}>
            또는
          </Typography>
        </Paper>

        <Paper className={classes.paper} align="left">
          <div align="left">
            <Typography variant="h6" className={classes.bold}>
              소셜 회원가입
            </Typography>
            <Typography variant="caption">
              SNS 계정으로 간편하게 회원가입하세요.
            </Typography>
          </div>

          <Paper align="center" elevation={0} className={classes.paper_trans}>
            <Button
              variant="fab"
              className={classNames(classes.sns, classes.sns_1)}
            >
              <img
                src="/static/images/sns_1.png"
                onClick={onFacebook}
                className={classes.sns_img_size}
                alt="Facebook으로 회원가입하기 버튼"
              />
            </Button>
            <Button
              variant="fab"
              className={classNames(classes.sns, classes.sns_2)}
            >
              <img
                src="/static/images/sns_2.png"
                className={classes.sns_img_size}
                onClick={onGoogle}
                alt="Google로 회원가입하기 버튼"
              />
            </Button>
            <Button
              variant="fab"
              className={classNames(classes.sns, classes.sns_3)}
            >
              <img
                src="/static/images/sns_3.png"
                className={classes.sns_img_size}
                onClick={onKakao}
                alt="Kakaotalk으로 회원가입하기 버튼"
              />
            </Button>
          </Paper>
        </Paper>
      </div>
    </React.Fragment>
  );
}

signUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(signUp);

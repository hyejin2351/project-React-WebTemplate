/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Link from "next/link";
import TextField from "@material-ui/core/TextField";

//Core 컴포넌트
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

//컴포넌트
import SimpleAppBar from "../../components/subBar";

//스타일링
const styles = theme => ({
  root: {
    minWidth: 450,
    flexGrow: 1,
    margin: theme.spacing.unit * 3
  },

  //버튼 스타일
  btn_color: {
    color: "#fff",
    textDecoration: "none"
  },

  //페이퍼 스타일
  paper: {
    padding: theme.spacing.unit * 3,
    overflow: "hidden",
    marginBottom: theme.spacing.unit * 5
  },
  paper_wrap: {
    margin: theme.spacing.unit * 1
  },
  paper_title: {
    fontWeight: "bold",
    marginBottom: theme.spacing.unit * 2
  },
  body_title: {
    padding: theme.spacing.unit * 1,
    backgroundColor: "transparent"
  },

  //하얀 버튼 두개
  two_btn_wrap: {
    width: "140px",
    margin: "0 auto",
    backgroundColor: "transparent",
    marginTop: theme.spacing.unit * 7
  },
  right_btn: {
    marginLeft: 12,
    backgroundColor: "white"
  },
  black_color_btn: {
    color: "#333",
    textDecoration: "none"
  },

  //페이퍼
  outer_spacing: {
    width: "100%",
    margin: theme.spacing.unit * 1
  },
  outer_paper: {
    width: "100%",
    padding: theme.spacing.unit * 2
  },
  border_bottom: {
    borderBottom: "1px solid #eee"
  },

  //비밀번호 수정란
  pwd_area: {
    width: "100%"
  },
  pwd_text: {
    width: 200,
    textAlign: "left"
  },
  pwd_input: {
    padding: theme.spacing.unit * 1
  },

  inner_paper: {
    margin: 10
  }
});

function passwordChange(props) {
  const { classes, onChange, onSubmit, onCancel } = props;

  return (
    <React.Fragment>
      <SimpleAppBar title="비밀번호 변경" />

      <div className={classes.root}>
        <Paper elevation={0} className={classes.body_title}>
          <Typography variant="h6" className={classes.paper_title}>
            비밀번호 변경 >
          </Typography>
          <Typography variant="caption" className={classes.paper_title}>
            현재 사용 중인 비밀번호를 변경할 수 있습니다.
          </Typography>
        </Paper>

        <Grid container item xs={12}>
          <Paper className={classes.outer_spacing}>
            <Paper
              square
              elevation={0}
              className={classNames(classes.outer_paper, classes.border_bottom)}
            >
              <Grid item xs={12}>
                <Paper elevation={0} className={classes.mid_paper}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Paper elevation={0} className={classes.inner_paper}>
                      <Typography
                        variant="body2"
                        className={classNames(
                          classes.pwd_area,
                          classes.pwd_text
                        )}
                      >
                        현재 비밀번호
                      </Typography>
                    </Paper>
                    <Paper elevation={0} className={classes.inner_paper}>
                      <form>
                        <TextField
                          autoComplete="off"
                          type="password"
                          className={classes.pwd_input}
                          name="curPassword"
                          onChange={onChange}
                        />
                      </form>
                    </Paper>
                  </Grid>
                </Paper>
              </Grid>
            </Paper>

            <Paper square elevation={0} className={classes.outer_paper}>
              <Grid item xs={12}>
                <Paper elevation={0} className={classes.mid_paper}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Paper elevation={0} className={classes.inner_paper}>
                      <Typography
                        variant="body2"
                        className={classNames(
                          classes.pwd_area,
                          classes.pwd_text
                        )}
                      >
                        새 비밀번호
                      </Typography>
                    </Paper>
                    <Paper elevation={0} className={classes.inner_paper}>
                      <form className={classes.pwd_area}>
                        <TextField
                          autoComplete="off"
                          type="password"
                          className={classes.pwd_input}
                          name="newPassword"
                          onChange={onChange}
                        />
                      </form>
                    </Paper>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Paper elevation={0} className={classes.inner_paper}>
                      <Typography
                        variant="body2"
                        className={classNames(
                          classes.pwd_area,
                          classes.pwd_text
                        )}
                      >
                        새 비밀번호 재확인
                      </Typography>
                    </Paper>
                    <Paper elevation={0} className={classes.inner_paper}>
                      <form className={classes.pwd_area}>
                        <TextField
                          autoComplete="off"
                          type="password"
                          className={classes.pwd_input}
                          name="newConfirmPassword"
                          onChange={onChange}
                        />
                      </form>
                    </Paper>
                  </Grid>
                </Paper>
              </Grid>
            </Paper>
          </Paper>
        </Grid>
      </div>

      <Paper elevation={0} className={classes.two_btn_wrap}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className={classes.float_right}
          onClick={onSubmit}
        >
          <a className={classes.btn_color}>적용</a>
        </Button>

        <Button
          variant="outlined"
          size="medium"
          className={classes.right_btn}
          onClick={onCancel}
        >
          <a className={classes.black_color_btn}>취소</a>
        </Button>
      </Paper>
    </React.Fragment>
  );
}

passwordChange.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(passwordChange);

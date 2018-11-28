import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// Core 컴포넌트
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

// 컴포넌트
import SimpleAppBar from "../../../components/subBar";
import NestedList from "../../../components/list/NestedList";
import FolderList from "../../../components/list/FolderList";

const styles = theme => ({
  root: {
    minWidth: 450,
    flexGrow: 1,
    margin: theme.spacing.unit * 3
  },

  //버튼
  btn_color: {
    color: "#fff",
    textDecoration: "none"
  },
  one_btn_wrap: {
    marginTop: theme.spacing.unit * 7
  },

  //페이퍼
  paper: {
    padding: theme.spacing.unit * 3,
    overflow: "hidden",
    marginBottom: theme.spacing.unit * 5
  },
  paper_title: {
    fontWeight: "bold",
    marginBottom: theme.spacing.unit * 2
  },
  body_title: {
    padding: theme.spacing.unit * 1,
    backgroundColor: "transparent"
  },
  outer_spacing: {
    width: "100%",
    margin: theme.spacing.unit * 1,
    padding: theme.spacing.unit * 5
  },

  //텍스트
  email_span: {
    color: "#3e9bff"
  }
});

function listsView(props) {
  const {
    classes,
    me,
    unregister,
    onChangeCheck,
    label,
    componentName
  } = props;

  return (
    <React.Fragment>
      <SimpleAppBar title="List 컴포넌트" />
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <NestedList />
        </Paper>
        <Paper className={classes.paper}>
          <FolderList />
        </Paper>
      </div>
    </React.Fragment>
  );
}

listsView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(listsView);

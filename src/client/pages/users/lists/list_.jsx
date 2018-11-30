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
import SimpleList from "../../../components/list/SimpleList";
import SelectedListItem from "../../../components/list/SelectedListItem";
import AlignItemsList from "../../../components/list/AlignItemsList";
import CheckboxList from "../../../components/list/CheckboxList";
import CheckboxListSecondary from "../../../components/list/CheckboxListSecondary";
import SwitchListSecondary from "../../../components/list/SwitchListSecondary";
import PinnedSubheaderList from "../../../components/list/PinnedSubheaderList";

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
    padding: theme.spacing.unit * 5,
    overflow: "hidden",
    margin: theme.spacing.unit * 2
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
      <SimpleAppBar title="List" />
      <div className={classes.root}>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
          <Grid>
            <Paper className={classes.paper}>
              <Typography variant="h6">
                {"SimpleList"}
                <SimpleList />
              </Typography>
            </Paper>
          </Grid>

          <Grid>
            <Paper className={classes.paper}>
              <Typography variant="h6">
                {"NestedList"}
                <NestedList />
              </Typography>
            </Paper>
          </Grid>

          <Grid>
            <Paper className={classes.paper}>
              <Typography variant="h6">
                {"FolderList"}
                <FolderList />
              </Typography>
            </Paper>
          </Grid>

          <Grid>
            <Paper className={classes.paper}>
              <Typography variant="h6">
                {"SelectedListItem"}
                <SelectedListItem />
              </Typography>
            </Paper>
          </Grid>

          <Grid>
            <Paper className={classes.paper}>
              <Typography variant="h6">
                {"AlignItemsList"}
                <AlignItemsList />
              </Typography>
            </Paper>
          </Grid>

          <Grid>
            <Paper className={classes.paper}>
              <Typography variant="h6">
                {"CheckboxList"}
                <CheckboxList />
              </Typography>
            </Paper>
          </Grid>

          <Grid>
            <Paper className={classes.paper}>
              <Typography variant="h6">
                {"CheckboxListSecondary"}
                <CheckboxListSecondary />
              </Typography>
            </Paper>
          </Grid>

          <Grid>
            <Paper className={classes.paper}>
              <Typography variant="h6">
                {"SwitchListSecondary"}
                <SwitchListSecondary />
              </Typography>
            </Paper>
          </Grid>

          <Grid>
            <Paper className={classes.paper}>
              <Typography variant="h6">
                {"PinnedSubheaderList"}
                <PinnedSubheaderList />
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

listsView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(listsView);

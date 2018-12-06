/* eslint-disable import/first */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import WithRoot from "../lib/withRoot";

// 컴포넌트
import SwipeableTextMobileStepper from "../components/steppers/SwipeableTextMobileStepper";
import MediaCard from "../components/mediaCard";
import IndexIntro from "../components/IndexIntro";
// import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
// import Grid from "@material-ui/core/Grid";

//스타일링
const styles = theme => ({
  root: {
    background: "#f5f6f8"
  },
  back: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 7
  },
  paper: {
    textAlign: "center"
  },
  iconSize: {
    fontSize: 80
  }
});

class IndexView extends React.Component {
  state = {
    open: false
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleClick = () => {
    this.setState({
      open: true
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <SwipeableTextMobileStepper />

          <IndexIntro />

          <MediaCard />
        </div>
      </React.Fragment>
    );
  }
}

IndexView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexView);

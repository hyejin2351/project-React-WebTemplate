/* eslint-disable import/first */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import WithRoot from "../lib/withRoot";

// 컴포넌트
import SwipeableTextMobileStepper from "../components/steppers/SwipeableTextMobileStepper";
import IndexIntro from "../components/mainComponents/IndexIntro";
import IndexMain from "../components/mainComponents/IndexMain";
import IndexBar from "../components/mainComponents/IndexBar";
import IndexTeam from "../components/mainComponents/IndexTeam";
import IndexFooter from "../components/mainComponents/IndexFooter";

//스타일링
const styles = theme => ({
  root: {
    background: "#f5f6f8"
  },
  back: {
    textAlign: "center",
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

          <IndexMain />
          
          <IndexTeam />

          <IndexBar />

          <IndexFooter />
        </div>
      </React.Fragment>
    );
  }
}

IndexView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexView);

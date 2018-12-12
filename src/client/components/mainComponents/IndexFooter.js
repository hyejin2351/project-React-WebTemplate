import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Link from "next/link";

//컴포넌트
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";

//아이콘
import {
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  PinterestIcon,
  RedditIcon,
  TumblrIcon
} from "react-share";

//스타일링
const styles = theme => ({
  root: {
    background: "#f5f6f8",
    padding: theme.spacing.unit * 10
  },
  paper: {
    margin: theme.spacing.unit * 5,
    textAlign: "center"
  },
  about: {
    color: "#007bff",
    textDecoration: "#007bff"
  }
});

function IndexFooter(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        aTypographygnItems="center"
        className={classes.root}
      >
        {/* section 세개를 감싸는 grid */}
        <Grid container direction="row" justify="center" alignItems="center">
          {/* section1 */}
          <Grid item xs={12} md={4}>
            <Typography>Your Website 2018. All Rights Reserved.</Typography>

          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

IndexFooter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexFooter);

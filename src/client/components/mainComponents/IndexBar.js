import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";

//Core 컴포넌트
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";

//스타일링
const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 8,
    backgroundColor: "#212529"
  },
  media: {
    height: 140
  },
  margin_bottom: {
    marginBottom: theme.spacing.unit * 3
  },
  paperBackground: {
    backgroundColor: "transparent"
  },
  whiteTitle: {
    color: "white",
    paddingBottom: theme.spacing.unit * 5
  },
  fabLink: {
    backgroundColor: "white"
  },
  fabBtn: {
    textDecoration: "none",
    color: "#212529",
    padding: 8
  }
});

function IndexBar(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Paper elevation={0} className={classes.paperBackground}>
          <Typography variant="h4" align="center" className={classes.whiteTitle}>
            Look through the files in working directory on GitHub!
          </Typography>
          <Grid container direction="row" justify="center" alignItems="center">
            <Fab variant="extended" className={classes.fabLink}>
              <Link href="https://github.com/hyejin2351/project-React-WebTemplate">
                <a target="_blank" className={classes.fabBtn}>
                  Go to See
                </a>
              </Link>
            </Fab>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

IndexBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexBar);

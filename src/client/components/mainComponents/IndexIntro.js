import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//컴포넌트
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//아이콘
import PersonalVideoIcon from "@material-ui/icons/PersonalVideo";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

//스타일링
const styles = theme => ({
  root: {
    background: "#f5f6f8",
    marginTop: -65
  },
  paper: {
    margin: theme.spacing.unit * 5,
    textAlign: "center",
    backgroundColor: "transparent"
  },
  iconSize: {
    fontSize: 80
  },
  innerGrid: {
    float: "left",
  },
  titleFont: {
    fontWeight: "bold"
  },
  textFull: {
    width: 380
  },
});

function IndexIntro(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Grid container direction="row" justify="center" alignItems="center" className={classes.root}>
        <Paper elevation={0} className={classes.paper}>
          <Grid
            item
            xs={12}
            md={4}
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            className={classes.innerGrid}
          >
            <Paper elevation={0} className={classes.paper}>
              <PersonalVideoIcon color="primary" className={classes.iconSize} />
              <Typography
                gutterBottom
                variant="h5"
                className={classes.titleFont}
              >
                Fully Responsive
              </Typography>
              <Typography variant="body2" className={classes.textFull}>
                This theme will look great on any device, <br /> no matter the size!
              </Typography>
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            className={classes.innerGrid}
          >
            <Paper elevation={0} className={classes.paper}>
              <ViewCompactIcon color="primary" className={classes.iconSize} />
              <Typography
                gutterBottom
                variant="h5"
                className={classes.titleFont}
              >
                Material-UI Ready
              </Typography>
              <Typography variant="body2" className={classes.textFull}>
                Featuring the latest build of <br /> the new Material-UI framework!
              </Typography>
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            className={classes.innerGrid}
          >
            <Paper elevation={0} className={classes.paper}>
              <CheckCircleIcon color="primary" className={classes.iconSize} />
              <Typography
                gutterBottom
                variant="h5"
                className={classes.titleFont}
              >
                Easy to Use
              </Typography>
              <Typography variant="body2" className={classes.textFull}>
                Ready to use with your own content,<br /> or customize the source files!
              </Typography>
            </Paper>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

IndexIntro.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexIntro);

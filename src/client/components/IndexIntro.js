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

function IndexIntro(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Grid container direction="row" justify="center" alignItems="center">
        <Paper elevation="0">
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
            <Paper elevation="0" className={classes.paper}>
              <PersonalVideoIcon color="primary" className={classes.iconSize} />
              <Typography gutterBottom variant="title">
                타이틀
              </Typography>
              <Typography variant="body3">서브 텍스트</Typography>
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
            <Paper elevation="0" className={classes.paper}>
              <ViewCompactIcon color="primary" className={classes.iconSize} />
              <Typography gutterBottom variant="title">
                타이틀
              </Typography>
              <Typography variant="body3">서브 텍스트</Typography>
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
            <Paper elevation="0" className={classes.paper}>
              <CheckCircleIcon color="primary" className={classes.iconSize} />
              <Typography gutterBottom variant="title">
                타이틀
              </Typography>
              <Typography variant="body3">서브 텍스트</Typography>
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

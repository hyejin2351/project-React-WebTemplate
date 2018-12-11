import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";

//컴포넌트
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//스타일링
const styles = theme => ({
  root: {
    background: "#fff"
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
    float: "left"
  },
  titleFont: {
    fontWeight: "bold"
  },
  textFull: {
    width: 380
  },
  //textPaper
  textPaper: {
    height: 420
  },
  innerTextPaper: {
    height: "100%",
    padding: theme.spacing.unit * 10
  },
  imgPaper: {
    height: 420
  },
  img1: {
    backgroundSize: "cover",
    backgroundPosition: "40% 50%",
    background:
      "url(https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjIxMTIzfQ&auto=format&fit=crop&w=700&q=80) no-repeat"
  },
  img2: {
    backgroundSize: "cover",
    backgroundPosition: "45% 30%",
    background:
      "url(https://process.filestackapi.com/cache=expiry:max/resize=width:700/compress/5yjLJYBrQ6EHpN9dK0ak) no-repeat"
  },
  img3: {
    backgroundSize: "cover",
    backgroundPosition: "45% 30%",
    background:
      "url(https://images.unsplash.com/photo-1524439210809-5b21a2e18582?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1402&q=80) no-repeat"
  },
  textPaper_content_title: {},
  textPaper_content_sub: {
    paddingTop: theme.spacing.unit
  }
});

function IndexMain(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      {/* section1 */}
      <Grid
        container
        direction="row-reverse"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={12} md={6}>
          <Paper
            square
            elevation={0}
            className={classnames(classes.imgPaper, classes.img1)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper square elevation={0} className={classes.innerTextPaper}>
            <Typography
              variant="h4"
              className={classes.textPaper_content_title}
            >
              Fully Responsive Design <br />
              <Typography
                variant="body1"
                className={classes.textPaper_content_sub}
              >
                The theme will look great on any device, whether it's a phone,
                tablet, or desktop the page will behave responsively!
              </Typography>
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* section2 */}
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={12} md={6}>
          <Paper
            square
            elevation={0}
            className={classnames(classes.imgPaper, classes.img2)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper square elevation={0} className={classes.innerTextPaper}>
            <Typography
              variant="h4"
              className={classes.textPaper_content_title}
            >
              Updated For Material-UI <br />
              <Typography
                variant="body1"
                className={classes.textPaper_content_sub}
              >
                React components that implement Google's Material Design. Newly
                improved, and full of great utility classes, Material-UI v3.6.2
                is leading the way in mobile responsive web development!
              </Typography>
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* section3 */}
      <Grid
        container
        direction="row-reverse"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={12} md={6}>
          <Paper
            square
            elevation={0}
            className={classnames(classes.imgPaper, classes.img3)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper square elevation={0} className={classes.innerTextPaper}>
            <Typography
              variant="h4"
              className={classes.textPaper_content_title}
            >
              Easy to Use &amp; Customize <br />
              <Typography
                variant="body1"
                className={classes.textPaper_content_sub}
              >
                Landing Page is just HTML and CSS with a splash of SCSS for
                users who demand some deeper customization options. Out of the
                box, just add your content and images, and your new landing page
                will be ready to go!
              </Typography>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

IndexMain.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexMain);

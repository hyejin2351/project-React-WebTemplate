import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";

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
  TelegramIcon,
  WhatsappIcon,
  GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  RedditIcon,
  TumblrIcon,
  LivejournalIcon,
  MailruIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  EmailIcon
} from "react-share";

//스타일링
const styles = theme => ({
  root: {
    background: "#f5f6f8",
    padding: theme.spacing.unit * 5
  },
  paper: {
    margin: theme.spacing.unit * 5,
    textAlign: "center"
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
  //profile
  name: {
    textAlign: "center"
  },
  //rounded
  rounded: {
    width: "225px",
    height: "225px",
    borderRadius: "50%",
    objectFit: "cover",
    display: "block",
    margin: "0 auto"
  },
  //icon
  snsIcons: {
    marginTop: theme.spacing.unit * 2
  },
  fabIcon: {
    margin: 8
  },
  noBackground: {
    background: "transparent"
  },
  //titlePadding
  titlePadding: {
    paddingBottom: theme.spacing.unit * 5
  },
});

function IndexTeam(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Typography variant="h4" className={classes.titlePadding}>OUR AMAZING TEAM</Typography>

        {/* section 세개를 감싸는 grid */}
        <Grid container direction="row" justify="center" alignItems="center">
          {/* section1 */}
          <Grid item xs={12} md={4}>
            <Paper
              square
              elevation={0}
              className={classnames(
                classes.innerTextPaper,
                classes.noBackground
              )}
            >
              <img
                className={classes.rounded}
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              />
              <Typography
                variant="h6"
                className={classnames(classes.name, classes.snsIcons)}
              >
                Diana Pertersen <br />
                <Typography variant="body1">Lead Developer</Typography>
              </Typography>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Paper
                  elevation={0}
                  className={classnames(classes.snsIcons, classes.noBackground)}
                >
                  <Fab className={classes.fabIcon}>
                    <FacebookIcon size={57} round className={classes.snsIcon} />
                  </Fab>
                  <Fab className={classes.fabIcon}>
                    <TwitterIcon size={57} round className={classes.snsIcon} />
                  </Fab>
                  <Fab className={classes.fabIcon}>
                    <GooglePlusIcon
                      size={57}
                      round
                      className={classes.snsIcon}
                    />
                  </Fab>
                </Paper>
              </Grid>
            </Paper>
          </Grid>

          {/* section2 */}
          <Grid item xs={12} md={4}>
            <Paper
              square
              elevation={0}
              className={classnames(
                classes.innerTextPaper,
                classes.noBackground
              )}
            >
              <img
                className={classes.rounded}
                src="https://images.unsplash.com/photo-1505503693641-1926193e8d57?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              />
              <Typography
                variant="h6"
                className={classnames(classes.name, classes.snsIcons)}
              >
                Diana Pertersen <br />
                <Typography variant="body1">Lead Developer</Typography>
              </Typography>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Paper
                  elevation={0}
                  className={classnames(classes.snsIcons, classes.noBackground)}
                >
                  <Fab className={classes.fabIcon}>
                    <FacebookIcon size={57} round className={classes.snsIcon} />
                  </Fab>
                  <Fab className={classes.fabIcon}>
                    <TwitterIcon size={57} round className={classes.snsIcon} />
                  </Fab>
                  <Fab className={classes.fabIcon}>
                    <GooglePlusIcon
                      size={57}
                      round
                      className={classes.snsIcon}
                    />
                  </Fab>
                </Paper>
              </Grid>
            </Paper>
          </Grid>

          {/* section3 */}
          <Grid item xs={12} md={4}>
            <Paper
              square
              elevation={0}
              className={classnames(
                classes.innerTextPaper,
                classes.noBackground
              )}
            >
              <img
                className={classes.rounded}
                src="https://images.unsplash.com/photo-1528475775637-ed767f76e6b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              />
              <Typography
                variant="h6"
                className={classnames(classes.name, classes.snsIcons)}
              >
                Diana Pertersen <br />
                <Typography variant="body1">Lead Developer</Typography>
              </Typography>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Paper
                  elevation={0}
                  className={classnames(classes.snsIcons, classes.noBackground)}
                >
                  <Fab className={classes.fabIcon}>
                    <FacebookIcon size={57} round className={classes.snsIcon} />
                  </Fab>
                  <Fab className={classes.fabIcon}>
                    <TwitterIcon size={57} round className={classes.snsIcon} />
                  </Fab>
                  <Fab className={classes.fabIcon}>
                    <GooglePlusIcon
                      size={57}
                      round
                      className={classes.snsIcon}
                    />
                  </Fab>
                </Paper>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

IndexTeam.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexTeam);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
});

function AlignItemsList(props) {
  const { classes } = props;
  return (
    <List className={classes.root}>
      {/* 아이템1 */}
      {/* alignItems="flex-start" : 아바타가 top 부분에 위치함 */}
      <ListItem alignItems="flex-start">
        {/* 아바타1 */}
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/1.jpg" />
        </ListItemAvatar>
        {/* 텍스트1 */}
        <ListItemText
          primary="prmary 제목1"
          secondary={
            //{}객체 안에 Fragment를 사용하는 것은 여러 배열을 묶기 위함이다.
            <React.Fragment>
              <Typography
                component="span"
                className={classes.inline}
                color="textPrimary"
              >
                secondary 소제목1
              </Typography>
              {"내용1"}
            </React.Fragment>
          }
        />
      </ListItem>

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="prmary 제목2"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                className={classes.inline}
                color="textPrimary"
              >
                secondary 소제목2
              </Typography>
              {"내용2"}
            </React.Fragment>
          }
        />
      </ListItem>

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="prmary 제목3"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                className={classes.inline}
                color="textPrimary"
              >
                secondary 소제목3
              </Typography>
              {"내용3"}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}

AlignItemsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AlignItemsList);

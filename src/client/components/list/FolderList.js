import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import FolderStyle from "./FolderList";

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

function FolderList(props) {
  const { classes } = props;
  return (
    <List className={classes.root}>
      {/* 아이템1 */}
      <ListItem>
        {/* 아바타1 */}
        <Avatar>
          {/* 아이콘1 */}
          <ImageIcon />
        </Avatar>
        {/* 텍스트1 */}
        {/* primary: 메인 텍스트 / secondary: 서브 텍스트 */}
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>

      <ListItem>
        <Avatar>
          <WorkIcon />
        </Avatar>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>

      <ListItem>
        <Avatar>
          <BeachAccessIcon />
        </Avatar>
        <ListItemText primary="Vacation" secondary="July 20, 2014" />
      </ListItem>
    </List>
  );
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FolderList);

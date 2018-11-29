import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

//ListItemLink 함수. props를 넣는다. 결과로 button 기능의 ListItem을 뽑아낸다. DOM의 a 역할을 한다.
//{...props} ? 모든 props arguments들을 반환한다.
//a태그 역할을 하는 ListItemLink 함수에 적용되는 속성은(props)는 {모두 표시됨}
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function SimpleList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        {/* 아이템1 */}
        <ListItem button>
          {/* 아이콘1 */}
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          {/* 텍스트1 */}
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>

      <Divider />

      {/* 아이콘없는 리스트 */}
      <List component="nav">
        {/* ListItem을 썼을 때 */}
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        {/* ListItemLink을 썼을 때 */}
        {/* a태그 역할을 하는 ListItem에 href 연결 */}
        <ListItemLink href="#simple-list">
          {/* 아이콘 없는 텍스트1 */}
          <ListItemText primary="Spam" />
        </ListItemLink>
      </List>
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleList);

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

//SelectedListItem 클래스
//초기 상태 = selectedIndex: 1
//초기 상태는 두번째 아이템에 selected 된 상태
class SelectedListItem extends React.Component {
  state = {
    selectedIndex: 1
  };

  //handleListItemClick 메서드
  //매개 변수로 event와 index가 들어가는거에 따라
  //state가 index 값으로 업데이트됨
  //index는 0부터 시작함
  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List component="nav">
          {/* 아이템0 */}
          <ListItem
            button
            //selectedIndex 값은 0
            selected={this.state.selectedIndex === 0}
            //클릭 시 handleListItemClick(event, 0) 이 됨
            onClick={event => this.handleListItemClick(event, 0)}
          >
            {/* 아이콘0 */}
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            {/* 텍스트0 */}
            <ListItemText primary="Inbox" />
          </ListItem>

          {/* 아이템1 */}
          <ListItem
            button
            //selectedIndex 값은 1
            selected={this.state.selectedIndex === 1}
            //클릭 시 handleListItemClick(event, 1) 이 됨
            onClick={event => this.handleListItemClick(event, 1)}
          >
            {/* 아이콘1 */}
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            {/* 텍스트1 */}
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>

        <Divider />

        {/* 아이콘 없는 아이템 */}
        <List component="nav">
          {/* 아이템2 */}
          <ListItem
            button
            selected={this.state.selectedIndex === 2}
            onClick={event => this.handleListItemClick(event, 2)}
          >
            {/* 텍스트2 */}
            <ListItemText inset primary="Trash" />
          </ListItem>

          {/* 아이템3 */}
          <ListItem
            button
            selected={this.state.selectedIndex === 3}
            onClick={event => this.handleListItemClick(event, 3)}
          >
            {/* 텍스트3 */}
            <ListItemText primary="Spam" />
          </ListItem>
        </List>
      </div>
    );
  }
}

SelectedListItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectedListItem);

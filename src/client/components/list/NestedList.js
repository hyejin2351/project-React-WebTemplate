import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class NestedList extends React.Component {
  state = {
    open: true
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    return (
      <List
        component="nav"
        subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
        className={classes.root}
      >
        <ListItem button>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText inset primary="Sent mail" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText inset primary="Drafts" />
        </ListItem>

        <ListItem button onClick={this.handleClick}>
          {/* 아이콘 영역: Inbox */}
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          {/* Inbox 텍스트 
            // inset: 아바타나 아이콘이 없을 때 씀. true일 때 자식요소가 들여써짐 
            // primary: 주요 내용*/}
          <ListItemText inset="true" primary="Inbox" />
          {/* 열렸을 때 닫혔을 때 화살표 방향 변화 
            // state가 open 이면 ExpandLess를, open이 아니면 ExpandMore를 출력함. */}
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        {/* Expand 영역 */}
        {/* in: true일 시 컴포넌트가 transitino함 
            // timeout: transtion duration. auto로 설정 시 높이에 맞춰 duratino이 조절됨
            // unmountOnExit 속성은 화면에서 전환 된 후에 DOM에서 구성 요소를 제거함 */}
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          {/* component: DOM element나 component를 사용하기 위한 문자열 
            // disablePadding: 만약 값이 true이면 vertical padding이 list에서 지워짐 */}
          <List component="div" disablePadding>
            {/* button: true이면 listItem은 버튼이 됨 */}
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              {/* Inbox 텍스트 
                // inset: 아바타나 아이콘이 없을 때 씀. true일 때 자식요소가 들여써짐 
                // primary: 주요 내용*/}
              <ListItemText inset primary="Starred" />
            </ListItem>
          </List>

          <List component="div" disablePadding>
            {/* button: true이면 listItem은 버튼이 됨 */}
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <CloudQueueIcon />
              </ListItemIcon>
              {/* Inbox 텍스트 
                // inset: 아바타나 아이콘이 없을 때 씀. true일 때 자식요소가 들여써짐 
                // primary: 주요 내용*/}
              <ListItemText inset primary="Clouds" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NestedList);

/* 참고 자료 : 
ListItemText API : https://material-ui.com/api/list-item-text/#listitemtext-api
Collapse API : https://material-ui.com/api/collapse/#collapse-api
*/

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

//모바일 환경을 고려한다면 마우스가 아닌 손가락으로 인터렉션이 이루어지는 SwipeableDrawer를 대신 사용한다.

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

//TemporaryDrawer 클래스
class TemporaryDrawer extends React.Component {
  //state 초기화
  //TemporaryDrawe의 초기 상태는 모두 false (=drawer가 닫혀있음)
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false
  };

  //toggleDrawer 메서드
  //side, open을 매개변수로 넣을 때
  //[side] 배열이 : open으로 상태 업데이트됨
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes } = this.props;

    //sideList
    //텍스트와 아이콘을 반환함. 아이콘은 배열 index 값의 짝수, 홀수 여부에 출력되는 모양이 달라진다.
    const sideList = (
      <div className={classes.list}>
        {/* 첫번째 배열 */}
        <List>
          {/* 반복문을 돌며 배열 안의 요소들을 매개변수와 1:1로 짝지은 결과값을 반환한다. */}
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              {/* index%2한 나머지가 0이면 (=index가 짝수값이면) InboxIcon을 보여주고, index가 홀수값이면 MailIcon을 보여준다. */}
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              {/* 텍스트 */}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* 두번째 배열 */}
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    //fullList
    const fullList = (
      <div className={classes.fullList}>
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div>
        {/* 버튼 */}
        <Button onClick={this.toggleDrawer("left", true)}>Open Left</Button>
        <Button onClick={this.toggleDrawer("right", true)}>Open Right</Button>
        <Button onClick={this.toggleDrawer("top", true)}>Open Top</Button>
        <Button onClick={this.toggleDrawer("bottom", true)}>Open Bottom</Button>

        {/* 
          toggleDrawer = (side, open) => () => {
            this.setState({
              [side]: open
            });
          };
          참고자료 : https://material-ui.com/api/drawer/
        */}

        {/* left Drawer */}
        {/* Drawer 이벤트 핸들러 > div 이벤트 핸들러 > div 내에 구현되는 요소들: {sideList} */}
        <Drawer
          //drawer를 열려면 상태값 left를 불러온다. 일단 버튼 클릭하면 left = true 이므로 열린다.
          //일단 toggleDrawer의 state 기본값이 open 이므로 state를 불러오면 left가 열린다.
          open={this.state.left}
          //drawer를 닫으려면 toggleDrawer의 open 매개 변수 영역에 true 대신 false를 넣어준다.
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            //키보드 초점을 맞출 수 있게 한다.
            tabIndex={0}
            role="button"
            //마우스 클릭 시, toggleDrawer() 이벤트 메서드가 실행 된다. (side, open) 매개변수 영역에 (left, false)를 넣는다. left = false.
            onClick={this.toggleDrawer("left", false)}
            //키보들 키를 누르는 즉시, toggleDrawer() 이벤트 메서드가 실행 된다. (side, open) 매개변수 영역에 (left, false)를 넣는다. left = false.
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {/* 위에 const sideList로 defined 됨 */}
            {sideList}
          </div>
        </Drawer>

        <Drawer
          //drawer가 나오는 방향
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer("right", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("right", false)}
            onKeyDown={this.toggleDrawer("right", false)}
          >
            {sideList}
          </div>
        </Drawer>

        {/* top Drawer */}
        <Drawer
          anchor="top"
          open={this.state.top}
          onClose={this.toggleDrawer("top", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("top", false)}
            onKeyDown={this.toggleDrawer("top", false)}
          >
            {fullList}
          </div>
        </Drawer>

        <Drawer
          anchor="bottom"
          open={this.state.bottom}
          onClose={this.toggleDrawer("bottom", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("bottom", false)}
            onKeyDown={this.toggleDrawer("bottom", false)}
          >
            {fullList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TemporaryDrawer);


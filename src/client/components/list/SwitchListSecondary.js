import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import WifiIcon from "@material-ui/icons/Wifi";
import BluetoothIcon from "@material-ui/icons/Bluetooth";

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

//SwitchListSecondary 클래스
//초기 checked 값은 ['wifi'];
class SwitchListSecondary extends React.Component {
  state = {
    checked: ["wifi"]
  };

  //handleToggle 메서드 : 체크박스의 체크 표시 여부를 결정
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  render() {
    const { classes } = this.props;

    return (
      //List 자체에 subheader를 다느냐 아니면 List 내부어 ListSubheader를 넣느냐의 차이
      <List
        subheader={<ListSubheader>Settings</ListSubheader>}
        className={classes.root}
      >
        {/* 아이템1 : wifi */}
        <ListItem>
          {/* 아이콘1 */}
          <ListItemIcon>
            <WifiIcon />
          </ListItemIcon>
          {/* 텍스트1 */}
          <ListItemText primary="Wi-Fi" />
          {/* Secondary 영역 */}
          <ListItemSecondaryAction>
            <Switch
              //wifi 값을 handleToggle 메서드에 넣었더니 wifi push 완료
              onChange={this.handleToggle("wifi")}
              //checked 배열 중 wifi의 인덱스 값이 -1이 아니면 checked 표시함
              checked={this.state.checked.indexOf("wifi") !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>

        {/* 아이템2 : bluetooth */}
        <ListItem>
          {/* 아이콘2 */}
          <ListItemIcon>
            <BluetoothIcon />
          </ListItemIcon>
          {/* 텍스트2 */}
          <ListItemText primary="Bluetooth" />
          <ListItemSecondaryAction>
            <Switch
              onChange={this.handleToggle("bluetooth")}
              checked={this.state.checked.indexOf("bluetooth") !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  }
}

SwitchListSecondary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SwitchListSecondary);

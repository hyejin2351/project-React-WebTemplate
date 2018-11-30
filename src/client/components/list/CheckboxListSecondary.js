import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

//CheckboxListSecondary 클래스
//checked의 초기 인덱스 값은 1
//초기 화면에 두번째 체크박스에 체크 표시가 되어있다는 뜻
class CheckboxListSecondary extends React.Component {
  state = {
    checked: [1]
  };

  //handleToggle 함수 = CheckboxList의 Toggle 함수와 같음
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
      <List dense className={classes.root}>
        {/* 4개의 배열과 입력한 value 값을 매핑함 */}
        {[0, 1, 2, 3].map(value => (
          //아이템
          <ListItem key={value} button>
            {/* 아바타 */}
            <ListItemAvatar>
              <Avatar
                alt={`아바타 이미지 ${value + 1}`}
                src={`/static/images/${value + 1}.jpg`}
              />
            </ListItemAvatar>
            {/* 텍스트 */}
            <ListItemText primary={`아이템 ${value + 1}`} />
            {/* 체크박스 */}
            <ListItemSecondaryAction>
              <Checkbox
                //handleToggle 메서드의 출력 값에 따라 상태 변화
                //CheckboxList와는 다르게 tabIndex값이 0임. 즉, tab으로 체크박스 포커스가 가능함
                onChange={this.handleToggle(value)}
                //현재 checked된 인덱스 값이 -1이 아니면 checked 됨
                checked={this.state.checked.indexOf(value) !== -1}
                color="primary"
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckboxListSecondary);

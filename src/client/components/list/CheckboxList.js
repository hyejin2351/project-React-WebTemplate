import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

//CheckboxList 클래스
//state 초기값은 checked : [0]
//초기에 첫번째 체크박스가 checked 되어 있다.
class CheckboxList extends React.Component {
  state = {
    checked: [0]
  };

  //handleToggle 함수
  /*
  indexOf: 찾고자 하는 문자열(value)을 나타낸다.
  */
  handleToggle = value => () => {
    //checked는 배열이기 때문에 {} 안에 들어간다.
    const { checked } = this.state;
    //currentIndex 값에 checked된 것 중 찾고자 하는 문자열을 반환한 값을 넣는다.
    const currentIndex = checked.indexOf(value);
    //newChecked에 모든 checked 배열값을 넣는다.
    const newChecked = [...checked];

    /*
    array.prototype.push : 배열의 끝에 추가할 요소
    array.prototype.splice() : 배열에 있는 요소를 삭제하거나, 새 요소를 추가하거나, 둘 다 동시에 수행한다.
    */
    if (currentIndex === -1) {
      //currentIndex가 -1이면
      //newChecked 배열에 value을 추가한다.
      newChecked.push(value);
    } else {
      //currentIndex가 -1이 아니면
      //newChecked 배열에 currentIndex부터 한개의 배열 값을 복사한다.
      newChecked.splice(currentIndex, 1);
    }

    //checked가 위의 조건에 맞는 newChecked로 업데이트된다.
    this.setState({
      checked: newChecked
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root}>
        {/* Array.prototype.map(): 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환한다. */}
        {/* 0,1,2,3 중에 value 값에 map하는 하나의 값을 입력 */}
        {[0, 1, 2, 3].map(value => (
          //아이템1
          <ListItem
            key={value}
            role={undefined}
            dense
            button
            //아이템 버튼 클릭 시 checkbox 토글 실행
            onClick={this.handleToggle(value)}
          >
            {/* 체크박스 */}
            <Checkbox
              //체크박스의 인덱스 값이 -1 이 아닐 때 true 반환, checked 속성은 값이 true일 때 체크 표시됨
              checked={this.state.checked.indexOf(value) !== -1}
              //키보드로 포커스를 맞출 수 없다.
              tabIndex={-1}
              //클릭 시 물결 효과가 안일어난다.
              disableRipple
            />
            {/* 텍스트 */}
            <ListItemText primary={`아이템 ${value + 1}`} />
            {/* secondary 아이콘 */}
            <ListItemSecondaryAction>
              <IconButton aria-label="Comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckboxList);

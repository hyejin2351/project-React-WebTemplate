import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  }
});

function PinnedSubheaderList(props) {
  const { classes } = props;

  return (
    //subheader에 유일한 li인 고정 li 를 표시함
    <List className={classes.root} subheader={<li />}>
      {/* 고정 갯수를 지정함 */}
      {/* 0,1,2,3,4 중에 하나를 sectionId에 넣으면 그대로 li와 ListSubheader에 반환됨 */}
      {[0, 1, 2, 3, 4].map(sectionId => (
        //li의 고유한 key 값은 sectionId임
        <li key={`section-${sectionId}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>{`고정 ${sectionId}`}</ListSubheader>

            {/* 아이템 갯수를 지정함 */}
            {/* 0,1,2 중에 하나를 item에 넣으면 그대로 ListItem과 ListItemText에 반환됨 */}
            {[0, 1, 2].map(item => (
              <ListItem key={`item-${sectionId}-${item}`}>
                <ListItemText primary={`고정 ${sectionId} 아이템 ${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}

PinnedSubheaderList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PinnedSubheaderList);

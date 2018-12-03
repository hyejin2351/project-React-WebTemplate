import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import SnackbarContent from "@material-ui/core/SnackbarContent";

//action props에 넣는다 = Button 태그를
const action = (
  <Button color="primary" size="small">
    액션
  </Button>
);

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit
  }
});

//LongTextSnackbar 메서드
function LongTextSnackbar(props) {
  const { classes } = props;

  return (
    <div>
      {/* SnackbarContent API는 다음의 속성들을 가진다: className, message, action */}
      <SnackbarContent
        className={classes.snackbar}
        message="I love snacks."
        action={action}
      />

      <SnackbarContent
        className={classes.snackbar}
        message={
          "I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate."
        }
      />

      <SnackbarContent
        className={classes.snackbar}
        message="I love candy. I love cookies. I love cupcakes."
        action={action}
      />

      <SnackbarContent
        className={classes.snackbar}
        message={
          "I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate."
        }
        action={action}
      />
    </div>
  );
}

LongTextSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LongTextSnackbar);

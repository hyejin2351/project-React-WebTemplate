import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const styles = {
  root: {
    color: blue[600],
    "&$checked": {
      color: blue[500]
    }
  },
  checked: {}
};

class CheckboxLabels extends React.Component {
  render() {
    const { classes, componentName, onChange } = this.props;

    if (componentName && onChange) {
      return (
        <div>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  disableRipple
                  onChange={onChange}
                  name={componentName}
                />
              }
              label="이용약관에 동의합니다."
            />
          </FormGroup>
        </div>
      );
    } else {
      return (
        <div>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  value="checkedI"
                  disableRipple
                />
              }
              label="이용약관에 동의합니다."
            />
          </FormGroup>
        </div>
      );
    }
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckboxLabels);

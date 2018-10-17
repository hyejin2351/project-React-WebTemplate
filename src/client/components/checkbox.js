import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const styles = {
    root: {
        color: blue[600],
        '&$checked': {
            color: blue[500],
        },
    },
    checked: {}
};

class CheckboxLabels extends React.Component {
    state = {
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.checked});
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <FormGroup row>

                    <FormControlLabel
                        control={
            <Checkbox
            color="primary"
              icon={<CheckBoxOutlineBlankIcon />}
              checkedIcon={<CheckBoxIcon  />}
              value="checkedI"
              disableRipple
            />}
                        label="이용약관에 동의합니다."
                    />


                </FormGroup>
            </div>
        );
    }
}

CheckboxLabels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxLabels);
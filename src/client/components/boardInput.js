import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',

    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },

    //페이퍼
    outer_paper: {},

});

class TextFields extends React.Component {
    state = {
        name: '',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const {classes} = this.props;

        return (
            <Paper elevation={0} className={classes.container} noValidate autoComplete="off">

                <TextField
                    id="standard-full-width"
                    label="제목"
                    style={{ margin: 8 }}
                    placeholder=""
                    margin="normal"
                    InputLabelProps={{
            shrink: true,
          }}
                />

                <TextField
                    id="standard-full-width"
                    label="내용"
                    style={{ margin: 8 }}
                    placeholder=""
                    fullWidth
                    multiline
                    rows="20"
                    margin="normal"
                    InputLabelProps={{
            shrink: true,
          }}
                />
            </Paper>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
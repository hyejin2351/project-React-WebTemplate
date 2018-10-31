import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
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
    render() {
        const {classes, article, onChange} = this.props;

        const title = article ? article.title : '';
        const content = article ? article.content : '';

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
                    defaultValue={title}
                    name="title"
                    onChange={onChange}
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
                    defaultValue={content}
                    name="content"
                    onChange={onChange}
                />
            </Paper>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
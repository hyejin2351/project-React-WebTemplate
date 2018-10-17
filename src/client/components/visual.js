import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Core 컴포넌트
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//스타일링
const styles = theme => ({
    root: {
        backgroundColor: '#007bff'
    },
    typo: {
        color: '#ffffff',
        textAlign: 'center',
    },
    transBlack: {
        paddingTop: theme.spacing.unit * 30,
        paddingBottom: theme.spacing.unit * 30,
        textAlign: 'center',

    }
});

function PaperSheet(props) {
    const {classes} = props;

    return (
        <React.Fragment>
            <Paper className={classes.root}>
                <div className={classes.transBlack}>
                    <Typography variant="headline" component="h3" className={classes.typo}>
                        타이틀1
                    </Typography>
                    <Typography component="p" className={classes.typo}>
                        텍스트1
                    </Typography>
                </div>
            </Paper>
        </React.Fragment>
    )
        ;
}

PaperSheet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
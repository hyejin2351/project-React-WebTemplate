import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import withRoot from '../../lib/withRoot';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const log = require('debug')('app:sample_');

log.log = console.log.bind(console);

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
});

const SampleView = ({ classes, onHandleClick}) => {
    return (
        <div className={classes.root}>
            <Typography variant="display1" gutterBottom>
                Welcome to Sample Page
            </Typography>
            <Typography variant="subheading" gutterBottom>
                You have 2 choices
            </Typography>
            <Button onClick={e => onHandleClick(e)} variant="raised" color="secondary" >
                Check out my message...
            </Button>
            <br />
            <br />
            <Button variant="raised" color="secondary">
                <Link href="/" prefetch>
                    <a>Go to your profile page... (Need to login)</a>
                </Link>

            </Button>

        </div>
    );
}

SampleView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(SampleView));

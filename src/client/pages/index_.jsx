/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Link from 'next/link';

import MenuAppBar from '../components/appBar';
import PaperSheet from '../components/visual';
import MediaCard from '../components/mediaCards';


const styles = theme => ({
    back: {
        background: '#f5f6f8'
    },
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 7,
    },
});

class IndexView extends React.Component {
    state = {
        open: false,
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    handleClick = () => {
        this.setState({
            open: true,
        });
    };

    render() {
        const {classes} = this.props;
        const {open} = this.state;

        return (
            <div className={classes.back}>

                <MenuAppBar></MenuAppBar>

                <PaperSheet></PaperSheet>

                <div className={classes.root}>
                    <MediaCard></MediaCard>
                </div>
            </div>
        );
    }
}

IndexView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IndexView);

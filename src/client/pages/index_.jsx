import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import WithRoot from '../lib/withRoot';
import Link from 'next/link';

import MenuAppBar from '../components/appBar';
import PaperSheet from '../components/visual';
import MediaCard from '../components/mediaCards';

//스타일링
const styles = theme => ({
    root: {
        background: '#f5f6f8'
    },
    back: {
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
            <React.Fragment>
                <div className={classes.root}>

                    <MenuAppBar></MenuAppBar>

                    <PaperSheet></PaperSheet>

                </div>
            </React.Fragment>
        );
    }
}

IndexView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default WithRoot(withStyles(styles)(IndexView));

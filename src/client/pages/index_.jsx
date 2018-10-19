import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import WithRoot from '../lib/withRoot';

// 컴포넌트
import MenuAppBar from '../components/appBar';
import PaperSheet from '../components/visual';
import MediaCard from '../components/mediaCard';


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

                    <MediaCard></MediaCard>

                </div>
            </React.Fragment>
        );
    }
}

IndexView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default WithRoot(withStyles(styles)(IndexView));

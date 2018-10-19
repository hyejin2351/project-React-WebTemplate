import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

//Core 컴포넌트
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

//스타일링
const styles = {
    root: {
        flexGrow: 1,
    },
    bar: {
        backgroundColor: '#007bff'
    },
    page_title: {
        fontWeight: 'bold',
        fontSize: '1.3125rem'
    }
};

function SimpleAppBar(props) {
    const {classes} = props;
    let {title} = props;

    console.log('1');
    console.log(props);

    // title 정보가 없는경우 기본 title명으로 메인페이지로 설정한다.
    if (!title)
        title = '메인페이지';

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.bar}>
                <Toolbar variant="dense">
                    <Typography variant="headline" color="inherit" className={classes.page_title}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};

export default withStyles(styles)(SimpleAppBar);
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Link from 'next/link';

//Core 컴포넌트
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';


// 컴포넌트 (drawer)
import DrawerView from './adminDrawer';


//스타일링
const styles = theme => ({
    logo_text: {
        textAlign: 'center',
        textDecoration: 'none',
        color: '#fff'
    },

    right_area: {
        float: 'right',
    },
    //right btn
    right_btn: {
        width: 60,
        color: 'white',
        textDecoration: 'none'
    },
    btn: {
        fontSize: 13,
        width: 60,
        color: 'white',
        textDecoration: 'none',
    },
    float_right: {
        float: 'right'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    root: {
        flexGrow: 1,
        backgroundColor: '#333',
    },
    grow: {
        flexGrow: 1,
        fontSize: 25,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    logo_text: {
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold',
        marginLeft: 20,
    },
    button_text: {
        color: 'white',
        textDecoration: 'none',
    },
})


class MenuAppBar extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
    };

    handleChange = event => {
        this.setState({auth: event.target.checked});
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {classes} = this.props;
        const {auth, anchorEl} = this.state;
        const open = Boolean(anchorEl);

        return (
            <React.Fragment>
                <AppBar position="static" className={classes.root}>
                    <Toolbar>

                        <DrawerView></DrawerView>

                        <Typography variant="h1" color="inherit" className={classes.grow}>
                            <Link href="/">
                                <a className={classes.logo_text}>로고</a>
                            </Link>
                        </Typography>
                        <Button color="inherit">
                            <Link href="/users/signin">
                                <a className={classes.button_text}>로그인</a>
                            </Link>
                        </Button>
                        <Button color="inherit">
                            <Link href="/users/signup">
                                <a className={classes.button_text}>회원가입</a>
                            </Link>
                        </Button>

                        <IconButton color="inherit">
                            <Link href="/users/myPage">
                                <PersonIcon/>
                            </Link>
                        </IconButton>

                        <Button color="inherit">
                            <Link href="/">
                                <a className={classes.button_text}>로그아웃</a>
                            </Link>
                        </Button>


                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Link from 'next/link';

//Core 컴포넌트
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';

//스타일링
const styles = theme => ({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
        background: '#f2f2f2',
        color: '#333333'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    logo: {
        textAlign: 'center',
        textDecoration: 'none',
        color: 'black'
    }
});

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
                <div className={classes.root}>
                    <AppBar position="static" className={classes.grow}>
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>

                            <Grid item xs={12} className={classes.logo}>
                                <Typography component="h1" variant="headline" color="inherit" className={classes.grow}>
                                    <Link href="/">
                                        <a className={classes.logo}>LOGO</a>
                                    </Link>
                                </Typography>
                            </Grid>

                            {auth && (
                                <div>
                                    <IconButton
                                        aria-owns={open ? 'menu-appbar' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <Avatar alt="Remy Sharp" src="/static/images/remy.jpg"
                                                className={classes.avatar}/>
                                    </IconButton>

                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                                        transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                                        open={open}
                                        onClose={this.handleClose}
                                    >
                                        <MenuItem onClick={this.handleClose}>
                                            <Link href="/users/signin">
                                                <a>로그인</a>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={this.handleClose}>
                                            <Link href="/users/signup">
                                                <a>회원가입</a>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={this.handleClose}>
                                            <Link href="/users/myPage">
                                                <a>마이페이지</a>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={this.handleClose}>
                                            <Link href="/board/users/board">
                                                <a>게시판</a>
                                            </Link>
                                        </MenuItem>
                                    </Menu>
                                </div>
                            )}
                        </Toolbar>
                    </AppBar>
                </div>
            </React.Fragment>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
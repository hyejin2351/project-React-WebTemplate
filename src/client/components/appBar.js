import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Link from 'next/link';

//Core 컴포넌트
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// 컴포넌트 (drawer)
import DrawerView from './adminDrawer';
// 컴포넌트 (toggle)
import SignOutToggle from '../components/admin/signoutState';
import SignInToggle from '../components/admin/signinState';


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
                            <DrawerView></DrawerView>

                            <Grid item xs={12} className={classes.logo}>
                                <Typography component="h1" variant="headline" color="inherit" className={classes.grow}>
                                    <Link href="/">
                                        <a className={classes.logo}>LOGO</a>
                                    </Link>
                                </Typography>
                            </Grid>

                            {auth && (
                                <div>

                                    <SignOutToggle></SignOutToggle>

                                    <SignInToggle></SignInToggle>

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
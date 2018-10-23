import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Link from 'next/link';
import debug from 'debug';

// Core 컴포넌트
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

// 컴포넌트 (drawer)
import DrawerView from './adminDrawer';

import checkLoggedIn from '../../lib/checkLoggedIn';
import AuthService from '../../lib/AuthService';
import redirect from '../../lib/redirect';

const log = debug('app:appBar');

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
    },
    btn_common: {
        textDecoration: 'none',
        color: '#333'
    }
});
class MngBar extends React.Component {
    // 리액트 컴포넌트가 최초에 생성될때 호출되는 함수 -- 변수 선언, 초기화
    constructor(props) {
        super(props);

        this.state = {
            me: {

            }
        };

        this.signout = this.signout.bind(this);
    }

    // 리액트 컴포넌트가 화면에 그려지기전에 호출되는 함수 -- 컴포넌트가 필요한 정보를 구하기
    async componentDidMount() {
        const me = await checkLoggedIn(this.props);
        this.setState({
            ...me
        });
    }

    async signout() {
        const { apolloClient } = this.props;
        if(apolloClient) {
            try{
                await AuthService.logout({
                    uri: '/api/auth/logout',
                    apolloClient
                });

                // Redirect to a more useful page when signed out
                redirect(null, '/admin/signin');
            } catch (err) {

            }
        }
    }

    // 리액트 컴포넌트가 실제 화면에 그려질때 호출되는 함수
    render() {
        const {classes} = this.props;
        const { me } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.grow}>
                    <Toolbar>
                        <DrawerView></DrawerView>

                        <Grid item xs={12} className={classes.logo}>
                            <Typography component="h1" variant="h5" color="inherit" className={classes.grow}>
                                <Link href="/admin" prefetch>
                                    <a className={classes.logo}>LOGO</a>
                                </Link>
                            </Typography>
                        </Grid>

                        {
                            (!me || !me.id) ?
                                 <Button className={classes.right_btn} color="inherit">
                                    <Link href="/admin/signin">
                                        <a className={classes.btn_common}>LOGIN</a>
                                    </Link>
                                </Button>
                                :
                                <Button className={classes.right_btn} color="inherit" onClick={this.signout}>
                                    <a className={classes.btn_common}>LOGOUT</a>
                                </Button>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MngBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MngBar);
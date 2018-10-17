import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Link from 'next/link';
import WithRoot from '../../lib/withRoot'

//Core 컴포넌트
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';

//컴포넌트
import MenuAppBar from '../../components/appBar';

//이미지
let imgUrl = '/static/images/line.png';

//스타일링
const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
        backgroundColor: '#f5f6f8',
        paddingBottom: theme.spacing.unit * 20
    },
    paper: {
        width: 350,
        paddingBottom: theme.spacing.unit * 5,
        margin: '0 auto',
        backgroundColor: '#f5f6f8',
        overflow: 'hidden'
    },
    input: {
        display: 'block',
        width: 350,
        height: 40,
        marginTop: theme.spacing.unit * 2
    },
    SigninPage: {},
    bold: {
        fontWeight: 'bold',
        paddingBottom: theme.spacing.unit * 1
    },
    signUp: {
        color: '#3e9bff'
    },
    signUpBtn: {
        marginTop: theme.spacing.unit * 3,
        height: 40
    },
    notYet: {
        marginTop: theme.spacing.unit * 2
    },
    social: {
        width: '100%'
    },
    or: {
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden'
    },

    //SNS 버튼
    sns: {
        margin: theme.spacing.unit * 3,
        width: 50,
        height: 50
    },
    sns_1: {
        '&': {
            backgroundColor: '#3b5999'
        },
        '&:hover': {
            backgroundColor: '#3b5999'
        }
    },
    sns_2: {
        '&': {
            backgroundColor: '#dc4e41'
        },
        '&:hover': {
            backgroundColor: '#dc4e41'
        }
    },
    sns_3: {
        '&': {
            backgroundColor: '#ffde00'
        },
        '&:hover': {
            backgroundColor: '#ffde00'
        }
    },
    paper_trans: {
        background: 'transparent'
    },
    sns_img_size: {
        width: 25
    }
});

function SigninPage(props) {
    const {classes, onFacebook, onGoogle, onKakao} = props;

    return (
        <React.Fragment>
            <MenuAppBar></MenuAppBar>

            <div className={classes.root}>

                <Paper elevation={0} className={classes.paper}>
                    <div className={classes.SigninPage}>
                        <Typography variant="title" align="left" className={classes.bold}>로그인</Typography>
                        <Typography variant="caption" align="left">로그인 후 모든 서비스를 이용하세요.</Typography>
                    </div>


                    <div className={classes.container}>
                        <Input
                            placeholder="이메일"
                            className={classes.input}>
                        </Input>

                        <Input
                            placeholder="비밀번호 (6자리 이상)"
                            className={classes.input}
                            type="password">
                        </Input>
                    </div>


                    <Button fullWidth={true} variant="contained" color="primary"
                            className={classes.signUpBtn}>로그인하기
                    </Button>


                    <Typography align="right" className={classes.notYet}>아직 회원이 아니신가요?
                        <a href="/users/signup"
                           className={classes.signUp}>회원가입</a></Typography>
                </Paper>

                <Paper elevation={0} className={classes.paper}><Typography variant="caption"
                                                                           className={classes.or}>또는</Typography></Paper>

                <Paper elevation={0} className={classes.paper} align="left">
                    <div align="left">
                        <Typography variant="title" className={classes.bold}>소셜 로그인</Typography>
                        <Typography variant="caption">SNS 계정으로 간편하게 로그인하세요.</Typography>
                    </div>

                    <Paper align="center" elevation={0} className={classes.paper_trans}>
                        <Button variant="fab"
                                className={classNames(classes.sns, classes.sns_1)} onClick={onFacebook}><img
                            src="/static/images/sns_1.png"
                            className={classes.sns_img_size}
                            alt="Facebook으로 로그인하기 버튼"/></Button>
                        <Button variant="fab"
                                className={classNames(classes.sns, classes.sns_2)} onClick={onGoogle}><img
                            src="/static/images/sns_2.png"
                            className={classes.sns_img_size}
                            alt="Google로 로그인하기 버튼"/></Button>
                        <Button variant="fab"
                                className={classNames(classes.sns, classes.sns_3)} onClick={onKakao}><img
                            src="/static/images/sns_3.png"
                            className={classes.sns_img_size}
                            alt="Kakaotalk으로 로그인하기 버튼"/></Button>
                    </Paper>
                </Paper>
            </div>
        </React.Fragment>
    );
}

SigninPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default WithRoot(withStyles(styles)(SigninPage));
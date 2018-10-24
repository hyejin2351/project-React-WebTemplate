import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Core 컴포넌트
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// 컴포넌트
import CheckboxAllCheck from '../../components/checkboxAllCheck';
import SimpleAppBar from '../../components/subBar';


const styles = theme => ({
    root: {
        minWidth: 450,
        flexGrow: 1,
        margin: theme.spacing.unit * 3
    },

    //버튼
    btn_color: {
        color: '#fff',
        textDecoration: 'none'
    },
    one_btn_wrap: {
        marginTop: theme.spacing.unit * 7
    },

    //페이퍼
    paper: {
        padding: theme.spacing.unit * 3,
        overflow: 'hidden',
        marginBottom: theme.spacing.unit * 5
    },
    paper_title: {
        fontWeight: 'bold',
        marginBottom: theme.spacing.unit * 2
    },
    body_title: {
        padding: theme.spacing.unit * 1,
        backgroundColor: 'transparent'
    },
    outer_spacing: {
        width: '100%',
        margin: theme.spacing.unit * 1,
        padding: theme.spacing.unit * 5
    },

    //텍스트
    email_span: {
        color: '#3e9bff'

    }
});


function DeleteAccountView(props) {
    const {classes, me, unregister} = props;

    return (
        <React.Fragment>
            <SimpleAppBar title="계정 탈퇴"></SimpleAppBar>

            <div className={classes.root}>
                <Paper elevation={0} className={classes.body_title}>
                    <Typography variant="h6" className={classes.paper_title}>계정 탈퇴 ></Typography>
                    <Typography variant="caption" className={classes.paper_title}>
                        회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요.
                    </Typography>
                </Paper>


                <Grid container item xs={12}>
                    <Paper className={classes.outer_spacing}>
                        <Typography variant="body1" gutterBottom>탈퇴 후에는 이메일 <span className={classes.email_span}> {me.email} </span>
                            로 다시 가입할 수 없으며 아이디와 데이터는 복구할 수
                            없습니다.</Typography>
                        <Typography variant="body1" gutterBottom>게시판형 서비스에 남아 있는 게시글은 탈퇴 후 삭제할 수 없습니다.</Typography>
                        <Typography variant="body1">또한, 네이버 아이디를 사용해 다른 서비스에 로그인 할 수 없게 됩니다.</Typography>
                    </Paper>
                </Grid>

                <CheckboxAllCheck></CheckboxAllCheck>
            </div>


            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Paper elevation={0} className={classes.one_btn_wrap}>
                    <Button variant="contained" color="primary" size="medium" onClick={unregister}>
                            <a className={classes.btn_color}>계정 탈퇴하기</a>
                    </Button>
                </Paper>
            </Grid>
        </React.Fragment>
    )
        ;
}

DeleteAccountView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteAccountView);

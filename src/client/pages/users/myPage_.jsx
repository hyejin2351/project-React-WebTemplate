import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Link from 'next/link';
import WithRoot from '../../lib/withRoot';

// Core 컴포넌트
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// 컴포넌트
import MenuAppBar from '../../components/appBar';
import SimpleAppBar from '../../components/subBar';

// 테이블
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
// import TableHead from '@material-ui/core/TableHead';

// 스타일링
const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing.unit * 3
    },
    paper_wrap: {
        margin: theme.spacing.unit * 1,
    },
    paper: {
        padding: theme.spacing.unit * 3,
        overflow: 'hidden',
        marginBottom: theme.spacing.unit * 5
    },
    float_right: {
        float: 'right'
    },
    btn_color: {
        color: '#fff',
        textDecoration: 'none'
    },
    paper_title: {
        fontWeight: 'bold',
        marginBottom: theme.spacing.unit * 2
    },

    //프로필 이미지 영역 + 닉네임 영역
    paper_inner_wrap: {
        minHeight: 300,
        maxHeight: 300,
    },

    //프로필 이미지 영역
    profile_img_area: {
        minHeight: 225,
        marginBottom: 15
    },
    profile_img: {
        overflow: 'hidden',
        maxWidth: 300,
        maxHeight: 225,
        borderRadius: 360,
    },
    table_wrap: {},
    table: {
        minWidth: 300,
    },
    table_cell: {
        border: 'none',
        minHeight: 116,
        padding: theme.spacing.unit * 5
    },
    table_cell_th: {
        fontWeight: 'bold',
        paddingLeft: theme.spacing.unit * 8
    },
    out_text: {
        padding: theme.spacing.unit * 2
    },

});

function MyPageView(props) {
    const {classes, onSignout, me} = props;

    return (
        <React.Fragment>
            <MenuAppBar></MenuAppBar>
            <SimpleAppBar title="마이 페이지"></SimpleAppBar>

            <div className={classes.root}>

                <Grid container spacing={16}>
                    <Grid item xs={12} md={6}>
                        <div className={classes.paper_wrap}>
                            <Typography variant="h6" className={classes.paper_title}>프로필 ></Typography>
                            <Paper className={classNames(classes.paper, classes.firstline_paper_height)}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Paper elevation={0} className={classes.paper_inner_wrap}>
                                        <Paper elevation={0} className={classes.profile_img_area}>
                                            <img src={me.profileImageURL} alt="기본 프로필 사진"
                                                 className={classes.profile_img}/>
                                        </Paper>
                                        <Paper elevation={0}>
                                            <Typography gutterBottom variant="body1" align="center"><strong>닉네임</strong></Typography>
                                            <Typography variant="body1" align="center"> {me.nickName} </Typography>
                                        </Paper>
                                    </Paper>
                                </Grid>
                                <Button variant="contained" color="primary" size="medium"
                                        className={classes.float_right}>
                                    <Link href="/users/profileChange">
                                        <a className={classes.btn_color}>수정</a>
                                    </Link>
                                </Button>
                            </Paper>
                        </div>
                    </Grid>


                    <Grid item xs={12} md={6}>
                        <div className={classes.paper_wrap}>
                            <Typography variant="h6" className={classes.paper_title}>내 개인정보 ></Typography>
                            <Paper className={classes.paper}>

                                <Paper elevation={0} className={classes.table_wrap}>
                                    <Paper elevation={0} className={classes.paper_inner_wrap}>
                                        <Table className={classes.table}>
                                            <TableBody>
                                                <TableRow component="tr">
                                                    <TableCell component="th"
                                                               className={classNames(classes.table_cell, classes.table_cell_th)}>
                                                        <Typography variant="body1"><strong>성명</strong></Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.table_cell}>
                                                        <Typography variant="body1">{me.name}</Typography>
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow component="tr">
                                                    <TableCell component="th"
                                                               className={classNames(classes.table_cell, classes.table_cell_th)}>
                                                        <Typography variant="body1"><strong>이메일</strong></Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.table_cell}>
                                                        <Typography variant="body1">{me.email}</Typography>
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow component="tr">
                                                    <TableCell component="th"
                                                               className={classNames(classes.table_cell, classes.table_cell_th)}>
                                                        <Typography variant="body1"><strong>비밀번호</strong></Typography>
                                                    </TableCell>
                                                    <TableCell className={classes.table_cell}>
                                                        <Typography variant="body1">********</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                </Paper>

                                <Button variant="contained" color="primary" size="medium"
                                        className={classes.float_right}>
                                    <Link href="/users/passwordChange" prefetch>
                                        <a className={classes.btn_color}>비밀번호 변경</a>
                                    </Link>
                                </Button>
                            </Paper>
                        </div>
                    </Grid>
                </Grid>


                <Grid item xs={12}>
                    <div className={classes.paper_wrap}>
                        <Typography variant="h6" className={classes.paper_title}>계정 탈퇴 ></Typography>
                        <Paper className={classes.paper}>
                            <Typography variant="body1" className={classes.out_text}>서비스를 더 이상 이용하고 싶지 않다면 여기서 계정을 탈퇴할 수
                                있습니다.</Typography>
                            <Button variant="contained" color="primary" size="medium" className={classes.float_right}>
                                <Link href="/users/deleteAccount">
                                    <a className={classes.btn_color}>계정 탈퇴</a>
                                </Link>
                            </Button>
                        </Paper>
                    </div>
                </Grid>

                <Button variant="contained" color="primary" size="medium"
                        className={classes.float_right} onClick={onSignout}>
                    로그아웃
                </Button>
            </div>
        </React.Fragment>
    )
        ;
}

MyPageView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default WithRoot(withStyles(styles)(MyPageView));

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

//이미지
// let imgUrl = '/static/images/line.png'

// 스타일링
const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing.unit * 3
    },
    paper_wrap: {
        margin: theme.spacing.unit * 1
    },
    paper: {
        padding: theme.spacing.unit * 3,
        overflow: 'hidden',
        marginBottom: theme.spacing.unit * 5
    },
    firstline_paper_height: {
        minHeight: 350
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
    paper_inner_wrap: {
        minHeight: 265
    },
    profile_img: {
        display: 'block',
        maxWidth: 300
    },
    table_wrap: {
        width: '100%',
        overflowX: 'auto'
    },
    table: {
        minWidth: 300
    },
    table_cell: {
        border: 'none',
        minHeight: 116,
        paddingTop: theme.spacing.unit * 7
    },
    table_cell_th: {
        fontWeight: 'bold',
        paddingLeft: theme.spacing.unit * 8
    },
    out_text: {
        padding: theme.spacing.unit * 2
    }
});

function MyPageView(props) {
    const {classes} = props;

    return (
        <React.Fragment>
            <MenuAppBar></MenuAppBar>
            <SimpleAppBar title="마이 페이지"></SimpleAppBar>

            <div className={classes.root}>

                <Grid container spacing={16}>
                    <Grid item xs={12} md={6}>
                        <div className={classes.paper_wrap}>
                            <Typography variant="title" className={classes.paper_title}>프로필 ></Typography>
                            <Paper className={classNames(classes.paper, classes.firstline_paper_height)}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Paper elevation={0} className={classes.paper_inner_wrap}>
                                        <img src="/static/images/profile.png" alt="기본 프로필 사진"
                                             className={classes.profile_img}/>
                                        <Typography variant="body1" align="center"><strong>닉네임</strong></Typography>
                                        <Typography variant="body1" align="center">홍당무</Typography>
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
                            <Typography variant="title" className={classes.paper_title}>내 개인정보 ></Typography>
                            <Paper className={classNames(classes.paper, classes.firstline_paper_height)}>

                                <Paper elevation={0}
                                       className={classNames(classes.table_wrap, classes.paper_inner_wrap)}>
                                    <Table className={classes.table}>
                                        <TableBody>
                                            <TableRow component="tr">
                                                <TableCell component="th"
                                                           className={classNames(classes.table_cell, classes.table_cell_th)}>성명</TableCell>
                                                <TableCell className={classes.table_cell}>홍길동</TableCell>
                                            </TableRow>

                                            <TableRow component="tr">
                                                <TableCell component="th"
                                                           className={classNames(classes.table_cell, classes.table_cell_th)}>이메일</TableCell>
                                                <TableCell className={classes.table_cell}>id@email.com</TableCell>
                                            </TableRow>

                                            <TableRow component="tr">
                                                <TableCell component="th"
                                                           className={classNames(classes.table_cell, classes.table_cell_th)}>비밀번호</TableCell>
                                                <TableCell className={classes.table_cell}>********</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
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
                        <Typography variant="title" className={classes.paper_title}>계정 탈퇴 ></Typography>
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
            </div>
        </React.Fragment>
    )
        ;
}

MyPageView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default WithRoot(withStyles(styles)(MyPageView));

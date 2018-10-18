import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import WithRoot from '../../lib/withRoot';
import Link from 'next/link';

//Core 컴포넌트
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//Core 컴포넌트 (테이블)
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

// 컴포넌트
import MngBar from '../../components/admin/mngAppBar';
import SimpleAppBar from '../../components/subBar';

//스타일링
const styles = theme => ({
    root: {
        minWidth: 450,
        flexGrow: 1,
        margin: theme.spacing.unit * 3
    },

    //페이퍼
    outer_paper: {},

    //border bottom
    border_bottom: {
        padding: theme.spacing.unit * 3,
        borderBottom: '2px solid #3e9bff',
        overflow: 'hidden'
    },

    //테이블
    title_right: {
        width: '50%',
        float: 'right'
    },
    title_left: {
        width: '50%',
        height: 38,
        float: 'left'
    },
    paper_title: {
        fontSize: '1.3125rem',
        fontWeight: 'bold',
        float: 'left',
        paddingTop: 6
    },
    total: {
        float: 'left',
        display: 'block',
        margin: '16px 0px 0px 15px'
    },
    total_span: {
        color: '#3e9bff',
        fontWeight: 'bold'
    },

    //아이콘
    icon: {
        fontSize: 20,
        marginRight: 5
    },

    //myPage
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


function MyIndexPage(props) {

    const {classes} = props;

    return (
        <div>
            <MngBar></MngBar>
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
                                    <Paper elevation className={classes.paper_inner_wrap}>
                                        <img src="/static/images/profile.png" alt="기본 프로필 사진"
                                             className={classes.profile_img}/>
                                        <Typography variant="body1" align="center"><strong>닉네임</strong></Typography>
                                        <Typography variant="body1" align="center">관리자</Typography>
                                    </Paper>
                                </Grid>
                                <Button variant="contained" color="primary" size="medium"
                                        className={classes.float_right}>
                                    <Link href="/admin/profile">
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

                                <Paper elevation
                                       className={classNames(classes.table_wrap, classes.paper_inner_wrap)}>
                                    <Table className={classes.table}>
                                        <TableBody>
                                            <TableRow component="tr">
                                                <TableCell component="th"
                                                           className={classNames(classes.table_cell, classes.table_cell_th)}>성명</TableCell>
                                                <TableCell className={classes.table_cell}>관리자</TableCell>
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
                                    <Link href="/admin/passwordChange">
                                        <a className={classes.btn_color}>비밀번호 변경</a>
                                    </Link>
                                </Button>
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div >
    )
}

MyIndexPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default WithRoot(withStyles(styles)(MyIndexPage));

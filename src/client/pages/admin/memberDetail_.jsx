import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Link from 'next/link';

//Core 컴포넌트
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import red from '@material-ui/core/colors/red';

//Core 컴포넌트 (테이블)
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//컴포넌트
import SimpleAppBar from '../../components/subBar';

//아이콘
import DeleteIcon from '@material-ui/icons/Delete';

//스타일링
const styles = theme => ({
    root: {
        minWidth: 450,
        flexGrow: 1,
        margin: theme.spacing.unit * 3
    },

    //border bottom
    blue_border_bottom: {
        padding: theme.spacing.unit * 3,
        borderBottom: '2px solid #3e9bff',
        overflow: 'hidden'
    },

    //페이퍼 상단 영역
    blue_border_upper_right: {
        width: '50%',
        float: 'right'
    },
    blue_border_upper_left: {
        width: '50%',
        height: 38,
        float: 'left'
    },
    content_title: {
        fontSize: '1.3125rem',
        fontWeight: 'bold',
        float: 'left',
        paddingTop: 6
    },

    //페이퍼 하단 영역
    paper_bottom: {
        padding: theme.spacing.unit * 3
    },

    //삭제 버튼
    delete_btn: {
        float: 'right',
        fontWeight: 'bold',
        color: red[500]
    },

    delete_btn_props: {
        color: 'red',
        textDecoration: 'none'
    },

    //아이콘
    icon: {
        fontSize: 20,
        marginRight: 5
    },

    //테이블
    table: {
        fontSize: 13
    },
    table_head: {
        textAlign: 'center',
        backgroundColor: '#eee'
    },
    table_data: {
        textAlign: 'center',
    },
    table_border: {
        border: '1px solid #e3e3e3'
    },
});


function memberDetailView(props) {
    const {classes} = props;

    return (
        <React.Fragment>
            <SimpleAppBar title="회원 정보"></SimpleAppBar>

            <div className={classes.root}>
                <Paper>
                    <Paper elevation={0} className={classes.blue_border_bottom}>
                        <div className={classes.blue_border_upper_left}>
                            <Typography component="h3" className={classes.content_title}>회원 정보</Typography>
                        </div>

                        <div className={classes.blue_border_upper_right}>
                            <Button className={classes.delete_btn}>
                                <DeleteIcon className={classes.icon}/>
                                <Link href="/admin/membersList">
                                    <a className={classes.delete_btn_props}>삭제</a>
                                </Link>
                            </Button>
                        </div>
                    </Paper>

                    <Paper elevation={0}>
                        <Grid>
                            <Paper elevation={0} className={classes.paper_bottom}>
                                <Table className={classes.table}>
                                    <TableBody>
                                        <TableRow className={classes.table_border}>
                                            <th className={classes.table_head}>성명</th>
                                            <td className={classes.table_data}>홍길동</td>
                                        </TableRow>
                                        <TableRow className={classes.table_border}>
                                            <th className={classes.table_head}>닉네임</th>
                                            <td className={classes.table_data}>홍당무</td>
                                        </TableRow>
                                        <TableRow className={classes.table_border}>
                                            <th className={classes.table_head}>이메일</th>
                                            <td className={classes.table_data}>id@email.com</td>
                                        </TableRow>
                                        <TableRow className={classes.table_border}>
                                            <th className={classes.table_head}>가입날짜</th>
                                            <td className={classes.table_data}>2016/05/27</td>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Paper>
                </Paper>
            </div>
        </React.Fragment>
    )
}

memberDetailView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(memberDetailView);

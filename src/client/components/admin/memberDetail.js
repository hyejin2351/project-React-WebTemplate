import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Link from 'next/link';

// Core 컴포넌트
import Paper from '@material-ui/core/Paper';

// Core 컴포넌트 (테이블)
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//스타일링
const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
        padding: theme.spacing.unit * 3,
    },
});

function MemberDetail(props) {
    const {classes ,usersList, rowsPerPage, pageNo} = props;

    return (
        <Paper elevation={0} className={classes.root}>
            <Table className={classes.table}>
                <TableBody>
                    <TableRow>
                        <TableCell>번호</TableCell>
                        <TableCell>성명</TableCell>
                        <TableCell>닉네임</TableCell>
                        <TableCell>이메일</TableCell>
                        <TableCell>가입날짜</TableCell>
                    </TableRow>
                </TableBody>
                {
                    usersList &&
                    <TableBody>
                        {usersList.map((user, index) => {
                            return (
                                <TableRow key={user.id}>
                                    <TableCell component="th" scope="row">
                                        {(pageNo * rowsPerPage) + index + 1}
                                    </TableCell>
                                    <TableCell >
                                        <Link href={{ pathname: '/admin/memberDetail', query: { id: user.id } }}>
                                            <a>{user.name}</a>
                                        </Link>
                                    </TableCell>
                                    <TableCell >{user.nickName}</TableCell>
                                    <TableCell >{user.email}</TableCell>
                                    <TableCell >{(new Date(user.created).toDateString())}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                }
            </Table>
            { !usersList &&
                <div>
                    등록된 회원이 없습니다.
                </div>
            }
        </Paper>
    );
}

MemberDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberDetail);
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

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


let id = 0;
function createData(번호, 제목, 작성자, 날짜, 조회) {
    id += 1;
    return {id, 번호, 제목, 작성자, 날짜, 조회};
}

const rows = [
    createData(1, '게시물1', '관리자', '2018/01/01', 15),
    createData(2, '-', '-', '-', '-'),
    createData(3, '-', '-', '-', '-'),
    createData(4, '-', '-', '-', '-'),
    createData(5, '-', '-', '-', '-'),
];

function MemberDetail(props) {
    const {classes} = props;

    return (
        <Paper elevation={0} className={classes.root}>
            <Table className={classes.table}>
                <TableBody>
                    <TableRow>
                        <TableCell>번호</TableCell>
                        <TableCell>제목</TableCell>
                        <TableCell>작성자</TableCell>
                        <TableCell>날짜</TableCell>
                        <TableCell numeric>조회</TableCell>
                    </TableRow>
                </TableBody>
                <TableBody>
                    {rows.map(row => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.번호}
                                </TableCell>
                                <TableCell ><a href="/admin/memberDetail">{row.제목}</a></TableCell>
                                <TableCell >{row.작성자}</TableCell>
                                <TableCell >{row.날짜}</TableCell>
                                <TableCell numeric>{row.조회}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

MemberDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberDetail);
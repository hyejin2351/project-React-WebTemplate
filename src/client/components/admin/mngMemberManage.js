import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
function createData(번호, 성명, 닉네임, 이메일, 가입날짜) {
    id += 1;
    return { id, 번호, 성명, 닉네임, 이메일, 가입날짜};
}

const rows = [
    createData(1, '홍길동', '홍길동', 'id@email.com', '2018/01/01'),
    createData(2, '-', '-', '-', '-'),
    createData(3, '-', '-', '-', '-'),
    createData(4, '-', '-', '-', '-'),
    createData(5, '-', '-', '-', '-'),
];

function SimpleTableMember(props) {
    const { classes } = props;

    return (
        <Paper elevation className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>번호</TableCell>
                        <TableCell>성명</TableCell>
                        <TableCell>닉네임</TableCell>
                        <TableCell>이메일</TableCell>
                        <TableCell >가입날짜</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.번호}
                                </TableCell>
                                <TableCell ><a href="/mngMemberDetail">{row.성명}</a></TableCell>
                                <TableCell >{row.닉네임}</TableCell>
                                <TableCell >{row.이메일}</TableCell>
                                <TableCell >{row.가입날짜}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

SimpleTableMember.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTableMember);
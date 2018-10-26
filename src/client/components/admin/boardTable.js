import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { withStyles } from '@material-ui/core/styles';

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

function SimpleTable(props) {
    const {classes, articlesList, rowsPerPage, pageNo} = props;

    // Uncaught TypeError: Cannot read property 'map' of undefined 발생
    if(!articlesList)
        return (<div></div>)
    return (
        <React.Fragment>
            <Paper elevation={0}  className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>번호</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell>작성자</TableCell>
                            <TableCell>날짜</TableCell>
                            <TableCell numeric>조회</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { articlesList.map((article, index) => {
                            return (
                                <TableRow key={article.id}>
                                    <TableCell component="th" scope="row">
                                        {(pageNo * rowsPerPage) + index + 1}
                                    </TableCell>
                                    <TableCell>
                                        <Link href={{ pathname: '/admin/board/boardDetail', query: { id: article.id } }}>
                                            <a>{article.title}</a>
                                        </Link>
                                    </TableCell>
                                    <TableCell>{article.author.name}</TableCell>
                                    <TableCell>{(new Date(article.created).toDateString())}</TableCell>
                                    <TableCell numeric>{article.views}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        </React.Fragment>
    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
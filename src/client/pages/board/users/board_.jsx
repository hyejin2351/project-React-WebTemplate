import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import WithRoot from '../../../lib/withRoot';
import classNames from 'classnames';
import Link from '../../../../../node_modules/next/link';

//Core 컴포넌트
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

//컴포넌트
import MenuAppBar from '../../../components/appBar';
import SimpleAppBar from '../../../components/subBar';
import SimpleTable from '../../../components/boardTable';
import CustomPaginationActionsTable from '../../../components/pignation';

//아이콘
import AddIcon from '@material-ui/icons/Add';

//스타일링
const styles = theme => ({
    root: {
        minWidth: 450,
        flexGrow: 1,
        margin: theme.spacing.unit * 3
    },

    //paper
    outer_paper: {},

    //border bottom
    border_bottom: {
        padding: theme.spacing.unit * 3,
        borderBottom: '2px solid #3e9bff',
        overflow: 'hidden'
    },

    //버튼
    add_btn: {
        float: 'right',
        fontWeight: 'bold'
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

    //버튼
    new_btn: {
        textDecoration: 'none',
        color: '#3e9bff'
    },

});


function BoardNewPage(props) {
    const {classes} = props;

    return (
        <React.Fragment>
            <MenuAppBar></MenuAppBar>
            <SimpleAppBar title="게시판"></SimpleAppBar>

            <div className={classes.root}>
                <Paper>
                    <Paper elevation={0} className={classes.border_bottom}>
                        <div className={classes.title_left}>
                            <Typography component="h3" className={classes.paper_title}>게시판</Typography>
                            <Typography variant="caption" className={classes.total}>총 <span
                                className={classes.total_span}>70</span>개</Typography>
                        </div>

                        <div className={classes.title_right}>
                            <Button color="primary" className={classes.add_btn}>
                                <AddIcon className={classes.icon}/>
                                <Link href="/board/users/boardNew">
                                    <a className={classes.new_btn}>등록</a>
                                </Link>
                            </Button>
                        </div>
                    </Paper>

                    <SimpleTable></SimpleTable>
                    <CustomPaginationActionsTable></CustomPaginationActionsTable>
                </Paper>

            </div>
        </React.Fragment>
    );
}

BoardNewPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default WithRoot(withStyles(styles)(BoardNewPage));

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import WithRoot from '../../lib/withRoot'
import Link from 'next/link';
import classNames from 'classnames';

//Core 컴포넌트
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

//컴포넌트
import SimpleAppBar from '../../components/subBar';
import MngBar from '../../components/admin/mngAppBar';
import MemberDetail from '../../components/admin/memberDetail';
import Search from '../../components/admin/search';
import CustomPaginationActionsTable from '../../components/pignation';

//스타일링
const styles = theme => ({
    root: {
        minWidth: 450,
        flexGrow: 1,
        margin: theme.spacing.unit * 3
    },

    //페이퍼
    outer_paper: {},

    //border_bottom
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
    }
});


function MembersListView(props) {
    const {classes} = props;

    return (
        <div>
            <MngBar></MngBar>
            <SimpleAppBar title="회원 관리"></SimpleAppBar>

            <div className={classes.root}>
                <Paper>
                    <Paper elevation={0} className={classes.border_bottom}>
                        <div className={classes.title_left}>
                            <Typography component="h3" className={classes.paper_title}>회원 관리</Typography>
                            <Typography variant="caption" className={classes.total}>총 <span
                                className={classes.total_span}>35</span>개</Typography>
                        </div>

                        <div className={classes.title_right}>
                            <Search></Search>
                        </div>
                    </Paper>

                    <MemberDetail></MemberDetail>
                    <CustomPaginationActionsTable></CustomPaginationActionsTable>
                </Paper>

            </div>
        </div>
    )
        ;
}

//props to classes
MembersListView.propTypes = {
    classes: PropTypes.object.isRequired,
};

//export MembersListView
export default WithRoot(withStyles(styles)(MembersListView));
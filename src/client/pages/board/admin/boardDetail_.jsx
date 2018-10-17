import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import WithRoot from '../../../lib/withRoot'
import classNames from 'classnames';
import Link from 'next/link';

// Core 컴포넌트
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// 컴포넌트
import MngBar from '../../../components/admin/mngAppBar';
import SimpleAppBar from '../../../components/subBar';
import TextFieldsDisabled from '../../../components/boardInputDisabled';

// 아이콘
import EditIcon from '@material-ui/icons/Edit';
import ListIcon from '@material-ui/icons/List';

//스타일링
const styles = theme => ({
    //틀
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
    edit_btn: {
        float: 'right',
        fontWeight: 'bold'
    },
    edit_btn_props: {
        color: '#3e9bff',
        textDecoration: 'none'
    },

    //페이퍼 상단 영역
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

    //페이퍼 하단 영역
    paper_bottom: {
        padding: theme.spacing.unit * 3
    },

    //아이콘
    icon: {
        fontSize: 20,
        marginRight: 5
    },

});


function boardDetail(props) {
    const {classes} = props;

    return (
        <React.Fragment>
            <MngBar></MngBar>
            <SimpleAppBar title="게시물 상세"></SimpleAppBar>

            <div className={classes.root}>
                <Paper>
                    <Paper elevation={0} className={classes.border_bottom}>
                        <div className={classes.title_left}>
                            <Typography component="h3" className={classes.paper_title}>게시물 상세</Typography>
                        </div>

                        <div className={classes.title_right}>
                            <Button color="primary" className={classes.edit_btn}>
                                <EditIcon className={classes.icon}/>
                                <Link href="/board/admin/boardEdit">
                                    <a className={classes.edit_btn_props}>수정</a>
                                </Link>
                            </Button>

                            <Button color="primary" className={classes.edit_btn}>
                                <ListIcon className={classes.icon}/>
                                <Link href="/board/admin/board">
                                    <a className={classes.edit_btn_props}>목록</a>
                                </Link>
                            </Button>
                        </div>
                    </Paper>

                    <Paper elevation={0}>
                        <Grid>
                            <Paper elevation={0} className={classes.paper_bottom}>
                                <TextFieldsDisabled></TextFieldsDisabled>
                            </Paper>
                        </Grid>
                    </Paper>
                </Paper>
            </div>
        </React.Fragment>
    )
}

boardDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default WithRoot(withStyles(styles)(boardDetail));

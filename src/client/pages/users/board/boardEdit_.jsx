import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Link from 'next/link';

//Core 컴포넌트
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// 컴포넌트
import SimpleAppBar from '../../../components/subBar';
import TextFields from '../../../components/boardInput';

//컬러
import red from '@material-ui/core/colors/red';

//아이콘
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

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
    delete_btn: {
        float: 'right',
        fontWeight: 'bold',
        color: red[500]
    },
    delete_btn_props: {
        color: 'red',
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

    //버튼
    two_btn_wrap: {
        backgroundColor: 'transparent',
        marginTop: theme.spacing.unit * 5
    },
    btn_common: {
        height: 37,
        margin: 5
    },
    no_a: {
        textDecoration: 'none'
    },
    save_btn: {},
    save_btn_color: {
        color: 'white'
    },
    cancel_btn: {
        backgroundColor: 'white'
    },
    cancel_btn_color: {
        color: '#333'
    },

    //아이콘
    icon: {
        fontSize: 20,
        marginRight: 5
    },
});


function boardEditView(props) {
    const {classes, article, onDelete, onUpdate, onCancel, changeData} = props;

    return (
        <React.Fragment>
            <SimpleAppBar title="게시물 수정"></SimpleAppBar>

            <div className={classes.root}>
                <Paper>
                    <Paper elevation={0} className={classes.border_bottom}>
                        <div className={classes.title_left}>
                            <Typography component="h3" className={classes.paper_title}>게시물 수정</Typography>
                        </div>

                        <div className={classes.title_right}>
                            <Button className={classes.delete_btn} onClick={onDelete}>
                                <DeleteIcon className={classes.icon}/>
                                <a className={classes.delete_btn_props}>삭제</a>
                            </Button>
                        </div>
                    </Paper>

                    <Paper elevation={0}>
                        <Grid>
                            <Paper elevation={0} className={classes.paper_bottom}>
                                <TextFields article={article} changeData={changeData}></TextFields>
                            </Paper>
                        </Grid>
                    </Paper>
                </Paper>

                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Paper elevation={0} className={classes.two_btn_wrap}>
                        <Button variant="contained" color="primary" size="medium"
                                className={classNames(classes.save_btn, classes.btn_common)} onClick={onUpdate}>
                            <SaveIcon className={classes.icon}/>
                            <a className={classNames(classes.save_btn_color, classes.no_a)}>저장</a>
                        </Button>

                        <Button variant="outlined" size="medium"
                                className={classNames(classes.cancel_btn, classes.btn_common)} onClick={onCancel}>
                            <a className={classNames(classes.cancel_btn_color, classes.no_a)}>취소</a>
                        </Button>
                    </Paper>
                </Grid>
            </div>
        </React.Fragment>
    )
        ;
}

boardEditView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(boardEditView);

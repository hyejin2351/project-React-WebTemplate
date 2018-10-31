import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Link from 'next/link';
import FilePreview from 'react-preview-file';

//Core 컴포넌트
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

//컴포넌트
import SimpleAppBar from '../../components/subBar';

//스타일링
const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing.unit * 3
    },

    //버튼 스타일
    btn_color: {
        color: '#fff',
        textDecoration: 'none'
    },

    //페이퍼 스타일
    paper: {
        padding: theme.spacing.unit * 3,
        overflow: 'hidden',
        marginBottom: theme.spacing.unit * 5
    },
    paper_wrap: {
        margin: theme.spacing.unit * 1
    },
    paper_title: {
        fontWeight: 'bold',
        marginBottom: theme.spacing.unit * 2
    },
    firstline_paper_height: {
        minHeight: 350,
        maxHeight: 350
    },
    paper_inner_wrap: {
        minHeight: 265
    },
    profile_img: {
        display: 'block',
        maxWidth: 300
    },
    body_title: {
        padding: theme.spacing.unit * 1,
        backgroundColor: 'transparent'
    },

    //하얀 버튼 두개
    two_btn_wrap: {
        width: '140px',
        margin: '0 auto',
        backgroundColor: 'transparent',
        marginBottom: theme.spacing.unit * 10
    },
    right_btn: {
        marginLeft: 12,
        backgroundColor: 'white'
    },
    black_color_btn: {
        color: '#333',
        textDecoration: 'none'
    },

    //닉네임 수정란
    nick_paper_wrap: {
        maxWidth: 200,
        paddingTop: theme.spacing.unit * 13
    },
    nick_input: {
        padding: theme.spacing.unit * 1
    }
});


function profileChange(props) {
    const {classes, onFileOpen, onFileDelete, onChange, onSubmit, onCancel, me, file, profileImageURL} = props;

    return (
        <React.Fragment>
            <SimpleAppBar title="프로필 수정"></SimpleAppBar>

            <div className={classes.root}>
                <Paper elevation={0} className={classes.body_title}>
                    <Typography variant="h6" className={classes.paper_title}>프로필 수정 ></Typography>
                    <Typography variant="caption" className={classes.paper_title}>
                        내 프로필 사진과 닉네임을 수정할 수 있습니다.
                    </Typography>
                </Paper>

                <Grid container spacing={16}>
                    <Grid item xs={12} md={6}>
                        <div className={classes.paper_wrap}>
                            <Paper className={classNames(classes.paper, classes.firstline_paper_height)}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Paper elevation={0} className={classes.paper_inner_wrap}>
                                        {
                                            file && file.name ?
                                                <FilePreview file={file}>
                                                    {(preview) => <img src={preview} alt="변경 또는 삭제할 프로필 사진" className={classes.profile_img}/>}
                                                </FilePreview>
                                                :
                                                <img src={profileImageURL} alt="변경 또는 삭제할 프로필 사진"
                                                     className={classes.profile_img}/>
                                        }
                                        <Paper elevation={0} className={classes.two_btn_wrap}>
                                            <Button variant="outlined" size="small" onClick={onFileOpen}>변경</Button>
                                            <Button variant="outlined" size="small" className={classes.right_btn} onClick={onFileDelete}>삭제</Button>
                                        </Paper>
                                    </Paper>
                                </Grid>
                            </Paper>
                        </div>
                    </Grid>


                    <Grid item xs={12} md={6}>
                        <div className={classes.paper_wrap}>
                            <Paper className={classNames(classes.paper, classes.firstline_paper_height)}>
                                <Grid container justify="center" alignItems="center" direction="row">
                                    <Paper elevation={0} className={classes.nick_paper_wrap}>
                                        <Typography
                                            className={classes.paper_title}>닉네임</Typography>
                                        <TextField type="text" className={classes.nick_input} defaultValue={me.nickName} onChange={onChange}></TextField>
                                    </Paper>
                                </Grid>
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
            </div>


            <Paper elevation={0} className={classes.two_btn_wrap}>
                <Button variant="contained" color="primary" size="medium" className={classes.float_right} onClick={onSubmit}>
                    <a className={classes.btn_color}>적용</a>
                </Button>

                <Button variant="outlined" size="medium" className={classes.right_btn} onClick={onCancel}>
                    <a className={classes.black_color_btn}>취소</a>
                </Button>
            </Paper>
        </React.Fragment>
    );
}

profileChange.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(profileChange);

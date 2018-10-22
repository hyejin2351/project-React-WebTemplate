import React from 'react';
import PropTypes from 'prop-types';
import WithRoot from '../../lib/withRoot'
import {withStyles} from '@material-ui/core/styles';

//Core 컴포넌트
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//컴포넌트
import MngBar from '../../components/admin/mngAppBar';

//이미지
let imgUrl = '/static/images/line.png'

//스타일링
const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
        backgroundColor: '#f5f6f8',
        paddingBottom: theme.spacing.unit * 50
    },
    paper: {
        width: 350,
        paddingBottom: theme.spacing.unit * 5,
        margin: '0 auto',
        backgroundColor: '#f5f6f8',
        boxShadow: 'none',
        overflow: 'hidden'
    },
    input: {
        display: 'block',
        width: 350,
        height: 40,
        marginTop: theme.spacing.unit * 2
    },
    bold: {
        fontWeight: 'bold',
        marginBottom: theme.spacing.unit * 5
    },
    signUp: {
        color: '#3e9bff'
    },
    signUpBtn: {
        marginTop: theme.spacing.unit * 3,
        height: 40
    },
    notYet: {
        marginTop: theme.spacing.unit * 2
    },
    social: {
        width: '100%'
    },
    sns: {
        float: 'left',
        width: 96,
        padding: theme.spacing.unit * 3,
        margin: '0 auto',
        listStyleType: 'none'
    },
    or: {
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden'

    }
});


function signinPage(props) {
    const {classes, onSubmit, onChange} = props;

    return (
        <React.Fragment>
            <MngBar></MngBar>

            <div className={classes.root}>

                <Paper className={classes.paper}>
                    <div>
                        <Typography variant="h6" align="left" className={classes.bold}>관리자 로그인</Typography>
                    </div>


                    <div className={classes.container}>
                        <Input
                            placeholder="이메일"
                            className={classes.input}
                            name="email"
                            onChange={onChange}>
                        </Input>

                        <Input
                            placeholder="비밀번호 (6자리 이상)"
                            className={classes.input}
                            type="password"
                            name="password"
                            onChange={onChange}>
                        </Input>
                    </div>


                    <Button fullWidth={true} variant="contained" color="primary"
                            className={classes.signUpBtn} onClick={onSubmit}>로그인하기</Button>


                </Paper>
            </div>
        </React.Fragment>
    );
}

signinPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default WithRoot(withStyles(styles)(signinPage));

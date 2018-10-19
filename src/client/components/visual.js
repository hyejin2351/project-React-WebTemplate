import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

// Core 컴포넌트
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


//스타일링
const styles = theme => ({
    root: {
        backgroundColor: '#007bff',
    },
    typo: {
        color: '#ffffff',
        textAlign: 'center',
    },
    transBlack: {
        padding: theme.spacing.unit * 25,
        textAlign: 'center',
    },
    visual_btn: {
        '&': {
            color: 'black',
            backgroundColor: 'white',
            marginTop: theme.spacing.unit * 2,
        },
        '&:hover': {
            backgroundColor: 'white'
        },
    },
    visual_title: {
        fontSize: 28
    },
});


function PaperSheet(props) {
    const {classes} = props;


    return (
        <React.Fragment>
            <Paper square={true} className={classes.root}>
                <div className={classes.transBlack}>

                    <Typography
                        gutterBottom
                        className={classNames(classes.typo, classes.visual_title)}>
                        비주얼 영역 타이틀
                    </Typography>

                    <Typography
                        gutterBottom
                        className={classes.typo}>
                        비주얼 영역 텍스트
                    </Typography>

                    <Button className={classes.visual_btn}> 자세히 보기 </Button>

                </div>
            </Paper>
        </React.Fragment>
    )
        ;
}

PaperSheet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
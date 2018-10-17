import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Core 컴포넌트
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// Core 컴포넌트 (카드)
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

// 스타일링
const styles = theme => ({
    root: {
        flexGrow: 1
    },
    card: {
        maxWidth: 345,
        margin: '0 auto',
        marginBottom: theme.spacing.unit * 10
    },
    media: {
        width: 345,
        height: 140
    },
    typo: {
        textAlign: 'left'
    },
    padding: {
        paddingLeft: theme.spacing.unit * 8,
        paddingBottom: theme.spacing.unit * 2
    }
});

function MediaCard(props) {
    const {classes} = props;
    return (
        <div className={classes.root}>

            <Grid container spacing={24} className={classes.padding}>
                <Grid item xs={12}>
                    <Typography variant="headline" component="h3" className={classes.typo}>
                        타이틀2
                    </Typography>

                    <Typography component="p" className={classes.typo}>
                        텍스트2
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={24}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="/"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    카드1
                                </Typography>
                                <Typography component="p">
                                    텍스트1
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                공유하기
                            </Button>
                            <Button size="small" color="primary">
                                자세히보기
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="/"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    카드2
                                </Typography>
                                <Typography component="p">
                                    텍스트2
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                공유하기
                            </Button>
                            <Button size="small" color="primary">
                                자세히보기
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="/"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    카드3
                                </Typography>
                                <Typography component="p">
                                    텍스트3
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                공유하기
                            </Button>
                            <Button size="small" color="primary">
                                자세히보기
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="/"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    카드4
                                </Typography>
                                <Typography component="p">
                                    텍스트4
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                공유하기
                            </Button>
                            <Button size="small" color="primary">
                                자세히보기
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
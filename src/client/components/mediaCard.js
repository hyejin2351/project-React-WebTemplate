import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

//Core 컴포넌트
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

//스타일링
const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 5
    },
    media: {
        height: 140
    },
    margin_bottom: {
        marginBottom: theme.spacing.unit * 3
    },
});


function MediaCard(props) {
    const {classes} = props;
    return (
        <React.Fragment>
            <Grid className={classes.root}>

                <Typography variant="h6" className={classes.margin_bottom}>카테고리 영역1</Typography>

                <Grid
                    container
                    spacing={32}
                    direction="row"
                    justify="center"
                    alignItems="center">

                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    title="Contemplative Reptile"
                                    src="/"
                                    image="/"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        카드 타이틀
                                    </Typography>
                                    <Typography component="p">
                                        카드 내용 텍스트
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
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    title="Contemplative Reptile"
                                    src="/"
                                    image="/"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        카드 타이틀
                                    </Typography>
                                    <Typography component="p">
                                        카드 내용 텍스트
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
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    title="Contemplative Reptile"
                                    src="/"
                                    image="/"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        카드 타이틀
                                    </Typography>
                                    <Typography component="p">
                                        카드 내용 텍스트
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
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    title="Contemplative Reptile"
                                    src="/"
                                    image="/"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        카드 타이틀
                                    </Typography>
                                    <Typography component="p">
                                        카드 내용 텍스트
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

            </Grid>
        </React.Fragment>
    )
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Link from 'next/link';

import withRoot from '../lib/withRoot';

const d = require('debug')('app:index');

d.log = console.log.bind(console);

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleClick(event) {
    d('event: ', event.target.id);

    this.setState({
      open: true,
    });
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Dialog open={open} onClose={e => this.handleClose(e)}>
          <DialogTitle>My message: </DialogTitle>
          <DialogContent>
            <DialogContentText>HELLO WORLD~</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={e => this.handleClose(e)}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="display1" gutterBottom>
          Welcome~
        </Typography>
        <Typography variant="subheading" gutterBottom>
          You have 2 choices
        </Typography>
        <Button onClick={e => this.handleClick(e)} variant="raised" color="secondary" >
          Check out my message...
        </Button>
        <br />
        <br />
        <Button variant="raised" color="secondary">
          <Link href="./users/profile" prefetch>
            <a>Go to your profile page... (Need to login)</a>
          </Link>
          
        </Button>
        
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));

/* eslint-disable import/first */
/* eslint-disable no-empty */
/* eslint-disable react/sort-comp */
/* eslint-disable no-dupe-keys */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";
import debug from "debug";

//Core 컴포넌트
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

// 컴포넌트 (drawer)
import DrawerView from "./adminDrawer";
import redirect from "../lib/redirect";
import AuthService from "../lib/AuthService";
import checkLoggedIn from "../lib/checkLoggedIn";

//debug log
const log = debug("app:appBar");

//스타일링
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#333",
    position: "relative"
  },
  //menu
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  //logo
  grow: {
    flexGrow: 1,
    fontSize: 18,
    marginLeft: 20
  },
  logo_text: {
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  //필수 버튼
  button_text: {
    color: "white",
    textDecoration: "none"
  },
  //아바타
});

class MenuAppBar extends React.Component {
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      me: {}
    };

    this.signout = this.signout.bind(this);
    this.getLoggedIn = this.getLoggedIn.bind(this);
  }

  async getLoggedIn() {
    const me = await checkLoggedIn(this.props);
    this.setState({
      ...me
    });
  }

  componentDidMount() {
    this.getLoggedIn();
  }

  async signout() {
    const { apolloClient } = this.props;
    if (apolloClient) {
      try {
        await AuthService.logout({
          uri: "/api/auth/logout",
          apolloClient
        });
        this.getLoggedIn();
        // Redirect to a more useful page when signed out
        redirect(null, "/");
      } catch (err) {}
    }
  }

  render() {
    const { classes } = this.props;
    const { me } = this.state;

    return (
      <React.Fragment>
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <DrawerView />

            <Typography variant="h1" color="inherit" className={classes.grow}>
              <Link href="/">
                <a className={classes.logo_text}>React Web Template</a>
              </Link>
            </Typography>
            {!me || !me.id ? (
              <Grid>
                <Button color="inherit">
                  <Link href="/users/signin">
                    <a className={classes.button_text}>Login</a>
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link href="/users/signup">
                    <a className={classes.button_text}>Join</a>
                  </Link>
                </Button>
              </Grid>
            ) : (
              <Grid>
                <IconButton color="inherit">
                  <Link href="/users/myPage">
                    <Avatar
                      src={me ? me.profileImageURL || "" : ""}
                      className={classes.profile_img}
                    />
                  </Link>
                </IconButton>

                <Button color="inherit" onClick={this.signout}>
                  <a className={classes.button_text}>Logout</a>
                </Button>
              </Grid>
            )}
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuAppBar);

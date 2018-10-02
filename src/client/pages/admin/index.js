import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import withAdmin from '../../lib/withAdmin';
import AuthService from '../../lib/AuthService';
import redirect from '../../lib/redirect';

import { ApolloConsumer } from 'react-apollo';

const log = require('debug')('app:index');

log.log = console.log.bind(console);

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
});

class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    signout(apolloClient) {
        return async () => {
            await AuthService.logout({
                uri: '/api/auth/logout',
                apolloClient
            });

            /*document.cookie = cookie.serialize('token', '', {
             maxAge: -1 // Expire the cookie immediately
             });*/

            // Redirect to a more useful page when signed out
            redirect(null, '/admin/signin');
        };
    }

    render() {
        const {classes} = this.props;

        return (
            <ApolloConsumer>
                {client => (
                    <div className={classes.root}>
                        <Typography variant="display1" gutterBottom>
                            HELLO ADMIN
                        </Typography>
                        <Typography variant="subheading" gutterBottom>
                            You have 2 choices
                        </Typography>
                        <button onClick={this.signout(client)}>Log out</button>
                    </div>
                )}
            </ApolloConsumer>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withAdmin(withStyles(styles)(Index));

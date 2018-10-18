import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';

import redirect from '../../lib/redirect';
import AuthService from '../../lib/AuthService';

import withAuth from '../../lib/withAuth';

import MyPageView from './myPage_.jsx';
const log = debug('app:myPage');

class MyPagePage extends React.Component {
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
            redirect(null, '/');
        };
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <MyPageView
                        onSignout={this.signout(client)}
                    />
                )}
            </ApolloConsumer>
        );
    }
}

export default withAuth(MyPagePage);

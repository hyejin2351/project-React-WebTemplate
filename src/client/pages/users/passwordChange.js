import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';
import withAuth from '../../lib/withAuth';

import PasswordChangeView from './passwordChange_.jsx';
import WithAuth from '../../lib/withAuth';
const log = debug('app:passwordChange');

class PasswordChangePage extends React.Component {
    handleClick(event, client) {
        log('event: ', event.target.id);
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <PasswordChangeView
                        onHandleClick={e=> this.handleClick(e, client)}
                    />
                )}
            </ApolloConsumer>
        );
    }
}

export default withAuth(PasswordChangePage);

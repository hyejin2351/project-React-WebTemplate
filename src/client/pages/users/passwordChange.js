import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';

import MainLayout from '../../layouts/MainLayout';
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
                    <MainLayout apolloClient={client}>
                        <PasswordChangeView
                            onHandleClick={e=> this.handleClick(e, client)}
                        />
                    </MainLayout>
                )}
            </ApolloConsumer>
        );
    }
}

export default WithAuth(PasswordChangePage);

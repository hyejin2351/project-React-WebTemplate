import React from 'react';
import debug from 'debug';
import {ApolloConsumer} from 'react-apollo';

import WithAdmin from '../../lib/withAdmin';
import AdminLayout from '../../layouts/AdminLayout'

import ProfileView from './profileChange_.jsx';
const log = debug('app:profileChange');

class ProfilePage extends React.Component {
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
                    <AdminLayout apolloClient={client}>
                        <ProfileView
                            onHandleClick={e=> this.handleClick(e, client)}
                        />
                    </AdminLayout>
                )}
            </ApolloConsumer>
        );
    }
}

export default WithAdmin(ProfilePage);

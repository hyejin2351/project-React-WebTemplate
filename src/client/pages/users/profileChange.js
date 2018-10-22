import React from 'react';
import debug from 'debug';
import {ApolloConsumer} from 'react-apollo';
import withAuth from '../../lib/withAuth';

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
                    <ProfileView
                        onHandleClick={e=> this.handleClick(e, client)}
                    />
                )}
            </ApolloConsumer>
        );
    }
}

export default withAuth(ProfilePage);

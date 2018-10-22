import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';
import withAuth from '../../lib/withAuth';

import DeleteAccountView from './deleteAccount_.jsx';
const log = debug('app:deleteAccount');

class DeleteAccountPage extends React.Component {
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
                    <DeleteAccountView
                        onHandleClick={e=> this.handleClick(e, client)}
                        me = {this.props.me}
                    />
                )}
            </ApolloConsumer>
        );
    }
}

export default withAuth(DeleteAccountPage);

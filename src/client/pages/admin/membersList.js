import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';

import MembersListView from './membersList_.jsx';
const log = debug('app:membersList');

class MembersListPage extends React.Component {
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
                    <MembersListView
                        onHandleClick={e=> this.handleClick(e, client)}
                    />
                )}
            </ApolloConsumer>
        );
    }
}

export default MembersListPage;

import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';

import MemberDetailView from './memberDetail_.jsx';
const log = debug('app:memberDetail');

class MemberDetailPage extends React.Component {
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
                    <MemberDetailView
                        onHandleClick={e=> this.handleClick(e, client)}
                    />
                )}
            </ApolloConsumer>
        );
    }
}

export default MemberDetailPage;

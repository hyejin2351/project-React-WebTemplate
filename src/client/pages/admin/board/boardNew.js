import React from 'react';
import debug from 'debug';
import {ApolloConsumer} from 'react-apollo';

import WithAdmin from '../../../lib/withAdmin';
import AdminLayout from '../../../layouts/AdminLayout';

import BoardNewView from './boardNew_.jsx';
const log = debug('app:boardNew');

class BoardNewPage extends React.Component {
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
                        <BoardNewView
                            onHandleClick={e=> this.handleClick(e, client)}
                        />
                    </AdminLayout>
                )}
            </ApolloConsumer>
        );
    }
}

export default WithAdmin(BoardNewPage);

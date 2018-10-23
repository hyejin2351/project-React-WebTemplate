import React from 'react';
import debug from 'debug';
import {ApolloConsumer} from 'react-apollo';

import WithAdmin from '../../../lib/withAdmin';
import AdminLayout from '../../../layouts/AdminLayout';

import BoardDetailView from './boardDetail_.jsx';
const log = debug('app:boardDetail');

class BoardDetailPage extends React.Component {
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
                        <BoardDetailView
                            onHandleClick={e=> this.handleClick(e, client)}
                        />
                    </AdminLayout>
                )}
            </ApolloConsumer>
        );
    }
}

export default WithAdmin(BoardDetailPage);

import React from 'react';
import debug from 'debug';
import {ApolloConsumer} from 'react-apollo';

import WithAdmin from '../../../lib/withAdmin';
import AdminLayout from '../../../layouts/AdminLayout';

import BoardView from './boardList_.jsx';
const log = debug('app:boardList');

class BoardPage extends React.Component {
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
                        <BoardView
                            onHandleClick={e=> this.handleClick(e, client)}
                        />
                    </AdminLayout>
                )}
            </ApolloConsumer>
        );
    }
}

export default WithAdmin(BoardPage);

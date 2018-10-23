import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';

import WidtAuth from '../../../lib/withAuth';

import MainLayout from '../../../layouts/MainLayout';
import BoardEditView from './boardEdit_.jsx';
const log = debug('app:boardEdit');

class BoardEditPage extends React.Component {
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
                        <BoardEditView
                            onHandleClick={e=> this.handleClick(e, client)}
                        />
                    </MainLayout>
                )}
            </ApolloConsumer>
        );
    }
}

export default WidtAuth(BoardEditPage);

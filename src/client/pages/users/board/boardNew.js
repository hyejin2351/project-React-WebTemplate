import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';

import WidtAuth from '../../../lib/withAuth';

import MainLayout from '../../../layouts/MainLayout';
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
                    <MainLayout apolloClient={client}>
                        <BoardNewView
                            onHandleClick={e=> this.handleClick(e, client)}
                        />
                    </MainLayout>
                )}
            </ApolloConsumer>
        );
    }
}

export default WidtAuth(BoardNewPage);

import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';

import WidtAuth from '../../../lib/withAuth';
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
                    <BoardNewView
                        onHandleClick={e=> this.handleClick(e, client)}
                    />
                )}
            </ApolloConsumer>
        );
    }
}

export default WidtAuth(BoardNewPage);

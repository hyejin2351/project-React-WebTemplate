import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';

import BoardView from './board_.jsx';
const log = debug('app:board');

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
                    <BoardView
                        onHandleClick={e=> this.handleClick(e, client)}
                    />
                )}
            </ApolloConsumer>
        );
    }
}

export default BoardPage;

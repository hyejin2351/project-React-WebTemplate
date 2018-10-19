import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';

import BoardDeatilView from './boardDetail_.jsx';
const log = debug('app:boardDetail');

class BoardDeatilPage extends React.Component {
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
                    <BoardDeatilView
                        onHandleClick={e=> this.handleClick(e, client)}
                    />
                )}
            </ApolloConsumer>
        );
    }
}

export default BoardDeatilPage;

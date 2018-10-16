import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';

import SampleView from './sample_.jsx';
const log = debug('app:sample');

class SamplePage extends React.Component {
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
                    <SampleView
                        onHandleClick={e=> this.handleClick(e, client)}
                    />
                )}
            </ApolloConsumer>
        );
    }
}

export default SamplePage;

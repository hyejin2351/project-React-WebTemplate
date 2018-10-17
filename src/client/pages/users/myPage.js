import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';

import MyPageView from './myPage_.jsx';
const log = debug('app:myPage');

class MyPagePage extends React.Component {
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
                    <MyPageView
                        onHandleClick={e=> this.handleClick(e, client)}
                    />
                )}
            </ApolloConsumer>
        );
    }
}

export default MyPagePage;

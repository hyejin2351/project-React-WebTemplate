import React from 'react';
import debug from 'debug';
import {ApolloConsumer} from 'react-apollo';

import SigninView from './signin_.jsx';
const log = debug('app:signin');

class SigninPage extends React.Component {
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
                    <SigninView
                        onHandleClick={e=> this.handleClick(e, client)}
                    />
                )}
            </ApolloConsumer>
        );
    }
}

export default SigninPage;

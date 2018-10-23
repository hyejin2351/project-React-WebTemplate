import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';
import withAuth from '../../lib/withAuth';

import MainLayout from '../../layouts/MainLayout';
import MyPageView from './myPage_.jsx';
const log = debug('app:myPage');

class MyPagePage extends React.Component {
    /**
     * Render the component.
     */
    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <MainLayout apolloClient={client}>
                        <MyPageView
                            me={this.props.me}
                        />
                    </MainLayout>
                )}
            </ApolloConsumer>
        );
    }
}

export default withAuth(MyPagePage);

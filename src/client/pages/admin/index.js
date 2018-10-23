import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';

import WithAdmin from '../../lib/withAdmin';
import AdminLayout from '../../layouts/AdminLayout'

import IndexView from './index_.jsx';
const log = debug('app:index');

class IndexPage extends React.Component {
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
                        <IndexView
                            onHandleClick={e=> this.handleClick(e, client)}
                            me = {this.props.me}
                        />      
                    </AdminLayout>
                )}
            </ApolloConsumer>
        );
    }
}

export default WithAdmin(IndexPage);

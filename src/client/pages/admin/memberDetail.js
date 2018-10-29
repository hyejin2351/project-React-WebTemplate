import React from 'react';
import debug from 'debug';
import {ApolloConsumer, Query, Mutation} from 'react-apollo';

import WithAdmin from '../../lib/withAdmin';
import AdminLayout from '../../layouts/AdminLayout'

import MemberDetailView from './memberDetail_.jsx';
import ErrorMessage from '../../components/ErrorMessage';
import { AllUsersQuery, GetUserQuery, UserDelete } from '../../lib/gqlApi/usersApi';
import { historyBack } from '../../lib/redirect';

const log = debug('app:memberDetail');

class MemberDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(event, deleteUser) {
        event.preventDefault();

        const { query: { id} } = this.props;

        deleteUser({ variables: { id } }).then(res => {
            historyBack();
        }).catch(err => {
            log(err)
        });
    }

    /**
     * Render the component.
     */
    render() {
        const { query: { id} } = this.props;

        if(!id)
            return <ErrorMessage message='잘못된 요청입니다.' />

        return (
            <Query query={GetUserQuery} variables={ {id: id} }>
                {({ loading, error, data: { getUser } }) => {
                    if (error) return <ErrorMessage message='Error loading Users.' />
                    return (
                        <Mutation mutation={UserDelete} key={id} refetchQueries={[{ query: AllUsersQuery , variables: { limit: 10, skip: 0, search: '' }}]} >
                            {deleteUser => {
                                return (
                                    <ApolloConsumer>
                                        {client => (
                                            <AdminLayout apolloClient={client}>
                                                <MemberDetailView
                                                    userInfo={getUser}
                                                    onDelete={e => this.onDelete(e, deleteUser)}
                                                />
                                            </AdminLayout>
                                        )}
                                    </ApolloConsumer>
                                )
                            }}
                        </Mutation>
                    )
                }}
            </Query>
        );
    }
}

export default WithAdmin(MemberDetailPage);

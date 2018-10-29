import React from 'react';
import debug from 'debug';
import { ApolloConsumer, Query} from 'react-apollo';

import WithAdmin from '../../lib/withAdmin';
import AdminLayout from '../../layouts/AdminLayout'

import MembersListView from './membersList_.jsx';
import ErrorMessage from '../../components/ErrorMessage'
import { AllUsersQuery } from '../../lib/gqlApi/usersApi';

const log = debug('app:membersList');

class MembersListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 0,
            rowsPerPage: 10,
            search: ''
        };

        this.changePage = this.changePage.bind(this);
        this.changeRowsPerPage = this.changeRowsPerPage.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
    }

    changePage(event, page) {
        this.setState({
            pageNo: page
        });
    }

    changeRowsPerPage(event) {
        const rowsPerPage = event.target.value;
        if(rowsPerPage && rowsPerPage > 4) {
            this.setState({
                rowsPerPage: rowsPerPage
            });
        }
    }

    /**
     * Change the user object.
     *
     * @param {object} event - the JavaScript event object
     */
    changeSearch(event) {
        const search = event.target.value;
        log('search = ' + search);
        this.setState({
            search: search
        });
    }

    /**
     * Render the component.
     */
    render() {
        const { pageNo, rowsPerPage, search } = this.state;

        return (
            <Query query={AllUsersQuery} variables={ { limit: rowsPerPage, skip: pageNo * rowsPerPage, search: search } }>
                {({ loading, error, data: { getUsers, getUsersCount } }) => {
                    if (error) return <ErrorMessage message='Error loading Articles.' />

                    log(getUsers);
                    log(getUsersCount);

                    return (
                        <ApolloConsumer>
                            {client => (
                                <AdminLayout apolloClient={client}>
                                    <MembersListView
                                        totalCount={getUsersCount}
                                        usersList={getUsers}
                                        changePage={this.changePage}
                                        changeRowsPerPage={this.changeRowsPerPage}
                                        changeSearch={this.changeSearch}
                                        rowsPerPage={rowsPerPage}
                                        pageNo={pageNo}
                                    />
                                </AdminLayout>
                            )}
                        </ApolloConsumer>
                    )
                }}
            </Query>
        )
    }
}

export default WithAdmin(MembersListPage);

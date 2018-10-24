import React from 'react';
import debug from 'debug';
import { Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

import MainLayout from '../../../layouts/MainLayout';
import BoardListView from './boardList_.jsx';
const log = debug('app:boardList');

export const getArticlesCountQuery = gql`
  query {
    getArticlesCount
  }
`

const getArticlesQuery = gql`
  query getArticles($limit: Int!, $skip: Int!) {
    getArticles(limit: $limit, skip: $skip) {
        id
        title
        content
        views
        created
        author {
            id
            name
        }
    }
  }
`

class BoardListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 0,
            rowsPerPage: 10
        };

        this.changePage = this.changePage.bind(this);
        this.changeRowsPerPage = this.changeRowsPerPage.bind(this);
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
     * Render the component.
     */
    render() {
        log('render');
        const { pageNo, rowsPerPage } = this.state;

        return (
            <Query query={getArticlesCountQuery}>
                {({ loading, error, data: { getArticlesCount } }) => {
                    if (error) return <ErrorMessage message='Error loading Articles count.' />

                    return (
                        <Query query={getArticlesQuery} variables={ {limit: rowsPerPage, skip: pageNo * rowsPerPage} }>
                            {({ loading, error, data: { getArticles } }) => {
                                if (error) return <ErrorMessage message='Error loading Articles.' />

                                return (
                                    <ApolloConsumer>
                                        {client => (
                                            <MainLayout apolloClient={client}>
                                                <BoardListView
                                                    totalCount={getArticlesCount}
                                                    articlesList={getArticles}
                                                    changePage={this.changePage}
                                                    changeRowsPerPage={this.changeRowsPerPage}
                                                    rowsPerPage={rowsPerPage}
                                                    pageNo={pageNo}
                                                />
                                            </MainLayout>
                                        )}
                                    </ApolloConsumer>
                                )
                            }}
                        </Query>
                    )
                }}
            </Query>
        )
    }
}

export default BoardListPage;

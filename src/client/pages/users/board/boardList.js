import React from 'react';
import debug from 'debug';
import { Query, ApolloConsumer } from 'react-apollo';

import { AllArticlesQuery } from '../../../lib/gqlApi/articlesApi';
import MainLayout from '../../../layouts/MainLayout';
import BoardListView from './boardList_.jsx';
const log = debug('app:boardList');

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
        const { pageNo, rowsPerPage } = this.state;

        return (
            <Query query={AllArticlesQuery} variables={ { limit: rowsPerPage, skip: pageNo * rowsPerPage } }>
                {({ loading, error, data: { getArticles, getArticlesCount } }) => {
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
    }
}

export default BoardListPage;

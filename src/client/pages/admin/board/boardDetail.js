import React from 'react';
import debug from 'debug';
import { ApolloConsumer, Query } from 'react-apollo';

import { ArticleQuery } from '../../../lib/gqlApi/articlesApi';
import redirect from '../../../lib/redirect';
import WithAdmin from '../../../lib/withAdmin';

import AdminLayout from '../../../layouts/AdminLayout';
import BoardDetailView from './boardDetail_.jsx';
import ErrorMessage from '../../../components/ErrorMessage';

const log = debug('app:boardDetail');

let article = null;

class BoardDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.goChangePage = this.goChangePage.bind(this);
    }

    goChangePage(event) {
        event.preventDefault();
        const { query: { id } } = this.props;

        redirect(null, { pathname: '/users/board/boardEdit',  query: { id: id }}, false );
    }

    /**
     * Render the component.
     */
    render() {
        const { query: { id} } = this.props;

        if(!id)
            return <ErrorMessage message='잘못된 요청입니다.' />

        return (
            <Query query={ArticleQuery} variables={ {id: id} }>
                {({ loading, error, data: { getArticle } }) => {
                    if (error) return <ErrorMessage message='Error loading Article.' />

                    article = getArticle;

                    return (
                        <ApolloConsumer>
                            {client => (
                                <AdminLayout apolloClient={client}>
                                    <BoardDetailView
                                        article={getArticle}
                                        goChangePage={this.goChangePage}
                                    />
                                </AdminLayout>
                            )}
                        </ApolloConsumer>
                    )
                }}
            </Query>
        );
    }

}

export default WithAdmin(BoardDetailPage);

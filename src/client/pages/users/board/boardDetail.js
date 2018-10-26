import React from 'react';
import debug from 'debug';
import { ApolloConsumer, Query } from 'react-apollo';

import { ArticleQuery } from '../../../lib/gqlApi/articlesApi';
import redirect from '../../../lib/redirect';
import withAuthInfo from '../../../lib/withAuthInfo';

import MainLayout from '../../../layouts/MainLayout';
import BoardDetailView from './boardDetail_.jsx';
import ErrorMessage from '../../../components/ErrorMessage';
const log = debug('app:boardDetail');

class BoardDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.goChangePage = this.goChangePage.bind(this);
    }

    goChangePage(event, getArticle) {
        event.preventDefault();
        const { query: { id }, me } = this.props;

        if(!me || !me.id) {
            log('로그인 사용자만 접근이 가능합니다.');
            redirect(null, '/users/signin');
        } else {
            if(me.id !== getArticle.author.id)
                log('작성자만 수정이 가능합니다.');
            else
                redirect(null, { pathname: '/users/board/boardEdit',  query: { id: id }}, false )
        }
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

                    return (
                        <ApolloConsumer>
                            {client => (
                                <MainLayout apolloClient={client}>
                                    <BoardDetailView
                                        article={getArticle}
                                        goChangePage={e => this.goChangePage(e, getArticle)}
                                    />
                                </MainLayout>
                            )}
                        </ApolloConsumer>
                    )
                }}
            </Query>
        );
    }
}

export default withAuthInfo(BoardDetailPage);
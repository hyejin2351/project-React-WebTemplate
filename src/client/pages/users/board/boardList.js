import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';

import articlesApi from '../../../lib/gqlApi/articlesApi';

import BoardListView from './boardList_.jsx';
const log = debug('app:boardList');

class BoardListPage extends React.Component {
    static async getInitialProps( context ) {
        const { getArticles } = await articlesApi.getArticles(context);
        const { getArticlesCount } = await articlesApi.getArticlesCount(context);

        log('getInitialProps');
        return { getArticles, getArticlesCount };
    }

    constructor(props) {
        super(props);
        log('constructor');
    }

    handleClick(event, client) {
        log('event: ', event.target.id);
    }

    /**
     * Render the component.
     */
    render() {
        const { getArticles, getArticlesCount } = this.props;

        return (
            <ApolloConsumer>
                {client => (
                    <BoardListView
                        onHandleClick={e=> this.handleClick(e, client)}
                        getArticles={getArticles}
                        getArticlesCount={getArticlesCount}
                    />
                )}
            </ApolloConsumer>
        );
    }
}

export default BoardListPage;

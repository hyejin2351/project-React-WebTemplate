import React from 'react';
import debug from 'debug';
import { ApolloConsumer, Mutation } from 'react-apollo';

import { ArticlesQuery, ArticleCreate } from '../../../lib/gqlApi/articlesApi';
import { historyBack } from '../../../lib/redirect';

import WidtAuth from '../../../lib/withAuth';

import MainLayout from '../../../layouts/MainLayout';
import BoardNewView from './boardNew_.jsx';
const log = debug('app:boardNew');

class BoardNewPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            articleData: {
                title: '',
                content: ''
            }
        };

        this.onCreate = this.onCreate.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.changeData = this.changeData.bind(this);
    }

    onCancel(event) {
        event.preventDefault();

        historyBack();
    }

    onCreate(event, createArticle) {
        event.preventDefault();

        const { articleData } = this.state;

        createArticle({ variables: { articleData } }).then(res => {
            historyBack();
        }).catch(err => {
            log(err)
        });
    }

    changeData(event) {
        const field = event.target.name;
        const articleData = this.state.articleData;
        articleData[field] = event.target.value;

        log('field = ' + field);
        log('event.target.value = ' + event.target.value);

        this.setState({
            articleData
        });
    }

    /**
     * Render the component.
     */

    render() {
        return (
                <Mutation mutation={ArticleCreate}
                    update={(cache, { data: { createArticle } }) => {
                        const { getArticles } = cache.readQuery({ query: ArticlesQuery, variables: { limit: 10, skip: 0 } });
                        cache.writeQuery({
                            query: ArticlesQuery,
                            data: { getArticles: getArticles.concat([createArticle]) }
                        });
                    }}
                >
                {createArticle => {
                    return (
                        <ApolloConsumer>
                            {client => (
                                <MainLayout apolloClient={client}>
                                    <BoardNewView
                                        onCreate={e => this.onCreate(e, createArticle)}
                                        onCancel={this.onCancel}
                                        changeData={this.changeData}
                                    />
                                </MainLayout>
                            )}
                        </ApolloConsumer>
                    );
                }}
            </Mutation>
        )
    }
}

export default WidtAuth(BoardNewPage);

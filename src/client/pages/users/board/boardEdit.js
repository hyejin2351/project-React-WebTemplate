import React from 'react';
import debug from 'debug';
import { ApolloConsumer, Query, Mutation } from 'react-apollo';

import { AllArticlesQuery, ArticleQuery, ArticleUpdate, ArticleDelete } from '../../../lib/gqlApi/articlesApi';
import { historyBack } from '../../../lib/redirect';

import WidtAuth from '../../../lib/withAuth';

import MainLayout from '../../../layouts/MainLayout';
import BoardEditView from './boardEdit_.jsx';
const log = debug('app:boardEdit');

class BoardEditPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            articleData: {
                title: '',
                content: ''
            }
        };

        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onCancel(event) {
        event.preventDefault();

        historyBack();
    }

    onUpdate(event, updateArticle, getArticle) {
        event.preventDefault();

        const { query: { id} } = this.props;
        let { articleData } = this.state;

        if(!articleData.title && !articleData.content) {
            log('변경사항이 없습니다. 제목 또는 내용을 수정 해주세요.');
        } else {
            articleData.title = articleData.title ? articleData.title : getArticle.title;
            articleData.content = articleData.content ? articleData.content : getArticle.content;

            updateArticle({ variables: { id, articleData } }).then(res => {
                historyBack();
            }).catch(err => {
                log(err)
            });
        }
    }

    onDelete(event, deleteArticle) {
        event.preventDefault();

        const { query: { id} } = this.props;

        deleteArticle({ variables: { id } }).then(res => {
            historyBack();
            historyBack();
        }).catch(err => {
            log(err)
        });
    }

    onChange(event) {
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
        const { query: { id }, me } = this.props;

        return (
            <Query query={ArticleQuery} variables={ {id: id} }>
                {({ loading, error, data: { getArticle } }) => {
                    if (error) return <ErrorMessage message='Error loading Article.' />

                    return (
                        <Mutation mutation={ArticleDelete} key={id} refetchQueries={[{ query: AllArticlesQuery , variables: { limit: 10, skip: 0 }}]} >
                            {deleteArticle => {
                                return (
                                    <Mutation mutation={ArticleUpdate} key={id}>
                                        {updateArticle => {
                                            return (
                                                <ApolloConsumer>
                                                    {client => (
                                                        <MainLayout apolloClient={client}>
                                                            <BoardEditView
                                                                article={getArticle}
                                                                onUpdate={e => this.onUpdate(e, updateArticle, getArticle)}
                                                                onDelete={e => this.onDelete(e, deleteArticle)}
                                                                onCancel={this.onCancel}
                                                                onChange={this.onChange}
                                                            />
                                                        </MainLayout>
                                                    )}
                                                </ApolloConsumer>
                                            )
                                        }}
                                    </Mutation>
                                )
                            }}
                        </Mutation>
                    )
                }}
            </Query>
        );
    }
}

export default WidtAuth(BoardEditPage);

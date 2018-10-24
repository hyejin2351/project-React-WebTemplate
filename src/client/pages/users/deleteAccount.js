import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import debug from 'debug';

import withAuth from '../../lib/withAuth';
import MainLayout from '../../layouts/MainLayout';
import redirect from '../../lib/redirect';
import AuthService from '../../lib/AuthService';

import ProfileView from './deleteAccount_.jsx';
const log = debug('app:deleteAccount');
class DeleteAccountView extends React.Component {
    constructor(props) {
        super(props);

        //Checkbox 초기화
        
        this.unregister = this.unregister.bind(this);
        //unregister 함수와 DeleteAccountView 컴포넌트를 bind 함
    }
    
    //Checkbox 호출 함수 -- DeleteAccountView 컴포넌트가 필요한 정보를 구함
    
    // 회원 탈퇴 요청 함수
    async unregister(event, apolloClient) {
        await AuthService.unregister({
            uri: '/api/auth/unregister',
            apolloClient
        });
        // Redirect
        redirect(null, '/');
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <MainLayout apolloClient={client}>
                        <ProfileView
                            me={this.props.me}
                            unregister={e => this.unregister(e, client)}
                        />
                    </MainLayout>
                )}
            </ApolloConsumer>
        );
    }
}

export default withAuth(DeleteAccountView);

import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';

import MainLayout from '../../layouts/MainLayout';
import PasswordChangeView from './passwordChange_.jsx';
import WithAuth from '../../lib/withAuth';
import { historyBack } from '../../lib/redirect';

import { changePassword } from '../../lib/gqlApi/usersApi';

const log = debug('app:passwordChange');

class PasswordChangePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            inputData: {
                curPassword: '',
                newPassword: '',
                newConfirmPassword: '',
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onCancel(event) {
        event.preventDefault();

        historyBack();
    }

    async onSubmit(event, apolloClient) {
        event.preventDefault();

        const { curPassword, newPassword, newConfirmPassword } = this.state.inputData;

        if(curPassword === newPassword)
            log('현재 비밀번호 새 비밀번호가 동일합니다.')
        else if (newPassword !== newConfirmPassword)
            log('새 비밀번호와 새 비밀번호 재확인 비밀번호가 다릅니다.');
        else {
            try{
                const res = await changePassword( { apolloClient, curPassword, newPassword} );

                historyBack();
            } catch (err){
                log(err);
            }       
        }
    }

    onChange(event) {
        const field = event.target.name;
        const inputData = this.state.inputData;
        inputData[field] = event.target.value;

        this.setState({
            inputData
        });
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <MainLayout apolloClient={client}>
                        <PasswordChangeView
                            onChange={this.onChange}
                            onCancel={this.onCancel}
                            onSubmit={e => this.onSubmit(e, client)}
                        />
                    </MainLayout>
                )}
            </ApolloConsumer>
        );
    }
}

export default WithAuth(PasswordChangePage);

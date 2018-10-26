import React from 'react';
import debug from 'debug';
import {ApolloConsumer} from 'react-apollo';

import AdminLayout from '../../layouts/AdminLayout'

import PasswordChangeView from './passwordChange_.jsx';
import WithAdmin from '../../lib/withAdmin';
import redirect, { historyBack } from '../../lib/redirect';
import usersApi from '../../lib/gqlApi/usersApi';

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

        this.changeData = this.changeData.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    onCancel(event) {
        event.preventDefault();

        historyBack();
    }

    async changePassword(event, apolloClient) {
        const { curPassword, newPassword, newConfirmPassword } = this.state.inputData;

        if(curPassword === newPassword)
            log('현재 비밀번호 새 비밀번호가 동일합니다.')
        else if (newPassword !== newConfirmPassword)
            log('새 비밀번호와 새 비밀번호 재확인 비밀번호가 다릅니다.');
        else {
            try{
                const res = await usersApi.changePassword( { apolloClient, curPassword, newPassword} );

                redirect(null, '/admin');
            } catch (err){
                log(err);
            }
        }
    }

    changeData(event) {
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
                    <AdminLayout apolloClient={client}>
                        <PasswordChangeView
                            onChange={this.changeData}
                            onCancel={this.onCancel}
                            onSubmit={e => this.changePassword(e, client)}
                        />
                    </AdminLayout>
                )}
            </ApolloConsumer>
        );
    }
}

export default WithAdmin(PasswordChangePage);

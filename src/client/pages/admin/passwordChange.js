import React from 'react';
import debug from 'debug';
import {ApolloConsumer} from 'react-apollo';

import WithAdmin from '../../lib/withAdmin';
import AdminLayout from '../../layouts/AdminLayout'

import PasswordChangeView from './passwordChange_.jsx';

import redirect from '../../lib/redirect';
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
        this.changePassword = this.changePassword.bind(this);
    }

    async changePassword(event, apolloClient) {
        const { curPassword, newPassword, newConfirmPassword } = this.state.inputData;

        try{
            const res = await usersApi.changePassword( { apolloClient, curPassword, newPassword} );

            redirect(null, '/admin');
        } catch (err){
            log(err);
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
                            onSubmit={e => this.changePassword(e, client)}
                        />
                    </AdminLayout>
                )}
            </ApolloConsumer>
        );
    }
}

export default WithAdmin(PasswordChangePage);

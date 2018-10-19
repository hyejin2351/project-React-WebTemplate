import React from 'react';
import debug from 'debug';
import { ApolloConsumer } from 'react-apollo';

//lib
import redirect from '../../lib/redirect';
import AuthService from '../../lib/AuthService';

//jsx view
import SignUpForm from './signup_.jsx';

//debug log
const log = debug('app:signup');

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        // set the initial component state
        this.state = {
            errors: {},
            user: {
                name: '',
                nickName: '',
                email: '',
                password: '',
                confirmPassword: '',
                serviceCheck: false
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.changeCheck = this.changeCheck.bind(this);
    }

    /**
     * Process the form.
     *
     * @param {object} event - the JavaScript event object
     */
    async processForm(event, apolloClient) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        const { name, nickName, email, password, confirmPassword, serviceCheck } = this.state.user;
        log('processForm: ', email);

        try {
            const res = await AuthService.register({
                uri: '/api/auth/register',
                apolloClient,
            }, { name: name, nickName: nickName, email: email, password: password,
                confirmPassword: confirmPassword, serviceCheck: serviceCheck});
            // success
            // change the component-container state
            this.setState({
                errors: {}
            });
            redirect(null, '/users/signin');
        } catch (err) {
            // failure
            // change the component state
            this.setState({
                errors: err
            });
        }
    }

    /**
     * Change the user object.
     *
     * @param {object} event - the JavaScript event object
     */
    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    /**
     * Change the user object.
     *
     * @param {object} event - the JavaScript event object
     */
    changeCheck(event, checked) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = checked;

        this.setState({
            user
        });
    }

    async processFacebook(apolloClient) {
        redirect(null, '/api/auth/facebook');
    }

    async processGoogle(apolloClient) {
        redirect(null, '/api/auth/google');
    }

    async processKakao(apolloClient) {
        redirect(null, '/api/auth/kakao');
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <SignUpForm
                        onSubmit={e => this.processForm(e, client)}
                        onChange={this.changeUser}
                        onChangeCheck={this.changeCheck}
                        onFacebook={e => this.processFacebook(client)}
                        onGoogle={e => this.processGoogle(client)}
                        onKakao={e => this.processKakao(client)}
                        errors={this.state.errors}
                    />
                )}
            </ApolloConsumer>
        );
    }
}

export default SignUpPage;

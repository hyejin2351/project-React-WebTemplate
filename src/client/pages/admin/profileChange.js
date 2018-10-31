import React from 'react';
import debug from 'debug';
import { ApolloConsumer, Mutation } from 'react-apollo';
import fileDialog from 'file-dialog';

import WithAdmin from '../../lib/withAdmin';
import { historyBack } from '../../lib/redirect';
import { ChangeProfile } from '../../lib/gqlApi/usersApi';

import AdminLayout from '../../layouts/AdminLayout'

import ProfileView from './profileChange_.jsx';
const log = debug('app:profileChange');

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            file: null,
            nickName: props && props.me && props.me.nickName,
            profileImageURL: props && props.me && props.me.profileImageURL,
            isDelete: false
        };

        this.onFileOpen = this.onFileOpen.bind(this);
        this.onFileDelete = this.onFileDelete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onFileOpen(event) {
        event.preventDefault();
        fileDialog({ accept: 'image/*' })
            .then(files => {
                // files contains an array of FileList
                this.setState( { file: files[0], profileImageURL: files[0].name, isDelete: false });
            })
    }

    onFileDelete(event) {
        event.preventDefault();

        const { profileImageURL } = this.state;

        log('profileImageURL = ' + profileImageURL);
        if('/static/images/defaultProfile.png' !== profileImageURL)
            this.setState( { file: null, profileImageURL: '/static/images/defaultProfile.png', isDelete: true });
    }

    onChange(event) {
        const nickName = event.target.value;

        this.setState({
            nickName: nickName
        });
    }

    onSubmit(event, changeProfile) {
        event.preventDefault();
        const { me } = this.props;
        const { file, nickName, profileImageURL, isDelete } = this.state;

        if( me.profileImageURL === profileImageURL && me.nickName === nickName) {
            log('변경된사항이 없습니다. 확인 해주세요.')
        } else {
            changeProfile({ variables: { file, isDelete, nickName } }).then(res => {
                historyBack();
            }).catch(err => {
                log(err)
            });
        }
    }

    onCancel(event) {
        event.preventDefault();

        historyBack();
    }

    /**
     * Render the component.
     */
    render() {
        const { me } = this.props;
        const { file, profileImageURL } = this.state;

        return (
            <Mutation mutation={ChangeProfile} >
                {changeProfile => {
                    return (
                        <ApolloConsumer>
                            {client => (
                                <AdminLayout apolloClient={client}>
                                    <ProfileView
                                        onFileOpen={this.onFileOpen}
                                        onFileDelete={this.onFileDelete}
                                        onChange={this.onChange}
                                        onSubmit={e => this.onSubmit(e, changeProfile)}
                                        onCancel={this.onCancel}
                                        me={me}
                                        file={file}
                                        profileImageURL={profileImageURL}
                                    />
                                </AdminLayout>
                            )}
                        </ApolloConsumer>
                    )
                }}
            </Mutation>
        )
    }

}

export default WithAdmin(ProfilePage);

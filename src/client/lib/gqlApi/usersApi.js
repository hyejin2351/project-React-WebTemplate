/**
 * Created by jcdev00 on 18. 10. 22.
 */

import gql from 'graphql-tag';

class usersApi {
    static changePassword( {apolloClient, curPassword, newPassword} ) {
        return new Promise(function (resolve, reject) {
            apolloClient.mutate({
                mutation: gql`
              mutation changePassword($curPassword: String!, $newPassword: String!) {
                changePassword(curPassword: $curPassword, newPassword: $newPassword) {
                  id
                  email
                }
              }
            `,
                variables: { curPassword, newPassword },
            }).then((res) => {
                resolve({ changePassword: res.data.changePassword });
            }).catch(err => {
                reject(err);
            })
        })
    }
}

export default usersApi;
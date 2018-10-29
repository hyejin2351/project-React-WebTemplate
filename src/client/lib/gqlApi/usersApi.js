/**
 * Created by jcdev00 on 18. 10. 22.
 */

// apolloClient api 이용한 방법
import gql from 'graphql-tag';

export function changePassword( {apolloClient, curPassword, newPassword} ) {
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
        }).then(( { data} ) => {
            return resolve({ changePassword: data.changePassword });
        }).catch(err => {
            return reject(err);
        })
    })
}

// apolloClient api 이용한 방법 구현 하려고 햇으나, 샘플이 별루 없어서...
// component 이용한 방법 구현
export const AllUsersQuery = gql`
  query allUsersQuery($limit: Int!, $skip: Int!, $search: String) {
    getUsersCount
    getUsers(limit: $limit, skip: $skip, search: $search) {
      id,
      name,
      email,
      nickName,
      profileImageURL
      roles,
      providerType,
      created
    }
  }
`

export const GetUserQuery = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      id,
      name,
      email,
      nickName,
      profileImageURL
      roles,
      providerType,
      created
    }
  }
`

export const UserDelete = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      id,
      name,
      email,
      nickName,
      profileImageURL
      roles,
      providerType,
      created
    }
  }
`
import cookie from 'cookie';
import debug from 'debug';

import checkLoggedIn from './checkLoggedIn';

const log = debug('app:AuthService');

const tokenName = 'token';
const useSession = true;

const getToken = ({ storage, req }, options = {}) => {
  let cookieData;
  switch (storage) {
    case 'local':
      return (typeof localStorage === 'object') && localStorage.getItem(tokenName);
    case 'cookie':
      cookieData = req && cookie.parse(req.headers.cookie, options);
      return cookieData && cookieData[tokenName];
    case 'document':
      cookieData = (typeof document === 'object') && cookie.parse(document.cookie, options);
      return cookieData && cookieData[tokenName];
    default:
      return null;
  }
};

const setToken = ({ storage }, token) => {
  switch (storage) {
    case 'local':
      (typeof localStorage === 'object') && 
        token ? localStorage.setItem(tokenName, token) : localStorage.removeItem(tokenName);
      return (typeof localStorage === 'object');
    case 'cookie':
      return true;
    case 'document':
      (typeof document === 'object') && 
        (document.cookie = token && cookie.serialize(tokenName, token));
      return (typeof document === 'object');
    default:
      return false;
  }
};

const isLoggedIn = context => checkLoggedIn(context);
// const loggedIn = (context) => {
//   const token = config.getToken(context);
//   return !!token;// && !isTokenExpired(token); // handwaiving here
// }

const config = {
  getToken,
  setToken,
  isLoggedIn,
  useSession: true,
};

const domain = '';

function makeJsonFormData({ email, password }) {
  // 'application/json' format
  return JSON.stringify({
    email,
    password
  });
}

function makeUrlEncodedFormData( param, goto) {
  // 'application/x-www-form-urlencoded' format
  let sData = '';
  if(param) {
    Object.keys(param).forEach(function(key) {
      sData = sData.concat('&'+key+'=').concat(encodeURIComponent(param[key]));
    })
  }

  if(goto)
    sData = sData.concat('&goto=' + encodeURIComponent(goto || ''));

  if(sData.length > 1)
    sData = sData.substr(1);

  return sData;
}

class AuthService {
  static login(context, param, goto) {
    const { uri } = context;
    return AuthService.fetch(context, `${domain}${uri}`, {
      method: 'POST',
      body: makeUrlEncodedFormData( param, goto ),
    })
      .then((res) => {
        log('Got login response: ', res.success);
        if (res.success) {
          if (res[tokenName]) {
            log('Save the received token: ', res[tokenName]);
            config.setToken(context, res[tokenName]);
          }
          log('return successful response: ', res);
          return Promise.resolve(res);
        }
        log('return failed response: ', res);
        return Promise.reject(res);
      })
      .catch((err) => {
        log('Got exception: ', err);
        // TODO: define response format
        return Promise.reject(err);
      });
  }

  static removeToken(context) {
    return config.setToken(context, null) ? Promise.resolve() : Promise.reject('setToken failed');
  }

  static logout(context) {
    const { uri, apolloClient } = context;
    if (uri) {
      AuthService.fetch(context, `${domain}${uri}`, {
        method: 'GET',
      })
        .then((res) => {
          if (res.success) {
            config.setToken(context, null);
          }
          // Force a reload of all the current queries
          if (apolloClient) {
            return apolloClient.cache.reset().then(() => Promise.reject(res));
          }
          return Promise.reject(res);
        });
    } else {
      return AuthService.removeToken(context);
    }
  }

  static loggedIn(context) {
    return config.isLoggedIn(context);
  }

  static register(context, param, goto) {
    const { uri } = context;

    return new Promise(function(resolve, reject) {
      AuthService.fetch(context, `${domain}${uri}`, {
            method: 'POST',
            body: makeUrlEncodedFormData( param, goto),
          })
          .then((res) => {
            // Force a reload of all the current queries
            return resolve(res);
          })
          .catch((err) => {
            log('Got exception: ', err);
            // TODO: define response format
            reject(err);
          });
    });
  }

  static unregister(context) {
    const { uri, apolloClient } = context;
    AuthService.fetch(context, `${domain}${uri}`, {
      method: 'POST',
    })
      .then((res) => {
        if (res.success) {
          config.setToken(context, null);
        }
        // Force a reload of all the current queries
        if (apolloClient) {
          return apolloClient.cache.reset().then(() => Promise.reject(res));
        }
        return Promise.reject(res);
      });
  }

  static _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response;
    } 
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  static fetch(context, url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Type': 'application/json',
    };

    if (AuthService.loggedIn(context)) {
      headers.authorization = `Bearer ${config.getToken(context)}`;
    }

    return fetch(url, {
      headers,
      // Fetch does not send cookies.
      // so you should add credentials: 'include' as fetch's parameter
      credentials: 'include',
      ...options
    })
      .then(AuthService._checkStatus)
      .then(response => response.json());
  }

  // static xhreq() {
  // const email = encodeURIComponent(this.state.user.email);
  // const password = encodeURIComponent(this.state.user.password);
  // const formData = `email=${email}&password=${password}`;

  // // create an AJAX request
  // const xhr = new XMLHttpRequest();
  // xhr.open('post', '/api/auth/login');
  // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  // xhr.responseType = 'json';
  // xhr.addEventListener('load', () => {
  //   const { status, response } = xhr;
  //   log('status: ', status);
  //   if ( status === 200 ) {
  //     // success

  //     // change the component-container state
  //     this.setState({
  //       errors: {}
  //     });

  //     // redirect signed in user to dashboard
  //     // this.props.history.push('/dashboard');
  //     Router.replace('/');

  //   } else {
  //     // failure
  //     // change the component state
  //     const errors = response;

  //     this.setState({
  //       errors
  //     });
  //   }
  // });
  // xhr.send(formData);
  // }
}

export default AuthService;

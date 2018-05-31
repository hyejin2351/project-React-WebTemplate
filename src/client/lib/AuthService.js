import cookie from 'cookie';
import debug from 'debug';

import checkLoggedIn from './checkLoggedIn';

const log = debug('app:AuthService');

const tokenName = 'connect.sid';
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

const isLoggedIn = (context) => checkLoggedIn(context);
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

function makeUrlEncodedFormData(email, password) {
  // 'application/x-www-form-urlencoded' format
  return `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
}

function makeJsonFormData(email, password) {
  // 'application/json' format
  return JSON.stringify({
    email,
    password
  });
}

class AuthService {
  static login(context, email, password) {
    const { uri } = context;
    return AuthService.fetch(context, `${domain}${uri}`, {
      method: 'POST',
      body: makeUrlEncodedFormData(email, password),
    })
    .then((res) => {
      if (res.success) {
        if (res[tokenName]) {
          config.setToken(context, res[tokenName]);
        }
        return Promise.resolve(res);
      }
      return Promise.reject(res);
    });
  }

  static removeToken(context) {
    return config.setToken(context, null) ? Promise.resolve() : Promise.reject('setToken failed');
  }

  static logout(context) {
    const { uri } = context;
    if (uri) {
      AuthService.fetch(context, `${domain}${uri}`, {
        method: 'GET',
      })
        .then((res) => {
          if (res.success) {
            return removeToken(context);
          }
          return Promise.reject(res);
        });      
    } else {
      return removeToken(context);
    }
  }

  static loggedIn(context) {
    return config.isLoggedIn(context);
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

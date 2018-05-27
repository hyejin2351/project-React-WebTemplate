import debug from 'debug';

const d = debug('app:auth');

const domain = 'http://localhost:3000';

class AuthService {
  static login(email, password) {
    d('try to login: ', email);
    console.log('try to login: >>>', email);
    // Get a token
    return AuthService.fetch(`${domain}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    }).then((res) => {
      if (res.success) {
        AuthService.setToken(res.token);
        return Promise.resolve(res);
      }
      return Promise.reject(res);

      // return this.fetch(`${this.domain}/user`, {
      //   method: 'GET'
      // })
    });
    // .then(res => {
    //   this.setProfile(res)
    //   return Promise.resolve(res)
    // })
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static logout() {
    localStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = AuthService.getToken();
    return !!token;// && !isTokenExpired(token); // handwaiving here
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
  
  static fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    if (AuthService.loggedIn()) {
      headers.Authorization = `Bearer ${AuthService.getToken()}`;
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(AuthService._checkStatus)
      .then(response => response.json());
  }
}

export default AuthService;

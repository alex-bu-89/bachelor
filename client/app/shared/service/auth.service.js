class AuthService {

  /*@ngInject*/
  constructor($q, $http, config) {
    this._$q = $q;
    this._$http = $http;
    this._config = config;

    this.LOCAL_TOKEN_KEY = 'secret_token';
    this.isAuthenticated = false;
    this.authToken;
    this.user = {};

    this.init();
    console.log('AuthService initialized');
  }

  loadUserCredentials() {
    var token = window.localStorage.getItem(this.LOCAL_TOKEN_KEY);
    if (token) {
      this.useCredentials(token);
    }
  }

  storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    this.useCredentials(token);
  }

  useCredentials(token) {
    this.isAuthenticated = true;
    this.authToken = token;

    // Set the token as header for your requests!
    this._$http.defaults.headers.common.Authorization = this.authToken;
  }

  destroyUserCredentials() {
    this.authToken = undefined;
    this.isAuthenticated = false;
    this._$http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(this.LOCAL_TOKEN_KEY);
  }

  register(user) {
    return this._$q((resolve, reject) => {
      this._$http.post(API_ENDPOINT.url + '/signup', user).then(function (result) {
        if (result.data.success) {
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  login(user) {
    return this._$q((resolve, reject) => {
      this._$http({
        url: this._config.API_ENDPOINT + '/authenticate',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        dataType: 'json',
        method: 'POST',
        data: JSON.stringify(user)
      }).then(function (result) {
        if (result.data.success) {
          this.storeUserCredentials(result.data.token);
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  logout() {
    this.destroyUserCredentials();
  };

  init() {
    this.loadUserCredentials();
  };

}

export default AuthService;

class UserService {

  /*
     "_id": "57e05e7cc1737daf1b8d81f7",
     "authToken": "",
     "isProf": true,
     "password": "$2a$10$1sR4jBlygCt/unncRdFAaON4ZpE4IJDx60OOuS151n/kVHZeu.aIa",
     "email": "alex@test.ninja",
     "name": "alex"
   */

  /*@ngInject*/
  constructor($q, $http, $rootScope, config, $timeout) {
    this._$q = $q;
    this._$http = $http;
    this._$rootScope = $rootScope;
    this._$timeout = $timeout;
    this._config = config;

    this.LOCAL_TOKEN_KEY = 'token';
    this.LOCAL_USER = 'user';
    this.LOCAL_TEMP_USER = 'temp-user';
    this.isAuthenticated = false;
    this.isTempAuthenticated = false; // need for temp users
    this.authToken;
    this.user = {};
    
    this.init();
  }

  setUser(user){
    this.user = user;

    this._$timeout(() => {
      this._$rootScope.$broadcast('user.updated', user);
    });
  }

  getUser(){
    return this.user
  }

  removeUser(){
    this.user = {};
  }

  loadUserCredentials() {
    var token = window.localStorage.getItem(this.LOCAL_TOKEN_KEY);
    if (token) {
      this.useCredentials(token);
    }

    var tempuser = window.localStorage.getItem(this.LOCAL_TEMP_USER);
    if (tempuser && tempuser != undefined) {
      this.useTempCredentials();
      this.setUser(JSON.parse(tempuser))
    }

    console.log('UserService initialized');
    console.log('isAuthenticated: ', this.isAuthenticated);
    console.log('isTempAuthenticated: ', this.isTempAuthenticated);
  }

  storeUserCredentials(data) {
    window.localStorage.setItem(this.LOCAL_TOKEN_KEY, data.token);
    window.localStorage.setItem(this.LOCAL_USER, JSON.stringify(data.user));
    this.setUser(data.user);
    this.useCredentials(data.token);
  }

  storeTempUserCredentials(user) {
    window.localStorage.setItem(this.LOCAL_TEMP_USER, JSON.stringify(user));
    this.setUser(user);
    this.useTempCredentials();
  }

  useCredentials(token) {
    this.isAuthenticated = true;
    this.isTempAuthenticated = false;
    this.authToken = token;

    // Set the token as header for your requests!
    this._$http.defaults.headers.common.Authorization = this.authToken;
  }

  useTempCredentials() {
    this.isTempAuthenticated = true;
    this.isAuthenticated = false;
  }

  destroyUserCredentials() {
    this.authToken = undefined;
    this.isAuthenticated = false;
    this.isTempAuthenticated = false;
    this._$http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(this.LOCAL_TOKEN_KEY);
    window.localStorage.removeItem(this.LOCAL_USER);
    window.localStorage.removeItem(this.LOCAL_TEMP_USER);
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
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        dataType: 'json',
        method: 'POST',
        data: JSON.stringify(user)
      }).then((result) => {
        if (result.data.success) {
          this.storeUserCredentials(result.data);
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

export default UserService;

/**
 * Created by cestevezd on 19/06/2015.
 */
angular.module('KiplyWebApp.LoginService', []).
    factory('loginService', ['ApiEndpoint', '$http', '$location', '$cookies', '$q', '$rootScope', function (ApiEndpoint, $http, $location, $cookies, $q, $rootScope) {

        return {
            login: function (user, password) {
                url = ApiEndpoint + "/auth/";

                data = {
                    "username": user,
                    "password": password
                };

                return $q(function (resolve, reject) {

                    return $http.post(url, data).then(function (data) {
                        $cookies.put("api_k", data.data.api_key);
                        $cookies.put("api_s", data.data.api_secret);
                        $cookies.put("user_id", data.data.user_id);
                        $cookies.put("username", user);

                        $rootScope.username = user;

                        $location.path('/mycards');

                        resolve()
                    }, function (error) {
                        reject(error)
                    })
                })
            },

            isAuthenticated: function () {
                if ($cookies.get('api_k') && $cookies.get('api_s')) {
                    return true
                } else {
                    return false
                }
            },

            logout: function () {
                $cookies.remove('api_k');
                $cookies.remove('api_s');
                $cookies.remove('user_id');
                $cookies.remove('username');

                $location.path('/login')
            }

        }
    }]);
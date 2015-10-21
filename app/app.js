'use strict';

// Declare app level module which depends on views, and components
angular.module('NucleusWebApp', [
    'ngAnimate',
    'ui.router',
    'NucleusWebApp.login',
    'NucleusWebApp.LoginService',
    'NucleusWebApp.email',
    'NucleusWebApp.EmailService'

]).
    factory('authInterceptor', ['$cookies', '$rootScope', function ($cookies, $rootScope) {

        var requestInterceptor = {
            request: function (config) {
                if (!config.url.includes('reset_password')) { // La sección de reset de contraseña no incluye autenticación
                    config.headers = config.headers || {};
                    if ($cookies.get('api_s') && $cookies.get('api_k')) {

                        var api_s = $cookies.get('api_s')
                        var api_k = $cookies.get('api_k')

                        var dateString = new Date()
                        var date = dateString.toUTCString()

                        var hash = CryptoJS.HmacSHA256("date: " + date, api_s);
                        var b64Hash = CryptoJS.enc.Base64.stringify(hash)

                        config.headers.Authorization = 'Signature ' + 'keyId=\"' + api_k + "\",algorithm=\"hmac-sha256\",headers=\"date\",signature=\"" + b64Hash + "\"";
                        config.headers["X-Api-Key"] = api_k;
                        config.headers["X-Kpl-Date"] = date;


                        /*
                         console.log("---------- HTTP Signature -----------")
                         console.log("Authorization: " + config.headers.Authorization)
                         console.log("X-Api-Key: " + api_k)
                         console.log("X-Kpl-Date: " + date)
                         console.log("-------------------------------------")
                         */

                    }

                }

                return config;

            }
        }

        return requestInterceptor;

    }]).

    config(function ($urlRouterProvider, $stateProvider, $httpProvider) {
        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "views/login/login.html",
                controller: "LoginCtrl"

            })
            .state('email', {
                url: "/email",
                templateUrl: "views/email/email.html",
                controller: "EmailCtrl"

            })
        $httpProvider.interceptors.push('authInterceptor');

    })

    .constant('ApiEndpoint', 'https://api.kiply.com')
    .controller('appController', ['$scope', '$cookies', '$state', '$rootScope', 'loginService', '$location', function ($scope, $cookies, $state, $rootScope, loginService, $location) {

        $rootScope.$state = $state;
        $rootScope.username = $cookies.get('username');

        $scope.closeSession = function () {
            loginService.logout()
        }


        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                if (toState.name === 'resetpassword') {
                } else {
                    if (!loginService.isAuthenticated() && toState.name != 'login') {
                        event.preventDefault();

                        $state.go('login')
                    }
                }
                //event.preventDefault();
                // transitionTo() promise will be rejected with
                // a 'transition prevented' error
            })
    }])


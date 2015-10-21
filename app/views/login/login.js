'use strict';

angular.module('NucleusWebApp.login', ["ui.router", "ngCookies"])

    .controller('LoginCtrl', ['$scope', 'loginService', '$cookies', '$location', '$timeout', function ($scope, loginService, $cookies, $location, $timeout) {
        $scope.user = {
            username: undefined,
                password: undefined
            };

        if ($cookies.get('api_k') && $cookies.get('api_s') && $cookies.get('user_id')) {
            $location.path('/email')
        }

        $scope.submitLogin = function () {
            if ($scope.user.username !== '' && $scope.user.username !== undefined && $scope.user.password !== '' && $scope.user.password !== undefined) {
                $scope.showLoginAnimation = true;
                loginService.login($scope.user.username, $scope.user.password).then(function (data) {
                }, function (error) {
                    if (error.status === 403) {
                        $scope.badCredentials = true;
                    }
                    $scope.showLoginAnimation = false;
                })
            }
        }

        $('#usernameInput').focus()
    }]);
/**
 * Created by cestevezd on 19/06/2015.
 */
angular.module('NucleusWebApp.EmailService', []).
    factory('emailService', ['ApiEndpoint', '$http', '$location', '$cookies', '$q', '$rootScope', function (ApiEndpoint, $http, $location, $cookies, $q, $rootScope) {

        return {
            sendEmail: function (startingDate, endingDate, message, hyperlink) {
                return $q(function (resolve, reject) {
                    url = ApiEndpoint + "/user/sendweeklyreport/";
                    $http.post(url, {
                        from_date: startingDate,
                        to_date: endingDate,
                        message: message,
                        hyperlink: hyperlink
                    })
                        .then(function () {
                            resolve()
                        }, function () {
                            reject()
                        });
                })
            },
            sendTestEmail: function (startingDate, endingDate, message, hyperlink,testEmailAddress) {
                return $q(function (resolve, reject) {
                    url = ApiEndpoint + "/user/sendweeklyreport/";
                    $http.post(url, {
                        from_date: startingDate,
                        to_date: endingDate,
                        message: message,
                        hyperlink: hyperlink,
                        test_email: testEmailAddress
                    })
                        .then(function () {
                            resolve()
                        }, function () {
                            reject()
                        });
                })
            }
        }
    }]);
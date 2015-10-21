/**
 * Created by cestevezd on 19/06/2015.
 */
angular.module('NucleusWebApp.EmailService', []).
    factory('emailService', ['ApiEndpoint', '$http', '$location', '$cookies', '$q', '$rootScope', function (ApiEndpoint, $http, $location, $cookies, $q, $rootScope) {

        return {
            sendEmail: function (startingDate, endingDate, message, hyperlink) {
                console.log(startingDate, endingDate, message, hyperlink);
                url = ApiEndpoint + "/user/sendweeklyreport/";
                $http.post(url, {from_date:startingDate,to_date:to_date,message:message,hyperlink:hyperlink,test_email:null});
            },
            sendTestEmail: function (startingDate, endingDate, message, hyperlink, testEmailAddress) {
                console.log(startingDate, endingDate, message, hyperlink)
                url = ApiEndpoint + "/user/sendweeklyreport/";
                $http.post(url, {from_date:startingDate,to_date:to_date,message:message,hyperlink:hyperlink,test_email:testEmailAddress});

            }

        }
    }]);
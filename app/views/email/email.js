'use strict';

angular.module('NucleusWebApp.email', ["ui.router"])

    .controller('EmailCtrl', ['$scope', 'emailService', function ($scope, emailService) {

        $scope.sendEmail = function (startingDate, endingDate, message, hyperlink) {
            if (startingDate && endingDate && message && hyperlink)
                if (startingDate.getTime() <= endingDate.getTime()) {
                    emailService.sendEmail(startingDate, endingDate, message, hyperlink)
                    alert("Emails enviados.")
                    return true;
                }
                else {
                    alert("ERROR: La fecha de inicio es mayor que la fecha de fin.")
                    return false
                }
            else {
                alert("ERROR: Compruebe que se han introducido correctamente todos los datos.")
                return false
            }
        }
        $scope.sendTestEmail = function (startingDate, endingDate, message, hyperlink,testEmailAddress) {
            if (startingDate && endingDate && message && hyperlink && testEmailAddress)
                if (startingDate.getTime() <= endingDate.getTime())
                    emailService.sendTestEmail(startingDate, endingDate, message, hyperlink,testEmailAddress )
                else {
                    alert("ERROR: La fecha de inicio es mayor que la fecha de fin.")
                    return false
                }
            else {
                alert("ERROR: Compruebe que se han introducido correctamente todos los datos.")
                return false
            }
        }
    }])
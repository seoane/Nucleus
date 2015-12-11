'use strict';

angular.module('NucleusWebApp.email', ["ui.router"])

    .controller('EmailCtrl', ['$scope', 'emailService', function ($scope, emailService) {

        $scope.sendEmail = function (startingDate, endingDate, message, hyperlink) {
            if (startingDate && endingDate && message && hyperlink)
                if (startingDate.getTime() <= endingDate.getTime()) {
                    if (confirm('Estás a punto de enviar el informe semanal a TODO el mundo, estás segur@?')) {
                        emailService.sendEmail(startingDate, endingDate, message, hyperlink).then(function () {
                            $scope.showSuccessMessage = true
                        }, function () {
                            $scope.showErrorMessage = true
                        })
                        return true;
                    } else {
                        return false;
                    }
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
        $scope.sendTestEmail = function (startingDate, endingDate, message, hyperlink, testEmailAddress) {
            if (startingDate && endingDate && message && hyperlink && testEmailAddress)
                if (startingDate.getTime() <= endingDate.getTime())
                    if (confirm('Estás a punto de enviar el informe semanal a '+ testEmailAddress +' estás segur@?')) {
                        emailService.sendTestEmail(startingDate, endingDate, message, hyperlink,testEmailAddress).then(function () {
                            $scope.showSuccessMessage = true
                        }, function () {
                            $scope.showErrorMessage = true
                        })
                        return true;
                    } else {
                        return false;
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
    }])
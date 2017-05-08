(function () {
    "use strict";
    angular
        .module("app", ['ngDialog'])
        .controller("loginCtrl", loginCtrl);

    loginCtrl.$inject = ["accounts", "data", "$scope", "$http", "$state", "$stateParams", "ngProgressBar", "ngToast", "ngDialog"];
    function loginCtrl(accounts, data, $scope, $http, $state, $stateParams, ngProgressBar, ngToast, ngDialog) {

        $scope.credentials = {
            email: "",
            password: ""
        };

        $scope.login = function () {
            console.log($scope.credentials);
        };

        $scope.createToasts = {
            toastSuccess: function () {
                ngToast.create({
                    className: " bg-success text-white",
                    content: "<p>Success!</p>"
                });
            },


            toastWarning: function (message) {
                var innerText = message;
                if (message === "" || message === null) {
                    innerText = "Warning";
                }
                var toastContent = "<p>" + innerText + "</p>";
                ngToast.create({
                    className: " bg-warning text-white",
                    content: toastContent
                });
            },

            toastFailed: function () {
                ngToast.create({
                    className: " bg-danger text-white",
                    content: "<p>Failed!</p>"

                });
            }
        };
    }
})();
(function () {
    "use strict";
    angular
        .module("app", ['ngDialog'])
        .controller("mobilesCtrl", mobilesCtrl);

    mobilesCtrl.$inject = ["accounts", "data", "$scope", "$http", "$state", "$stateParams", "ngProgressBar", "ngToast", "ngDialog"];
    function mobilesCtrl(accounts, data, $scope, $http, $state, $stateParams, ngProgressBar, ngToast, ngDialog) {

        $scope.searchField = {};

        $scope.events = {
            search: function(){

                $state.go("mobiles.query", {
                    description : $scope.searchField.description,
                    notify: false
                });
                $scope.searchField = {};
            }
        };

        $scope.createToasts = {
            toastSuccess: function () {
                ngToast.create({
                    className: " bg-success text-white",
                    content: "<p>Success!</p>",
                    timeout: 1500
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
                    content: toastContent,
                    timeout: 1500
                });
            },

            toastFailed: function () {
                ngToast.create({
                    className: " bg-danger text-white",
                    content: "<p>Failed!</p>",
                    timeout: 1500

                });
            }
        };
    }
})();
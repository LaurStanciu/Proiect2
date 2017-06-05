(function () {
    "use strict";
    angular
        .module("app", ['ngDialog'])
        .controller("tvCtrl", tvCtrl);

    tvCtrl.$inject = ["accounts", "data", "$scope", "$http", "$state", "$stateParams", "ngProgressBar", "ngToast", "ngDialog"];
    function tvCtrl(accounts, data, $scope, $http, $state, $stateParams, ngProgressBar, ngToast, ngDialog) {

        $scope.search = "";

        $scope.events = {
            search: function(){
                /*$state.go("tv.query", { description: $scope.search });
                $scope.search = "";*/
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
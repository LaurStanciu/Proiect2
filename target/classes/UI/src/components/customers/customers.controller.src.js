(function () {
    "use strict";
    angular
        .module("app", ['ui.bootstrap'])
        .controller("customersCtrl", customersCtrl);

    customersCtrl.$inject = ["accounts", "data", "$scope", "$http", "$state", "$stateParams", "ngProgressBar", "ngToast"];
    function customersCtrl(accounts, data, $scope, $http, $state, $stateParams, ngProgressBar, ngToast) {
        $scope.accounts = accounts;
        $scope.data = data;
        $scope.customers = [];
        $scope.selectedOption = "name";

        $scope.search = "";
        

       
        $scope.events = {
            search: function () {
                $state.go("customers.query", { name: $scope.search });
                $scope.search = "";
            }
        }
    }
})();
(function () {
    "use strict";
    angular
        .module("app")
        .controller("queryCtrl", queryCtrl);
    queryCtrl.$inject = ["accounts", "data", "$scope", "$http", "$state", "$stateParams", "ngProgressBar", "ngToast"];
    function queryCtrl(accounts, data, $scope, $http, $state, $stateParams, ngProgressBar, ngToast) {

        $scope.getData = function (description) {
            console.log(description);
            console.log($stateParams);
            /*
            var url = "/api/Customer/query?id=" + id + "&storeId=" + storeid + "&name=" + name;
            $http.get(url).then(function (getContentsResponse) {
                if (getContentsResponse.status === 200) {
                    $scope.customers = getContentsResponse.data;
                    //$scope.search = "";
                }
            }, function (errResponse) { return errResponse; });*/
        };
        
        //$scope.modify = function (id)

        $scope.getData($stateParams.description);
    }
})();
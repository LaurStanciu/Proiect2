(function () {
    "use strict";
    angular
        .module("app")
        .controller("queryTvCtrl", queryTvCtrl);
    queryTvCtrl.$inject = ["accounts", "data", "$scope", "$http", "$state", "$stateParams", "ngProgressBar", "ngToast"];
    function queryTvCtrl(accounts, data, $scope, $http, $state, $stateParams, ngProgressBar, ngToast) {

        $scope.getData = function (description) {
            if(description == null)
                description = "";
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
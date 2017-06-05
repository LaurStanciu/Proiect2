(function () {
    "use strict";
    angular
        .module("app")
        .controller("queryTvCtrl", queryTvCtrl);
    queryTvCtrl.$inject = ["accounts", "data", "$scope", "$http", "$state", "$stateParams", "ngProgressBar", "ngToast"];
    function queryTvCtrl(accounts, data, $scope, $http, $state, $stateParams, ngProgressBar, ngToast) {

        $scope.tv = [];

        $scope.getData = function (description) {
            if(description == null)
                description = "";

            var url = "/api/query/tv/"+ description;
            $http.get(url).then(function (getContentsResponse) {
                if (getContentsResponse.status === 200) {
                    $scope.tv = getContentsResponse.data;
                    console.log($scope.tv);
                    //$scope.search = "";
                }
            }, function (errResponse) { return errResponse; });
        };
        
        //$scope.modify = function (id)

        $scope.getData($stateParams.description);
    }
})();
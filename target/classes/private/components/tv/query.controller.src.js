(function () {
    "use strict";
    angular
        .module("app")
        .controller("queryTvCtrl", queryTvCtrl);
    queryTvCtrl.$inject = ["accounts", "data", "$scope", "$http", "$state", "$stateParams", "ngProgressBar", "ngToast"];
    function queryTvCtrl(accounts, data, $scope, $http, $state, $stateParams, ngProgressBar, ngToast) {

        $scope.noresult = false;
        $scope.tvs = [];

        $scope.getData = function (description) {
            if(description == null)
                description = "";

            var url = "/api/query/tv/"+ description;
            $http.get(url).then(function (getContentsResponse) {
                if (getContentsResponse.status === 200) {
                    $scope.tvs = getContentsResponse.data;
                    if($scope.tvs.length == 0) $scope.noresult = true;

                }
            }, function (errResponse) { return errResponse; });
        };

        $scope.getData($stateParams.description);
    }
})();
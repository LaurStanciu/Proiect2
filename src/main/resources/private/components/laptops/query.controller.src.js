(function () {
    "use strict";
    angular
        .module("app")
        .controller("queryLaptopsCtrl", queryLaptopsCtrl);
    queryLaptopsCtrl.$inject = ["accounts", "data", "$scope", "$http", "$state", "$stateParams", "ngProgressBar", "ngToast"];
    function queryLaptopsCtrl(accounts, data, $scope, $http, $state, $stateParams, ngProgressBar, ngToast) {

        $scope.noresult = false;
        $scope.laptops = [];

        $scope.getData = function (description) {
            if (description == null)
                description = "";

            var url = "/api/query/laptop/" + description;
            $http.get(url).then(function (getContentsResponse) {
                if (getContentsResponse.status === 200) {
                    $scope.laptops = getContentsResponse.data;
                    if($scope.laptops.length == 0) $scope.noresult = true;
                }
            }, function (errResponse) {
                return errResponse;
            });

        };

        $scope.getData($stateParams.description);
    }
})();
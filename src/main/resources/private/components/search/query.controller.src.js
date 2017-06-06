(function () {
    "use strict";
    angular
        .module("app")
        .controller("querySearchCtrl", querySearchCtrl);
    querySearchCtrl.$inject = ["accounts", "data", "$scope", "$http", "$state", "$stateParams", "ngProgressBar", "ngToast"];
    function querySearchCtrl(accounts, data, $scope, $http, $state, $stateParams, ngProgressBar, ngToast) {

        $scope.noresult = false;
        $scope.goods = [];

        $scope.getData = function (description) {
            if (description == null)
                description = "";

            var url = "/api/query//" + description;
            $http.get(url).then(function (getContentsResponse) {
                if (getContentsResponse.status === 200) {
                    $scope.goods = getContentsResponse.data;
                    if($scope.goods.length == 0) $scope.noresult = true;

                }
            }, function (errResponse) {
                return errResponse;
            });
        };

        $scope.getData($stateParams.description);
    }
})();
(function () {
    "use strict";
    angular
        .module("app")
        .controller("queryMobilesCtrl", queryMobilesCtrl);
    queryMobilesCtrl.$inject = ["accounts", "data", "$scope", "$http", "$state", "$stateParams", "ngProgressBar", "ngToast"];
    function queryMobilesCtrl(accounts, data, $scope, $http, $state, $stateParams, ngProgressBar, ngToast) {

        $scope.noresult = false;
        $scope.mobiles = [];

        $scope.getData = function (description) {
            if(description == null)
                description = "";

            var url = "/api/query/mobile/"+ description;
            $http.get(url).then(function (getContentsResponse) {
                if (getContentsResponse.status === 200) {
                    $scope.mobiles = getContentsResponse.data;
                    if($scope.mobiles.length == 0) $scope.noresult = true;

                }
            }, function (errResponse) { return errResponse; });
        };
        
        //$scope.modify = function (id)

        $scope.getData($stateParams.description);
    }
})();
(function () {
    "use strict";
    angular
        .module("app")
        .controller("accountsCtrl", accountsCtrl);

    accountsCtrl.$inject = ["$rootScope","accounts", "data", "$location", "$http", "$scope", "$state", "$stateParams", "ngProgressBar", "ngToast"];
    function accountsCtrl($rootScope,accounts, data, $location, $http, $scope, $state, $stateParams, ngProgressBar, ngToast) {
        $scope.accounts = accounts;
        $scope.data = data;

        $scope.accountExists = false;
        $scope.incorrectCredentials = false;
        $scope.vm = {
            signIn: {},
            signUp: {}
        };

        $scope.events = {
            signIn: function () {
                $scope.events.signOut();
                if ($scope.progressbar) $scope.progressbar.complete();
                $scope.progressbar = ngProgressBar.createInstance();
                $scope.progressbar.start();
                $http.post("/api/accounts/sign-in", $scope.vm.signIn).then(function (response) {
                    if(response.data.type == 1) {
                        $scope.progressbar.complete();
                        $rootScope.loginDetails.email = $scope.vm.signIn.email;
                        $rootScope.loginDetails.logged = true;
                        $state.go("search");
                        $scope.createToasts.toastSuccess();
                    }
                    if(response.data.type == 3) {
                        $scope.progressbar.complete();
                        $scope.incorrectCredentials = true;
                        $scope.createToasts.toastFailed();
                    }
                }, function (errResponse) {
                    $scope.progressbar.complete();
                    $scope.createToasts.toastFailed();
                    return errResponse;
                });

            },

            signUp: function () {
                $scope.accountExists = false;
                if ($scope.progressbar) $scope.progressbar.complete();
                $scope.progressbar = ngProgressBar.createInstance();
                $scope.progressbar.start();
                $http.post("/api/accounts/sign-up", $scope.vm.signUp).then(function (response) {
                    if(response.data.type == 1) {
                        $scope.progressbar.complete();
                        $state.go("accounts.sign-in");
                        $scope.createToasts.toastSuccess();
                    }
                    if(response.data.type == 3) {
                        $scope.progressbar.complete();
                        $scope.accountExists = true;
                        $scope.createToasts.toastFailed();
                    }
                }, function (errResponse) {
                    $scope.progressbar.complete();
                    $scope.createToasts.toastFailed();
                    return errResponse;
                });
            },

            signOut: function(){
                $rootScope.loginDetails.email = "";
                $rootScope.loginDetails.logged = false;
                $state.go("accounts.sign-in");
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
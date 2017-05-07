(function () {
    "use strict";
    angular
        .module("app", ['ngDialog'])
        .controller("adminCtrl", adminCtrl);

    adminCtrl.$inject = ["accounts", "data", "$scope", "$http", "$state", "$stateParams", "ngProgressBar", "ngToast", "ngDialog"];
    function adminCtrl(accounts, data, $scope, $http, $state, $stateParams, ngProgressBar, ngToast, ngDialog) {
        $scope.vm = {
            Type: 1,
            Settings: {
                dbProvider: "",
                server: "",
                endpoints: []
            }
        };
        $scope.default = false;
        $scope.currentSelection = "";
        $scope.dbProviders = [];
        $http.get("/api/InitPage").then(function (getContentsResponse) {

            if (getContentsResponse.status === 200) {
                $scope.dbProviders = getContentsResponse.data;
                $scope.vm.Settings.dbProvider = $scope.dbProviders[0];
            }
        }, function (errResponse) { return errResponse; });

        $scope.createToasts = {
            toastSuccess: function () {
                ngToast.create({
                    className: " bg-success text-white",
                    content: "<p>Success!</p>"
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
                    content: toastContent
                });
            },

            toastFailed: function () {
                ngToast.create({
                    className: " bg-danger text-white",
                    content: "<p>Failed!</p>"

                });
            }
        }

        $scope.reset = function () {
            $scope._config.$setPristine();
            $scope.vm.Settings = {
                endpoints: []
            };
            $scope.vm.Settings.dbProvider = $scope.dbProviders[0];
        };

        $scope.submitDialog = function () {
            var title = "You have work in progress!";
            var message = "";
            if ($scope.default)
                message = "Do you want to use default settings?";
            else
                message = "Do you want to lose current progress?";
            return ngDialog.openConfirm({
                template: '\
                    <h4>' + title + '</h4>\
                    <h6>' + message + '</h6></br>\
                    <div class="ngdialog-buttons">\
                        <button class="ngdialog-button ngdialog-button-primary" name="yesButton" ng-click="confirm()">Yes</button>\
                        <button class="ngdialog-button ngdialog-button-secondary" name="cancelButton" ng-click="closeThisDialog()">Cancel</button>\
                    </div>',
                plain: true,
                className: 'ngdialog-theme-plain',
                closeByDocument: false,
                showClose: false
            });
        }

        $scope.services = {
            postData: function () {
                $scope.progressbar = ngProgressBar.createInstance();
                $scope.progressbar.start();
                $http.post("/api/InitPage", $scope.vm).then(function (response) {
                    if (response.data.Type === 1) {
                        $scope.createToasts.toastSuccess();
                        $scope.reset();
                    }
                    else if (response.data.Type === 2) {
                        $scope.createToasts.toastWarning(response.data.Text);
                        $scope.reset();
                    } else {
                        $scope.createToasts.toastFailed();
                    }

                }, function (errResponse) {
                    $scope.createToasts.toastFailed();
                    return errResponse;
                });
                $scope.progressbar.complete();
            }
        };

        $scope.events = {

            output: function () {
                if ($scope.default) {
                    $scope.vm.Type = 0;
                }
                if ($scope._config.$dirty && $scope.default) {
                    var dialog = $scope.submitDialog();
                    dialog.then(function () {
                        $scope.services.postData();
                        $scope.default = false;
                    }, function () {
                        $scope.vm.Type = 1;
                        $scope.default = false;
                    });
                } else {
                    $scope.services.postData();
                }
                
            }
        }
    };
})();
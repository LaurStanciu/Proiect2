(function () {
    "use strict";
    angular
        .module("app")
        .controller("accountsCtrl", accountsCtrl);

    accountsCtrl.$inject = ["accounts", "data", "$location", "$http", "$scope", "$state", "$stateParams", "ngProgressBar", "ngToast"];
    function accountsCtrl(accounts, data, $location, $http, $scope, $state, $stateParams, ngProgressBar, ngToast) {
        $scope.accounts = accounts;
        $scope.data = data;



        $scope.vm = {
            signIn: {},
            signUp: {}
        };

        $scope.responses = {
            signIn: {},
            signUp: {}
        };

        $scope.contents = {
            current: {},
            edit: {}
        };



        $scope.events = {
            //
            // redirect: function () {
            //     accounts
            //         .loadIdentity()
            //         .then(function () {
            //
            //             var returnState = $location.search().returnState;
            //             var returnStateParams = $location.search().returnStateParams;
            //
            //             if (returnState &&
            //                 returnState !== "^" &&
            //                 returnState !== "sign-in" &&
            //                 returnState !== "sign-up" &&
            //                 returnState !== "sign-out") {
            //
            //                 returnStateParams = JSON.parse(decodeURIComponent(returnStateParams));
            //                 $state.go(returnState, returnStateParams, { reload: true });
            //
            //             } else {
            //                 $state.go("app.default");
            //             }
            //
            //         });
            // },

            signIn: function () {
                console.log($scope.vm.signIn);




                //
                // if ($scope.progressbar) $scope.progressbar.complete();
                // $scope.progressbar = ngProgressBar.createInstance();
                // $scope.progressbar.start();
                // $scope.responses.signIn = {};
                // accounts
                //     .signIn($scope.vm.signIn)
                //     .then(function (signInResponse) {
                //         $scope.progressbar.complete();
                //         if (signInResponse.data.type == 1) {
                //             $scope.events.redirect();
                //         }
                //         $scope.responses.signIn = signInResponse.data;
                //     });
            },

            signUp: function () {
                console.log($scope.vm.signUp);
                $http.post("/api/sign-up", $scope.vm.signUp).then(function (response) {
                    if(response.data.type == 1) {
                        $state.go("accounts.sign-in");
                        console.log($scope.vm.signUp);
                        $scope.createToasts.toastSuccess();
                    }
                    if(response.data.type == 3) {
                        console.log(response.data.type);

                        $scope.createToasts.toastFailed();
                    }
                }, function (errResponse) {
                    $scope.createToasts.toastFailed();
                    return errResponse;
                });
                // if ($scope.progressbar) $scope.progressbar.complete();
                // $scope.progressbar = ngProgressBar.createInstance();
                // $scope.progressbar.start();
                // $scope.responses.signUp = {};
                // accounts
                //     .signUp($scope.vm.signUp)
                //     .then(function (signUpResponse) {
                //         $scope.progressbar.complete();
                //         if (signUpResponse.data.type == 1) {
                //             $scope.events.redirect();
                //         }
                //         $scope.responses.signUp = signUpResponse.data;
                //     });
            }
            //
            // getContents: function () {
            //     if ($stateParams.account_Id && $stateParams.role) {
            //         if ($scope.progressbar) $scope.progressbar.complete();
            //         $scope.progressbar = ngProgressBar.createInstance();
            //         $scope.progressbar.start();
            //
            //         accounts
            //             .getContents({ id: $stateParams.account_Id }, { role: $stateParams.role })
            //             .then(function (getContentsResponse) {
            //                 $scope.progressbar.complete();
            //                 if (getContentsResponse.status == 200) {
            //                     $scope.contents.current = getContentsResponse.data;
            //                     if ($state.includes("account.profile")) {
            //                         $scope.contents.edit = $.extend(true, {}, $scope.contents.current);
            //                     }
            //                 }
            //             });
            //     }
            // },
            //
            // updateContents: function (content) {
            //
            //     if ($stateParams.account_Id && $stateParams.role) {
            //         if ($scope.progressbar) $scope.progressbar.complete();
            //         $scope.progressbar = ngProgressBar.createInstance();
            //         $scope.progressbar.start();
            //
            //         var account_Id = ($scope.profile.edit.account_Id || 0) == 0 ? $stateParams.account_Id : $scope.profile.edit.account_Id;
            //         var role = ($scope.profile.edit.role || null) == null ? $stateParams.role : $scope.profile.edit.role;
            //
            //         var updateProfileContent = {
            //             account_Id: account_Id,
            //             role: role,
            //             about: null,
            //             workingHours: null
            //         };
            //
            //         if (content == 'about') updateProfileContent.about = $scope.contents.edit.about;
            //         if (content == 'workingHours') updateProfileContent.workingHours = $scope.contents.edit.workingHours;
            //
            //         accounts
            //             .updateContents(updateProfileContent)
            //             .then(function (updateContentsResponse) {
            //                 $scope.progressbar.complete();
            //
            //                 var responseDefaultState = {
            //                     data: {
            //                         type: 3,
            //                         status: updateContentsResponse.status,
            //                         texts: []
            //                     }
            //                 };
            //
            //                 var _toast = {};
            //
            //                 if (updateContentsResponse.status == 401) {
            //                     accounts.loadIdentity();
            //                     //.then(function () {
            //                     //    if (accounts.identity().Id == 0) accounts.sref({ state: 'app.account.log-in' });
            //                     //});
            //                 }
            //
            //                 if (updateContentsResponse.status == 200) {
            //
            //                     if (updateContentsResponse.data.type == 1) {
            //                         if (content == "about") {
            //                             $scope.responses.contents.about.data = updateContentsResponse.data;
            //                             $scope.contents.current.about = $.extend(true, {}, $scope.contents.edit.about);
            //                         }
            //
            //                         if (content == "workingHours") {
            //                             $scope.responses.contents.workingHours.data = updateContentsResponse.data;
            //                             $scope.contents.current.workingHours = $.extend(true, {}, $scope.contents.edit.workingHours);
            //                         }
            //
            //                         _toast = toastSuccess();
            //                     } else {
            //                         _toast = toastWarning();
            //                     }
            //
            //                     for (var m = 0; m < updateContentsResponse.data.texts.length; m++) {
            //                         _toast.content += "<span>" + updateContentsResponse.data.texts[m] + "</span>";
            //                     }
            //
            //                 } else {
            //                     if (content == "about") $scope.responses.contents.about = responseDefaultState;
            //                     if (content == "workingHours") $scope.responses.contents.workingHours = responseDefaultState;
            //
            //                     _toast = toastFailed();
            //                 }
            //
            //                 ngToast.create({
            //                     //dismissOnTimeout: false,
            //                     className: _toast.className,
            //                     content: _toast.content
            //                 });
            //
            //                 if (accounts.identity().Id == $stateParams.account_Id) {
            //                     $scope.editable = true;
            //                 }
            //
            //             });
            //     }
            // }
        };

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
        };

    }
})();
/* =============================================
 * App router configuration
 */
(function () {
    "use strict";
    angular
      .module("app")
      .run(run)
      .config(config);

    run.$inject = ["$rootScope", "$state", "$stateParams"];
    function run($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        //$rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
        //    $state.previous = fromState;
        //    $state.previous.params = fromParams;
        //});

        //$rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
        //    //document.body.scrollTop = document.documentElement.scrollTop = 0;
        //    var body = $("html, body");
        //    body.stop().animate({ scrollTop: 0 }, "500");
        //});
    }



    config.$inject = ["$locationProvider", "$stateProvider", "$urlRouterProvider", "$templateFactoryProvider", "data"];
    function config($locationProvider, $stateProvider, $urlRouterProvider, $templateFactoryProvider, data) {

        $locationProvider.hashPrefix("");
        $templateFactoryProvider.shouldUnsafelyUseHttp(true);

        //$locationProvider.html5Mode(true);

        $urlRouterProvider
            .otherwise("/customers");

        $stateProvider
            // >> Layouts
            // ================================================================
            .state("defaultLayout", {
                abstract: true,
                templateUrl: data.templates.getURL("layouts/aside"),
                controller: ["$scope", "data", "accounts", function ($scope, data, accounts) {
                    $scope.data = data;
                    $scope.accounts = accounts;
                }],
                resolve: {
                    loadAccounts: ["accounts", function (accounts) {
                        //return accounts.load();
                    }]
                }
            })

            .state("accounts", {
                url: "/accounts",
                parent: "defaultLayout",
                data: { title: "Profil" }
            })

            .state("account", {
                url: "/accounts/{account_Id:[0-9]{1,10}}",
                parent: "defaultLayout",
                data: { title: "Profil" }
            })

            .state("account.profile", {
                url: "/accounts/{account_Id:[0-9]{1,10}}/:role/:name?editProfile",

                controller: "profilesCtrl",
                templateUrl: function (params) {
                    return data.templates.getURL("profiles/" + params.role + "-profile" + (params.editProfile == "edit" ? "-edit" : ""));
                },

                parent: "defaultLayout",

                resolve: {
                    loadDependencies: ["$stateParams", "$ocLazyLoad", function ($stateParams, $ocLazyLoad) {
                        var srcs = $stateParams.editProfile == "edit" ? ["locations", "profiles", "summernote", "ngImgCrop"] : ["locations", "profiles"];
                        return $ocLazyLoad.load(ocLazyLoadSrcs(srcs));
                    }]
                }
            })

            .state("sign-in", {
                url: "/sign-in?returnState&returnStateParams",
                templateUrl: data.templates.getURL("accounts/sign-in"),
                controller: "accountsCtrl"
            })

            .state("customers", {
                url: "/customers",
                parent: "defaultLayout",
                templateUrl: data.templates.getURL("customers/customers"),
                controller: "customersCtrl",
                resolve: {
                    loadDependencies: ["$stateParams", "$ocLazyLoad", function ($stateParams, $ocLazyLoad) {
                        //var srcs = $stateParams.editProfile == "edit" ? ["locations", "profiles", "summernote", "ngImgCrop"] : ["locations", "profiles"];
                        var srcs = ["customers"];
                        return $ocLazyLoad.load(ocLazyLoadSrcs(srcs));
                    }]
                }
            })
            .state("customers.query", {
                url: "/query?id&storeId&name",
                templateUrl: data.templates.getURL("customers/query"),
                controller: "queryCtrl"
            })
            .state("admin", {
                url: "/admin",
                parent: "defaultLayout",
                templateUrl: data.templates.getURL("admin/admin"),
                controller: "adminCtrl",
                resolve: {
                    loadDependencies: ["$stateParams", "$ocLazyLoad", function ($stateParams, $ocLazyLoad) {
                        var srcs = ["admin"];
                        return $ocLazyLoad.load(ocLazyLoadSrcs(srcs));
                    }]
                }
            });

        function ocLazyLoadSrcs(srcs) {
            var value = [];
            srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
            angular.forEach(srcs, function (src) {
                angular.forEach(data.lazyLoadModules, function (module) {
                    if (module.name == src) {
                        src = module.module ? module.name : module.files;
                    }
                });
                value.push(src);
            });
            return value;
        }

        function loadDependencies(srcs, callback) {
            return ["$ocLazyLoad", "$q", function ($ocLazyLoad, $q) {
                var deferred = $q.defer();
                srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                var promise = deferred.promise;
                angular.forEach(srcs, function (src) {
                    promise = promise.then(function () {
                        angular.forEach(data.lazyLoadModules, function (module) {
                            if (module.name == src) {
                                src = module.module ? module.name : module.files;
                            }
                        });
                        return $ocLazyLoad.load(src);
                    });
                });
                deferred.resolve();
                return callback ? promise.then(function () { return callback(); }) : promise;
            }];
        }

    }

})();
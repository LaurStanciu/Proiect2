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

        $rootScope.loginDetails = {
            email: "",
            logged: false
        };
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
            .otherwise("/sign-in");

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
                data: {title: "Profil"}
            })

            .state("account", {
                url: "/accounts/{account_Id:[0-9]{1,10}}",
                parent: "defaultLayout",
                data: {title: "Profil"}
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

            .state("accounts.sign-in", {
                url: "/sign-in",
                parent: "defaultLayout",
                templateUrl: data.templates.getURL("accounts/sign-in"),
                controller: "accountsCtrl"
            })

            .state("accounts.sign-up", {
                url: "/sign-up",
                parent: "defaultLayout",
                templateUrl: data.templates.getURL("accounts/sign-up"),
                controller: "accountsCtrl"
            })

            .state("search", {
                url: "/search",
                parent: "defaultLayout",
                templateUrl: data.templates.getURL("search/search"),
                controller: "searchCtrl",
                resolve: {
                    loadDependencies: ["$stateParams", "$ocLazyLoad", function ($stateParams, $ocLazyLoad) {
                        //var srcs = $stateParams.editProfile == "edit" ? ["locations", "profiles", "summernote", "ngImgCrop"] : ["locations", "profiles"];
                        var srcs = ["search"];
                        return $ocLazyLoad.load(ocLazyLoadSrcs(srcs));
                    }]
                }
            })

            .state("tv", {
                url: "/tv",
                parent: "defaultLayout",
                templateUrl: data.templates.getURL("tv/tv"),
                controller: "tvCtrl",
                resolve: {
                    loadDependencies: ["$stateParams", "$ocLazyLoad", function ($stateParams, $ocLazyLoad) {
                        //var srcs = $stateParams.editProfile == "edit" ? ["locations", "profiles", "summernote", "ngImgCrop"] : ["locations", "profiles"];
                        var srcs = ["tv"];
                        return $ocLazyLoad.load(ocLazyLoadSrcs(srcs));
                    }]
                }
            })
            .state("mobiles", {
                url: "/mobiles",
                parent: "defaultLayout",
                templateUrl: data.templates.getURL("mobiles/mobiles"),
                controller: "mobilesCtrl",
                resolve: {
                    loadDependencies: ["$stateParams", "$ocLazyLoad", function ($stateParams, $ocLazyLoad) {
                        //var srcs = $stateParams.editProfile == "edit" ? ["locations", "profiles", "summernote", "ngImgCrop"] : ["locations", "profiles"];
                        var srcs = ["mobiles"];
                        return $ocLazyLoad.load(ocLazyLoadSrcs(srcs));
                    }]
                }
            })
            .state("laptops", {
                url: "/laptops",
                parent: "defaultLayout",
                templateUrl: data.templates.getURL("laptops/laptops"),
                controller: "laptopsCtrl",
                resolve: {
                    loadDependencies: ["$stateParams", "$ocLazyLoad", function ($stateParams, $ocLazyLoad) {
                        //var srcs = $stateParams.editProfile == "edit" ? ["locations", "profiles", "summernote", "ngImgCrop"] : ["locations", "profiles"];
                        var srcs = ["laptops"];
                        return $ocLazyLoad.load(ocLazyLoadSrcs(srcs));
                    }]
                }
            })
            .state("laptops.query", {
                url: "/query?description",
                templateUrl: data.templates.getURL("laptops/query"),
                controller: "queryCtrl"
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
                return callback ? promise.then(function () {
                    return callback();
                }) : promise;
            }];
        }

    }

})();
(function () {
    "use strict";
    angular
        .module("app")
        .factory("accounts", accounts);

    accounts.$inject = ["$rootScope","$http", "data", "$location", "$state"];
    function accounts($rootScope,$http, data, $location, $state) {

        var accountsData = {
            identity: {},
            contents: null
        };

        var resources = {

            identity: function () {
                var identityURL = data.location.newURL(true, { api: "api", controller: "accounts", action: "identity" });
                return $http.post(identityURL).then(function (loadIdentityResponse) {
                    return loadIdentityResponse;
                }, function (errResponse) { return errResponse; });
            },

            signOut: function () {
                $rootScope.loginDetails.email = "";
                $rootScope.loginDetails.logged = false;
                $state.go("accounts.sign-in");
            },

            signUp: function (fromBody) {
                var signUpURL = data.location.newURL(true, { api: "api", controller: "accounts", action: "sign-Up" });
                return $http.post(signUpURL, fromBody).then(function (signUpResponse) {
                    return signUpResponse;
                }, function (errResponse) { return errResponse; });
            },

            signIn: function (fromBody) {
                var signInURL = data.location.newURL(true, { api: "api", controller: "accounts", action: "sign-in" });
                return $http.post(signInURL, fromBody)
                    .then(function (signInResponse) {
                        return signInResponse;
                    }, function (errResponse) { return errResponse; });
            },

            getContents: function (fromRoute, fromQuery) {
                var _fromRoute = $.extend({}, { id: 0 }, fromRoute);
                var _fromQuery = $.extend({},
                    {
                        role: null,
                        country: null,
                        language: null
                    }, fromQuery);
                var getContentsURL = data.location.newURL(true, { api: "api", controller: "accounts", id: _fromRoute.id, segments: ["contents"] }, _fromQuery);
                return $http.get(getContentsURL).then(function (getContentsResponse) {
                    return getContentsResponse;
                }, function (errResponse) { return errResponse; });
            },

            updateContents: function (fromRoute, fromQuery, fromBody) {
                var _fromRoute = $.extend({}, { id: 0 }, fromRoute);
                var _fromQuery = $.extend({},
                    {
                        role: null,
                        country: null,
                        language: null
                    }, fromQuery);
                var updateProfileURL = data.location.newURL(true, { api: "api", controller: "accounts", id: _fromRoute.id, segments: ["contents"] }, _fromQuery);
                return $http.post(updateProfileURL, fromBody).then(function (updateProfileResponse) {
                    return updateProfileResponse;
                }, function (errResponse) { return errResponse; });
            }

        };

        var value = {};
        value.identity = function () { return $rootScope.loginDetails.email; };

        value.loadIdentity = function () {
            return resources.identity()
                .then(function (loadIdentityResponse) {
                    if (loadIdentityResponse.status == 200) accountsData.identity = $.extend(true, {}, loadIdentityResponse.data);
                    return loadIdentityResponse;
                });
        };

        value.isAuthenticated = function () {
            return $rootScope.loginDetails.logged;
        };

        value.signIn = function (fromBody) {
            return resources
                .signOut()
                .then(function (signOutResponse) {
                    accountsData.identity = {};
                    return resources.signIn(fromBody);
                })
                .then(function (signInResponse) {
                    return signInResponse;
                });
        };

        value.signUp = function (fromBody) {
            return resources
                .signOut()
                .then(function (signOutResponse) {
                    return resources.signUp(fromBody);
                }).then(function (signUpResponse) {
                    return signUpResponse;
                });
        };

        value.signOut = function () {
            $rootScope.loginDetails.email = "";
            $rootScope.loginDetails.logged = false;
            $state.go("accounts.sign-in");
        };

        value.sref = function (options) {
            var _options = $.extend(true, {}, {
                state: "sign-in"
            }, options);
            var srefReturnState = $location.search().returnState;
            var srefReturnStateParams = $location.search().returnStateParams;

            srefReturnState = srefReturnState ? srefReturnState : encodeURIComponent($state.current.name);
            srefReturnStateParams = srefReturnStateParams ? srefReturnStateParams : encodeURIComponent(JSON.stringify($state.params));

            $state.go(_options.state, { returnState: srefReturnState, returnStateParams: srefReturnStateParams }, { reload: true, notify: true });
        };

        value.getContents = function () {
            return $rootScope.loginDetails.email;
        };

        value.updateContents = function (fromRoute, fromQuery, fromBody) {
            return resources.updateContents(fromRoute, fromQuery, fromBody).then(function (updateContentsResponse) {
                return updateContentsResponse;
            });
        };


        //value
        //    .loadIdentity()
        //    .then(function () {
        //        value.loadContents();
        //    });

        value.load = function (reload) {
            if (reload || accountsData.identity.Id == null) {
                return value.loadIdentity();
            }
        };

        return value;
    }

})();
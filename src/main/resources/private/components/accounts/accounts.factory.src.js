﻿(function () {
    "use strict";
    angular
        .module("app")
        .factory("accounts", accounts);

    accounts.$inject = ["$http", "data", "$location", "$state"];
    function accounts($http, data, $location, $state) {

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
                var signOutURL = data.location.newURL(true, { api: "api", controller: "accounts", action: "signOut" });
                return $http.post(signOutURL).then(function (signOutResponse) {
                    return signOutResponse;
                }, function (errResponse) { return errResponse; });
            },

            signUp: function (fromBody) {
                var signUpURL = data.location.newURL(true, { api: "api", controller: "accounts", action: "sign-Up" });
                return $http.post(signUpURL, fromBody).then(function (signUpResponse) {
                    return signUpResponse;
                }, function (errResponse) { return errResponse; });
            },

            signIn: function (fromBody) {
                var signInURL = data.location.newURL(true, { api: "api", controller: "accounts", action: "sign-In" });
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
        value.identity = function () { return accountsData.identity; };

        value.loadIdentity = function () {
            return resources.identity()
                .then(function (loadIdentityResponse) {
                    if (loadIdentityResponse.status == 200) accountsData.identity = $.extend(true, {}, loadIdentityResponse.data);
                    return loadIdentityResponse;
                });
        };

        value.isAuthenticated = function () {
            return accountsData.identity.Id != 0 && accountsData.identity.Id != null;
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
            return resources.signOut()
                .then(function (signOutResponse) {
                    accountsData.identity = {};
                    //$state.go("app.account.log-out");
                    return signOutResponse;
                })
                .then(function () {
                    setTimeout(function () { window.location.reload(false); }, 100);
                });
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

        value.getContents = function (fromRoute, fromQuery) {
            return resources.getContents(fromRoute, fromQuery).then(function (getContentsResponse) {
                return getContentsResponse;
            });
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
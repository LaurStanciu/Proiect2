(function () {
    "use strict";

    angular
        .module("app",
        /* =============================================
         * App dependencies
         */
        [
            "ngCookies",
            "ngProgress",
            "ngResource",
            "ngSanitize",
            "oc.lazyLoad",
            "ui.router",
            "ngToast"
        ])
        .constant("data", (function () {

            var project = {
                name: "MCES",
                Hosts: {
                    Statics: ""
                },
                Country: "RO",
                Countries: [],
                Language: "ro",
                Languages: []
            };

            project.Hosts.Statics = ''; // $("meta[name=\"statics\"]").attr("content");

            var templates = [
                 { template: "layout/nav", version: "" },
                 { template: "layout/footer", version: "" },
                 { template: "default/index", version: "" }
            ];

            var lazyLoadModules = [
                {
                    name: "admin",
                    module: true,
                    files: [
                        project.Hosts.Statics + "/components/admin/admin.min.js"
                    ]
                },
                {
                    name: "customers",
                    module: true,
                    files: [
                        project.Hosts.Statics + "/components/customers/customers.min.js"
                    ]
                },
                {
                    name: "summernote",
                    module: true,
                    files: [
                        project.Hosts.Statics + "/assets/summernote/v0.8.2/summernote.css",
                        project.Hosts.Statics + "/assets/summernote/v0.8.2/summernote.min.js",
                        project.Hosts.Statics + "/assets/angularjs/summernote/angular-summernote.min.js"
                    ]
                }
            ];

            var _data = {};

            _data.patterns = {};
            _data.patterns.regExp = {};
            _data.patterns.regExp.time = "^(?:0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$";

            _data.project = project;
            _data.lazyLoadModules = lazyLoadModules;

            //  templates
            //  ====================================================================
            _data.templates = {};
            _data.templates.getURL = function (template) {
                var value = project.Hosts.Statics + "/components/" + template;
                for (var t = 0; t < templates.length; t++) {
                    if (templates[t].template.toUpperCase() == template.toUpperCase()) {
                        var tVersion = (templates[t].version || "").length > 0 ? "." + templates[t].version : "";
                        value += tVersion;
                        break;
                    }
                }
                return value + ".htm";
            };


            _data.files = {};
            _data.files.getURL = function (projectFile, name) {
                return project.Hosts.Statics + (projectFile ? project.name + "/" : "") + name;
            };

            //  location (window.location)
            //  ====================================================================
            _data.location = {};
            _data.location.getRoute = function () {
                var value = { controller: null, action: null, id: null };
                var urlPath = window.location.pathname;
                try {
                    var s = urlPath.split("/");
                    if (s.length > 1) value.controller = s[1];
                    if (s.length > 2) value.action = s[2];
                    if (s.length > 3) value.id = s[3];
                    if (s.length > 4) {
                        value.segments = [];
                        for (var i = 4; i < s.length; i++) value.segments.push(s[i]);
                    }
                } catch (e) {
                    console.log(e);
                }

                return value;
            };

            _data.location.newRoute = function (autocomplete, route) {
                var _autocomplete = autocomplete == true;
                var _route = _autocomplete ? _data.location.getRoute() : route;
                var value = $.extend(true, {}, {
                    api: _route.api || null,
                    controller: _route.controller || null,
                    action: _route.action || null,
                    id: _route.id || null,
                    segments: route.segments || null
                }, route);

                return value;
            };

            _data.location.newURL = function (autocomplete, route, queryString) {
                var _route = _data.location.newRoute(autocomplete, route);
                var segments = [];
                //segments.push(window.location.protocol + "//" + window.location.hostname + ":" + window.location.port);
                if (_route.api != null) segments.push(_route.api);
                if (_route.controller != null) segments.push(_route.controller);
                if (_route.action != null) segments.push(_route.action);
                if (_route.id != null) segments.push(_route.id);
                if (_route.segments != null) segments.push(_route.segments);

                var _queryString = [];
                queryString = queryString || null;
                if (queryString != null) {
                    for (var prop in queryString) {
                        if (queryString[prop] && queryString[prop] != null) {

                            if (typeof queryString[prop] === "object") {
                                for (var i = 0; i < queryString[prop].length; i++) {
                                    _queryString.push(prop + "=" + queryString[prop][i]);
                                }
                            } else {
                                _queryString.push(prop + "=" + queryString[prop]);
                            }
                        }
                    }
                }

                return "/" + segments.join("/") + (_queryString.length > 0 ? "?" + _queryString.join("&") : "");
            };

            _data.text = {};
            _data.text.toFriendlyURL = function (nonFriendlyURLText) {
                if (nonFriendlyURLText != null && nonFriendlyURLText.length > 0) return nonFriendlyURLText.replace(/[^0-9a-zA-Z]/g, '-');
                return null;
            };

            _data.text.toHTML = function (content) {
                if (content) {
                    return content.replace(/\r?\n/g, "<br />");
                }
            };

            //  return
            //  ====================================================================
            return _data;

        })());

})();
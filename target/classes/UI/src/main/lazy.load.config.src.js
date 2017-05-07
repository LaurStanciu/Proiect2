/* =============================================
 * App lazy load config
 */
(function () {
    "use strict";
    angular
        .module("app")
        .config(["$ocLazyLoadProvider", "data", function ($ocLazyLoadProvider, data) {
            $ocLazyLoadProvider.config({
                debug: false,
                events: false,
                modules: data.lazyLoadModules
            });
        }]);
})();
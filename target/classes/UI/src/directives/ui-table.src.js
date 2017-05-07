(function () {
    "use strict";
    angular
      .module("app")
      .directive("uiRow", uiRow);
    function uiRow() {
        var directive = {
            restrict: "AC",
            link: link
        };
        return directive;
    }
    function link(scope, el, attr) {
        el.bind("click", function (e) {
            var table = angular.element(el).parent();
            console.log(table);
            var active = table.parent()[0].querySelectorAll(".active");
            el.toggleClass("active");
            angular.element(active).removeClass("active");
        });
    }
})();

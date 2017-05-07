(function () {
    "use strict";
    angular
      .module("app")
      .directive("uiToggleClass", uiToggleClass);
    function uiToggleClass() {
        var directive = {
            restrict: "AC",
            link: link
        };
        return directive;
    }
    function link(scope, el, attr) {
        el.bind("click", function (e) {
            var $this = el;
            var classes = attr.toggleClass.split(","),
                targets = (attr.toggleTarget && attr.toggleTarget.split(",")),
                key = 0;

            $.each(classes, function (index, value) {
                var target = targets[(targets.length && key)];
                $(target).toggleClass(classes[index]);
                key++;
            });

            $this.toggleClass("active");
        });
    }
})();
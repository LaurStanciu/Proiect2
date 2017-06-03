/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

"use strict";

var gulp = require("gulp"),
    del = require("del"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    watch = require("gulp-watch");

var paths = {
    public: "./src/main/resources/public/wwwroot/",
    private: "./src/main/resources/private/"
}
paths.assetsPath = paths.public + "assets/";
paths.angularPaths = paths.assetsPath + "angular/";
paths.componentsPrivate = paths.private + "components/";
paths.componentsPublic = paths.public + "components/";

var cleanPaths = {
    CSS: [],
    JS: []
};

// clean paths for js files

cleanPaths.JS.push(paths.public + "app/**/*.js");
cleanPaths.JS.push(paths.public + "components/**/*.js");
cleanPaths.JS.push(paths.public + "directives/**/*.js");

// clean paths for css files

cleanPaths.CSS.push(paths.public + "app/**/*.css");


var minPath = {
    APPJS: [],
    jQuery: [],
    componentsJs: {
        accounts: [],
        search: []
    },
    CSS: []
}

//minify paths for app.js

minPath.APPJS.push(paths.angularPaths + "angular-resource.js");
minPath.APPJS.push(paths.angularPaths + "angular-sanitize.js");
minPath.APPJS.push(paths.angularPaths + "angular-ui-router-0.4.2.js");
minPath.APPJS.push(paths.angularPaths + "angular-cookies.js");
minPath.APPJS.push(paths.angularPaths + "oclazyload/dist/oclazyload.js");
minPath.APPJS.push(paths.angularPaths + "ngprogress/ngprogress.js");
minPath.APPJS.push(paths.angularPaths + "toast/ngToast.js");
minPath.APPJS.push(paths.angularPaths + "ngDialog/*.js");
minPath.APPJS.push(paths.private + "main/*.js");
minPath.APPJS.push(paths.private + "directives/*.js");
minPath.APPJS.push(paths.private + "components/accounts/*.js");
minPath.APPJS.push(paths.angularPaths + "ui-bootstrap.js");
//minify paths for jquery-bootstrap.js
minPath.jQuery.push(paths.assetsPath + "jquery/jquery-3.1.1.min.js");
minPath.jQuery.push(paths.assetsPath + "tether/dist/js/tether.min.js");
minPath.jQuery.push(paths.assetsPath + "bootstrap/js/bootstrap.min.js");
minPath.jQuery.push(paths.assetsPath + "plainJS/autoComplete/auto-complete.min.js");

//minify paths for components js files
minPath.componentsJs.accounts.push(paths.componentsPrivate + "accounts/*.js");
//min for login

minPath.componentsJs.search.push(paths.componentsPrivate + "search/*.js");

//min for css
minPath.CSS.push(paths.assetsPath + "bootstrap/css/bootstrap.css");
minPath.CSS.push(paths.assetsPath + "angular/toast/ngToast.css");
minPath.CSS.push(paths.assetsPath + "angular/toast/ngToast-animation.css");
minPath.CSS.push(paths.assetsPath + "angular/ngProgress/ngProgress.css");
minPath.CSS.push(paths.assetsPath + "angular/ngDialog/*.css")

///////////////////////////////////////////////clean tasks////////////////////////////////

gulp.task("clean:js", function () {
    return del(cleanPaths.JS);
});

gulp.task("clean:css", function () {
    return del(cleanPaths.CSS);
});

////////////////////////////////////////////clean general task////////////////////////////
var cleanTasks = [];
cleanTasks.push("clean:js");
cleanTasks.push("clean:css");

gulp.task("clean", cleanTasks);

////////////////////////////////////////////////min tasks/////////////////////////////////

gulp.task("min:appjs", function () {
    return gulp.src(minPath.APPJS)
        .pipe(concat("app.js"))
        .pipe(uglify({ mangle: { except: ['angular', 'jQuery']} } ))
        .pipe(gulp.dest(paths.public + "app/js/"));
});

gulp.task("min:jquery-bootstrap", function () {
    return gulp.src(minPath.jQuery)
        .pipe(concat("jquery-bootstrap.js"))
        .pipe(uglify({ mangle: { except: ['jQuery'] } }))
        .pipe(gulp.dest(paths.public + "app/js/"));
});

gulp.task("min:accounts", function () {
    return gulp.src(minPath.componentsJs.accounts)
        .pipe(concat("accounts.min.js"))
        .pipe(uglify({ mangle: { except: ['angular'] } }))
        .pipe(gulp.dest(paths.componentsPublic + "accounts/"));
});

gulp.task("min:search", function () {
    return gulp.src(minPath.componentsJs.search)
        .pipe(concat("search.min.js"))
        .pipe(uglify({ mangle: { except: ['angular'] } }))
        .pipe(gulp.dest(paths.componentsPublic + "search/"));
});

gulp.task("min:css", function () {
    return gulp.src(minPath.CSS)
        .pipe(concat("base.css"))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.public + "app/css/"));
});

var minComponentsTasks = [];
minComponentsTasks.push("min:accounts");
minComponentsTasks.push("min:search");

var minTasks = [];
minTasks.push("min:appjs");
minTasks.push("min:jquery-bootstrap");
minTasks.push("min:components");
minTasks.push("min:css");

//min general tasks

gulp.task("min:components", minComponentsTasks);

gulp.task("min", minTasks);

//watch tasks

gulp.task("watch:css", function () {
    gulp.watch(paths.private + "components/**/*.css", ["min:css"]);
});

gulp.task("watch:componentsJS", function () {
    gulp.watch(paths.private + "components/**/*.js", ["min:components"]);
});

gulp.task("watch:appJs", function () {
    gulp.watch(minPath.APPJS, ["min:appjs"]);
});

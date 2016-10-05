'use strict';
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    openURL = require('open'),
    lazypipe = require('lazypipe'),
    rimraf = require('rimraf'),
    wiredep = require('wiredep').stream,
    runSequence = require('run-sequence'),
    templateCache = require('gulp-angular-templatecache');

var app = {
    src: 'app',
    lib: 'app/bower_components',
    dist: 'dist',
    temp: 'app/temp'
};

var paths = {
    scripts: [app.src + '/**/*.js'],
    styles: [app.src + '/**/*.scss'],
    view: app.src + '/index.html',
    templates: [app.src + '/*/*.html']
};

/************
 * Reusable pipelines
 ************/
var lintScripts = lazypipe()
    .pipe($.jshint, '.jshintrc')
    .pipe($.jshint.reporter, 'jshint-stylish');

var styles = lazypipe()
    .pipe($.sass, {
        outputStyle: 'expanded',
        precision: 10
    })
    .pipe($.autoprefixer, 'last 1 version')
    .pipe(gulp.dest, app.temp + '/styles');

/************
 * Tasks
 ************/
gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(styles());
});

gulp.task('lint:scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(lintScripts());
});

gulp.task('cache:templates', function () {
    return gulp.src(paths.templates)
        .pipe(templateCache('templates.js', {module: 'snakes-ladder'}))
        .pipe(gulp.dest(app.temp + '/scripts'));
});

gulp.task('clean:tmp', function (cb) {
    rimraf('./' + app.temp, cb);
});

gulp.task('start:client', ['start:server', 'styles', 'cache:templates'], function () {
    openURL('http://localhost:9000');
});

gulp.task('start:server', function () {
    $.connect.server({
        root: [app.src],
        livereload: true,
        // Change this to '0.0.0.0' to access the server from outside.
        port: 9000
    });
});

gulp.task('watch', function () {
    $.watch(paths.styles)
        .pipe($.plumber())
        .pipe(styles())
        .pipe($.connect.reload());

    $.watch(paths.templates)
        .pipe($.plumber())
        .pipe($.connect.reload());

    $.watch(paths.scripts)
        .pipe($.plumber())
        .pipe(lintScripts())
        .pipe($.connect.reload());

    gulp.watch('bower.json', ['bower']);
});

gulp.task('serve', function (cb) {
    runSequence('clean:tmp',
        ['lint:scripts'],
        ['start:client'],
        'watch', cb);
});

gulp.task('serve:prod', function () {
    $.connect.server({
        root: [app.dist],
        livereload: true,
        port: 9001
    });
});

// inject bower components
gulp.task('bower', function () {
    return gulp.src(paths.view)
        .pipe(wiredep({
            directory: app.lib,
            ignorePath: '../' + app.lib + '/'
        }))
        .pipe(gulp.dest(app.src));
});

/************
 * Build
 ************/
gulp.task('clean:dist', function (cb) {
    rimraf('./' + app.dist, cb);
});

gulp.task('client:build', ['styles', 'cache:templates'], function () {
    var jsFilter = $.filter([app.src + '**/*.js'], {restore: true});
    var cssFilter = $.filter([app.temp + '**/*.css'], {restore: true});

    return gulp.src(paths.view)
        .pipe($.useref({searchPath: [app.src, app.temp, app.lib]}))
        .pipe(jsFilter)
        // .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.minifyCss({cache: true}))
        .pipe(cssFilter.restore)
        // .pipe($.rev())
        // .pipe($.revReplace())
        .pipe(gulp.dest(app.dist));
});

gulp.task('copy:extras', function () {
    return gulp.src(app.src + '/*/.*', {dot: true})
        .pipe(gulp.dest(app.dist));
});

gulp.task('build', ['clean:dist', 'clean:tmp'], function () {
    runSequence(['copy:extras', 'client:build']);
});

gulp.task('default', ['build']);

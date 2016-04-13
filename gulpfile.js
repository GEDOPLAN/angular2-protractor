//dependencies
var gulp = require('gulp');
var util = require('gulp-util');
var SystemBuilder = require('systemjs-builder');
var watch = require('gulp-watch');
var ts = require('gulp-typescript');
var tsConfig = require('./tsconfig.json');
var connect = require('gulp-connect');
var rimraf = require('gulp-rimraf');
var sourcemaps = require('gulp-sourcemaps');
var angularProtractor = require('gulp-angular-protractor');
var gulpProtractorAngular = require('gulp-angular-protractor');
var modRewrite = require('connect-modrewrite');
var fs = require('fs');

//Typescript Config;
var tsProject = ts.createProject(tsConfig.compilerOptions);

//copy dependencies to dist folder
gulp.task('copy:deps', function () {
    gulp.src([
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/http.js',
        'node_modules/angular2/bundles/router.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/systemjs/dist/system.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/jquery/dist/jquery.js',
    ]).pipe(gulp.dest('dist/vendor'));

    //vendor css
    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/font-awesome/css/font-awesome.css'
    ])
            .pipe(gulp.dest('dist/vendor/assets/css'))

    //template
    gulp.src([
        'src/app/assets/template/**',
    ])
            .pipe(gulp.dest('dist/app/assets/template'))


    //vendor fonts
    return gulp.src([
        'node_modules/bootstrap/dist/fonts/**',
        'node_modules/font-awesome/fonts/**'
    ])
            .pipe(gulp.dest('dist/vendor/assets/fonts'))


});

//copy html/css/js files
gulp.task('copy:src', function () {
    return gulp.src([
        'src/bootstrap.js',
        'src/index.html',
        'src/**/*.html',
        'src/**/*.css'
    ])
            .pipe(gulp.dest('dist'))
            .pipe(connect.reload());
});

//clean the dist folder
gulp.task('clean', function (cb) {
    rimraf('./dist', cb);
})

//compile app typescript files
gulp.task('compile:app', function () {
    return gulp.src('src/**/*.ts')
            .pipe(sourcemaps.init())
            .pipe(ts(tsProject))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./dist'))
            .pipe(connect.reload());
});

//compile app typescript files
gulp.task('compile:test', function () {
    return gulp.src('test/**/*.ts')
            .pipe(sourcemaps.init())
            .pipe(ts(tsProject))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./test'))
            .pipe(connect.reload());
});


//live reload server
gulp.task('test', ['server:test'], function () {
    gulp.src(['test/**/*.ts'])
            .pipe(gulpProtractorAngular({
                'configFile': 'test/conf.js',
                'debug': false,
                'autoStartStopServer': true
            }))
            .on('error', function (e) {
                console.log(e);
            })
            .on('end', function (e) {
                console.log("Test-Finished");
                connect.serverClose();
            });
});

//live reload server
gulp.task('server', ['copy:deps', 'copy:src', 'compile:app'], function () {
    connect.server({
        root: 'dist',
        livereload: true,
        fallback: 'dist/index.html',
        port: 3000,
        middleware: function () {
            return [
                modRewrite([
                    '^/rest/posts/(.*)$ http://jsonplaceholder.typicode.com/posts/$1 [P]'
                ])
            ];
        }
    });
});


var endpoints_conf = require('./test/endpoint.config.json');

gulp.task('server:test', ['copy:deps', 'copy:src', 'compile:app'], function () {
    connect.server({
        root: 'dist',
        fallback: 'dist/index.html',
        port: 3000,
        middleware: function (connect, options) {
            var middlewares = [];
            middlewares.push(function (req, res, next) {
                var endpoints = endpoints_conf;
                var match = false;
                var fileToRead = "";
                
                Object.keys(endpoints).forEach(function (url) {
                    if (req.url.indexOf(url) == 0) {
                        match = true;
                        fileToRead = endpoints[url];
                    }
                });

                if (match == false) {
                    return next();
                }

                res.end(fs.readFileSync(fileToRead));
            });

            return middlewares;
        }
    });
});


//default task
gulp.task('default', ['server'], function () {
    gulp.watch(['src/**/*.ts'], ['compile:app']);
    gulp.watch(['src/**/.js', 'src/**/*.html', 'src/**/*.css'], ['copy:src']);
});

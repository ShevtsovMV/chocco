const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const { SRC_PATH, DIST_PATH, STYLES_LIBS } = require('./gulp.config');

sass.compiler = require('node-sass');

task("clean", () => {
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task("copy:html", () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({ stream: true }));
});

task("copy:images", () => {
  return src(`${SRC_PATH}/images/**/*`)
    .pipe(dest(`${DIST_PATH}/images`));
});

task("copy:video", () => {
  return src(`${SRC_PATH}/video/**/*`)
    .pipe(dest(`${DIST_PATH}/video`));
});

task("styles", () => {
  return src([...STYLES_LIBS, `${SRC_PATH}/styles/main.scss`])
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.scss"))
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(gulpif(env === "prod", autoprefixer({
      cascade: false
    })))
    .pipe(gulpif(env === "prod", cleanCSS()))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/css`));
});

task("scripts", () => {
  return src(`${SRC_PATH}/js/*.js`)
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.js", { newLine: ";" }))
    .pipe(gulpif(env === "prod", babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === "prod", uglify()))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/js`));
});

task("server", () => {
  browserSync.init({
    server: {
      baseDir: `${DIST_PATH}`
    },
    open: false
  });
});

task("watch", () => {
  watch(`${SRC_PATH}/styles/**/*.scss`, series('styles'));
  watch(`${SRC_PATH}/*.html`, series('copy:html'));
  watch(`${SRC_PATH}/js/*.js`, series('scripts'));
});


task(
  "default",
  series(
    "clean", parallel("copy:html", "copy:images", "copy:video", "styles", "scripts"),
    parallel("watch", "server")
  )
);

task(
  "build",
  series("clean", parallel("copy:html", "copy:images", "copy:video", "styles", "scripts"))
);
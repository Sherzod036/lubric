const buildf = 'build',
  srcf = 'src';

let path = {
  build: {
    html: `${buildf}/`,
    css: `${buildf}/css/`,
    js: `${buildf}/js/`,
    img: `${buildf}/img/`,
    fonts: `${buildf}/fonts/`,
  },
  src: {
    html: [`${srcf}/*.html`, `!${srcf}/_*.html`],
    css: `${srcf}/scss/**/*.scss`,
    js: `${srcf}/js/script.js`,
    img: `${srcf}/img/**/*.*`,
    fonts: `${srcf}/fonts/**/*.ttf`,
  },
  watch: {
    html: `${srcf}/**/*.html`,
    css: `${srcf}/scss/**/*.scss`,
    js: `${srcf}/js/**/*.js`,
    img: `${srcf}/img/**/*.*`,
  },
  clean: `./${buildf}/`,
};

const { src, dest } = require('gulp'),
  gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  fileInclude = require('gulp-file-include'),
  del = require('del'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCss = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  strip = require('gulp-strip-comments'),
  uglify = require('gulp-uglify-es').default,
  imagemin = require('gulp-imagemin'),
  webp = require('gulp-webp'),
  webpHtml = require('gulp-webp-html'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  stylelint = require('gulp-stylelint');

function serve() {
  browserSync.init({
    server: {
      baseDir: `./${buildf}/`,
    },
    port: 3000,
    notify: false,
  });
}

function bundlecss() {
  return src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/bootstrap/dist/css/bootstrap-grid.css',
    path.src.css,
  ])
    .pipe(scss())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: false,
      })
    )
    .pipe(concat('bundle.min.css'))
    .pipe(cleanCss({ level: { 1: { specialComments: 0 } } }))
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream());
}

function styleLint() {
  return src(path.src.css).pipe(
    stylelint({
      reporters: [{ formatter: 'string', console: true }],
    })
  );
}

function bundlejs() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/jquery-lazyload/jquery.lazyload.js',
    'node_modules/gsap/dist/gsap.js',
    path.src.js,
  ])
    .pipe(concat('bundle.min.js'))
    .pipe(strip())
    .pipe(uglify())
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream());
}

function markup() {
  return src(path.src.html)
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(webpHtml())
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}

function pic() {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 70,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3,
      })
    )
    .pipe(dest(path.build.img));
}

function font() {
  src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts));
  return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
}

function observe() {
  gulp.watch([path.watch.css], bundlecss);
  gulp.watch([path.watch.js], bundlejs);
  gulp.watch([path.watch.html], markup);
  gulp.watch([path.watch.img], pic);
}

function clean() {
  return del(path.clean);
}

const build = gulp.series(
  clean,
  gulp.parallel(bundlecss, bundlejs, markup, pic, font)
);
const watch = gulp.parallel(build, observe, serve);

exports.styleLint = styleLint;
exports.fonts = font;
exports.img = pic;
exports.html = markup;
exports.js = bundlejs;
exports.css = bundlecss;
exports.build = build;
exports.watch = watch;
exports.default = watch;

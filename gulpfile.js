"use strict"
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');


gulp.task('sprite', () => {
	let spriteData = gulp.src('public/img/icons/*.png')
		.pipe(spritesmith({
			imgPath: '../img/sprite.png',
			imgName: 'sprite.png',
			cssName: '_sprite.sass',
			cssFormat: 'sass',
			padding: 5
		}))
	return merge(spriteData.img.pipe(gulp.dest('public/img/')),
		spriteData.css.pipe(gulp.dest('app/sass/')));
});

gulp.task('removedist', () => del(['dist']));

gulp.task('imagemin', () =>
	gulp.src('public/img/**')
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('dist/img'))
);

gulp.task('pug', () =>
	gulp.src('app/pages/*.pug')
		.pipe(pug({
				pretty: true,
		}))
		.pipe(gulp.dest('public'))
		.pipe(browserSync.reload({stream: true}))
);

gulp.task('sass', () =>
	gulp.src(['app/sass/**/*.sass', 'app/blocks/**/*.sass'])
		.pipe(sass())
		.pipe(rename({suffix: '.min'}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.reload({stream: true}))
);

gulp.task('vendors', () =>
	gulp.src([
		'app/vendors/jquery/dist/jquery.min.js',
		'app/vendors/jquery.fullpage/jquery.fullpage.min.js',
		'app/vendors/owl.carousel/owl.carousel.min.js',
		'app/vendors/jquery.fancybox/jquery.fancybox.min.js',
		'app/vendors/jquery.waypoints/jquery.waypoints.js',
		'app/vendors/jquery.counterup/jquery.counterup.min.js',
		'app/vendors/inputmask/inputmask.min.js'
		])
		.pipe(concat('vendors.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'))
);

gulp.task('watch', () => {
	gulp.watch(['app/sass/**/*.sass', 'app/blocks/**/*.sass'], gulp.series('sass'));
	gulp.watch('public/js/*.js', browserSync.reload);
	gulp.watch(['app/blocks/**/*.pug', 'app/pages/*.pug'], gulp.series('pug'));
});

gulp.task('serve', () => {
	browserSync.init({
		server: {
			baseDir: 'public'
		},
		open: 0
	})
	browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev',
	gulp.series('pug', 'sass', 'vendors', gulp.parallel('watch', 'serve'))
);

gulp.task('build',
	gulp.series('removedist', 'imagemin', () =>
		merge(gulp.src('public/*.html').pipe(gulp.dest('dist')),
			gulp.src('public/css/*.css').pipe(gulp.dest('dist/css')),
			gulp.src('public/js/*.js').pipe(gulp.dest('dist/js')),
			gulp.src('public/fonts/**').pipe(gulp.dest('dist/fonts'))
		)
));

gulp.task('default', gulp.series('dev'));

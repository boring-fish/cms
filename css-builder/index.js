#!/usr/bin/env node
const fs = require('fs');
const del = require('del');
const ora = require('ora');
const path = require('path');
const gulp = require('gulp');
const less = require('gulp-less');
const guap = require('gulp-append-prepend');
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const through = require('through2');
const lessNpm = require('less-plugin-npm-import');

const input = path.resolve(__dirname, 'themes');
const output = path.resolve(__dirname, '../public/assets/themes/');

const commonRemoveList = [
  `@font-face{font-family:"Ionicons";src:url(./fonts/ionicons.woff2?v=3.0.0) format("woff2"),url(./fonts/ionicons.woff?v=3.0.0) format("woff"),url(./fonts/ionicons.ttf?v=3.0.0) format("truetype"),url(./fonts/ionicons.svg?v=3.0.0#Ionicons) format("svg");font-weight:400;font-style:normal}`,
  [/font-family\s*\:\s*(\'?\"?)\s*Ionicons\s*(\'?\"?)\s*\;/g, ''],
  [/(background-image|background)(\:url\(\S*)\)/g, ''],
  [/(\:\s*?(rgb|RGB|rgba|RGBA)\(\s*?(0*?.*?[0-9]{1,3},*?\s*?)*?\))/g, '$1!important'],
  [/(\:\s*?(\#[a-f|0-9]{3,6})|(transparent))/g, '$1!important']
];

const remove = removeStrList => {
  if (!(removeStrList instanceof Array)) {
    removeStrList = [];
  }

  return through.obj(function(file, enc, cb) {
    let src = file.contents.toString();

    for (let i = 0; i < removeStrList.length; i++) {
      let r = removeStrList[i];
      if (typeof r === typeof 's') {
        src = src.replace(r, '');
      } else {
        src = src.replace(r[0], r[1]);
      }
    }

    file.contents = Buffer.from(src);
    this.push(file);
    cb();
  });
};

const concatCss = function(spinner, theme, tempDir) {
  return new Promise((resolve, reject) => {
    gulp
      .src([path.resolve(tempDir, 'app.css'), path.resolve(tempDir, '**/*.css')])
      .pipe(concat(`${theme}.css`))
      .pipe(csso())
      .pipe(remove(commonRemoveList))
      .pipe(gulp.dest(output))
      .on('error', err => {
        reject(spinner);
        spinner.failed(err);
      })
      .on('end', () => {
        del(`${tempDir}`);
        resolve(theme);
        spinner.succeed();
      });
  });
};

const buildLess = function(theme) {
  return new Promise((resolve, reject) => {
    const spinner = ora(`Compiling theme: ${theme}`).start();
    const themeAbsPath = path.resolve(input, `${theme}.less`);
    const tempDir = path.resolve(__dirname, `temp-${theme}`);

    gulp
      .src([
        './src/**/*.less',
        '!./src/resources/less/**/*.less',
        './src/resources/less/app.less'
      ])
      .pipe(remove([`@import '~font-awesome/less/font-awesome.less';`]))
      .pipe(guap.prependText(`@import '${themeAbsPath}';`))
      .pipe(
        less({
          javascriptEnabled: true,
          plugins: [new lessNpm({ prefix: '~' })]
        })
      )
      .pipe(gulp.dest(tempDir))
      .on('error', err => {
        reject(spinner);
        spinner.failed(err);
      })
      .on('end', () => {
        resolve([spinner, theme, tempDir]);
      });
  });
};

const buildThemes = function() {
  fs.readdir(input, (err, files) => {
    let build = function(i) {
      if (i < 0) {
        return;
      }

      if (files[i] === 'default.less') {
        ora(`Skip Compile default theme`)
          .start()
          .succeed();
        return build(i - 1);
      }

      let fileName = files[i].split('.')[0];
      return buildLess(fileName)
        .then(([spinner, theme, tempDir]) => {
          return concatCss(spinner, theme, tempDir).finally(() => {
            return build(i - 1);
          });
        })
        .catch(() => {
          return build(i - 1);
        });
    };

    build(files.length - 1);
  });
};

buildThemes();

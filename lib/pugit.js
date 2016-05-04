var pug = require('pug')
var gutil = require('gulp-util');
var path = require('path');


module.exports = function render(filename, options){
  var html = pug.renderFile(filename, options);
  var ext = path.extname(filename);
  var base = path.basename(filename);
  var base = base.substr(0, base.length - ext.length);

  var src = require('stream').Readable({objectMode: true});
  src._read = function(){
    this.push(new gutil.File({
      cwd: "",
      base: "",
      path: base + '.html',
      contents: new Buffer(html)
    }));
    this.push(null);
  }
  return src;
};

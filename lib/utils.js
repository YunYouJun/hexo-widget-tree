const fs = require("fs");

/**
 * 拷贝文件至本地
 * @param {string} name
 * @param {string} target
 * @param {string} source
 */
function copyFile(name, target, source) {
  const url_for = this.extend.helper.get("url_for").bind(this);
  this.extend.generator.register(name, function (locals) {
    return {
      path: url_for(target),
      data: function () {
        return fs.createReadStream(source);
      },
    };
  });
}

module.exports = {
  copyFile,
};

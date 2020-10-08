"use strict";
const path = require("path");

const pkg = require("./package.json");
const config = require("./lib/config")(hexo);
const copyFile = require("./lib/utils").copyFile.bind(hexo);

require("./lib/index")(hexo);

let cssHref = `/css/${pkg.name}.css`;
let jsSrc = `/js/${pkg.name}.js`;
if (config.cdn) {
  cssHref = `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/css/index.css`;
  jsSrc = `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/js/index.js`;
} else {
  copyFile(`${pkg.name}-css`, cssHref, path.join(__dirname, "./css/index.css"));
  copyFile(`${pkg.name}-js`, jsSrc, path.join(__dirname, "./js/index.js"));
}

const linkTag = `<link href="${cssHref}" rel="stylesheet"/>`;
const scriptTag = `<script src="${jsSrc}"></script>`;
hexo.extend.injector.register("head_begin", linkTag);
hexo.extend.injector.register("body_end", scriptTag);
if (config.hide) {
  hexo.extend.injector.register(
    "body_end",
    "<style>#widget-tree-button{opacity:0}</style>"
  );
}

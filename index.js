"use strict";
const path = require("path");

const pkg = require("./package.json");
const config = require("./lib/config")(hexo);
const copyFile = require("./lib/utils").copyFile.bind(hexo);

const { listCategories } = require("./lib/index");

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

/**
 * 插入 html 页面
 * @param {string} layout
 */
function insertToHtml(layout) {
  hexo.extend.generator.register("widget-tree", function (locals) {
    const generateList = listCategories.bind(hexo);
    const options = config;
    hexo.extend.injector.register(
      "body_end",
      `<div id="widget-tree">
      ${generateList(locals.categories, options)}
        <div id="widget-tree-button">
          <i class="gg-chevron-right"></i>
        </div>
      </div>`,
      layout
    );
  });
  hexo.extend.injector.register("head_begin", linkTag, layout);
  hexo.extend.injector.register("body_end", scriptTag, layout);

  if (config.hide) {
    hexo.extend.injector.register(
      "body_end",
      "<style>#widget-tree-button{opacity:0}</style>",
      layout
    );
  }
}

if (Array.isArray(config.layout)) {
  config.layout.forEach((layout) => {
    insertToHtml(layout);
  });
} else {
  insertToHtml(config.layout);
}

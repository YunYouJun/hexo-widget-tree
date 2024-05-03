# hexo-widget-tree

[![npm](https://img.shields.io/npm/v/hexo-widget-tree)](https://www.npmjs.com/package/hexo-widget-tree)

[中文文档](./README.zh.md)

[Demo](https://hexo-theme-yun.yunyoujun.cn/yun/widget-tree.html)

Tree preview widget for hexo.

(If your theme supports ajax, it can achieve refreshless browsing)

## Usage

```sh
npm install hexo-widget-tree
# yarn add hexo-widget-tree
```

Click the middle button on the left of the page to expand the "tree" menu.

Click the folder with the `+` icon to expand the menu. By clicking the folder name, you will be redirect to category page.

## Options

- `cdn`: `true`, default [jsdelivr CDN](https://cdn.jsdelivr.net/npm/hexo-widget-tree).
- `hide`: `false`, automatically hides unless you move the mouse to the middle of the left part of the page.
- `layout`: Which page will code snippets being injected. More info see [Injector | hexo](https://hexo.io/api/injector.html#to-lt-string-gt).
- `showCount`: Show number of posts in category.
- `toc`: More info [here](https://hexo.io/docs/helpers#toc).
  - `enable`: `false`, display toc for post

```yaml
# You don't have to configure them.
widget_tree:
  cdn: false
  hide: false
  layout: default
  # layout:
  #   - home
  #   - page
  showCount: true
  toc:
    enable: false
    # max_depth:
    # min_depth:
    # list_number:
```

## Features

- Adapt for dark mode

You need `data-user-color-scheme="dark"` in parent node.

## Dev

```bash
git clone https://github.com/YunYouJun/hexo-widget-tree

cd hexo-widget-tree
# install dependencies
npm install
npm link

# watch sass to compile
npm run dev

# start your hexo
cd your-hexo-blog
npm link hexo-widget-tree
hexo s
# We have to reload hexo server when plugin is modified.
```

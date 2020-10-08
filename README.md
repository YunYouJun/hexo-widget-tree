# hexo-widget-tree

[中文文档](./README.zh.md)

[Demo](https://www.yunyoujun.cn/yun/hexo-widget-tree.html)

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

- `cdn`: true, true by default [jsdelivr CDN](https://cdn.jsdelivr.net/npm/hexo-widget-tree).
- `hide`: false, automatically hides unless you move the mouse to the middle of the left part of the page.
- `layout`: Which page will code snippets being injected. More info see [Injector](https://hexo.io/api/injector.html#to-lt-string-gt)

```yaml
widget_tree:
  cdn: false
  hide: false
  layout: default
  # layout:
  #   - home
  #   - page
```

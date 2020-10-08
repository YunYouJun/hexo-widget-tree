# hexo-widget-tree

[中文文档](./README.zh.md)

[Demo](https://www.yunyoujun.cn/yun/hexo-widget-tree.html)

Tree preview widget for hexo.

(If your theme support ajax, it can realize refreshless browsing)

## Usage

```sh
npm install hexo-widget-tree
# yarn add hexo-widget-tree
```

Click the button in the middle left of the page to expand the tree menu.

Click folder with `+` icon to expand menu. Click folder name will jump to category page.

## Options

- `cdn`: true, default use [jsdelivr CDN](https://cdn.jsdelivr.net/npm/hexo-widget-tree).
- `hide`: false, automatically hide unless you move the mouse to the specified position.
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

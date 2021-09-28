module.exports = (hexo) => {
  hexo.config.widget_tree = Object.assign(
    {
      cdn: true,
      hide: false,
      layout: "default",
      showCount: true,
      toc: {
        enable: false,
        list_number: true,
        max_depth: 6,
        min_depth: 1,
      },
    },
    hexo.config.widget_tree
  );
  return hexo.config.widget_tree;
};

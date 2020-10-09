module.exports = (hexo) => {
  hexo.config.widget_tree = Object.assign(
    {
      cdn: true,
      hide: false,
      layout: "default",
      toc: {
        enable: false,
        list_number: true,
        max_width: 6,
        min_width: 1,
      },
    },
    hexo.config.widget_tree
  );
  return hexo.config.widget_tree;
};

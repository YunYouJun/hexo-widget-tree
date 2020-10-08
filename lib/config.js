module.exports = (hexo) => {
  hexo.config.widget_tree = Object.assign(
    {
      cdn: true,
      hide: false,
      layout: "default",
    },
    hexo.config.widget_tree
  );
  return hexo.config.widget_tree;
};

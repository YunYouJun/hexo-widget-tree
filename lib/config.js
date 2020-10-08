module.exports = (hexo) => {
  hexo.config.widget_tree = Object.assign(
    {
      cdn: true,
      hide: false,
    },
    hexo.config.widget_tree
  );
  return hexo.config.widget_tree;
};

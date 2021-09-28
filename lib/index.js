"use strict";

/**
 * 列出所有种类目录
 * @param {*} categories
 * @param {*} options
 */
function listCategories(categories, options) {
  const url_for = this.extend.helper.get("url_for").bind(this);
  const toc = this.extend.helper.get("toc").bind(this);

  const className = "tree";
  const depth = options.depth ? parseInt(options.depth, 10) : 0;

  /**
   * 生成帖子链接
   */
  function generatePostLink(post) {
    return `<a class="${className}-list-post-link" href="${url_for(
      post.path
    )}" title="${post.title}"><i class="post-icon gg-file-document"></i>${
      post.title
    }</a>`;
  }

  const prepareQuery = (parent) => {
    const query = {};

    if (parent) {
      query.parent = parent;
    } else {
      query.parent = { $exists: false };
    }

    return categories.find(query).filter((cat) => cat.length);
  };

  const hierarchicalList = (level, parent) => {
    let result = "";

    prepareQuery(parent).forEach((cat, i) => {
      let children;
      if (!depth || level + 1 < depth) {
        children = hierarchicalList(level + 1, cat._id);
      }

      let isCurrent = false;

      result += `
      <li class="${className}-list-item">
        <i class="toggle-post-icon gg-folder-add"></i>
        <a class="${className}-list-link${
        isCurrent ? " current" : ""
      }" href="${url_for(cat.path)}">
          ${cat.name}
        </a>
      `;

      if (options.showCount) {
        result += `<span class="${className}-list-count">${cat.length}</span>`;
      }

      if (children) {
        result += `<ul class="${className}-list-children">${children}</ul>`;
      } else {
        let postList = "";
        cat.posts.data.forEach((post) => {
          let postInnerContent = "";
          if (options.toc.enable) {
            const tocContent = toc(post.content, {
              class: `${className}-post-toc`,
              list_number: options.toc.list_number,
              max_depth: options.toc.max_depth,
              min_depth: options.toc.min_depth,
            });
            if (tocContent) {
              postInnerContent = `<i class="toggle-toc-icon gg-file-add"></i><a class="${className}-list-post-link" href="${url_for(
                post.path
              )}" title="${post.title}">${post.title}</a>${tocContent}`;
            } else {
              postInnerContent = generatePostLink(post);
            }
          } else {
            postInnerContent = generatePostLink(post);
          }
          let postItem = `<li class="${className}-list-item">${postInnerContent}</li>`;
          postList += postItem;
        });

        result += `<ul class="${className}-list-children">${postList}</ul>`;
      }

      result += "</li>";
    });

    return result;
  };

  return `<ul>${hierarchicalList(0)}</ul>`;
}

module.exports = {
  listCategories,
};

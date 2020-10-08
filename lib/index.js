"use strict";

function listCategories(categories, options) {
  const url_for = this.extend.helper.get("url_for").bind(this);

  const defaultOptions = {
    showCount: false,
  };
  options = Object.assign(defaultOptions, options);

  const className = "tree";
  const depth = options.depth ? parseInt(options.depth, 10) : 0;
  const orderby = options.orderby || "name";
  const order = options.order || 1;

  const prepareQuery = (parent) => {
    const query = {};

    if (parent) {
      query.parent = parent;
    } else {
      query.parent = { $exists: false };
    }

    return categories
      .find(query)
      .sort(orderby, order)
      .filter((cat) => cat.length);
  };

  const hierarchicalList = (level, parent) => {
    let result = "";

    prepareQuery(parent).forEach((cat, i) => {
      let children;
      if (!depth || level + 1 < depth) {
        children = hierarchicalList(level + 1, cat._id);
      }

      let isCurrent = false;

      result += `<li class="${className}-list-item">`;
      result += `<i class="toggle-icon gg-folder-add"></i>`;

      result += `<a class="${className}-list-link${
        isCurrent ? " current" : ""
      }" href="${url_for(cat.path)}">`;
      result += cat.name;
      result += "</a>";

      if (options.showCount) {
        result += `<span class="${className}-list-count">${cat.length}</span>`;
      }

      if (children) {
        result += `<ul class="${className}-list-children">${children}</ul>`;
      } else {
        let postList = "";
        cat.posts.data.forEach((post) => {
          postList += `<li class="${className}-list-item"><a class="${className}-list-post-link" href="${url_for(
            post.path
          )}" title="${post.title}"><i class="post-icon gg-file-document"></i>${
            post.title
          }</a></li>`;
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

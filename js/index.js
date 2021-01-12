/**
 * 切换文件夹图标
 * @param {*} icon
 */
function toggleFolderIcon(icon) {
  icon.classList.toggle("gg-folder-add");
  icon.classList.toggle("gg-folder-remove");
}

/**
 * 切换文章图标
 * @param {*} icon
 */
function togglePostIcon(icon) {
  icon.classList.toggle("gg-file-add");
  icon.classList.toggle("gg-file-remove");
}

/**
 * 展开文章上层文件夹
 * @param {*} node
 */
function activePostLink(node) {
  if (!node.classList.contains("open")) {
    node.classList.add("open");
    openFolder(node);
  }
  if (node.parentNode.parentNode.classList.contains("tree-list-item")) {
    activePostLink(node.parentNode.parentNode);
  }
}

/**
 * 展开文件夹时，切换图标
 * @param {*} node
 */
function openFolder(node) {
  const icon = node.querySelector("i");
  if (icon) {
    if (icon.classList.contains("gg-folder-add")) {
      toggleFolderIcon(icon);
    }
    if (icon.classList.contains("gg-file-add")) {
      togglePostIcon(icon);
    }
  }
}

/**
 * 为 tocItems 补全链接
 * @param {*} tocItems
 * @param {string} pathname
 */
function addUrlForTocItem(tocItems, pathname) {
  tocItems.forEach((tocItem) => {
    const tocLink = tocItem.querySelector("a");
    tocLink.href = pathname + new URL(tocLink.href).hash;
  });
}

/**
 * 初始化挂件树
 */
function initWidgetTree() {
  const togglePostIcons = document.querySelectorAll(".toggle-post-icon");
  togglePostIcons.forEach((togglePostIcon) => {
    togglePostIcon.addEventListener("click", function () {
      this.parentNode.classList.toggle("open");
      toggleFolderIcon(this);
    });
  });

  const toggleTocIcons = document.querySelectorAll(".toggle-toc-icon");
  if (toggleTocIcons) {
    toggleTocIcons.forEach((toggleTocIcon) => {
      toggleTocIcon.addEventListener("click", function () {
        this.parentNode.classList.toggle("open");
        togglePostIcon(this);
      });
    });
  }

  const widgetTreeButton = document.querySelector("#widget-tree-button");
  widgetTreeButton.addEventListener("click", function () {
    this.style.opacity = 1;
    this.classList.toggle("open");
    this.parentNode.classList.toggle("open");
    const icon = this.querySelector("i");
    icon.classList.toggle("gg-chevron-right");
    icon.classList.toggle("gg-chevron-left");
  });

  const postLinks = document.querySelectorAll(".tree-list-post-link");
  postLinks.forEach((postLink) => {
    const pathname = new URL(postLink.href).pathname;
    if (pathname === document.location.pathname) {
      postLink.style.color = "var(--hwt-active-color)";
      activePostLink(postLink.parentNode);
    }

    // 帖子的兄弟节点（目录）
    const postToc = postLink.nextElementSibling;
    if (postToc) {
      // modify toc link
      const tocItems = postToc.querySelectorAll(".tree-post-toc-item");
      addUrlForTocItem(tocItems, pathname);
    }
  });
}

document.addEventListener("DOMContentLoaded", initWidgetTree);

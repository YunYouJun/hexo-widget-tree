/**
 * 初始化挂件树
 */
function initWidgetTree() {
  const togglePostIcons = document.querySelectorAll(".toggle-post-icon");
  togglePostIcons.forEach((togglePostIcon) => {
    togglePostIcon.addEventListener("click", function () {
      this.parentNode.classList.toggle("open");
      this.classList.toggle("gg-folder-add");
      this.classList.toggle("gg-folder-remove");
    });
  });

  const toggleTocIcons = document.querySelectorAll(".toggle-toc-icon");
  if (toggleTocIcons) {
    toggleTocIcons.forEach((toggleTocIcon) => {
      toggleTocIcon.addEventListener("click", function () {
        this.parentNode.classList.toggle("open");
        this.classList.toggle("gg-file-add");
        this.classList.toggle("gg-file-remove");
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

  // modify toc link
  const tocItems = document.querySelectorAll(".tree-post-toc-item");
  if (tocItems) {
    tocItems.forEach((tocItem) => {
      const link = tocItem.parentNode.parentNode.querySelector("a").href;
      const tocLink = tocItem.querySelector("a");
      tocLink.href = link + new URL(tocLink.href).hash;
    });
  }

  const postLinks = document.querySelectorAll(".tree-list-post-link");
  postLinks.forEach((postLink) => {
    const pathname = new URL(postLink.href).pathname;
    if (pathname === document.location.pathname) {
      postLink.style.color = "steelblue";
      activePostLink(postLink.parentNode);
    }
  });

  function activePostLink(node) {
    if (!node.classList.contains("open")) {
      node.classList.add("open");
      openFolder(node);
    }
    if (node.parentNode.parentNode.classList.contains("tree-list-item")) {
      activePostLink(node.parentNode.parentNode);
    }
  }

  function openFolder(node) {
    const icon = node.querySelector("i");
    if (icon) {
      if (icon.classList.contains("gg-file-add")) {
        icon.classList.toggle("gg-file-add");
        icon.classList.toggle("gg-file-remove");
      }
      if (icon.classList.contains("gg-folder-add")) {
        icon.classList.toggle("gg-folder-add");
        icon.classList.toggle("gg-folder-remove");
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", initWidgetTree);

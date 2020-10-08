/**
 * 初始化挂件树
 */
function initWidgetTree() {
  const toggleIcons = document.querySelectorAll(".toggle-icon");
  toggleIcons.forEach((toggleIcon) => {
    toggleIcon.addEventListener("click", function () {
      this.parentNode.classList.toggle("open");
      this.classList.toggle("gg-folder-add");
      this.classList.toggle("gg-folder-remove");
    });
  });

  const widgetTreeButton = document.querySelector("#widget-tree-button");
  widgetTreeButton.addEventListener("click", function () {
    this.style.opacity = 1;
    this.classList.toggle("open");
    this.parentNode.classList.toggle("open");
    const icon = this.querySelector("i");
    icon.classList.toggle("gg-chevron-right");
    icon.classList.toggle("gg-chevron-left");
  });
}

document.addEventListener("DOMContentLoaded", initWidgetTree);

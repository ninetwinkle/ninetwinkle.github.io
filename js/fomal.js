/* =========================================================
   Clean fomal.js
   只保留：阅读进度、简洁导航标题、返回顶部
   删除：右键菜单、恶搞标题、欢迎定位、雪花星空、小猫咪、控制台字符画等
   放置路径：source/js/fomal.js
   ========================================================= */

(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function getScrollPercent() {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      ) - document.documentElement.clientHeight;

    if (scrollHeight <= 0) return 0;
    return Math.min(
      100,
      Math.max(0, Math.round((scrollTop / scrollHeight) * 100)),
    );
  }

  function updateScrollPercent() {
    const btn = document.querySelector("#go-up");
    if (!btn || btn.childNodes.length < 2) return;

    const result = getScrollPercent();

    if (result < 95) {
      btn.childNodes[0].style.display = "none";
      btn.childNodes[1].style.display = "block";
      btn.childNodes[1].innerHTML = result + "<span>%</span>";
    } else {
      btn.childNodes[1].style.display = "none";
      btn.childNodes[0].style.display = "block";
    }
  }

  function initNavTitle() {
    const nameContainer = document.getElementById("name-container");
    const pageName = document.getElementById("page-name");
    const menuItems = document.getElementsByClassName("menus_items");

    if (!nameContainer || !pageName || menuItems.length < 2) return;

    nameContainer.style.display = "none";
    pageName.innerText = document.title.split(" | ")[0];

    let lastTop = window.scrollY || document.documentElement.scrollTop;

    window.addEventListener(
      "scroll",
      function () {
        const nowTop = window.scrollY || document.documentElement.scrollTop;

        if (nowTop > lastTop && nowTop > 80) {
          nameContainer.style.display = "";
          menuItems[1].style.setProperty("display", "none", "important");
        } else {
          nameContainer.style.display = "none";
          menuItems[1].style.display = "";
        }

        lastTop = nowTop <= 0 ? 0 : nowTop;
      },
      { passive: true },
    );
  }

  window.scrollToTop = function () {
    const nameContainer = document.getElementById("name-container");
    const menuItems = document.getElementsByClassName("menus_items");

    if (menuItems.length >= 2) menuItems[1].style.display = "";
    if (nameContainer) nameContainer.style.display = "none";

    if (window.btf && typeof btf.scrollToDest === "function") {
      btf.scrollToDest(0, 500);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  function initNavScrollState() {
    const nav = document.getElementById("nav");
    if (!nav) return;

    function updateNavState() {
      const top = window.scrollY || document.documentElement.scrollTop || 0;

      if (top > 80) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    }

    updateNavState();

    window.removeEventListener("scroll", updateNavState);
    window.addEventListener("scroll", updateNavState, { passive: true });
  }

  function initCleanBlog() {
    updateScrollPercent();
    initNavTitle();
    initNavScrollState();

    window.removeEventListener("scroll", updateScrollPercent);
    window.addEventListener("scroll", updateScrollPercent, { passive: true });
  }

  ready(initCleanBlog);
  document.addEventListener("pjax:complete", initCleanBlog);
})();

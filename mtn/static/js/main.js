/* Mtn — main.js */

(function () {
  const nav  = document.getElementById("nav");
  const feed = document.getElementById("feed");
  const toggleNav  = document.getElementById("toggle-nav");
  const toggleFeed = document.getElementById("toggle-feed");

  function setActive(btn, collapsed) {
    if (collapsed) {
      btn.classList.remove("active");
    } else {
      btn.classList.add("active");
    }
  }

  if (toggleNav && nav) {
    // Start with nav visible
    setActive(toggleNav, false);
    toggleNav.addEventListener("click", () => {
      nav.classList.toggle("collapsed");
      setActive(toggleNav, nav.classList.contains("collapsed"));
    });
  }

  if (toggleFeed && feed) {
    // Start with feed visible
    setActive(toggleFeed, false);
    toggleFeed.addEventListener("click", () => {
      feed.classList.toggle("collapsed");
      setActive(toggleFeed, feed.classList.contains("collapsed"));
    });
  }
})();

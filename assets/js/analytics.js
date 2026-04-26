(function () {
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("a[data-goatcounter-click]").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.goatcounter && window.goatcounter.count) {
          window.goatcounter.count({
            path: link.getAttribute("data-goatcounter-click"),
            title: link.getAttribute("data-goatcounter-title") || link.textContent.trim(),
            event: true
          });
        }
      });
    });
  });
})();
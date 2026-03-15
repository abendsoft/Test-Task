(function() {
  'use strict';

  function init() {
    var btn = document.querySelector('.cfg-mobile-filter-btn');
    var sidebar = document.querySelector('.cfg-sidebar');
    if (btn && sidebar) {
      btn.addEventListener('click', function() {
        sidebar.classList.toggle('cfg-sidebar--open');
      });
    }

    var sortSelect = document.querySelector('.cfg-sort select');
    var form = document.getElementById('cfg-filter-form');
    if (sortSelect && form) {
      sortSelect.addEventListener('change', function() {
        form.submit();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

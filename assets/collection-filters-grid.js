(function() {
  'use strict';

  function formatMoney(cents) {
    var val = cents / 100;
    return val % 1 === 0 ? String(val) : val.toFixed(2);
  }

  function initPriceSliders() {
    var wraps = document.querySelectorAll('.cfg-price-slider-wrap');
    wraps.forEach(function(wrap) {
      var rangeMax = parseInt(wrap.dataset.rangeMax || 0, 10);
      var minInput = wrap.querySelector('.cfg-price-slider-min');
      var maxInput = wrap.querySelector('.cfg-price-slider-max');
      var paramMin = wrap.dataset.paramMin;
      var paramMax = wrap.dataset.paramMax;
      var minHidden = wrap.querySelector('input[name="' + paramMin + '"]');
      var maxHidden = wrap.querySelector('input[name="' + paramMax + '"]');
      var minDisplay = wrap.querySelector('.cfg-price-min-display');
      var maxDisplay = wrap.querySelector('.cfg-price-max-display');

      if (!minInput || !maxInput || !minHidden || !maxHidden) return;

      var fillEl = wrap.querySelector('.cfg-price-slider-fill');

      function updateValues() {
        var minVal = parseInt(minInput.value, 10);
        var maxVal = parseInt(maxInput.value, 10);
        if (minVal > maxVal) {
          var t = minVal;
          minVal = maxVal;
          maxVal = t;
          minInput.value = minVal;
          maxInput.value = maxVal;
        }
        minHidden.value = minVal > 0 ? minVal : '';
        maxHidden.value = maxVal < rangeMax ? maxVal : '';
        if (minDisplay) minDisplay.textContent = '$' + formatMoney(minVal);
        if (maxDisplay) maxDisplay.textContent = '$' + formatMoney(maxVal);
        if (fillEl && rangeMax > 0) {
          var leftPct = (minVal / rangeMax) * 100;
          var widthPct = ((maxVal - minVal) / rangeMax) * 100;
          fillEl.style.left = leftPct + '%';
          fillEl.style.width = Math.max(widthPct, 1) + '%';
        }
      }

      minInput.addEventListener('input', updateValues);
      maxInput.addEventListener('input', updateValues);
      updateValues();
    });
  }

  function initMobileFilters() {
    var openBtn = document.querySelector('[data-cfg-open-filters]');
    var sidebar = document.querySelector('.cfg-sidebar');
    var backdrop = document.querySelector('.cfg-mobile-backdrop');
    var closeBtn = document.querySelector('.cfg-mobile-filter-close');

    function openFilters() {
      if (sidebar) sidebar.classList.add('cfg-sidebar--open');
      if (backdrop) backdrop.classList.add('cfg-backdrop--open');
      document.body.style.overflow = 'hidden';
    }

    function closeFilters() {
      if (sidebar) sidebar.classList.remove('cfg-sidebar--open');
      if (backdrop) backdrop.classList.remove('cfg-backdrop--open');
      document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openFilters);
    if (closeBtn) closeBtn.addEventListener('click', closeFilters);
    if (backdrop) backdrop.addEventListener('click', closeFilters);
  }

  function initSortSelect() {
    var sortSelect = document.querySelector('.cfg-sort select');
    var form = document.getElementById('cfg-filter-form');
    if (sortSelect && form) {
      sortSelect.addEventListener('change', function() {
        form.submit();
      });
    }
  }

  function initFilterOptions() {
    var form = document.getElementById('cfg-filter-form');
    if (!form) return;

    form.addEventListener('click', function(e) {
      var label = e.target.closest('.cfg-swatch, .cfg-pill');
      if (!label) return;
      var cb = label.querySelector('input[type="checkbox"]');
      if (!cb || cb.disabled) return;
      e.preventDefault();
      cb.checked = !cb.checked;
    });
  }

  function init() {
    initPriceSliders();
    initMobileFilters();
    initSortSelect();
    initFilterOptions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

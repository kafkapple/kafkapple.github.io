(function () {
  function ripple(card, e) {
    var rect = card.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height) * 2;
    var r = document.createElement('span');
    r.style.cssText = [
      'position:absolute', 'border-radius:50%', 'pointer-events:none',
      'width:' + size + 'px', 'height:' + size + 'px',
      'left:' + (e.clientX - rect.left - size / 2) + 'px',
      'top:' + (e.clientY - rect.top - size / 2) + 'px',
      'background:rgba(46,85,56,0.13)',
      'transform:scale(0)',
      'animation:nc-ripple 550ms ease-out forwards'
    ].join(';');
    card.appendChild(r);
    r.addEventListener('animationend', function () { r.remove(); });
  }

  function init() {
    document.querySelectorAll('.nav-card:not(.wip)').forEach(function (card) {
      if (card.dataset.ncRipple) return;
      card.dataset.ncRipple = '1';
      card.addEventListener('click', function (e) { ripple(card, e); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('hy-push-state-after', init);
})();

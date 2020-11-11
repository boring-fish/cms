/* 
  eg. 145px == 14.5rem
*/
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (clientWidth >= 4096) {
        clientWidth = 4096;
      }
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 4096) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

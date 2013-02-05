/**
 * Sets a request for the next animation frame
 */

var renderTimeout = -1;

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.oRequestAnimationFrame
      || window.msRequestAnimationFrame
      || function(callback) {
            renderTimeout = window.setTimeout(callback, 1000 / 60);
      };
}());

/**
 * Cancels a request for a scheduled repaint of the window for the next animation frame
 */
window.cancelAnimFrame = (function(){
    return window.cancelAnimationFrame
        || window.webkitCancelRequestAnimationFrame
        || window.mozCancelRequestAnimationFrame
        || window.oCancelRequestAnimationFrame
        || window.msCancelRequestAnimationFrame
        || window.clearTimeout(renderTimeout);
}());
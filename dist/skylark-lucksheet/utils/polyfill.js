/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(function(){"use strict";function t(){return this.style}function e(){return r()}function n(){return this.target}function r(){if(document.all)return window.event;for(var t=r.caller;null!=t;){var e=t.arguments[0];if(e)if(-1!=e.constructor.toString().indexOf("Event"))return e;t=t.caller}return null}return function(){HTMLElement.prototype.__defineGetter__("runtimeStyle",t),window.constructor.prototype.__defineGetter__("event",e),Event.prototype.__defineGetter__("srcElement",n)}});
//# sourceMappingURL=../sourcemaps/utils/polyfill.js.map

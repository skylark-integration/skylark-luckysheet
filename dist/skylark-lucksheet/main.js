/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-ns","skylark-jquery","./utils/math","./core","./utils/polyfill"],function(e,t,n,i){"use strict";const{luckysheet:s}=n;return window.addEventListener&&navigator.userAgent.indexOf("Firefox")>0&&i(),window.$=t,window.luckysheet=s,e.attach("intg.luckysheet",s),s});
//# sourceMappingURL=sourcemaps/main.js.map

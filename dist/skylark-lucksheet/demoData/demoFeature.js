/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(){function t(t){var e=navigator.language||navigator.userLanguage;return e=e.substr(0,2)}!function(){const e="zh"===t()?"反馈":"Forum",o="zh"===t()?"https://support.qq.com/product/288322":"https://groups.google.com/g/luckysheet";document.querySelector("body").insertAdjacentHTML("beforeend",'<a id="container" href="'+o+'" target="_blank" style="z-index:2;width:50px;height:50px;line-height:50px;position:fixed;right:40px;bottom:86px;border-radius:50px;cursor:pointer;background:rgb(71,133,249);color:#fff;text-align:center;text-decoration:none;">'+e+"</a>")}(),window.luckysheetDemoUtil={language:t,getRequest:function(){var t={};return window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(e,o,n){t[o]=n}),t}}}();
//# sourceMappingURL=../sourcemaps/demoData/demoFeature.js.map

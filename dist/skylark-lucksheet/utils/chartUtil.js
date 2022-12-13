/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(function(){"use strict";function e(e){return!t(e)&&("object"==typeof e||"function"==typeof e)&&null!==e}function t(e){return e instanceof Map}return{isMap:t,isObject:e,deepCopy:function n(r){if(!e(r)&&!t(r))return r;let o;if(t(r)){o=new Map;for(let i of r.keys()){let a=r.get(i);if(t(a)||e(a)||Array.isArray(r)){let e=n(a);o.set(i,e)}else o.set(i,a)}}else if("function"==typeof r)o=r;else if(o=Array.isArray(r)?[]:{},r instanceof HTMLElement)o=r.cloneNode(!0);else for(let i in r)Object.prototype.hasOwnProperty.call(r,i)&&(o[i]=t(r[i])||e(r[i])?n(r[i]):r[i]);return o},generateRandomKey:function(e){null==e&&(e="chart");for(var t=window.navigator.userAgent.replace(/[^a-zA-Z0-9]/g,"").split(""),n="",r=0;r<12;r++)n+=t[Math.round(Math.random()*(t.length-1))];return e+"_"+n+"_"+(new Date).getTime()},replaceHtml:function(e,t){return e.replace(/\$\{([\w]+)\}/g,function(e,n){var r=t[n];return void 0!==r?r:e})}}});
//# sourceMappingURL=../sourcemaps/utils/chartUtil.js.map

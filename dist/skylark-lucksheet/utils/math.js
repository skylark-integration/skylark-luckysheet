/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../global/validate"],function(t){"use strict";const{isRealNum:r}=t;function e(t){var r,e={times:1,num:0};if(r=t,Math.floor(r)===r)return e.num=t,e;var n=t+"",u=n.indexOf("."),i=n.substr(u+1).length,o=Math.pow(10,i),s=parseInt(t*o+.5,10);return e.times=o,e.num=s,e}function n(t,r,u){var i=e(t),o=e(r),s=i.num,a=o.num,m=i.times,l=o.times,f=m>l?m:l;switch(u){case"add":return(m===l?s+a:m>l?s+a*(m/l):s*(l/m)+a)/f;case"subtract":return(m===l?s-a:m>l?s-a*(m/l):s*(l/m)-a)/f;case"multiply":return s*a/(m*l);case"divide":return n(s/a,l/m,"multiply")}}Number.prototype.add=function(t){let r=parseFloat(t);if("number"!=typeof r||Number.isNaN(r))throw new Error("请输入数字或者数字字符串～");return n(this,r,"add")},Number.prototype.subtract=function(t){let r=parseFloat(t);if("number"!=typeof r||Number.isNaN(r))throw new Error("请输入数字或者数字字符串～");return n(this,r,"subtract")},Number.prototype.multiply=function(t){let r=parseFloat(t);if("number"!=typeof r||Number.isNaN(r))throw new Error("请输入数字或者数字字符串～");return n(this,r,"multiply")},Number.prototype.divide=function(t){let r=parseFloat(t);if("number"!=typeof r||Number.isNaN(r))throw new Error("请输入数字或者数字字符串～");return n(this,r,"divide")},Number.prototype.tofixed=function(t){let e=parseFloat(t);if("number"!=typeof e||Number.isNaN(e))throw new Error("请输入数字或者数字字符串～");return function(t,e){if(e||(e=2),!r(t))return t;let n=t.toFixed(e),u=n.indexOf("."),i=n.substring(0,u),o=n.substring(u+1,n.length);if(o)for(let t=o.length-1;0!=t&&("0"==o.charAt(t)||t!=o.length-1);t--)o=o.substring(0,t);return Number(i+"."+o)}(this,e)}});
//# sourceMappingURL=../sourcemaps/utils/math.js.map

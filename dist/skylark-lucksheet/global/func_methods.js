/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../utils/util","./validate","./format","./formula","skylark-moment"],function(t,e,l,r,a){"use strict";const{getObjType:n}=t,{isRealNum:u,isRealNull:o,valueIsError:s}=e,{update:f}=l,h="#VALUE!";return{getCellDataArr:function(t,e,l){let r=[];if(null==t.data)l||("number"===e?r.push(0):"text"===e&&r.push(""));else if("array"===n(t.data))for(let a=0;a<t.data.length;a++)for(let u=0;u<t.data[a].length;u++){let i=t.data[a][u],o=i;"object"===n(i)&&(o=i.v),null==o?l||("number"===e?o=0:"text"===e&&(o=""),r.push(o)):r.push(o)}else o(t.data.v)?l||("number"==e?r.push(0):"text"==e&&r.push("")):r.push(t.data.v);return r},getCellDataDyadicArr:function(t,e){let l=[];if(null==t.data){let t=[];"number"==e?t.push(0):"text"==e&&t.push(""),l.push(t)}else if("array"==n(t.data))for(let r=0;r<t.data.length;r++){let a=[];for(let l=0;l<t.data[r].length;l++){let u=t.data[r][l],i=u;"object"===n(u)&&(i=u.v),null==i&&("number"===e?i=0:"text"===e&&(i="")),a.push(i)}l.push(a)}else{let r=[],a=t.data.v;o(a)&&("number"==e?a=0:"text"==e&&(a="")),r.push(a),l.push(r)}return l},getDataArr:function(t,e){let l=[];if(null==e&&(e=!1),"array"==n(t[0]))for(let r=0;r<t.length;r++)for(let a=0;a<t[r].length;a++)e&&!u(t[r][a])||l.push(t[r][a]);else for(let r=0;r<t.length;r++)e&&!u(t[r])||l.push(t[r]);return l},getDataDyadicArr:function(t){let e=[];if("array"==n(t[0]))for(let l=0;l<t.length;l++){let r=[];for(let e=0;e<t[l].length;e++)r.push(t[l][e]);e.push(r)}else{let l=[];for(let e=0;e<t.length;e++)l.push(t[e]);e.push(l)}return e},isDyadicArr:function(t){let e=!0;if(t.length>1){let l=t[0].length;for(let r=1;r<t.length;r++)if(t[r].length!=l){e=!1;break}}return e},getFirstValue:function(t,e){let l,a=this;if(null==e&&(e="number"),"array"==n(t))if("array"==n(t[0])){if(!a.isDyadicArr(t))return h;l=t[0][0]}else l=t[0];else if("object"==n(t)&&null!=t.startCell)if(null==t.data)"number"==e?l=0:"text"==e&&(l="");else{let a=window.luckysheetCurrentRow,n=window.luckysheetCurrentColumn;if(1==t.rowl&&1==t.coll)null==(l=t.data)||o(l.v)?"number"==e?l=0:"text"==e&&(l=""):l=l.v;else if(null!=t.data[0][0].mc&&t.data[0][0].mc.rs==t.rowl&&t.data[0][0].mc.cs==t.coll)null==(l=t.data[0][0])||o(l.v)?"number"==e?l=0:"text"==e&&(l=""):l=l.v;else{if(1!=t.rowl&&1!=t.coll)return h;{let u=r.getcellrange(t.startCell),i=u.row[0],s=i+t.rowl-1,f=u.column[0],c=f+t.coll-1;if(1==t.rowl){if(n<f||n>c)return h;l=t.data[0][n-f]}else if(1==t.coll){if(a<i||a>s)return h;l=t.data[a-i][0]}null==l||o(l.v)||null!=l.mc?"number"==e?l=0:"text"==e&&(l=""):l=l.v}}}else l=t;return l},getCellBoolen:function(t){let e=this.getFirstValue(t);if(s(e))return e;if("boolean"==n(e));else if("string"!=n(e)||"true"!=e.toLowerCase()&&"false"!=e.toLowerCase()){if(!u(e))return h;e=0!=(e=parseFloat(e))}else"true"==e.toLowerCase()?e=!0:"false"==e.toLowerCase()&&(e=!1);return e},getCellDate:function(t){let e,l=this;if("array"==n(t))if("array"==n(t[0])){if(!l.isDyadicArr(t))return h;e=t[0][0]}else e=t[0];else if("object"==n(t)&&null!=t.startCell){if(null==t.data||"array"==n(t.data)||o(t.data.v))return h;e=t.data.v,null!=t.data.ct&&"d"==t.data.ct.t&&(e=f("YYYY-MM-DD h:mm:ss",e))}else e=t;return e},getCellrangeDate:function(t){let e=this,l=[];if("array"==n(t)){if("array"==n(t[0])&&!e.isDyadicArr(t))return h;l=l.concat(e.getDataArr(t,!1))}else if("object"==n(t)&&null!=t.startCell)if(null==t.data)l.push(0);else if("array"==n(t.data))for(let e=0;e<t.data.length;e++)for(let r=0;r<t.data[e].length;r++)if(null==t.data[e][r]||o(t.data[e][r].v))l.push(0);else{let a=t.data[e][r].v;null!=t.data[e][r].ct&&"d"==t.data[e][r].ct.t&&(a=f("YYYY-MM-DD h:mm:ss",a)),l.push(a)}else{let e=t.data.v;null!=t.data.ct&&"d"==t.data.ct.t&&(e=f("YYYY-MM-DD h:mm:ss",e)),l.push(e)}else l.push(t);return l},getRegExpStr:function(t){return t.replace("~*","\\*").replace("~?","\\?").replace(".","\\.").replace("*",".*").replace("?",".")},factorial:function(t){return 0==t||1==t?1:t*this.factorial(t-1)},factorialDouble:function(t){return t<=0?1:t*this.factorialDouble(t-2)},variance:function(t){let e=0,l=0;for(let r=0;r<t.length;r++){e+=t[r],l++}let r=e/l,a=0;for(let e=0;e<t.length;e++){let l=t[e];a+=(l-r)*(l-r)}return a/l},variance_s:function(t){let e=0,l=0;for(let r=0;r<t.length;r++){e+=t[r],l++}let r=e/l,a=0;for(let e=0;e<t.length;e++){let l=t[e];a+=(l-r)*(l-r)}return a/(l-1)},standardDeviation:function(t){let e=0,l=0;for(let r=0;r<t.length;r++){e+=t[r],l++}let r=e/l,a=0;for(let e=0;e<t.length;e++){let l=t[e];a+=(l-r)*(l-r)}return Math.sqrt(a/l)},standardDeviation_s:function(t){let e=0,l=0;for(let r=0;r<t.length;r++){e+=t[r],l++}let r=e/l,a=0;for(let e=0;e<t.length;e++){let l=t[e];a+=(l-r)*(l-r)}return Math.sqrt(a/(l-1))},isLeapYear:function(t){return 1===new Date(t,1,29).getMonth()},feb29Between:function(t,e){let l=a(t).year(),r=a().set({year:l,month:2,date:1});if(this.isLeapYear(l)&&a(t)<a(r)&&a(e)>=a(r))return!0;let n=a(e).year(),u=a().set({year:n,month:2,date:1});return this.isLeapYear(n)&&a(e)>=a(u)&&a(t)<a(u)},findResultIndex:function(t,e){let l={};for(let e=1;e<t[0].length;++e)l[e]=!0;let r=e[0].length;for(i=1;i<e.length;++i)e[i].length>r&&(r=e[i].length);for(let a=1;a<t.length;++a)for(let n=1;n<t[a].length;++n){let u=!1,i=!1;for(let l=0;l<e.length;++l){let o=e[l];if(o.length<r)continue;let s=o[0];if(t[a][0]===s){i=!0;for(let e=1;e<o.length;++e)u=u||new Function("return "+t[a][n]+o[e])()}}i&&(l[n]=l[n]&&u)}let a=[];for(let e=0;e<t[0].length;++e)l[e]&&a.push(e-1);return a},findField:function(t,e){let l=null;for(let r=0;r<t.length;r++)if(t[r][0]==e){l=r;break}return null==l?h:l},rest:function(t,e){return e=e||1,t&&"function"==typeof t.slice?t.slice(e):t},compact:function(t){if(!t)return t;let e=[];for(let l=0;l<t.length;++l)t[l]&&e.push(t[l]);return e}}});
//# sourceMappingURL=../sourcemaps/global/func_methods.js.map

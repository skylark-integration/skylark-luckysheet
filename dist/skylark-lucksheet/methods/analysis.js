/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../utils/util"],function(t){"use strict";const{numFormat:e}=t;return{STDEVP:function(t,n){let l=0;for(let e=0;e<n.length;e++){let r=n[e];l+=Math.pow(r-t,2)}return e(Math.sqrt(l/n.length))},STDEV:function(t,n){let l=0;for(let e=0;e<n.length;e++){let r=n[e];l+=Math.pow(r-t,2)}return e(Math.sqrt(l/(n.length-1)))},VARP:function(t,n){let l=0;for(let e=0;e<n.length;e++){let r=n[e];l+=Math.pow(r-t,2)}return e(l/n.length)},let:function(t,n){let l=0;for(let e=0;e<n.length;e++){let r=n[e];l+=Math.pow(r-t,2)}return e(l/(n.length-1))}}});
//# sourceMappingURL=../sourcemaps/methods/analysis.js.map

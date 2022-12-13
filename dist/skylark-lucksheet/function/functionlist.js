/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./functionImplementation","../store","../locale/locale"],function(t,n,e){"use strict";return function(){let l=e().functionlist;for(let n=0;n<l.length;n++){let e=l[n];e.f=t[e.n]}n.functionlist=l;const o={};for(let t=0;t<l.length;t++){let n=l[t];o[n.n]=n}window.luckysheet_function=o,n.luckysheet_function=o}});
//# sourceMappingURL=../sourcemaps/function/functionlist.js.map

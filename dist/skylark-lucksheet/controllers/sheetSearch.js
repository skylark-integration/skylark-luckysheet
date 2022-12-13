/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(function(){"use strict";return{luckysheet_searcharray:function(e,t){let n=e.length-1;return n=e.length<40||t<=e[20]||t>=e[n-20]?function(e,t){let n=0,r=0,f=0,i=-1,l=e.length-1;for(;n<e.length&&l>=0&&l>=n;){if(r=e[l],t>=(f=0==l?0:e[l-1])&&t<r){i=l;break}if(r=e[n],t>=(f=0==n?0:e[n-1])&&t<r){i=n;break}n++,l--}return i}(e,t):function(e,t){let n=0,r=e.length-1;for(;n<=r;){let f=parseInt((r+n)/2);if(t<e[f]&&(0==f||t>=e[f-1]))return f;if(t>=e[f])n=f+1;else{if(!(t<e[f]))return-1;r=f-1}}}(e,t)}}});
//# sourceMappingURL=../sourcemaps/controllers/sheetSearch.js.map

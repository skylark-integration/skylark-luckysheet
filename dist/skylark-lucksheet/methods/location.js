/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./sheetSearch","../store"],function(t,e){"use strict";const{luckysheet_searcharray:o}=t;function i(t){let o=0,i=0;return o=e.visibledatarow[t],[i=0==t?0:e.visibledatarow[t-1],o,t]}function n(t){let o=0,i=0;return o=e.visibledatacolumn[t],[i=0==t?0:e.visibledatacolumn[t-1],o,t]}return{rowLocationByIndex:i,rowLocation:function(t){let n=o(e.visibledatarow,t);return-1==n&&t>0?n=e.visibledatarow.length-1:-1==n&&t<=0&&(n=0),i(n)},colLocationByIndex:n,colLocation:function(t){let i=o(e.visibledatacolumn,t);return-1==i&&t>0?i=e.visibledatacolumn.length-1:-1==i&&t<=0&&(i=0),n(i)},mouseposition:function(t,o){let i=$("#"+e.container).offset();return[t-i.left-e.rowHeaderWidth,o-i.top-e.infobarHeight-e.toolbarHeight-e.calculatebarHeight-e.columnHeaderHeight]}}});
//# sourceMappingURL=../sourcemaps/methods/location.js.map

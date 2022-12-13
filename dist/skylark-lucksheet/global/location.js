/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../controllers/sheetSearch","../store"],function(t,e){"use strict";const{luckysheet_searcharray:o}=t;function n(t){let o=0,n=0;return o=e.visibledatarow[t],[n=0==t?0:e.visibledatarow[t-1],o,t]}function i(t){let o=0,n=0;return o=e.visibledatacolumn[t],[n=0==t?0:e.visibledatacolumn[t-1],o,t]}return{rowLocationByIndex:n,rowLocation:function(t){let i=o(e.visibledatarow,t);return-1==i&&t>0?i=e.visibledatarow.length-1:-1==i&&t<=0&&(i=0),n(i)},colLocationByIndex:i,colLocation:function(t){let n=o(e.visibledatacolumn,t);return-1==n&&t>0?n=e.visibledatacolumn.length-1:-1==n&&t<=0&&(n=0),i(n)},mouseposition:function(t,o){let n=$("#"+e.container).offset();return[t-n.left-e.rowHeaderWidth,o-n.top-e.infobarHeight-e.toolbarHeight-e.calculatebarHeight-e.columnHeaderHeight]}}});
//# sourceMappingURL=../sourcemaps/global/location.js.map

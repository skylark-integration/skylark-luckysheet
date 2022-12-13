/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./getdata","./editor","./rhchInit","./formula","./refresh","../controllers/sheetmanage","../store"],function(e,t,o,l,n,a,h){"use strict";const{datagridgrowth:r}=e,{luckysheetrefreshgrid:i}=n;return function(e,n,c,d,g){null==g&&(g=!0),h.visibledatarow=[],h.visibledatacolumn=[],h.ch_width=0,h.rh_height=0,h.zoomRatio=1,h.config=null!=d?d:{},0==c.length?h.flowdata=r(c,n,e):c.length<n&&c[0].length<e?h.flowdata=r(c,n-c.length,e-c[0].length):c.length<n?h.flowdata=r(c,n-c.length,0):c[0].length<e?h.flowdata=r(c,0,e-c[0].length):h.flowdata=c,t.webWorkerFlowDataCache(h.flowdata),o(n,e),g&&(a.showSheet(),setTimeout(function(){a.restoreCache(),l.execFunctionGroup(),a.restoreSheetAll(h.currentSheetIndex),i()},1))}});
//# sourceMappingURL=../sourcemaps/global/createsheet.js.map

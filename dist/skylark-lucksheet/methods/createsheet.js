/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../methods/getdata","../methods/rhchInit","../store"],function(t,a,e){"use strict";const{datagridgrowth:l}=t;return function(t,n,o,h,d){null==d&&(d=!0),e.visibledatarow=[],e.visibledatacolumn=[],e.ch_width=0,e.rh_height=0,e.zoomRatio=1,e.config=null!=h?h:{},0==o.length?e.flowdata=l(o,n,t):o.length<n&&o[0].length<t?e.flowdata=l(o,n-o.length,t-o[0].length):o.length<n?e.flowdata=l(o,n-o.length,0):o[0].length<t?e.flowdata=l(o,0,t-o[0].length):e.flowdata=o,e.webWorkerFlowDataCache(e.flowdata),a(n,t),d&&e.active()}});
//# sourceMappingURL=../sourcemaps/methods/createsheet.js.map

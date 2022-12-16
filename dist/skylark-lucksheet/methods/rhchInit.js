/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../store","./luckysheetConfigsetting"],function(l,e){"use strict";function o(){l.rowHeaderWidth=e.rowHeaderWidth*l.zoomRatio,l.columnHeaderHeight=e.columnHeaderHeight*l.zoomRatio,$("#luckysheet-rows-h").width(l.rowHeaderWidth-1.5),$("#luckysheet-cols-h-c").height(l.columnHeaderHeight-1.5),$("#luckysheet-left-top").css({width:l.rowHeaderWidth-1.5,height:l.columnHeaderHeight-1.5})}function n(n,i){if(o(),null!=n){l.visibledatarow=[],l.rh_height=0;for(let e=0;e<n;e++){let o=l.defaultrowlen;null!=l.config.rowlen&&null!=l.config.rowlen[e]&&(o=l.config.rowlen[e]),null==l.config.rowhidden||null==l.config.rowhidden[e]?(l.rh_height+=Math.round((o+1)*l.zoomRatio),l.visibledatarow.push(l.rh_height)):l.visibledatarow.push(l.rh_height)}e.enableAddRow||e.enableAddBackTop?l.rh_height+=80:l.rh_height+=29}if(null!=i){l.visibledatacolumn=[],l.ch_width=0;let e=120;for(let e=0;e<i;e++){let o=l.defaultcollen;null!=l.config.columnlen&&null!=l.config.columnlen[e]?o=l.config.columnlen[e]:null!=l.flowdata[0]&&null!=l.flowdata[0][e]&&(o>300?o=300:o<l.defaultcollen&&(o=l.defaultcollen),o!=l.defaultcollen&&(null==l.config.columnlen&&(l.config.columnlen={}),l.config.columnlen[e]=o)),null==l.config.colhidden||null==l.config.colhidden[e]?(l.ch_width+=Math.round((o+1)*l.zoomRatio),l.visibledatacolumn.push(l.ch_width)):l.visibledatacolumn.push(l.ch_width)}l.ch_width+=e}}return n.zoomSetting=o,n});
//# sourceMappingURL=../sourcemaps/methods/rhchInit.js.map

/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../methods/get","../store"],function(e,t){"use strict";const{getSheetIndex:l}=e;return{setluckysheet_select_save:function(e){t.luckysheet_select_save=e},setluckysheet_scroll_status:function(e){t.luckysheet_scroll_status=e},setluckysheetfile:function(e){t.luckysheetfile=e},setconfig:function(e){t.config=e,null!=t.luckysheetfile&&(t.luckysheetfile[l(t.currentSheetIndex)].config=e)},setvisibledatarow:function(e){t.visibledatarow=e,null!=t.luckysheetfile&&(t.luckysheetfile[l(t.currentSheetIndex)].visibledatarow=e)},setvisibledatacolumn:function(e){t.visibledatacolumn=e,null!=t.luckysheetfile&&(t.luckysheetfile[l(t.currentSheetIndex)].visibledatacolumn=e)}}});
//# sourceMappingURL=../sourcemaps/methods/set.js.map

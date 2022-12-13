/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../controllers/selection","../controllers/menuButton"],function(e,c){"use strict";return function(l){$("#luckysheet-cols-h-hover").hide(),$("#luckysheet-rightclick-menu").hide(),$("#luckysheet-cell-selected-boxs .luckysheet-cell-selected").hide(),$("#luckysheet-cols-h-selected .luckysheet-cols-h-selected").hide(),$("#luckysheet-rows-h-selected .luckysheet-rows-h-selected").hide(),$("#luckysheet-cell-selected-focus").hide(),$("#luckysheet-rows-h-hover").hide(),$("#luckysheet-selection-copy .luckysheet-selection-copy").hide(),$("#luckysheet-cols-menu-btn").hide(),$("#luckysheet-row-count-show, #luckysheet-column-count-show").hide(),l||e.clearcopy(l),$("#luckysheet-dropCell-icon").is(":visible")&&l&&$("#luckysheet-dropCell-icon").remove(),c.luckysheetPaintModelOn&&!l&&c.cancelPaintModel()}});
//# sourceMappingURL=../sourcemaps/global/cleargridelement.js.map

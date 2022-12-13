/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../controllers/freezen","../controllers/sheetSearch","../global/refresh","../store","../global/method"],function(e,l,t,o,r){"use strict";const{luckysheet_searcharray:s}=l,{luckysheetrefreshgrid:c}=t;return function(l){let t=$("#luckysheet-cell-main"),o=$("#luckysheet-scrollbar-x").scrollLeft(),s=$("#luckysheet-scrollbar-y").scrollTop(),n=$("#luckysheetTableContent").height();return null!=e.freezenhorizontaldata&&s<e.freezenhorizontaldata[2]?(s=e.freezenhorizontaldata[2],void $("#luckysheet-scrollbar-y").scrollTop(s)):null!=e.freezenverticaldata&&o<e.freezenverticaldata[2]?(o=e.freezenverticaldata[2],void $("#luckysheet-scrollbar-x").scrollLeft(o)):($("#luckysheet-cols-h-c").scrollLeft(o),$("#luckysheet-rows-h").scrollTop(s),t.scrollLeft(o).scrollTop(s),$("#luckysheet-input-box-index").css({left:$("#luckysheet-input-box").css("left"),top:parseInt($("#luckysheet-input-box").css("top"))-20+"px","z-index":$("#luckysheet-input-box").css("z-index")}).show(),c(o,s),$("#luckysheet-bottom-controll-row").css("left",o),null==e.freezenhorizontaldata&&null==e.freezenverticaldata||e.scrollAdapt(),void r.createHookFunction("scroll",{scrollLeft:o,scrollTop:s,canvasHeight:n}))}});
//# sourceMappingURL=../sourcemaps/global/scroll.js.map

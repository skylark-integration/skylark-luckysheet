/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../controllers/freezen","../methods/sheetSearch","../store","../methods/luckysheetConfigsetting"],function(e,l,t,o){"use strict";const{luckysheet_searcharray:s}=l;return function(l){let s=$("#luckysheet-cell-main"),r=$("#luckysheet-scrollbar-x").scrollLeft(),c=$("#luckysheet-scrollbar-y").scrollTop(),n=$("#luckysheetTableContent").height();return null!=t.freezenhorizontaldata&&c<t.freezenhorizontaldata[2]?(c=t.freezenhorizontaldata[2],void $("#luckysheet-scrollbar-y").scrollTop(c)):null!=t.freezenverticaldata&&r<t.freezenverticaldata[2]?(r=t.freezenverticaldata[2],void $("#luckysheet-scrollbar-x").scrollLeft(r)):($("#luckysheet-cols-h-c").scrollLeft(r),$("#luckysheet-rows-h").scrollTop(c),s.scrollLeft(r).scrollTop(c),$("#luckysheet-input-box-index").css({left:$("#luckysheet-input-box").css("left"),top:parseInt($("#luckysheet-input-box").css("top"))-20+"px","z-index":$("#luckysheet-input-box").css("z-index")}).show(),t.refresh(r,c),$("#luckysheet-bottom-controll-row").css("left",r),null==t.freezenhorizontaldata&&null==t.freezenverticaldata||e.scrollAdapt(),void o.createHookFunction("scroll",{scrollLeft:r,scrollTop:c,canvasHeight:n}))}});
//# sourceMappingURL=../sourcemaps/controllers/scroll.js.map

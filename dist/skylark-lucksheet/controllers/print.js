/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./luckysheetConfigsetting","./zoom","./sheetmanage","./server","../global/location","../store"],function(e,t,n,i,o,c){"use strict";const{zoomChange:a}=t,{rowLocationByIndex:r,colLocationByIndex:l,mouseposition:u,rowLocation:s,colLocation:h}=o;function w(e,t){let o=n.getSheetByIndex();null==o.config&&(o.config={}),null==o.config.sheetViewZoom&&(o.config.sheetViewZoom={});let r=1,l="zoomScaleNormal";"viewNormal"==e?l="viewNormalZoomScale":"viewLayout"==e?l="viewLayoutZoomScale":"viewPage"==e&&(l="viewPageZoomScale",r=.6);let u=o.config.sheetViewZoom[l];null==u&&(u=r),o.config.curentsheetView=e,c.clearjfundo&&c.jfredo.push({type:"viewChange",curType:e,preType:t,sheetIndex:c.currentSheetIndex}),i.saveParam("cg",c.currentSheetIndex,e,{k:"curentsheetView"}),c.currentSheetView=e,a(u)}return{viewChange:w,printInitial:function(){let t=e.container;$("#"+t).find(".luckysheet-print-viewBtn").click(function(){!function(e){let t=e.parent().find("luckysheet-print-viewBtn-active").attr("type");if(e.attr("type")==t)return;let n=e.attr("type");null!=n&&(w(n,t),e.parent().find(".luckysheet-print-viewBtn").removeClass("luckysheet-print-viewBtn-active"),e.addClass("luckysheet-print-viewBtn-active"))}($(this))})}}});
//# sourceMappingURL=../sourcemaps/controllers/print.js.map

/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../methods/luckysheetConfigsetting","./zoom","../methods/location","../store"],function(e,t,n,o){"use strict";const{zoomChange:i}=t,{rowLocationByIndex:c,colLocationByIndex:r,mouseposition:a,rowLocation:l,colLocation:u}=n;function s(e,t){let n=o.getSheetByIndex();null==n.config&&(n.config={}),null==n.config.sheetViewZoom&&(n.config.sheetViewZoom={});let c=1,r="zoomScaleNormal";"viewNormal"==e?r="viewNormalZoomScale":"viewLayout"==e?r="viewLayoutZoomScale":"viewPage"==e&&(r="viewPageZoomScale",c=.6);let a=n.config.sheetViewZoom[r];null==a&&(a=c),n.config.curentsheetView=e,o.clearjfundo&&o.jfredo.push({type:"viewChange",curType:e,preType:t,sheetIndex:o.currentSheetIndex}),o.saveParam("cg",o.currentSheetIndex,e,{k:"curentsheetView"}),o.currentSheetView=e,i(a)}return{viewChange:s,printInitial:function(){let t=e.container;$("#"+t).find(".luckysheet-print-viewBtn").click(function(){!function(e){let t=e.parent().find("luckysheet-print-viewBtn-active").attr("type");if(e.attr("type")==t)return;let n=e.attr("type");null!=n&&(s(n,t),e.parent().find(".luckysheet-print-viewBtn").removeClass("luckysheet-print-viewBtn-active"),e.addClass("luckysheet-print-viewBtn-active"))}($(this))})}}});
//# sourceMappingURL=../sourcemaps/controllers/print.js.map

/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./pivotTable","./freezen","./menuButton","./conditionformat","./alternateformat","./cellDatePickerCtrl","./dataVerificationCtrl","./protection","../utils/util","../global/validate","../global/getdata","../global/format","../global/formula","../global/cursorPos","../global/cleargridelement","./inlineString","../store","./server","../global/method"],function(e,t,l,i,o,r,a,n,c,h,u,s,d,g,f,m,b,w,x){"use strict";const{checkProtectionLocked:p,checkProtectionCellHidden:y}=n,{chatatABC:k}=c,{isEditMode:H}=h,{getcellvalue:v,getInlineStringStyle:z}=u,{valueShowEs:C}=s,{luckysheetRangeLast:_}=g,{isInlineStringCell:S}=m;function B(e,t,i){let o=b.visibledatarow[e],r=e-1==-1?0:b.visibledatarow[e-1],a=b.visibledatacolumn[t],n=t-1==-1?0:b.visibledatacolumn[t-1];null==i&&(i=b.flowdata);let c=l.mergeborer(i,e,t);return c&&(o=c.row[1],r=c.row[0],e=c.row[2],a=c.column[1],n=c.column[0],t=c.column[2]),{row:o,row_pre:r,row_index:e,col:a,col_pre:n,col_index:t}}return{luckysheetupdateCell:function(n,c,h,u,s){if(!p(n,c,b.currentSheetIndex))return void $("#luckysheet-functionbox-cell").blur();if(H()||!1===b.allowEdit)return;if(x.createHookFunction("cellEditBefore",b.luckysheet_select_save),w.saveParam("mv",b.currentSheetIndex,{op:"enterEdit",range:b.luckysheet_select_save}),null!=a.dataVerification&&null!=a.dataVerification[n+"_"+c]){let e=a.dataVerification[n+"_"+c];if("dropdown"==e.type)a.dropdownListShow();else if("checkbox"==e.type)return}let g=B(n,c,h),m=g.row,R=g.row_pre,I=g.col,P=g.col_pre,T=g.row_index,W=g.col_index;$("#luckysheet-dropCell-icon").is(":visible")&&$("#luckysheet-dropCell-icon").remove();let E=$(window).height(),L=$(window).width(),A=$("#"+b.container).offset(),F=$("#luckysheet-cell-main").scrollLeft(),V=$("#luckysheet-cell-main").scrollTop();if(e.isPivotRange(T,W))return;let M=P+A.left+b.rowHeaderWidth-F-2;null!=t.freezenverticaldata&&c<=t.freezenverticaldata[1]&&(M=P+A.left+b.rowHeaderWidth-2);let q=R+A.top+b.infobarHeight+b.toolbarHeight+b.calculatebarHeight+b.columnHeaderHeight-V-2;null!=t.freezenhorizontaldata&&n<=t.freezenhorizontaldata[1]&&(q=R+A.top+b.infobarHeight+b.toolbarHeight+b.calculatebarHeight+b.columnHeaderHeight-2);let D={"min-width":I-P+1-8,"min-height":m-R+1-4,"max-width":L+F-P-20-b.rowHeaderWidth,"max-height":E+V-R-20-15-b.toolbarHeight-b.infobarHeight-b.calculatebarHeight-b.sheetBarHeight-b.statisticBarHeight,left:M,top:q},U={transform:"scale("+b.zoomRatio+")","transform-origin":"left top",width:100/b.zoomRatio+"%",height:100/b.zoomRatio+"%"};b.luckysheetCellUpdate=[T,W],s||$("#luckysheet-rich-text-editor").focus().select(),$("#luckysheet-input-box").removeAttr("style").css({"background-color":"rgb(255, 255, 255)",padding:"0px 2px","font-size":"13px",right:"auto","overflow-y":"auto","box-sizing":"initial",display:"flex"}),null==t.freezenverticaldata&&null==t.freezenhorizontaldata||$("#luckysheet-input-box").css("z-index",10002),$("#luckysheet-input-box-index").html(k(W)+(T+1)).hide(),$("#luckysheet-wa-functionbox-cancel, #luckysheet-wa-functionbox-confirm").addClass("luckysheet-wa-calculate-active");let j="",G=!1;if(null!=h[T]&&null!=h[T][W]){let e=h[T][W],t=e.ht,i="left",o="top";"0"==t?(D={"min-width":I-P+1-8,"min-height":m-R+1-4,"max-width":2*L/3,"max-height":E+V-R-20-15-b.toolbarHeight-b.infobarHeight-b.calculatebarHeight-b.sheetBarHeight-b.statisticBarHeight,left:P+A.left+b.rowHeaderWidth-F-2,top:R+A.top+b.infobarHeight+b.toolbarHeight+b.calculatebarHeight+b.columnHeaderHeight-V-2},b.zoomRatio<1&&(i="center"),G=!0):"2"==t&&(D={"min-width":I-P+1-8,"min-height":m-R+1-4,"max-width":I+A.left-F-8,"max-height":E+V-R-20-15-b.toolbarHeight-b.infobarHeight-b.calculatebarHeight-b.sheetBarHeight-b.statisticBarHeight,right:L-(A.left+(b.rowHeaderWidth-1)-F)-I,top:R+A.top+b.infobarHeight+b.toolbarHeight+b.calculatebarHeight+b.columnHeaderHeight-V-2},b.zoomRatio<1&&(i="right")),"0"==e.vt?o="center":"2"==e.vt&&(o="bottom"),U["transform-origin"]=i+" "+o,u||(S(e)?j=z(T,W,h):null!=e.f?j=v(T,W,h,"f"):(j=C(T,W,h),"1"==e.qp&&(j="'"+j)));let r=l.getStyleByCell(h,T,W);r=$("#luckysheet-input-box").get(0).style.cssText+r,$("#luckysheet-input-box").get(0).style.cssText=r,"rgba(0, 0, 0, 0)"==$("#luckysheet-input-box").get(0).style.backgroundColor&&($("#luckysheet-input-box").get(0).style.background="rgb(255,255,255)")}else{let e=o.getComputeMap();var J=o.checksAF(T,W,e),K=i.getComputeMap(),N=i.checksCF(T,W,K);null!=N&&null!=N.cellColor?$("#luckysheet-input-box").get(0).style.background=N.cellColor:null!=J&&($("#luckysheet-input-box").get(0).style.background=J[1])}if(D["min-height"]>D["max-height"]&&(D["min-height"]=D["max-height"]),D["min-width"]>D["max-width"]&&(D["min-width"]=D["max-width"]),null!=j&&""!=j.toString()||u||(j="<br/>"),!y(T,W,b.currentSheetIndex)&&j.length>0&&'<span dir="auto" class="luckysheet-formula-text-color">=</span>'==j.substr(0,63)?$("#luckysheet-rich-text-editor").html(""):($("#luckysheet-rich-text-editor").html(j),s||_($("#luckysheet-rich-text-editor")[0])),G){let e=$("#luckysheet-input-box").width();e>D["max-width"]&&(e=D["max-width"]),e<D["min-width"]&&(e=D["min-width"]);let t=D.left-e/2+(I-P)/2;t<2&&(t=2),D.left=t-2}$("#luckysheet-input-box").css(D),$("#luckysheet-rich-text-editor").css(U),h[n][c]&&h[n][c].ct&&"d"==h[n][c].ct.t&&r.cellFocus(n,c,h[n][c]),d.rangetosheet=b.currentSheetIndex,d.createRangeHightlight(),d.rangeResizeTo=$("#luckysheet-rich-text-editor"),f()},setCenterInputPosition:function(e,t,l){if(null==e||null==t)return;let i=l[e][t];if(null==i)return;let o=i.ht;if(null!=i&&"0"!=o)return;let r=B(e,t,l),a=(r.row,r.row_pre,r.col),n=r.col_pre,c=($(window).height(),$(window).width()),h=$("#"+b.container).offset(),u=$("#luckysheet-cell-main").scrollLeft(),s=($("#luckysheet-cell-main").scrollTop(),{"min-width":a-n+1-8,"max-width":2*c/3,left:n+h.left+b.rowHeaderWidth-u-2}),d=$("#luckysheet-input-box").width();d>s["max-width"]&&(d=s["max-width"]),d<s["min-width"]&&(d=s["min-width"]);let g=s.left-d/2+(a-n)/2;g<2&&(g=2),s.left=g-2,$("#luckysheet-input-box").css(s)},getColumnAndRowSize:B}});
//# sourceMappingURL=../sourcemaps/controllers/updateCell.js.map
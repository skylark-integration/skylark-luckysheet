/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../../utils/util","../../utils/chartUtil","../../global/getdata","../../store","../../global/formula","../../function/func","../../methods/get","../../global/location","../../methods/set","../../controllers/sheetMove","../../global/validate","../../controllers/resize"],function(e,t,r,a,l,n,o,c,i,s,h,d){"use strict";const{seriesLoadScripts:u,loadLinks:g,$$:y,arrayRemoveItem:m}=e,{generateRandomKey:p,replaceHtml:k}=t,{getdatabyselection:x,getcellvalue:f}=r,{luckysheet_getcelldata:v}=n,{getSheetIndex:w,getRangetxt:b,getvisibledatacolumn:C,getvisibledatarow:z}=o,{rowLocation:_,colLocation:S,mouseposition:A}=c,{setluckysheet_scroll_status:R}=i,{luckysheetMoveHighlightCell:I,luckysheetMoveHighlightCell2:M,luckysheetMoveHighlightRange:T,luckysheetMoveHighlightRange2:j,luckysheetMoveEndCell:O}=s,{isEditMode:W}=h;let D=_,H=S;const L=["https://cdn.jsdelivr.net/npm/vue@2.6.11","https://unpkg.com/vuex@3.4.0","https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.js","https://cdn.bootcdn.net/ajax/libs/echarts/4.8.0/echarts.min.js","expendPlugins/chart/chartmix.umd.min.js"],E=["https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css","expendPlugins/chart/chartmix.css"];function X(e,t){if(void 0!=e)for(let r=0;r<e.length;r++){let l=e[r];t&&a.chartparam.insertToStore({chart_id:l.chart_id,chartOptions:l.chartOptions});let n=l.chart_id,o=n+"_c",c=$(k('<div id="${id}"class="luckysheet-modal-dialog luckysheet-modal-dialog-chart ${addclass}"tabindex="0"role="dialog"aria-labelledby=":41e"dir="ltr"><div class="luckysheet-modal-dialog-resize"><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lt"data-type="lt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-mt"data-type="mt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lm"data-type="lm"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rm"data-type="rm"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rt"data-type="rt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lb"data-type="lb"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-mb"data-type="mb"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rb"data-type="rb"></div></div><div class="luckysheet-modal-dialog-controll"><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-update"role="button"tabindex="0"aria-label="修改图表"title="修改图表"><i class="fa fa-pencil"aria-hidden="true"></i></span><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-max"role="butluckysheet_chartIns_indexton"tabindex="0"aria-label="最大化"title="最大化"><i class="fa fa-window-maximize"aria-hidden="true"></i></span><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-del"role="button"tabindex="0"aria-label="删除"title="删除"><i class="fa fa-trash"aria-hidden="true"></i></span></div><div class="luckysheet-modal-dialog-content">${content}</div></div>',{id:o,addclass:"luckysheet-data-visualization-chart",title:"图表生成",content:""})).appendTo($(".luckysheet-cell-main"));P(c),$(`#${o}`).children(".luckysheet-modal-dialog-content")[0].id=n;let i,s=document.getElementById(o);i=a.chartparam.getChartJson(l.chart_id),a.chartparam.renderChart({chart_id:l.chart_id,chartOptions:i}),a.currentChart=i,B(n),$(`#${n}_c .luckysheet-modal-controll-del`).click(function(e){Y(n)}),$(`#${n}_c .luckysheet-modal-controll-update`).click(function(e){U()}),c.children(".luckysheet-modal-dialog-content").mousedown(function(e){a.chartparam.luckysheetCurrentChartMaxState||B(n),e.stopPropagation()}),c.mousedown(function(e){if(!a.chartparam.luckysheetCurrentChartMaxState){B(n),R(!0),$(e.target).is(".luckysheet-modal-dialog-controll")||$(e.target).is(".luckysheet-modal-controll-btn")||$(e.target).is("i")||(a.chartparam.luckysheetCurrentChartMoveTimeout=setTimeout(function(){a.chartparam.luckysheetCurrentChartMove=!0},100));var t=a.chartparam.luckysheetCurrentChartMoveObj.offset(),r=a.chartparam.luckysheetCurrentChartMoveObj.position();a.chartparam.luckysheetCurrentChartMoveXy=[e.pageX-t.left,e.pageY-t.top,r.left,r.top,$("#luckysheet-scrollbar-x").scrollLeft(),$("#luckysheet-scrollbar-y").scrollTop()],a.chartparam.luckysheetCurrentChartMoveWinH=$("#luckysheet-cell-main")[0].scrollHeight,a.chartparam.luckysheetCurrentChartMoveWinW=$("#luckysheet-cell-main")[0].scrollWidth,$(e.target).hasClass("luckysheet-mousedown-cancel")||0!=$(e.target).filter("[class*='sp-palette']").length||0!=$(e.target).filter("[class*='sp-thumb']").length||0!=$(e.target).filter("[class*='sp-']").length||($("#luckysheet-rightclick-menu").hide(),$("#luckysheet-cols-h-hover").hide(),$("#luckysheet-cols-menu-btn").hide(),$("#luckysheet-rightclick-menu").hide(),$("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu, #luckysheet-user-menu").hide(),$("body > .luckysheet-filter-menu, body > .luckysheet-filter-submenu, body > .luckysheet-cols-menu").hide()),e.stopPropagation()}}).find(".luckysheet-modal-dialog-resize-item").mousedown(function(e){if(a.chartparam.luckysheetCurrentChartActive){a.chartparam.luckysheetCurrentChartResize=$(this).data("type");var t=A(e.pageX,e.pageY),r=$("#luckysheet-scrollbar-x").scrollLeft(),l=$("#luckysheet-scrollbar-y").scrollTop(),o=t[0]+r,i=t[1]+l,s=a.chartparam.luckysheetCurrentChartResizeObj.position();a.chartparam.luckysheetCurrentChartResizeXy=[o,i,c.width(),c.height(),s.left+r,s.top+l,r,l],a.chartparam.luckysheetCurrentChartResizeWinH=$("#luckysheet-cell-main")[0].scrollHeight,a.chartparam.luckysheetCurrentChartResizeWinW=$("#luckysheet-cell-main")[0].scrollWidth,a.chartparam.luckysheetCurrentChart=n,e.stopPropagation()}});let h=l.width,d=l.height,u=l.left,g=l.top;s.style.width=h+"px",s.style.height=d+"px",s.style.position="absolute",s.style.background="#fff",s.style.left=u+"px",s.style.top=g+"px",s.style.zIndex=a.zIndex?a.zIndex:15,a.zIndex++}}function J(e,t,r,n,o){let c=a.currentChart;if(c&&1==c.rangeArray.length){var i=c.rangeArray[0].row,s=c.rangeArray[0].column;if(t>i[1]||r<i[0]||n>s[1]||o<s[0])return;var h=l.getcellrange(c.rangeTxt),d=-1==h.sheetIndex?0:h.sheetIndex,u=(h.row,h.column,v(c.rangeTxt));if("object"==typeof u&&0!=u.length&&null!=u.data.length){var g=u.data;a.chartparam.changeChartCellData(c.chart_id,g)}}}function P(e){e.find(".luckysheet-modal-dialog-content").hover(function(){e.removeClass("chart-moveable")},function(){e.addClass("chart-moveable")}),e.hover(function(){e.addClass("chart-moveable")},function(){e.removeClass("chart-moveable")})}function Y(e){$(`.luckysheet-cell-main #${e}_c`).remove(),N();let t=a.luckysheetfile[w(a.currentSheetIndex)],r=t.chart.findIndex(t=>t.chart_id==e);t.chart.splice(r,1),a.deleteChart(e)}function B(e){let t=a.luckysheetfile[w(a.currentSheetIndex)].chart;for(let r in t)t[r].needRangeShow=!1,t[r].chart_id==e&&(t[r].needRangeShow=!0,a.currentChart=a.getChartJson(e));V(e)}function N(){let e=a.luckysheetfile[w(a.currentSheetIndex)].chart;for(let t in e)e[t].needRangeShow=!1;K()}function V(e){let t=$("#"+e+"_c");a.chart_selection.create(),a.chartparam.luckysheetCurrentChartActive=!0,a.chartparam.luckysheetCurrentChartMoveObj=t,a.chartparam.luckysheetCurrentChartResizeObj=t,a.chartparam.luckysheetCurrentChart=e,$("#luckysheet-cell-main").find(".luckysheet-modal-dialog-chart .luckysheet-modal-dialog-resize").hide(),$("#luckysheet-cell-main").find(".luckysheet-modal-dialog-chart .luckysheet-modal-dialog-controll").hide(),t.css("z-index",a.chartparam.luckysheetCurrentChartZIndexRank++),t.find(".luckysheet-modal-dialog-resize").show(),t.find(".luckysheet-modal-dialog-controll").show(),($(".chartSetting").is(":visible")||a.chartparam.luckysheet_chart_redo_click)&&e!=a.chartparam.luckysheetCurrentChart&&$("body .luckysheet-cols-menu").hide(),a.currentChart=a.highlightChart(e)}function K(e){var t;$("#luckysheet-cell-main .luckysheet-modal-dialog-chart .luckysheet-modal-dialog-resize, #luckysheet-cell-main .luckysheet-modal-dialog-chart .luckysheet-modal-dialog-controll").hide(),$("#luckysheet-cell-main").find(".luckysheet-datavisual-selection-set div").remove(),a.chartparam.luckysheetCurrentChartActive=!1,$("#luckysheet-chart-rangeShow").empty(),e||!$(".chartSetting").is(":visible")||W()||$(".chartSetting").is(":visible")&&($(".chartSetting").hide(),$("#luckysheet-cell-main .luckysheet-modal-dialog-chart .luckysheet-modal-dialog-resize, #luckysheet-cell-main .luckysheet-modal-dialog-chart .luckysheet-modal-dialog-controll").hide(),$("#luckysheet-cell-main").find(".luckysheet-datavisual-selection-set div").remove(),a.chartparam.luckysheetCurrentChartActive=!1,W()||t||setTimeout(function(){d()},0))}function U(e,t){$(".chartSetting").is(":visible")||($(".chartSetting").show(),$("#luckysheet-cell-main").find(".luckysheet-datavisual-selection-set div").show(),a.chartparam.luckysheetCurrentChartActive=!0,setTimeout(function(){d()},0))}function Z(e){K("true"),a.luckysheetfile.forEach(t=>{if(t.index==e){(t.chart||[]).forEach(e=>{e.isShow=!0,$("#"+e.chart_id+"_c").show(),a.resizeChart(e.chart_id),1==e.needRangeShow&&(a.currentChart=a.getChartJson(e.chart_id),V(e.chart_id))})}else{(t.chart||[]).forEach(e=>{e.isShow=!1,$("#"+e.chart_id+"_c").hide()})}})}return{chart:function(e,t){g(E),u(L,null,function(){const r=new Vuex.Store;console.info("chartmix::",chartmix.default),Vue.use(chartmix.default,{store:r});let l=document.getElementsByTagName("body")[0];chartmix.default.initChart(l,a.lang),$(".chartSetting").css({top:"1px",bottom:"1px",position:"absolute",right:"0px",width:"350px",background:"#fff",border:"1px solid #E5E5E5","z-index":1004,"box-shadow":"0px 2px 4px rgba(0,0,0,0.2)","-webkit-box-shadow":"0px 2px 4px rgba(0,0,0,0.2)","-moz-box-shadow":"0px 2px 4px rgba(0,0,0,0.2)","-moz-user-select":"none","-khtml-user-select":"none","-webkit-user-select":"none","-ms-user-select":"none","user-select":"none","padding-left":"30px",display:"none"}),a.createChart=chartmix.default.createChart,a.highlightChart=chartmix.default.highlightChart,a.deleteChart=chartmix.default.deleteChart,a.resizeChart=chartmix.default.resizeChart,a.changeChartRange=chartmix.default.changeChartRange,a.changeChartCellData=chartmix.default.changeChartCellData,a.getChartJson=chartmix.default.getChartJson,a.chart_selection={create:function(){var e=a.currentChart;if(!(e.rangeArray.length>1)){$("#luckysheet-chart-rangeShow").empty(),$("#luckysheet-cell-selected-boxs").hide(),$("#luckysheet-cell-selected-focus").hide(),$("#luckysheet-rows-h-selected").empty(),$("#luckysheet-cols-h-selected").empty(),$("#luckysheet-row-count-show").hide(),$("#luckysheet-column-count-show").hide();var t=e.rangeArray[0].row[0],r=e.rangeArray[0].column[0],l=e.rangeSplitArray,n=e.rangeRowCheck;if(n.exits)var o=h("rowtitle",l.rowtitle.row[0]+t,l.rowtitle.row[1]+t,l.rowtitle.column[0]+r,l.rowtitle.column[1]+r);else var o="";var c=e.rangeColCheck;if(c.exits)var i=h("coltitle",l.coltitle.row[0]+t,l.coltitle.row[1]+t,l.coltitle.column[0]+r,l.coltitle.column[1]+r);else var i="";var s=h("content",l.content.row[0]+t,l.content.row[1]+t,l.content.column[0]+r,l.content.column[1]+r);$("#luckysheet-chart-rangeShow").append(o+i+s)}function h(e,t,r,a,l){var n=z(),o=C(),c=n[r],i=t-1==-1?0:n[t-1],s=o[l],h=a-1==-1?0:o[a-1];if("rowtitle"==e)var d="#C65151";if("coltitle"==e)var d="#9667C0";if("content"==e)var d="#4970D1";var u='<div id="luckysheet-chart-rangeShow-'+e+'" style="left: '+h+"px;width: "+(s-h-1)+"px;top: "+i+"px;height: "+(c-i-1)+'px;border: none;margin: 0;position: absolute;z-index: 14;"><div class="luckysheet-chart-rangeShow-move" data-type="top" style="height: 2px;border-top: 2px solid #fff;border-bottom: 2px solid #fff;background: '+d+';position: absolute;left: 0;right: 0;top: -2px;z-index: 18;opacity: 0.9;cursor: move;"></div><div class="luckysheet-chart-rangeShow-move" data-type="right" style="width: 2px;border-left: 2px solid #fff;border-right: 2px solid #fff;background: '+d+';position: absolute;top: 0;bottom: 0;right: -2px;z-index: 18;opacity: 0.9;cursor: move;"></div><div class="luckysheet-chart-rangeShow-move" data-type="bottom" style="height: 2px;border-top: 2px solid #fff;border-bottom: 2px solid #fff;background: '+d+';position: absolute;left: 0;right: 0;bottom: -2px;z-index: 18;opacity: 0.9;cursor: move;"></div><div class="luckysheet-chart-rangeShow-move" data-type="left" style="width: 2px;border-left: 2px solid #fff;border-right: 2px solid #fff;background: '+d+';position: absolute;top: 0;bottom: 0;left: -2px;z-index: 18;opacity: 0.9;cursor: move;"></div><div style="border: 2px solid #85c0fc;background: '+d+';position: absolute;top: 0;right: 0;bottom: 0;left: 0;z-index: 15;opacity: 0.1;"></div><div class="luckysheet-chart-rangeShow-resize" data-type="lt" style="width: 6px;height: 6px;border: 1px solid #fff;background: '+d+';position: absolute;left: -3px;top: -3px;z-index: 19;cursor: se-resize;"></div><div class="luckysheet-chart-rangeShow-resize" data-type="rt" style="width: 6px;height: 6px;border: 1px solid #fff;background: '+d+';position: absolute;right: -3px;top: -3px;z-index: 19;cursor: ne-resize;"></div><div class="luckysheet-chart-rangeShow-resize" data-type="lb" style="width: 6px;height: 6px;border: 1px solid #fff;background: '+d+';position: absolute;left: -3px;bottom: -3px;z-index: 19;cursor: ne-resize;"></div><div class="luckysheet-chart-rangeShow-resize" data-type="rb" style="width: 6px;height: 6px;border: 1px solid #fff;background: '+d+';position: absolute;right: -3px;bottom: -3px;z-index: 19;cursor: se-resize;"></div></div>';return u}},rangeMove:!1,rangeMovexy:null,rangeMoveIndex:null,rangeMoveObj:null,rangeMoveDraging:function(e,t,r){var l=a.currentChart,n=l.rangeArray[0].row[0],o=l.rangeArray[0].column[0],c=l.rangeRowCheck,i=l.rangeColCheck,s=l.rangeSplitArray,h=A(e.pageX,e.pageY),d=$("#luckysheet-cell-main").scrollLeft(),u=$("#luckysheet-cell-main").scrollTop(),g=h[0]+d,y=h[1]+u,m=$(window).height()+u-t-r,p=$(window).width()+d,k=D(y),x=k[2],f=H(g),v=f[2],w=z(),b=C(),_=a.chart_selection.rangeMoveObj.attr("id");if("luckysheet-chart-rangeShow-content"==_){var S=a.chart_selection.rangeMoveIndex[0]-a.chart_selection.rangeMovexy[0]+x;c.exits?(S<n+c.range[1]+1||y<0)&&(S=n+c.range[1]+1):(S<0||y<0)&&(S=0);var R=s.content.row[1]-s.content.row[0]+S;(R>=w.length-1||y>m)&&(S=w.length-1-s.content.row[1]+s.content.row[0],R=w.length-1);var I=a.chart_selection.rangeMoveIndex[1]-a.chart_selection.rangeMovexy[1]+v;i.exits?(I<o+i.range[1]+1||g<0)&&(I=o+i.range[1]+1):(I<0||g<0)&&(I=0);var M=s.content.column[1]-s.content.column[0]+I;(M>=b.length-1||g>p)&&(I=b.length-1-s.content.column[1]+s.content.column[0],M=b.length-1),c.exits&&i.exits?(l.rangeArray=[{row:[n,R],column:[o,M]}],l.rangeSplitArray.range={row:[n,R],column:[o,M]},l.rangeSplitArray.content={row:[S-n,R-n],column:[I-o,M-o]},l.rangeSplitArray.rowtitle={row:l.rangeSplitArray.rowtitle.row,column:[I-o,M-o]},l.rangeSplitArray.coltitle={row:[S-n,R-n],column:l.rangeSplitArray.coltitle.column}):c.exits?(l.rangeArray=[{row:[n,R],column:[I,M]}],l.rangeSplitArray.range={row:[n,R],column:[I,M]},l.rangeSplitArray.content={row:[S-n,R-n],column:l.rangeSplitArray.content.column}):i.exits?(l.rangeArray=[{row:[S,R],column:[o,M]}],l.rangeSplitArray.range={row:[S,R],column:[o,M]},l.rangeSplitArray.content={row:l.rangeSplitArray.content.row,column:[I-o,M-o]}):(l.rangeArray=[{row:[S,R],column:[I,M]}],l.rangeSplitArray.range={row:[S,R],column:[I,M]})}else if("luckysheet-chart-rangeShow-rowtitle"==_){var I=a.chart_selection.rangeMoveIndex[1]-a.chart_selection.rangeMovexy[1]+v;i.exits?(I<o+i.range[1]+1||g<0)&&(I=o+i.range[1]+1):(I<0||g<0)&&(I=0);var M=s.rowtitle.column[1]-s.rowtitle.column[0]+I;(M>=b.length-1||g>p)&&(I=b.length-1-s.rowtitle.column[1]+s.rowtitle.column[0],M=b.length-1),i.exits?(l.rangeArray=[{row:l.rangeArray[0].row,column:[o,M]}],l.rangeSplitArray.range={row:l.rangeArray[0].row,column:[o,M]},l.rangeSplitArray.rowtitle={row:l.rangeSplitArray.rowtitle.row,column:[I-o,M-o]},l.rangeSplitArray.content={row:l.rangeSplitArray.content.row,column:[I-o,M-o]}):(l.rangeArray=[{row:l.rangeArray[0].row,column:[I,M]}],l.rangeSplitArray.range={row:l.rangeArray[0].row,column:[I,M]})}else if("luckysheet-chart-rangeShow-coltitle"==_){var S=a.chart_selection.rangeMoveIndex[0]-a.chart_selection.rangeMovexy[0]+x;c.exits?(S<n+c.range[1]+1||y<0)&&(S=n+c.range[1]+1):(S<0||y<0)&&(S=0);var R=s.coltitle.row[1]-s.coltitle.row[0]+S;(R>=w.length-1||y>m)&&(S=w.length-1-s.coltitle.row[1]+s.coltitle.row[0],R=w.length-1),c.exits?(l.rangeArray=[{row:[n,R],column:l.rangeArray[0].column}],l.rangeSplitArray.range={row:[n,R],column:l.rangeArray[0].column},l.rangeSplitArray.coltitle={row:[S-n,R-n],column:l.rangeSplitArray.coltitle.column},l.rangeSplitArray.content={row:[S-n,R-n],column:l.rangeSplitArray.content.column}):(l.rangeArray=[{row:[S,R],column:l.rangeArray[0].column}],l.rangeSplitArray.range={row:[S,R],column:l.rangeArray[0].column})}a.chart_selection.create()},rangeMoveDragged:function(){a.chart_selection.rangeMove=!1;var e=a.currentChart;e.rangeTxt=b(a.currentSheetIndex,e.rangeArray[0],a.currentSheetIndex),e.chartData=x(e.rangeArray[0],a.currentSheetIndex),a.changeChartRange(e.chart_id,e.chartData,e.rangeArray,e.rangeTxt)},rangeResize:!1,rangeResizexy:null,rangeResizeIndex:null,rangeResizeObj:null,rangeResizeDraging:function(e,t,r){var l=a.currentChart,n=l.rangeArray[0].row[0],o=l.rangeArray[0].column[0],c=l.rangeRowCheck,i=l.rangeColCheck,s=(l.rangeSplitArray,A(e.pageX,e.pageY)),h=$("#luckysheet-cell-main").scrollLeft(),d=$("#luckysheet-cell-main").scrollTop(),u=s[0]+h,g=s[1]+d,y=$(window).height()+d-t-r,m=$(window).width()+h,p=D(g),k=p[2],x=H(u),f=x[2],v=z(),w=C(),b=a.chart_selection.rangeResizeObj.attr("id");if("luckysheet-chart-rangeShow-content"==b){if("lt"==a.chart_selection.rangeResize?(j=a.chart_selection.rangeResizeIndex.row[0],R=a.chart_selection.rangeResizeIndex.column[0],O=a.chart_selection.rangeResizeIndex.row[1],I=a.chart_selection.rangeResizeIndex.column[1]):"lb"==a.chart_selection.rangeResize?(j=a.chart_selection.rangeResizeIndex.row[1],R=a.chart_selection.rangeResizeIndex.column[0],O=a.chart_selection.rangeResizeIndex.row[0],I=a.chart_selection.rangeResizeIndex.column[1]):"rt"==a.chart_selection.rangeResize?(j=a.chart_selection.rangeResizeIndex.row[0],R=a.chart_selection.rangeResizeIndex.column[1],O=a.chart_selection.rangeResizeIndex.row[1],I=a.chart_selection.rangeResizeIndex.column[0]):"rb"==a.chart_selection.rangeResize&&(j=a.chart_selection.rangeResizeIndex.row[1],R=a.chart_selection.rangeResizeIndex.column[1],O=a.chart_selection.rangeResizeIndex.row[0],I=a.chart_selection.rangeResizeIndex.column[0]),c.exits){var _=j-a.chart_selection.rangeResizexy[0]+k;_<n+c.range[1]+1||g<0?_=n+c.range[1]+1:(_>=v.length-1||g>y)&&(_=v.length-1)}else{var _=n-a.chart_selection.rangeResizexy[0]+k;_<0||g<0?_=0:(_>=v.length-1||g>y)&&(_=v.length-1)}if(i.exits){var S=R-a.chart_selection.rangeResizexy[1]+f;S<o+i.range[1]+1||u<0?S=o+i.range[1]+1:(S>=w.length-1||u>m)&&(S=w.length-1)}else{var S=o-a.chart_selection.rangeResizexy[1]+f;S<0||u<0?S=0:(S>=w.length-1||u>m)&&(S=w.length-1)}_>O?(W=O,L=_):(W=_,L=O),S>I?(M=I,T=S):(M=S,T=I),c.exits||i.exits?(l.rangeArray=[{row:[n,L],column:[o,T]}],l.rangeSplitArray.range={row:[n,L],column:[o,T]},l.rangeSplitArray.content={row:[W-n,L-n],column:[M-o,T-o]},c.exits&&(l.rangeSplitArray.rowtitle={row:l.rangeSplitArray.rowtitle.row,column:[M-o,T-o]}),i.exits&&(l.rangeSplitArray.coltitle={row:[W-n,L-n],column:l.rangeSplitArray.coltitle.column})):(l.rangeArray=[{row:[W,L],column:[M,T]}],l.rangeSplitArray.range={row:[W,L],column:[M,T]})}else if("luckysheet-chart-rangeShow-rowtitle"==b){var R,I,M,T;if("lt"==a.chart_selection.rangeResize||"lb"==a.chart_selection.rangeResize?(R=a.chart_selection.rangeResizeIndex.column[0],I=a.chart_selection.rangeResizeIndex.column[1]):"rt"!=a.chart_selection.rangeResize&&"rb"!=a.chart_selection.rangeResize||(R=a.chart_selection.rangeResizeIndex.column[1],I=a.chart_selection.rangeResizeIndex.column[0]),i.exits){var S=R-a.chart_selection.rangeResizexy[1]+f;S<o+i.range[1]+1||u<0?S=o+i.range[1]+1:(S>=w.length-1||u>m)&&(S=w.length-1)}else{var S=o-a.chart_selection.rangeResizexy[1]+f;S<0||u<0?S=0:(S>=w.length-1||u>m)&&(S=w.length-1)}S>I?(M=I,T=S):(M=S,T=I),i.exits?(l.rangeArray=[{row:l.rangeArray[0].row,column:[o,T]}],l.rangeSplitArray.range={row:l.rangeArray[0].row,column:[o,T]},l.rangeSplitArray.rowtitle={row:l.rangeSplitArray.rowtitle.row,column:[M-o,T-o]},l.rangeSplitArray.content={row:l.rangeSplitArray.content.row,column:[M-o,T-o]}):(l.rangeArray=[{row:l.rangeArray[0].row,column:[M,T]}],l.rangeSplitArray.range={row:l.rangeArray[0].row,column:[M,T]})}else if("luckysheet-chart-rangeShow-coltitle"==b){var j,O,W,L;if("lt"==a.chart_selection.rangeResize||"rt"==a.chart_selection.rangeResize?(j=a.chart_selection.rangeResizeIndex.row[0],O=a.chart_selection.rangeResizeIndex.row[1]):"lb"!=a.chart_selection.rangeResize&&"rb"!=a.chart_selection.rangeResize||(j=a.chart_selection.rangeResizeIndex.row[1],O=a.chart_selection.rangeResizeIndex.row[0]),c.exits){var _=j-a.chart_selection.rangeResizexy[0]+k;_<n+c.range[1]+1||g<0?_=n+c.range[1]+1:(_>=v.length-1||g>y)&&(_=v.length-1)}else{var _=n-a.chart_selection.rangeResizexy[0]+k;_<0||g<0?_=0:(_>=v.length-1||g>y)&&(_=v.length-1)}_>O?(W=O,L=_):(W=_,L=O),c.exits?(l.rangeArray=[{row:[n,L],column:l.rangeArray[0].column}],l.rangeSplitArray.range={row:[n,L],column:l.rangeArray[0].column},l.rangeSplitArray.coltitle={row:[W-n,L-n],column:l.rangeSplitArray.coltitle.column},l.rangeSplitArray.content={row:[W-n,L-n],column:l.rangeSplitArray.content.column}):(l.rangeArray=[{row:[W,L],column:l.rangeArray[0].column}],l.rangeSplitArray.range={row:[W,L],column:l.rangeArray[0].column})}a.chart_selection.create()},rangeResizeDragged:function(){a.chart_selection.rangeResize=null;var e=a.currentChart;e.rangeTxt=b(a.currentSheetIndex,e.rangeArray[0],a.currentSheetIndex),e.chartData=x(e.rangeArray[0],a.currentSheetIndex),a.changeChartRange(e.chart_id,e.chartData,e.rangeArray,e.rangeTxt)}},a.chartparam.jfrefreshchartall=J,a.chartparam.changeChartCellData=chartmix.default.changeChartCellData,a.chartparam.renderChart=chartmix.default.renderChart,a.chartparam.getChartJson=chartmix.default.getChartJson,a.chartparam.insertToStore=chartmix.default.insertToStore;for(let r=0;r<e.length;r++)X(e[r].chart,t);for(let t=0;t<e.length;t++)"1"==e[t].status&&Z(e[t].index);m(a.asyncLoad,"chart")})},createLuckyChart:function(e,t,r,l){var n=luckysheet.getluckysheet_select_save();1==n.length&&n[0].row[0]==n[0].row[1]&&n[0].column[0]==n[0].column[1]&&(j("right","rangeOfSelect"),j("down","rangeOfSelect"),n=luckysheet.getluckysheet_select_save());for(var o=-1,c=n[0].row[1]-n[0].row[0],i=n[0].row[0];i<=n[0].row[1];i++){for(var s=n[0].column[0];s<=n[0].column[1];s++)if(null!=(u=f(i,s,luckysheet.flowdata()))&&u.toString().length>0){o=i;break}if(-1!==o)break}-1==o&&(o=0),n[0].row=[o,o],luckysheet.setluckysheet_select_save(n),a.luckysheet_shiftpositon=$.extend(!0,{},n[0]),O("down","range",!1,c);var h=-1,d=(n=luckysheet.getluckysheet_select_save())[0].column[1]-n[0].column[0];for(s=n[0].column[0];s<=n[0].column[1];s++){for(i=n[0].row[0];i<=n[0].row[1];i++){var u;if(null!=(u=f(i,s,luckysheet.flowdata()))&&u.toString().length>0){h=s;break}}if(-1!==h)break}-1==h&&(h=0),n[0].column=[h,h],luckysheet.setluckysheet_select_save(n),a.luckysheet_shiftpositon=$.extend(!0,{},n[0]),O("right","range",!1,d),n=luckysheet.getluckysheet_select_save();var g=$.extend(!0,[],n),y=b(a.currentSheetIndex,g[0],a.currentSheetIndex);let m=x();console.dir(m);let v=p("chart"),C=v+"_c",z=$(k('<div id="${id}"class="luckysheet-modal-dialog luckysheet-modal-dialog-chart ${addclass}"tabindex="0"role="dialog"aria-labelledby=":41e"dir="ltr"><div class="luckysheet-modal-dialog-resize"><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lt"data-type="lt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-mt"data-type="mt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lm"data-type="lm"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rm"data-type="rm"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rt"data-type="rt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lb"data-type="lb"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-mb"data-type="mb"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rb"data-type="rb"></div></div><div class="luckysheet-modal-dialog-controll"><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-update"role="button"tabindex="0"aria-label="修改图表"title="修改图表"><i class="fa fa-pencil"aria-hidden="true"></i></span><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-max"role="butluckysheet_chartIns_indexton"tabindex="0"aria-label="最大化"title="最大化"><i class="fa fa-window-maximize"aria-hidden="true"></i></span><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-del"role="button"tabindex="0"aria-label="删除"title="删除"><i class="fa fa-trash"aria-hidden="true"></i></span></div><div class="luckysheet-modal-dialog-content">${content}</div></div>',{id:C,addclass:"luckysheet-data-visualization-chart",title:"图表生成",content:""})).appendTo($(".luckysheet-cell-main")),_=document.getElementById(C),{render:S,chart_json:I}=a.createChart($(`#${C}`).children(".luckysheet-modal-dialog-content")[0],m,v,g,y);console.dir(JSON.stringify(I)),e=e||400,t=t||250,r=r||0,l=l||0,_.style.width=e+"px",_.style.height=t+"px",_.style.position="absolute",_.style.background="#fff",_.style.left=r+"px",_.style.top=l+"px",S.style.width="100%",S.style.height="100%",_.style.zIndex=a.zIndex?a.zIndex:15,a.zIndex++;let M=a.luckysheetfile[w(a.currentSheetIndex)];M.chart||(M.chart=[]),M.chart.push({chart_id:v,width:e,height:t,left:r,top:l,sheetIndex:M.index}),B(v),$(`#${v}_c .luckysheet-modal-controll-del`).click(function(e){Y(v)}),P(z),$(`#${v}_c .luckysheet-modal-controll-update`).click(function(e){U()}),z.children(".luckysheet-modal-dialog-content").mousedown(function(e){a.chartparam.luckysheetCurrentChartMaxState||B(v),e.stopPropagation()}),z.mousedown(function(e){if(!a.chartparam.luckysheetCurrentChartMaxState){B(v),R(!0),$(e.target).is(".luckysheet-modal-dialog-controll")||$(e.target).is(".luckysheet-modal-controll-btn")||$(e.target).is("i")||(a.chartparam.luckysheetCurrentChartMoveTimeout=setTimeout(function(){a.chartparam.luckysheetCurrentChartMove=!0},100));var t=a.chartparam.luckysheetCurrentChartMoveObj.offset(),r=a.chartparam.luckysheetCurrentChartMoveObj.position();a.chartparam.luckysheetCurrentChartMoveXy=[e.pageX-t.left,e.pageY-t.top,r.left,r.top,$("#luckysheet-scrollbar-x").scrollLeft(),$("#luckysheet-scrollbar-y").scrollTop()],a.chartparam.luckysheetCurrentChartMoveWinH=$("#luckysheet-cell-main")[0].scrollHeight,a.chartparam.luckysheetCurrentChartMoveWinW=$("#luckysheet-cell-main")[0].scrollWidth,$(e.target).hasClass("luckysheet-mousedown-cancel")||0!=$(e.target).filter("[class*='sp-palette']").length||0!=$(e.target).filter("[class*='sp-thumb']").length||0!=$(e.target).filter("[class*='sp-']").length||($("#luckysheet-rightclick-menu").hide(),$("#luckysheet-cols-h-hover").hide(),$("#luckysheet-cols-menu-btn").hide(),$("#luckysheet-rightclick-menu").hide(),$("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu, #luckysheet-user-menu").hide(),$("body > .luckysheet-filter-menu, body > .luckysheet-filter-submenu, body > .luckysheet-cols-menu").hide()),e.stopPropagation()}}).find(".luckysheet-modal-dialog-resize-item").mousedown(function(e){if(a.chartparam.luckysheetCurrentChartActive){a.chartparam.luckysheetCurrentChartResize=$(this).data("type");var t=A(e.pageX,e.pageY),r=$("#luckysheet-scrollbar-x").scrollLeft(),l=$("#luckysheet-scrollbar-y").scrollTop(),n=t[0]+r,o=t[1]+l,c=a.chartparam.luckysheetCurrentChartResizeObj.position();a.chartparam.luckysheetCurrentChartResizeXy=[n,o,z.width(),z.height(),c.left+r,c.top+l,r,l],a.chartparam.luckysheetCurrentChartResizeWinH=$("#luckysheet-cell-main")[0].scrollHeight,a.chartparam.luckysheetCurrentChartResizeWinW=$("#luckysheet-cell-main")[0].scrollWidth,a.chartparam.luckysheetCurrentChart=v,e.stopPropagation()}})},hideAllNeedRangeShow:N,renderChartShow:Z}});
//# sourceMappingURL=../../sourcemaps/expendPlugins/chart/plugin.js.map

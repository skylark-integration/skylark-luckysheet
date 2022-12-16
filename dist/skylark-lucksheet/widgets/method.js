/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../widgets/constant","../methods/sheets","../methods/formula_methods","../methods/imageCtrl_methods","../methods/dataVerificationCtrl_methods","../methods/pivotTable_methods","../methods/freezen_methods","../methods/get","../methods/extend_methods","../methods/luckysheetConfigsetting","../methods/createsheet","../store"],function(e,t,l,n,a,u,o,c,i,s,r,h){"use strict";const{luckysheetlodingHTML:d,luckyColor:y}=e,{getSheetIndex:f}=c,{luckysheetextendData:m}=i,k={container:null,luckysheetfile:null,defaultcolumnNum:60,defaultrowNum:84,fullscreenmode:!0,devicePixelRatio:1,currentSheetIndex:0,calculateSheetIndex:0,flowdata:[],config:{},visibledatarow:[],visibledatacolumn:[],ch_width:0,rh_height:0,cellmainWidth:0,cellmainHeight:0,toolbarHeight:0,infobarHeight:0,calculatebarHeight:0,rowHeaderWidth:46,columnHeaderHeight:20,cellMainSrollBarSize:12,sheetBarHeight:31,statisticBarHeight:23,luckysheetTableContentHW:[0,0],defaultcollen:73,defaultrowlen:19,jfcountfuncTimeout:null,jfautoscrollTimeout:null,luckysheet_select_status:!1,luckysheet_select_save:[{row:[0,0],column:[0,0]}],luckysheet_selection_range:[],luckysheet_copy_save:{},luckysheet_paste_iscut:!1,filterchage:!0,luckysheet_filter_save:{row:[],column:[]},luckysheet_sheet_move_status:!1,luckysheet_sheet_move_data:[],luckysheet_scroll_status:!1,luckysheetisrefreshdetail:!0,luckysheetisrefreshtheme:!0,luckysheetcurrentisPivotTable:!1,luckysheet_rows_selected_status:!1,luckysheet_cols_selected_status:!1,luckysheet_rows_change_size:!1,luckysheet_rows_change_size_start:[],luckysheet_cols_change_size:!1,luckysheet_cols_change_size_start:[],luckysheet_cols_dbclick_timeout:null,luckysheet_cols_dbclick_times:0,luckysheetCellUpdate:[],luckysheet_shiftpositon:null,iscopyself:!0,orderbyindex:0,luckysheet_model_move_state:!1,luckysheet_model_xy:[0,0],luckysheet_model_move_obj:null,luckysheet_cell_selected_move:!1,luckysheet_cell_selected_move_index:[],luckysheet_cell_selected_extend:!1,luckysheet_cell_selected_extend_index:[],luckysheet_cell_selected_extend_time:null,clearjfundo:!0,jfredo:[],jfundo:[],lang:"en",createChart:"",highlightChart:"",zIndex:15,chartparam:{luckysheetCurrentChart:null,luckysheetCurrentChartActive:!1,luckysheetCurrentChartMove:null,luckysheetCurrentChartMoveTimeout:null,luckysheetCurrentChartMoveObj:null,luckysheetCurrentChartMoveXy:null,luckysheetCurrentChartMoveWinH:null,luckysheetCurrentChartMoveWinW:null,luckysheetCurrentChartResize:null,luckysheetCurrentChartResizeObj:null,luckysheetCurrentChartResizeXy:null,luckysheetCurrentChartResizeWinH:null,luckysheetCurrentChartResizeWinW:null,luckysheetInsertChartTosheetChange:!0,luckysheetCurrentChartZIndexRank:100,luckysheet_chart_redo_click:!1,luckysheetCurrentChartMaxState:!1,jfrefreshchartall:"",changeChartCellData:"",renderChart:"",getChartJson:""},functionList:null,luckysheet_function:null,chart_selection:{},currentChart:"",scrollRefreshSwitch:!0,measureTextCache:{},measureTextCellInfoCache:{},measureTextCacheTimeOut:null,cellOverflowMapCache:{},zoomRatio:1,visibledatacolumn_unique:null,visibledatarow_unique:null,showGridLines:!0,toobarObject:{},inlineStringEditCache:null,inlineStringEditRange:null,fontList:[],currentSheetView:"viewNormal"},_={searchFunctionCell:null,functionlistPosition:{},rangechangeindex:null,rangestart:!1,rangetosheet:null,rangeSetValueTo:null,func_selectedrange:{},rangedrag_column_start:!1,rangedrag_row_start:!1,rangeResizeObj:null,rangeResize:null,rangeResizeIndex:null,rangeResizexy:null,rangeResizeWinH:null,rangeResizeWinW:null,rangeResizeTo:null,rangeMovexy:null,rangeMove:!1,rangeMoveObj:null,rangeMoveIndex:null,rangeMoveRangedata:null,functionHTMLIndex:0,functionRangeIndex:null,execvertex:{},execFunctionGroupData:null,execFunctionExist:null,formulaContainSheetList:{},cellTextToIndexList:{},isFunctionRangeSave:!1,execvertex:{},execFunctionGroupData:null,execFunctionExist:null,formulaContainSheetList:{},formulaContainCellList:{},cellTextToIndexList:{},execFunctionGlobalData:{},groupValuesRefreshData:[],functionResizeData:{},functionResizeStatus:!1,functionResizeTimeout:null,data_parm_index:0},g={sheetMaxIndex:0,nulldata:null,mergeCalculationSheet:{},checkLoadSheetIndexToDataIndex:{},CacheNotLoadControll:[]},x={pivotDatas:null,pivotSheetIndex:0,pivotDataSheetIndex:0,celldata:null,origindata:null,pivot_data_type:{},pivot_select_save:null,column:null,row:null,values:null,filter:null,showType:null,rowhidden:null,selected:null,caljs:null,initial:!0,filterparm:null,luckysheet_pivotTable_select_state:!1,jgridCurrentPivotInput:null,movestate:!1,moveitemposition:[],movesave:{},drawPivotTable:!0,pivotTableBoundary:[12,6]},C={imgItem:{type:"3",src:"",originWidth:null,originHeight:null,default:{width:null,height:null,left:null,top:null},crop:{width:null,height:null,offsetLeft:0,offsetTop:0},isFixedPos:!1,fixedLeft:null,fixedTop:null,border:{width:0,radius:0,style:"solid",color:"#000"}},images:null,currentImgId:null,currentWinW:null,currentWinH:null,resize:null,resizeXY:null,move:!1,moveXY:null,cropChange:null,cropChangeXY:null,cropChangeObj:null,copyImgItemObj:null},v={defaultItem:{type:"dropdown",type2:null,value1:"",value2:"",checked:!1,remote:!1,prohibitInput:!1,hintShow:!1,hintText:""},curItem:null,dataVerification:null,selectRange:[],selectStatus:!1};return{addDataAjax:function(e,t,l,n){null==t&&(t=h.currentSheetIndex),null==l&&(l=h.loadSheetUrl),$("#luckysheet-grid-window-1").append(d()),e.currentPage++;let a=sessionStorage.getItem("x-auth-token");$.ajax({method:"POST",url:l,headers:{"x-auth-token":a},data:JSON.stringify(e),contentType:"application/json;charset=UTF-8",success:function(e){"string"==typeof e&&(e=JSON.parse(e));let t=e.data,l=t.celldata;m(t.row,l),setTimeout(function(){$("#luckysheetloadingdata").fadeOut().remove()},500),n&&"function"==typeof n&&n(t)}})},reload:function(e,t,l,n){null==t&&(t=h.currentSheetIndex),null==l&&(l=h.loadSheetUrl),$("#luckysheet-grid-window-1").append(d());let a={gridKey:server.gridKey,index:t};e=$.extend(!0,e,a);let u=h.luckysheetfile[f(t)];$.post(l,e,function(e){let l=new Function("return "+e)();u.celldata=l[t.toString()];let a=sheetmanage.buildGridData(u);setTimeout(function(){$("#luckysheetloadingdata").fadeOut().remove()},500),u.data=a,h.flowdata=a,editor.webWorkerFlowDataCache(a),r(a[0].length,a.length,a,null,!1),u.load="1",h.luckysheet_select_save.length=0,h.luckysheet_selection_range=[],server.saveParam("shs",null,h.currentSheetIndex),sheetmanage.changeSheet(t),n&&"function"==typeof n&&n()})},clearSheetByIndex:function(e){let t=f(e),l=h.luckysheetfile[t];l.isPivotTable?delete h.luckysheetfile[t]:(l.data=[],l.row=h.defaultrowNum,l.column=h.defaultcolumnNum,l.chart=[],l.config=null,l.filter=null,l.filter_select=null,l.celldata=[],l.pivotTable={},l.calcChain=[],l.status=0,l.load=0,h.flowdata=[],h.webWorkerFlowDataCache(h.flowdata),$("#"+h.container+" .luckysheet-data-visualization-chart").remove(),$("#"+h.container+" .luckysheet-datavisual-selection-set").remove(),$("#luckysheet-row-count-show, #luckysheet-formula-functionrange-select, #luckysheet-row-count-show, #luckysheet-column-count-show, #luckysheet-change-size-line, #luckysheet-cell-selected-focus, #luckysheet-selection-copy, #luckysheet-cell-selected-extend, #luckysheet-cell-selected-move, #luckysheet-cell-selected").hide(),delete l.load)},clear:function(e){let l=this;if("all"==e)for(let e=0;e<h.luckysheetfile.length;e++){let t=h.luckysheetfile[e];l.clearSheetByIndex(t.index)}else null==e&&(e=h.currentSheetIndex),l.clearSheetByIndex(e);t.changeSheet(h.luckysheetfile[0].index)},destroy:function(){$("#"+h.container).empty(),$("body > .luckysheet-cols-menu").remove(),$("#luckysheet-modal-dialog-mask, #luckysheetTextSizeTest, #luckysheet-icon-morebtn-div").remove(),$("#luckysheet-input-box").parent().remove(),$("#luckysheet-formula-help-c").remove(),$(".chartSetting, .luckysheet-modal-dialog-slider").remove(),$(document).off(".luckysheetEvent"),$(document).off(".luckysheetProtection"),o.initialHorizontal=!0,o.initialVertical=!0;let e=$.extend(!0,{},k);for(let t in e)t in h&&(h[t]=e[t]);let c=$.extend(!0,{},_);for(let e in c)e in l&&(l[e]=c[e]);let i=$.extend(!0,{},g);for(let e in i)e in t&&(t[e]=i[e]);let s=$.extend(!0,{},x);for(let e in s)e in u&&(u[e]=s[e]);let r=$.extend(!0,{},C);for(let e in r)e in n&&(n[e]=r[e]);let d=$.extend(!0,{},v);for(let e in d)e in a&&(a[e]=d[e]);h.asyncLoad=["core"]},editorChart:function(e){let t=y[0],l="luckysheetEditMode-datav-chart";e.chart_id=l;let n=e.chartTheme;n=null==n?"default0000":n,luckysheet.insertChartTosheet(e.sheetIndex,e.dataSheetIndex,e.option,e.chartType,e.selfOption,e.defaultOption,e.row,e.column,t,l,"luckysheetEditMode-datav-chart_selection",e.chartStyle,e.rangeConfigCheck,e.rangeRowCheck,e.rangeColCheck,e.chartMarkConfig,e.chartTitleConfig,e.winWidth,e.winHeight,e.scrollLeft,e.scrollTop,n,e.myWidth,e.myHeight,null!=e.myLeft?parseFloat(e.myLeft):null,null!=e.myTop?parseFloat(e.myTop):null,e.myindexrank,!0),$("#"+l).find(".luckysheet-modal-controll-update").click()}}});
//# sourceMappingURL=../sourcemaps/widgets/method.js.map
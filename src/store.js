define([
],function () {

    function getObjType(obj) { //TODO:lwf
        let toString = Object.prototype.toString;
        let map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object'
        };    
        return map[toString.call(obj)];
    }   

   'use strict';
    const Store = {
        container: null,
        luckysheetfile: null,
        defaultcolumnNum: 60,
        defaultrowNum: 84,
        fullscreenmode: true,
        devicePixelRatio: 1,
        currentSheetIndex: 0,
        calculateSheetIndex: 0,
        flowdata: [],
        config: {},
        visibledatarow: [],
        visibledatacolumn: [],
        ch_width: 0,
        rh_height: 0,
        cellmainWidth: 0,
        cellmainHeight: 0,
        toolbarHeight: 0,
        infobarHeight: 0,
        calculatebarHeight: 0,
        rowHeaderWidth: 46,
        columnHeaderHeight: 20,
        cellMainSrollBarSize: 12,
        sheetBarHeight: 31,
        statisticBarHeight: 23,
        luckysheetTableContentHW: [
            0,
            0
        ],
        defaultcollen: 73,
        defaultrowlen: 19,
        jfcountfuncTimeout: null,
        jfautoscrollTimeout: null,
        luckysheet_select_status: false,
        luckysheet_select_save: [{
                'row': [
                    0,
                    0
                ],
                'column': [
                    0,
                    0
                ]
            }],
        luckysheet_selection_range: [],
        luckysheet_copy_save: {},
        luckysheet_paste_iscut: false,
        filterchage: true,
        luckysheet_filter_save: {
            'row': [],
            'column': []
        },
        luckysheet_sheet_move_status: false,
        luckysheet_sheet_move_data: [],
        luckysheet_scroll_status: false,
        luckysheetisrefreshdetail: true,
        luckysheetisrefreshtheme: true,
        luckysheetcurrentisPivotTable: false,
        luckysheet_rows_selected_status: false,
        luckysheet_cols_selected_status: false,
        luckysheet_rows_change_size: false,
        luckysheet_rows_change_size_start: [],
        luckysheet_cols_change_size: false,
        luckysheet_cols_change_size_start: [],
        luckysheet_cols_dbclick_timeout: null,
        luckysheet_cols_dbclick_times: 0,
        luckysheetCellUpdate: [],
        luckysheet_shiftpositon: null,
        iscopyself: true,
        orderbyindex: 0,
        luckysheet_model_move_state: false,
        luckysheet_model_xy: [
            0,
            0
        ],
        luckysheet_model_move_obj: null,
        luckysheet_cell_selected_move: false,
        luckysheet_cell_selected_move_index: [],
        luckysheet_cell_selected_extend: false,
        luckysheet_cell_selected_extend_index: [],
        luckysheet_cell_selected_extend_time: null,
        clearjfundo: true,
        jfundo: [],
        jfredo: [],
        lang: 'en',
        createChart: '',
        highlightChart: '',
        zIndex: 15,
        chartparam: {
            luckysheetCurrentChart: null,
            luckysheetCurrentChartActive: false,
            luckysheetCurrentChartMove: null,
            luckysheetCurrentChartMoveTimeout: null,
            luckysheetCurrentChartMoveObj: null,
            luckysheetCurrentChartMoveXy: null,
            luckysheetCurrentChartMoveWinH: null,
            luckysheetCurrentChartMoveWinW: null,
            luckysheetCurrentChartResize: null,
            luckysheetCurrentChartResizeObj: null,
            luckysheetCurrentChartResizeXy: null,
            luckysheetCurrentChartResizeWinH: null,
            luckysheetCurrentChartResizeWinW: null,
            luckysheetInsertChartTosheetChange: true,
            luckysheetCurrentChartZIndexRank: 100,
            luckysheet_chart_redo_click: false,
            luckysheetCurrentChartMaxState: false,
            jfrefreshchartall: '',
            changeChartCellData: '',
            renderChart: '',
            getChartJson: ''
        },
        functionList: null,
        luckysheet_function: null,
        chart_selection: {},
        currentChart: '',
        scrollRefreshSwitch: true,
        measureTextCache: {},
        measureTextCellInfoCache: {},
        measureTextCacheTimeOut: null,
        cellOverflowMapCache: {},
        zoomRatio: 1,
        visibledatacolumn_unique: null,
        visibledatarow_unique: null,
        showGridLines: true,
        toobarObject: {},
        inlineStringEditCache: null,
        inlineStringEditRange: null,
        fontList: [],
        defaultFontSize: 10,
        currentSheetView: 'viewNormal',
        cooperativeEdit: {
            usernameTimeout: {},
            changeCollaborationSize: [],
            allDataColumnlen: [],
            merge_range: {},
            checkoutData: []
        },
        asyncLoad: ['core'],


        // from ./global/editor

        //worker+blob实现深拷贝替换extend
        deepCopyFlowDataState: false,
        deepCopyFlowDataCache: '',
        deepCopyFlowDataWorker: null,

        deepCopyFlowData: function (flowData) {
            let _this = this;
            if (_this.deepCopyFlowDataState) {
                if (_this.deepCopyFlowDataWorker != null) {
                    _this.deepCopyFlowDataWorker.terminate();
                }
                return _this.deepCopyFlowDataCache;
            } else {
                if (flowData == null) {
                    flowData = Store.flowdata;
                }
                return $.extend(true, [], flowData);
            }
        },
        webWorkerFlowDataCache: function (flowData) {
            let _this = this;
            try {
                if (_this.deepCopyFlowDataWorker != null) {
                    //存新的webwork前先销毁以前的
                    _this.deepCopyFlowDataWorker.terminate();
                }
                let funcTxt = 'data:text/javascript;chartset=US-ASCII,onmessage = function (e) { postMessage(e.data); };';
                _this.deepCopyFlowDataState = false;    //适配IE
                //适配IE
                let worker;
                if (browser.isIE() == 1) {
                    let response = 'self.onmessage=function(e){postMessage(e.data);}';
                    worker = new Worker('./plugins/Worker-helper.js');
                    worker.postMessage(response);
                } else {
                    worker = new Worker(funcTxt);
                }
                _this.deepCopyFlowDataWorker = worker;
                worker.postMessage(flowData);
                worker.onmessage = function (e) {
                    _this.deepCopyFlowDataCache = e.data;
                    _this.deepCopyFlowDataState = true;
                };
            } catch (e) {
                _this.deepCopyFlowDataCache = $.extend(true, [], flowData);
            }
        },

        /// from ./controllers/sheetmanage
        getGridData : function (d) {
            let ret = [];
            for (let r = 0; r < d.length; r++) {
                for (let c = 0; c < d[0].length; c++) {
                    if (d[r][c] == null) {
                        continue;
                    }
                    ret.push({
                        r: r,
                        c: c,
                        v: d[r][c]
                    });
                }
            }
            return ret;
        },
        getSheetMerge: function () {
            if (Store.config.merge == null) {
                return null;
            }
            return Store.config.merge;
        },
        getSheetByName: function (name) {
            let _this = this;
            if (name == null) {
                return null;
            }
            for (let i = 0; i < Store.luckysheetfile.length; i++) {
                let file = Store.luckysheetfile[i];
                if (file.name == name) {
                    return file;
                }
            }
            return null;
        },
        getCurSheetnoset: function () {
            let curindex = 0;
            for (let i = 0; i < Store.luckysheetfile.length; i++) {
                if (Store.luckysheetfile[i].status == 1) {
                    curindex = Store.luckysheetfile[i].index;
                    break;
                }
            }
            return curindex;
        },
        getCurSheet: function () {
            if (Store.luckysheetfile.length) {
                let hasActive = false, indexs = [];
                Store.luckysheetfile.forEach(item => {
                    if ('undefined' === typeof item.index) {
                        item.index = this.generateRandomSheetIndex();
                    }
                    if (indexs.includes(item.index)) {
                        item.index = this.generateRandomSheetIndex();
                    } else {
                        indexs.push(item.index);
                    }
                    if ('undefined' === typeof item.status) {
                        item.status = 0;
                    }
                    if (item.status == 1) {
                        if (hasActive) {
                            item.status = 0;
                        } else {
                            hasActive = true;
                        }
                    }
                });
                if (!hasActive) {
                    Store.luckysheetfile[0].status = 1;
                }
            }
            Store.currentSheetIndex = Store.luckysheetfile[0].index;
            for (let i = 0; i < Store.luckysheetfile.length; i++) {
                if (Store.luckysheetfile[i].status == 1) {
                    Store.currentSheetIndex = Store.luckysheetfile[i].index;
                    break;
                }
            }
            return Store.currentSheetIndex;
        },
        getSheetByIndex: function (index) {
            let _this = this;
            if (index == null) {
                index = Store.currentSheetIndex;
            }
            let i = _this.getSheetIndex(index);
            return Store.luckysheetfile[i];
        },
        setCurSheet: function (index) {
            for (let i = 0; i < Store.luckysheetfile.length; i++) {
                if (Store.luckysheetfile[i]['index'] == index) {
                    Store.luckysheetfile[i].status = 1;
                } else {
                    Store.luckysheetfile[i].status = 0;
                }
            }
            Store.currentSheetIndex = index;
        },
        getSheetIndex: function (index) {
            for (let i = 0; i < Store.luckysheetfile.length; i++) {
                if (Store.luckysheetfile[i]['index'] == index) {
                    return i;
                }
            }
            return null;
        },

        changeSheet: function (index, isPivotInitial, isNewSheet) {
            if (index === Store.currentSheetIndex) {
                return ;
            }
            if (Store.onSheetChanging) {
                Store.onSheetChanging(index, isPivotInitial, isNewSheet);
            }
            Store.setCurSheet(index);
        },

        hasSheet: function (index) {
            if (index == null) {
                return false;
            }
            index = this.getSheetIndex(index);
            if (index == null) {
                return false;
            } else {
                return true;
            }
        },
        /// from widgets/dataVerificationCtrl
        dataVerification: null,

        ///from controllers/server

        //共享编辑模式
        historyParam: function (data, sheetIndex, range) {
            let _this = this;
            let r1 = range.row[0], r2 = range.row[1];
            let c1 = range.column[0], c2 = range.column[1];
            if (r1 == r2 && c1 == c2) {
                //单个单元格更新
                let v = data[r1][c1];
                Store.saveParam('v', sheetIndex, v, {
                    'r': r1,
                    'c': c1
                });
            } else {
                //范围单元格更新
                let rowlen = r2 - r1 + 1;
                let collen = c2 - c1 + 1;
                let timeR = Math.floor(1000 / collen);
                let n = Math.ceil(rowlen / timeR);    //分批次更新，一次最多1000个单元格
                //分批次更新，一次最多1000个单元格
                for (let i = 0; i < n; i++) {
                    let str = r1 + timeR * i;
                    let edr;
                    if (i == n - 1) {
                        edr = r2;
                    } else {
                        edr = r1 + timeR * (i + 1) - 1;
                    }
                    let v = [];
                    for (let r = str; r <= edr; r++) {
                        let v_row = [];
                        for (let c = c1; c <= c2; c++) {
                            if (data[r] == null) {
                                v_row.push(null);
                            } else {
                                v_row.push(data[r][c]);
                            }
                        }
                        v.push(v_row);
                    }
                    Store.saveParam('rv', sheetIndex, v, {
                        'range': {
                            'row': [
                                str,
                                edr
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        }
                    });
                    if (i == n - 1) {
                        Store.saveParam('rv_end', sheetIndex, null);
                    }
                }
            }
        },
        saveParam: function (type, index, value, params) {
            let _this = this;
            if (!_this.allowUpdate) {
                return;
            }
            if (value == undefined) {
                value = null;
            }
            let d = {};
            d.t = type;
            d.i = index;
            d.v = value;    //切换sheet页不发后台，TODO：改为发后台+后台不广播 
            //切换sheet页不发后台，TODO：改为发后台+后台不广播 
            if (type === 'shs') {
                return;
            }
            if (type == 'rv') {
                //单元格批量更新
                d.range = params.range;
            } else if (type == 'v' || type == 'fu' || type == 'fm') {
                d.r = params.r;
                d.c = params.c;
            } else if (type == 'fc') {
                d.op = params.op;
                d.pos = params.pos;
            } else if (type == 'drc' || type == 'arc' || type == 'h' || type == 'wh') {
                d.rc = params.rc;
            } else if (type == 'c') {
                d.cid = params.cid;
                d.op = params.op;
            } else if (type == 'f') {
                d.op = params.op;
                d.pos = params.pos;
            } else if (type == 's') {
            } else if (type == 'sh') {
                d.op = params.op;
                if (params.cur != null) {
                    d.cur = params.cur;
                }
            } else if (type == 'cg') {
                d.k = params.k;
            } else if (type == 'all') {
                d.k = params.k;    // d.s = params.s;
            }
            // d.s = params.s;
            let msg = pako.gzip(encodeURIComponent(JSON.stringify(d)), { to: 'string' });
            if (Store.websocket != null) {
                Store.websocket.send(msg);
            }
        },
        gridKey: null,
        loadUrl: null,
        updateUrl: null,
        updateImageUrl: null,
        title: null,
        loadSheetUrl: null,
        allowUpdate: false,
        websocket: null,

        // from global/refresh
        //
        refresh : function(scrollWidth,scrollHeight){
            if (this.onRefresh) {
               setTimeout(()=>{
                 this.onRefresh(scrollWidth,scrollHeight);
                }, 1);
            }
        },

        refreshGrid : function(data, range, allParam, isRunExecFunction = true, isRefreshCanvas = true){
            if (this.onRefresh) {
               setTimeout(()=>{
                 this.onRefreshGrid(data, range, allParam, isRunExecFunction , isRefreshCanvas);
                }, 1);
            }
        },

        refreshGridAll : function(colwidth, rowheight, data, cfg, range, ctrlType, ctrlValue, cdformat, isRefreshCanvas = true){
            if (this.onRefresh) {
               setTimeout(()=>{
                 this.onRefreshGridAll(colwidth, rowheight, data, cfg, range, ctrlType, ctrlValue, cdformat, isRefreshCanvas);
                }, 1);
            }
        },

        refreshRange : function(data, range, allParam, isRunExecFunction = true, isRefreshCanvas = true) {
            if (this.onRefreshRange) {
                this.onRefreshRange(data,range,allParam,isRunExecFunction,isRefreshCanvas);
            }
        },

        refreshGrid_adRC : function(data, cfg, ctrlType, ctrlValue, calc, filterObj, cf, af, freezen, dataVerification, hyperlink){
            if (this.onRefresh) {
               setTimeout(()=>{
                 this.onRefreshGrid_adRC(data, cfg, ctrlType, ctrlValue, calc, filterObj, cf, af, freezen, dataVerification, hyperlink);
                }, 1);
            }
        },

        refreshGrid_deleteCell : function(data, cfg, ctrl, calc, filterObj, cf, dataVerification, hyperlink){
            if (this.onRefresh) {
               setTimeout(()=>{
                 this.onRefreshGrid_deleteCell(data, cfg, ctrl, calc, filterObj, cf, dataVerification, hyperlink);
                }, 1);
            }
        },

        refreshGrid_pastcut : function(source, target, RowlChange){
            if (this.onRefresh) {
               setTimeout(()=>{
                 this.onRefreshGrid_pastcut(source, target, RowlChange);
                }, 1);
            }
        },

        refreshGrid_rhcw : function(rowheight, colwidth, isRefreshCanvas = true){
            if (this.onRefresh) {
               setTimeout(()=>{
                 this.onRefreshGrid_rhcw(rowheight, colwidth, isRefreshCanvas);
                }, 1);
            }
        },


        // from global/api
        getluckysheetfile :function (plugin) {
            // 获取图表数据
            if (plugin) {
                Store.luckysheetfile.forEach(file => {
                    if (!!file.chart) {
                        file.chart.forEach(chartObj => {
                            const chartJson = Store.getChartJson(chartObj.chart_id);
                            chartObj.chartOptions = chartJson;
                        });
                    }
                });
            }
            return Store.luckysheetfile;
        },

        getAllSheets : function () {
            let data = $.extend(true, [], Store.luckysheetfile);
            data.forEach((item, index, arr) => {
                if (item.data != null && item.data.length > 0) {
                    item.celldata = Store.getGridData(item.data);
                }
                delete item.load;
                delete item.freezen;
            });
            return data;
       },
        toJson : function () {
            const toJsonOptions = Store.toJsonOptions;    // Workbook name
            // Workbook name
            ////toJsonOptions.title = $('#luckysheet_info_detail_input').val(); 
            toJsonOptions.title = Store.title; //TODO:lwf
            toJsonOptions.data = Store.getAllSheets();    // row and column
            // row and column
            Store.getluckysheetfile().forEach((file, index) => {
                if (file.data == undefined) {
                    return;
                }
                toJsonOptions.data[index].row = getObjType(file.data) === 'array' ? file.data.length : 0;
                toJsonOptions.data[index].column = getObjType(file.data[0]) === 'array' ? file.data[0].length : 0;
            });
            return toJsonOptions;
        },

        // from global/createSheet
        active : function() {
            if (this.onActive) {
               setTimeout(()=>{
                 this.onActive();
                }, 1);
            }

        },
        // from global/resize
        invalidate : function() {
            if (this.onInvalidate) {
               setTimeout(()=>{
                 this.onInvalidate();
                }, 1);
            }

        },

        //from controllers/freezen
        //from controllers/freezen
        freezenhorizontaldata: null,
        freezenverticaldata: null,

        //from controller/zoom.js
        luckysheetZoomTimeout : null,

        changeZoom : function (ratio) {
            if (Store.flowdata == null || Store.flowdata.length == 0) {
                return;
            }
            clearTimeout(Store.luckysheetZoomTimeout);
            Store.luckysheetZoomTimeout = setTimeout(() => {
                if (Store.clearjfundo) {
                    Store.jfredo.push({
                        'type': 'zoomChange',
                        'zoomRatio': Store.zoomRatio,
                        'curZoomRatio': ratio,
                        'sheetIndex': Store.currentSheetIndex
                    });
                }
                Store.zoomRatio = ratio;
                if (Store.onZoomChange) {
                    Store.onZoomChange(ratio);
                }
            }, 100);
        }

    };
    return Store;
});
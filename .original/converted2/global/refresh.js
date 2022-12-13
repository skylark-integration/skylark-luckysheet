define([
    './rhchInit',
    './formula',
    './editor',
    './setdata',
    './getdata',
    './getRowlen',
    './draw',
    '../controllers/freezen',
    '../controllers/server',
    '../controllers/sheetmanage',
    '../controllers/postil',
    '../controllers/dataVerificationCtrl',
    '../controllers/hyperlinkCtrl',
    '../controllers/select',
    '../controllers/filter',
    '../methods/get',
    '../store'
], function (rhchInit, formula, editor, a, b, c, d, luckysheetFreezen, server, sheetmanage, luckysheetPostil, dataVerificationCtrl, hyperlinkCtrl, e, f, g, Store) {
    'use strict';
    let refreshCanvasTimeOut = null;
    function runExecFunction(range, index, data) {
        formula.execFunctionExist = [];
        for (let s = 0; s < range.length; s++) {
            for (let r = range[s].row[0]; r <= range[s].row[1]; r++) {
                for (let c = range[s].column[0]; c <= range[s].column[1]; c++) {
                    formula.execFunctionExist.push({
                        'r': r,
                        'c': c,
                        'i': index
                    });
                }
            }
        }
        formula.execFunctionExist.reverse();
        formula.execFunctionGroup(null, null, null, null, data);
        formula.execFunctionGlobalData = null;
    }
    function jfrefreshgrid(data, range, allParam, isRunExecFunction = true, isRefreshCanvas = true) {
        if (data == null) {
            data = Store.flowdata;
        }
        if (range == null) {
            range = Store.luckysheet_select_save;
        }
        clearTimeout(refreshCanvasTimeOut);
        if (allParam == null) {
            allParam = {};
        }
        let cfg = allParam['cfg'];
        let RowlChange = allParam['RowlChange'];
        let cdformat = allParam['cdformat'];
        let dataVerification = allParam['dataVerification'];
        let dynamicArray = allParam['dynamicArray'];
        let file = Store.luckysheetfile[g.getSheetIndex(Store.currentSheetIndex)];
        if (Store.clearjfundo) {
            Store.jfundo.length = 0;
            let curConfig;
            if (cfg == null) {
                curConfig = $.extend(true, {}, Store.config);
            } else {
                curConfig = $.extend(true, {}, cfg);
            }
            let curCdformat;
            if (cdformat == null) {
                curCdformat = $.extend(true, [], file['luckysheet_conditionformat_save']);
            } else {
                curCdformat = cdformat;
            }
            let curDataVerification;
            if (dataVerification == null) {
                curDataVerification = $.extend(true, {}, file['dataVerification']);
            } else {
                curDataVerification = dataVerification;
            }
            let curDynamicArray;
            if (dynamicArray == null) {
                curDynamicArray = $.extend(true, [], file['dynamicArray']);
            } else {
                curDynamicArray = dynamicArray;
            }
            Store.jfredo.push({
                'type': 'datachange',
                'data': Store.flowdata,
                'curdata': data,
                'sheetIndex': Store.currentSheetIndex,
                'range': range,
                'config': $.extend(true, {}, Store.config),
                'curConfig': curConfig,
                'cdformat': $.extend(true, [], file['luckysheet_conditionformat_save']),
                'curCdformat': curCdformat,
                'RowlChange': RowlChange,
                'dataVerification': $.extend(true, [], file['dataVerification']),
                'curDataVerification': curDataVerification,
                'dynamicArray': $.extend(true, [], file['dynamicArray']),
                'curDynamicArray': curDynamicArray,
                'dataRange': [...file.luckysheet_select_save]
            });
        }
        Store.flowdata = data;
        editor.webWorkerFlowDataCache(Store.flowdata);
        file.data = Store.flowdata;
        if (cfg != null) {
            Store.config = cfg;
            file.config = Store.config;
            server.saveParam('all', Store.currentSheetIndex, cfg, { 'k': 'config' });
            if (RowlChange != null) {
                jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
            }
        }
        if (cdformat != null) {
            file['luckysheet_conditionformat_save'] = cdformat;
            server.saveParam('all', Store.currentSheetIndex, cdformat, { 'k': 'luckysheet_conditionformat_save' });
        }
        if (dataVerification != null) {
            dataVerificationCtrl.dataVerification = dataVerification;
            file['dataVerification'] = dataVerification;
            server.saveParam('all', Store.currentSheetIndex, dataVerification, { 'k': 'dataVerification' });
        }
        if (dynamicArray != null) {
            file['dynamicArray'] = dynamicArray;
            server.saveParam('all', Store.currentSheetIndex, dynamicArray, { 'k': 'dynamicArray' });
        }
        for (let s = 0; s < range.length; s++) {
            let r1 = range[s].row[0];
            let c1 = range[s].column[0];
            if (Store.flowdata[r1][c1] != null && Store.flowdata[r1][c1].spl != null) {
                window.luckysheetCurrentRow = r1;
                window.luckysheetCurrentColumn = c1;
                window.luckysheetCurrentFunction = Store.flowdata[r1][c1].f;
                let fp = $.trim(formula.functionParserExe(Store.flowdata[r1][c1].f));
                let sparklines = new Function('return ' + fp)();
                Store.flowdata[r1][c1].spl = sparklines;
            }
            if (server.allowUpdate) {
                server.historyParam(Store.flowdata, Store.currentSheetIndex, range[s]);
            }
            if (typeof Store.chartparam.jfrefreshchartall == 'function') {
                Store.chartparam.jfrefreshchartall(Store.flowdata, range[s].row[0], range[s].row[1], range[s].column[0], range[s].column[1]);
            }
        }
        if (isRunExecFunction) {
            runExecFunction(range, Store.currentSheetIndex, data);
        }
        if (isRefreshCanvas) {
            refreshCanvasTimeOut = setTimeout(function () {
                luckysheetrefreshgrid();
            }, 1);
        }
        window.luckysheet_getcelldata_cache = null;
    }
    function jfrefreshgridall(colwidth, rowheight, data, cfg, range, ctrlType, ctrlValue, cdformat, isRefreshCanvas = true) {
        let redo = {}, isRunExecFunction = false;
        clearTimeout(refreshCanvasTimeOut);
        if (ctrlType == 'cellRowChange') {
            redo['type'] = 'cellRowChange';
            redo['config'] = $.extend(true, {}, Store.config);
            redo['curconfig'] = $.extend(true, {}, cfg);
            redo['range'] = $.extend(true, [], Store.luckysheet_select_save);
            redo['currange'] = range;
            redo['ctrlType'] = ctrlType;
            redo['ctrlValue'] = ctrlValue;
            let setfield = cfg['rowlen'];
            if (setfield == null) {
                setfield = {};
            }
            server.saveParam('cg', Store.currentSheetIndex, setfield, { 'k': 'rowlen' });
        } else if (ctrlType == 'resizeC') {
            redo['type'] = 'resize';
            redo['config'] = $.extend(true, {}, Store.config);
            redo['curconfig'] = $.extend(true, {}, cfg);
            redo['range'] = $.extend(true, [], Store.luckysheet_select_save);
            redo['currange'] = range;
            redo['ctrlType'] = ctrlType;
            redo['ctrlValue'] = ctrlValue;
            let setfield = cfg['columnlen'];
            if (setfield == null) {
                setfield = {};
            }
            server.saveParam('cg', Store.currentSheetIndex, setfield, { 'k': 'columnlen' });
        } else if (ctrlType.indexOf('extend') > -1) {
            redo['type'] = 'extend';
            redo['config'] = $.extend(true, {}, Store.config);
            redo['curconfig'] = $.extend(true, {}, cfg);
            redo['range'] = $.extend(true, [], Store.luckysheet_select_save);
            redo['currange'] = range;
            redo['ctrlType'] = ctrlType;
            redo['ctrlValue'] = ctrlValue;
            server.saveParam('arc', Store.currentSheetIndex, {
                'index': ctrlValue.index,
                'len': ctrlValue.len,
                'direction': ctrlValue.direction,
                'mc': cfg.merge
            }, { 'rc': ctrlValue.type });
        } else if (ctrlType.indexOf('dele') > -1) {
            redo['type'] = 'dele';
            redo['config'] = $.extend(true, {}, Store.config);
            redo['curconfig'] = $.extend(true, {}, cfg);
            redo['range'] = $.extend(true, [], Store.luckysheet_select_save);
            redo['currange'] = range;
            redo['ctrlType'] = ctrlType;
            redo['ctrlValue'] = ctrlValue;
            server.saveParam('drc', Store.currentSheetIndex, {
                'index': ctrlValue.index,
                'len': ctrlValue.len,
                'mc': cfg.merge,
                'borderInfo': cfg.borderInfo
            }, { 'rc': ctrlValue.type });
        } else {
            redo['type'] = 'datachangeAll';
            redo['range'] = $.extend(true, [], Store.luckysheet_select_save);
            redo['currange'] = range;
            redo['ctrlType'] = ctrlType;
            redo['ctrlValue'] = ctrlValue;
            isRunExecFunction = true;
            for (let s = 0; s < range.length; s++) {
                server.historyParam(data, Store.currentSheetIndex, range[s]);
            }
        }
        if (Store.clearjfundo) {
            Store.jfundo.length = 0;
            redo['data'] = Store.flowdata;
            redo['curdata'] = data;
            redo['sheetIndex'] = Store.currentSheetIndex;
            redo['cdformat'] = $.extend(true, [], Store.luckysheetfile[g.getSheetIndex(Store.currentSheetIndex)]['luckysheet_conditionformat_save']);
            redo['curCdformat'] = cdformat;
            Store.jfredo.push(redo);
        }
        Store.flowdata = data;
        editor.webWorkerFlowDataCache(data);
        Store.luckysheetfile[g.getSheetIndex(Store.currentSheetIndex)].data = Store.flowdata;
        if (cfg != null) {
            Store.config = cfg;
            Store.luckysheetfile[g.getSheetIndex(Store.currentSheetIndex)].config = Store.config;
            server.saveParam('all', Store.currentSheetIndex, cfg, { 'k': 'config' });
        }
        if (cdformat != null) {
            Store.luckysheetfile[g.getSheetIndex(Store.currentSheetIndex)]['luckysheet_conditionformat_save'] = cdformat;
            server.saveParam('all', Store.currentSheetIndex, cdformat, { 'k': 'luckysheet_conditionformat_save' });
        }
        Store.luckysheet_select_save = $.extend(true, [], range);
        if (Store.luckysheet_select_save.length > 0) {
            e.selectHightlightShow();
        }
        if (isRunExecFunction) {
            runExecFunction(range, Store.currentSheetIndex, data);
        }
        jfrefreshgrid_rhcw(rowheight, colwidth);
        if (isRefreshCanvas) {
            refreshCanvasTimeOut = setTimeout(function () {
                luckysheetrefreshgrid();
            }, 1);
        }
        sheetmanage.storeSheetParamALL();
        window.luckysheet_getcelldata_cache = null;
    }
    function jfrefreshrange(data, range, cdformat) {
        clearTimeout(refreshCanvasTimeOut);
        if (Store.clearjfundo) {
            Store.jfundo.length = 0;
            Store.jfredo.push({
                'type': 'rangechange',
                'data': Store.flowdata,
                'curdata': data,
                'range': range,
                'sheetIndex': Store.currentSheetIndex,
                'cdformat': $.extend(true, [], Store.luckysheetfile[g.getSheetIndex(Store.currentSheetIndex)]['luckysheet_conditionformat_save']),
                'curCdformat': cdformat
            });
        }
        Store.flowdata = data;
        editor.webWorkerFlowDataCache(Store.flowdata);
        Store.luckysheetfile[g.getSheetIndex(Store.currentSheetIndex)].data = Store.flowdata;
        if (cdformat != null) {
            Store.luckysheetfile[g.getSheetIndex(Store.currentSheetIndex)]['luckysheet_conditionformat_save'] = cdformat;
        }
        runExecFunction(range, Store.currentSheetIndex, data);
        refreshCanvasTimeOut = setTimeout(function () {
            luckysheetrefreshgrid();
        }, 1);
        for (let s = 0; s < range.length; s++) {
            server.historyParam(Store.flowdata, Store.currentSheetIndex, range[s]);
        }
    }
    function jfrefreshgrid_adRC(data, cfg, ctrlType, ctrlValue, calc, filterObj, cf, af, freezen, dataVerification, hyperlink) {
        let file = Store.luckysheetfile[g.getSheetIndex(Store.currentSheetIndex)];
        e.collaborativeEditBox();
        let mcData = [];
        for (let m in cfg['merge']) {
            let mc = cfg['merge'][m];
            for (let r = mc.r; r <= mc.r + mc.rs - 1; r++) {
                for (let c = mc.c; c <= mc.c + mc.cs - 1; c++) {
                    if (data[r][c] == null) {
                        data[r][c] = {};
                    }
                    if (r == mc.r && c == mc.c) {
                        data[r][c].mc = mc;
                    } else {
                        data[r][c].mc = {
                            'r': mc.r,
                            'c': mc.c
                        };
                    }
                    mcData.push({
                        'r': r,
                        'c': c
                    });
                }
            }
        }
        let funcData = [];
        if (Store.clearjfundo) {
            Store.jfundo.length = 0;
            Store.jfredo.push({
                'type': ctrlType,
                'sheetIndex': Store.currentSheetIndex,
                'data': Store.flowdata,
                'curData': data,
                'config': $.extend(true, {}, Store.config),
                'curConfig': cfg,
                'ctrlValue': ctrlValue,
                'mcData': mcData,
                'calc': $.extend(true, [], file.calcChain),
                'curCalc': calc,
                'funcData': funcData,
                'filterObj': {
                    'filter_select': $.extend(true, {}, file.filter_select),
                    'filter': $.extend(true, {}, file.filter)
                },
                'curFilterObj': filterObj,
                'cf': $.extend(true, [], file.luckysheet_conditionformat_save),
                'curCf': cf,
                'af': $.extend(true, [], file.luckysheet_alternateformat_save),
                'curAf': af,
                'freezen': {
                    'freezenhorizontaldata': luckysheetFreezen.freezenhorizontaldata,
                    'freezenverticaldata': luckysheetFreezen.freezenverticaldata
                },
                'curFreezen': freezen,
                'dataVerification': $.extend(true, {}, file.dataVerification),
                'curDataVerification': dataVerification,
                'hyperlink': $.extend(true, {}, file.hyperlink),
                'curHyperlink': hyperlink,
                'dataRange': [...file.luckysheet_select_save]
            });
        }
        let index = ctrlValue.index, len = ctrlValue.len, rc = ctrlValue.rc;
        if (ctrlType == 'addRC') {
            let direction = ctrlValue.direction, restore = ctrlValue.restore;
            let addData = [];
            if (restore) {
                if (rc == 'r') {
                    let st_r;
                    if (direction == 'lefttop') {
                        st_r = index;
                    } else if (direction == 'rightbottom') {
                        st_r = index + 1;
                    }
                    let ed_r = st_r + len - 1;
                    for (let r = st_r; r <= ed_r; r++) {
                        let row = [];
                        for (let c = 0; c < data[0].length; c++) {
                            let cell = data[r][c];
                            row.push(cell);
                        }
                        addData.push(row);
                    }
                } else if (rc == 'c') {
                    let st_c;
                    if (direction == 'lefttop') {
                        st_c = index;
                    } else if (direction == 'rightbottom') {
                        st_c = index + 1;
                    }
                    let ed_c = st_c + len - 1;
                    for (let r = 0; r < data.length; r++) {
                        let row = [];
                        for (let c = st_c; c <= ed_c; c++) {
                            let cell = data[r][c];
                            row.push(cell);
                        }
                        addData.push(row);
                    }
                }
            }
            server.saveParam('arc', Store.currentSheetIndex, {
                'index': index,
                'len': len,
                'direction': direction,
                'data': addData
            }, { 'rc': rc });
        } else if (ctrlType == 'delRC') {
            server.saveParam('drc', Store.currentSheetIndex, {
                'index': index,
                'len': len
            }, { 'rc': rc });
        }
        Store.flowdata = data;
        editor.webWorkerFlowDataCache(Store.flowdata);
        file.data = data;
        Store.config = cfg;
        file.config = Store.config;
        server.saveParam('all', Store.currentSheetIndex, cfg, { 'k': 'config' });
        for (let i = 0; i < mcData.length; i++) {
            let mcData_r = mcData[i].r, mcData_c = mcData[i].c;
            server.saveParam('v', Store.currentSheetIndex, Store.flowdata[mcData_r][mcData_c], {
                'r': mcData_r,
                'c': mcData_c
            });
        }
        if (calc.length > 0) {
            for (let i = 0; i < calc.length; i++) {
                let clc = calc[i];
                let clc_r = clc.r, clc_c = clc.c, clc_i = clc.index, clc_funcStr = b.getcellFormula(clc_r, clc_c, clc_i, data);
                let clc_result = formula.execfunction(clc_funcStr, clc_r, clc_c, clc_i, null, true);
                clc.func = clc_result;
                if (data[clc_r][clc_c].f == clc_funcStr) {
                    a.setcellvalue(clc_r, clc_c, data, clc_result[1]);
                }
            }
        }
        file.calcChain = calc;
        server.saveParam('all', Store.currentSheetIndex, calc, { 'k': 'calcChain' });
        for (let i = 0; i < funcData.length; i++) {
            let funcData_r = funcData[i].r, funcData_c = funcData[i].c;
            server.saveParam('v', Store.currentSheetIndex, Store.flowdata[funcData_r][funcData_c], {
                'r': funcData_r,
                'c': funcData_c
            });
        }
        if (filterObj != null) {
            file.filter_select = filterObj.filter_select;
            file.filter = filterObj.filter;
        } else {
            file.filter_select = null;
            file.filter = null;
        }
        f.createFilterOptions(file.filter_select, file.filter);
        server.saveParam('all', Store.currentSheetIndex, file.filter_select, { 'k': 'filter_select' });
        server.saveParam('all', Store.currentSheetIndex, file.filter, { 'k': 'filter' });
        file.luckysheet_conditionformat_save = cf;
        server.saveParam('all', Store.currentSheetIndex, file.luckysheet_conditionformat_save, { 'k': 'luckysheet_conditionformat_save' });
        file.luckysheet_alternateformat_save = af;
        server.saveParam('all', Store.currentSheetIndex, file.luckysheet_alternateformat_save, { 'k': 'luckysheet_alternateformat_save' });
        if (freezen != null) {
            luckysheetFreezen.freezenhorizontaldata = freezen.freezenhorizontaldata;
            luckysheetFreezen.freezenverticaldata = freezen.freezenverticaldata;
        } else {
            luckysheetFreezen.freezenhorizontaldata = null;
            luckysheetFreezen.freezenverticaldata = null;
        }
        dataVerificationCtrl.dataVerification = dataVerification;
        file.dataVerification = dataVerification;
        server.saveParam('all', Store.currentSheetIndex, file.dataVerification, { 'k': 'dataVerification' });
        hyperlinkCtrl.hyperlink = hyperlink;
        file.hyperlink = hyperlink;
        server.saveParam('all', Store.currentSheetIndex, file.hyperlink, { 'k': 'hyperlink' });
        jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
    }
    function jfrefreshgrid_deleteCell(data, cfg, ctrl, calc, filterObj, cf, dataVerification, hyperlink) {
        let file = Store.luckysheetfile[g.getSheetIndex(Store.currentSheetIndex)];
        clearTimeout(refreshCanvasTimeOut);
        e.collaborativeEditBox();
        let mcData = [];
        if (JSON.stringify(cfg['merge']) == '{}') {
            for (let r = 0; r < data.length; r++) {
                for (let c = 0; c < data[0].length; c++) {
                    let cell = data[r][c];
                    if (cell != null && cell.mc != null) {
                        delete cell.mc;
                        mcData.push({
                            'r': r,
                            'c': c
                        });
                    }
                }
            }
        } else {
            for (let m in cfg['merge']) {
                let mc = cfg['merge'][m];
                for (let r = mc.r; r <= mc.r + mc.rs - 1; r++) {
                    for (let c = mc.c; c <= mc.c + mc.cs - 1; c++) {
                        if (data[r][c] == null) {
                            data[r][c] = {};
                        }
                        if (r == mc.r && c == mc.c) {
                            data[r][c].mc = mc;
                        } else {
                            data[r][c].mc = {
                                'r': mc.r,
                                'c': mc.c
                            };
                        }
                        mcData.push({
                            'r': r,
                            'c': c
                        });
                    }
                }
            }
        }
        let funcData = [];
        if (Store.clearjfundo) {
            Store.jfundo.length = 0;
            Store.jfredo.push({
                'type': 'deleteCell',
                'sheetIndex': Store.currentSheetIndex,
                'ctrl': ctrl,
                'data': Store.flowdata,
                'curData': data,
                'config': $.extend(true, {}, Store.config),
                'curConfig': cfg,
                'mcData': mcData,
                'calc': $.extend(true, [], file.calcChain),
                'curCalc': calc,
                'funcData': funcData,
                'filterObj': {
                    'filter_select': $.extend(true, {}, file.filter_select),
                    'filter': $.extend(true, {}, file.filter)
                },
                'curFilterObj': filterObj,
                'cf': $.extend(true, [], file.luckysheet_conditionformat_save),
                'curCf': cf,
                'dataVerification': $.extend(true, {}, file.dataVerification),
                'curDataVerification': dataVerification,
                'hyperlink': $.extend(true, {}, file.hyperlink),
                'curHyperlink': hyperlink,
                'dataRange': [...file.luckysheet_select_save]
            });
        }
        Store.flowdata = data;
        editor.webWorkerFlowDataCache(Store.flowdata);
        file.data = data;
        if (server.allowUpdate) {
            let type = ctrl.type, str = ctrl.str, edr = ctrl.edr, stc = ctrl.stc, edc = ctrl.edc;
            let range;
            if (type == 'moveUp') {
                range = {
                    'row': [
                        str,
                        data.length - 1
                    ],
                    'column': [
                        stc,
                        edc
                    ]
                };
            } else if (type == 'moveLeft') {
                range = {
                    'row': [
                        str,
                        edr
                    ],
                    'column': [
                        stc,
                        data[0].length - 1
                    ]
                };
            }
            server.historyParam(Store.flowdata, Store.currentSheetIndex, range);
        }
        Store.config = cfg;
        file.config = Store.config;
        server.saveParam('all', Store.currentSheetIndex, cfg, { 'k': 'config' });
        for (let i = 0; i < mcData.length; i++) {
            let mcData_r = mcData[i].r, mcData_c = mcData[i].c;
            server.saveParam('v', Store.currentSheetIndex, Store.flowdata[mcData_r][mcData_c], {
                'r': mcData_r,
                'c': mcData_c
            });
        }
        if (calc.length > 0) {
            for (let i = 0; i < calc.length; i++) {
                let clc = calc[i];
                let clc_r = clc.r, clc_c = clc.c, clc_i = clc.index, clc_funcStr = b.getcellFormula(clc_r, clc_c, clc_i, data);
                let clc_result = formula.execfunction(clc_funcStr, clc_r, clc_c, clc_i, null, true);
                clc.func = clc_result;
                if (data[clc_r][clc_c].f == clc_funcStr) {
                    a.setcellvalue(clc_r, clc_c, data, clc_result[1]);
                }
            }
        }
        file.calcChain = calc;
        server.saveParam('all', Store.currentSheetIndex, calc, { 'k': 'calcChain' });
        for (let i = 0; i < funcData.length; i++) {
            let funcData_r = funcData[i].r, funcData_c = funcData[i].c;
            server.saveParam('v', Store.currentSheetIndex, Store.flowdata[funcData_r][funcData_c], {
                'r': funcData_r,
                'c': funcData_c
            });
        }
        if (filterObj != null) {
            file.filter_select = filterObj.filter_select;
            file.filter = filterObj.filter;
        } else {
            file.filter_select = null;
            file.filter = null;
        }
        f.createFilterOptions(file.filter_select, file.filter);
        server.saveParam('all', Store.currentSheetIndex, file.filter_select, { 'k': 'filter_select' });
        server.saveParam('all', Store.currentSheetIndex, file.filter, { 'k': 'filter' });
        file.luckysheet_conditionformat_save = cf;
        server.saveParam('all', Store.currentSheetIndex, file.luckysheet_conditionformat_save, { 'k': 'luckysheet_conditionformat_save' });
        dataVerificationCtrl.dataVerification = dataVerification;
        file.dataVerification = dataVerification;
        server.saveParam('all', Store.currentSheetIndex, file.dataVerification, { 'k': 'dataVerification' });
        hyperlinkCtrl.hyperlink = hyperlink;
        file.hyperlink = hyperlink;
        server.saveParam('all', Store.currentSheetIndex, file.hyperlink, { 'k': 'hyperlink' });
        refreshCanvasTimeOut = setTimeout(function () {
            luckysheetrefreshgrid();
        }, 1);
    }
    function jfrefreshgrid_pastcut(source, target, RowlChange) {
        let execF_rc = {};
        formula.execFunctionExist = [];
        clearTimeout(refreshCanvasTimeOut);
        for (let r = source['range'].row[0]; r <= source['range'].row[1]; r++) {
            for (let c = source['range'].column[0]; c <= source['range'].column[1]; c++) {
                if (r + '_' + c + '_' + source['sheetIndex'] in execF_rc) {
                    continue;
                }
                execF_rc[r + '_' + c + '_' + source['sheetIndex']] = 0;
                formula.execFunctionExist.push({
                    'r': r,
                    'c': c,
                    'i': source['sheetIndex']
                });
            }
        }
        for (let r = target['range'].row[0]; r <= target['range'].row[1]; r++) {
            for (let c = target['range'].column[0]; c <= target['range'].column[1]; c++) {
                if (r + '_' + c + '_' + target['sheetIndex'] in execF_rc) {
                    continue;
                }
                execF_rc[r + '_' + c + '_' + target['sheetIndex']] = 0;
                formula.execFunctionExist.push({
                    'r': r,
                    'c': c,
                    'i': target['sheetIndex']
                });
            }
        }
        if (Store.clearjfundo) {
            Store.jfundo.length = 0;
            Store.jfredo.push({
                'type': 'pasteCut',
                'source': source,
                'target': target,
                'RowlChange': RowlChange
            });
        }
        let rowHeight;
        if (Store.currentSheetIndex == source['sheetIndex']) {
            Store.config = source['curConfig'];
            rowHeight = source['curData'].length;
            Store.luckysheetfile[g.getSheetIndex(target['sheetIndex'])]['config'] = target['curConfig'];
        } else if (Store.currentSheetIndex == target['sheetIndex']) {
            Store.config = target['curConfig'];
            rowHeight = target['curData'].length;
            Store.luckysheetfile[g.getSheetIndex(source['sheetIndex'])]['config'] = source['curConfig'];
        }
        if (RowlChange) {
            Store.visibledatarow = [];
            Store.rh_height = 0;
            for (let i = 0; i < rowHeight; i++) {
                let rowlen = Store.defaultrowlen;
                if (Store.config['rowlen'] != null && Store.config['rowlen'][i] != null) {
                    rowlen = Store.config['rowlen'][i];
                }
                if (Store.config['rowhidden'] != null && Store.config['rowhidden'][i] != null) {
                    rowlen = Store.config['rowhidden'][i];
                    Store.visibledatarow.push(Store.rh_height);
                    continue;
                } else {
                    Store.rh_height += rowlen + 1;
                }
                Store.visibledatarow.push(Store.rh_height);
            }
            Store.rh_height += 110;
            if (Store.currentSheetIndex == source['sheetIndex']) {
                let rowlenArr = c.computeRowlenArr(target['curData'].length, target['curConfig']);
                Store.luckysheetfile[g.getSheetIndex(target['sheetIndex'])]['visibledatarow'] = rowlenArr;
            } else if (Store.currentSheetIndex == target['sheetIndex']) {
                let rowlenArr = c.computeRowlenArr(source['curData'].length, source['curConfig']);
                Store.luckysheetfile[g.getSheetIndex(source['sheetIndex'])]['visibledatarow'] = rowlenArr;
            }
        }
        if (Store.currentSheetIndex == source['sheetIndex']) {
            Store.flowdata = source['curData'];
            Store.luckysheetfile[g.getSheetIndex(target['sheetIndex'])]['data'] = target['curData'];
        } else if (Store.currentSheetIndex == target['sheetIndex']) {
            Store.flowdata = target['curData'];
            Store.luckysheetfile[g.getSheetIndex(source['sheetIndex'])]['data'] = source['curData'];
        }
        editor.webWorkerFlowDataCache(Store.flowdata);
        Store.luckysheetfile[g.getSheetIndex(Store.currentSheetIndex)].data = Store.flowdata;
        if (Store.currentSheetIndex == target['sheetIndex']) {
            Store.luckysheet_select_save = [{
                    'row': target['range'].row,
                    'column': target['range'].column
                }];
        } else {
            Store.luckysheet_select_save = [{
                    'row': source['range'].row,
                    'column': source['range'].column
                }];
        }
        if (Store.luckysheet_select_save.length > 0) {
            e.selectHightlightShow();
        }
        Store.luckysheetfile[g.getSheetIndex(source['sheetIndex'])].luckysheet_conditionformat_save = source['curCdformat'];
        Store.luckysheetfile[g.getSheetIndex(target['sheetIndex'])].luckysheet_conditionformat_save = target['curCdformat'];
        if (Store.currentSheetIndex == source['sheetIndex']) {
            dataVerificationCtrl.dataVerification = source['curDataVerification'];
        } else if (Store.currentSheetIndex == target['sheetIndex']) {
            dataVerificationCtrl.dataVerification = target['curDataVerification'];
        }
        Store.luckysheetfile[g.getSheetIndex(source['sheetIndex'])].dataVerification = source['curDataVerification'];
        Store.luckysheetfile[g.getSheetIndex(target['sheetIndex'])].dataVerification = target['curDataVerification'];
        formula.execFunctionExist.reverse();
        formula.execFunctionGroup(null, null, null, null, target['curData']);
        formula.execFunctionGlobalData = null;
        refreshCanvasTimeOut = setTimeout(function () {
            luckysheetrefreshgrid();
        }, 1);
        sheetmanage.storeSheetParamALL();
        server.saveParam('all', source['sheetIndex'], source['curConfig'], { 'k': 'config' });
        server.saveParam('all', target['sheetIndex'], target['curConfig'], { 'k': 'config' });
        server.historyParam(source['curData'], source['sheetIndex'], {
            'row': source['range']['row'],
            'column': source['range']['column']
        });
        server.historyParam(target['curData'], target['sheetIndex'], {
            'row': target['range']['row'],
            'column': target['range']['column']
        });
        server.saveParam('all', source['sheetIndex'], source['curCdformat'], { 'k': 'luckysheet_conditionformat_save' });
        server.saveParam('all', target['sheetIndex'], target['curCdformat'], { 'k': 'luckysheet_conditionformat_save' });
        server.saveParam('all', source['sheetIndex'], source['curDataVerification'], { 'k': 'dataVerification' });
        server.saveParam('all', target['sheetIndex'], target['curDataVerification'], { 'k': 'dataVerification' });
    }
    function jfrefreshgrid_rhcw(rowheight, colwidth, isRefreshCanvas = true) {
        rhchInit(rowheight, colwidth);
        clearTimeout(refreshCanvasTimeOut);
        sheetmanage.storeSheetParam();
        let calcChain = Store.luckysheetfile[g.getSheetIndex(Store.currentSheetIndex)].calcChain;
        if (calcChain != null && calcChain.length > 0) {
            if (Store.config['rowlen'] == null) {
                Store.config['rowlen'] = {};
            }
            if (Store.config['columnlen'] == null) {
                Store.config['columnlen'] = {};
            }
            for (let i = 0; i < calcChain.length; i++) {
                let r = calcChain[i].r, c = calcChain[i].c, index = calcChain[i].index;
                if (index == Store.currentSheetIndex && Store.flowdata[r][c] != null && Store.flowdata[r][c].spl != null && (r in Store.config['rowlen'] || c in Store.config['columnlen'])) {
                    window.luckysheetCurrentRow = r;
                    window.luckysheetCurrentColumn = c;
                    window.luckysheetCurrentFunction = Store.flowdata[r][c].f;
                    let fp = $.trim(formula.functionParserExe(Store.flowdata[r][c].f));
                    let sparklines = new Function('return ' + fp)();
                    Store.flowdata[r][c].spl = sparklines;
                    server.saveParam('v', Store.currentSheetIndex, Store.flowdata[r][c], {
                        'r': r,
                        'c': c
                    });
                }
            }
            Store.luckysheetfile[g.getSheetIndex(Store.currentSheetIndex)].data = Store.flowdata;
        }
        luckysheetPostil.positionSync();
        e.selectHightlightShow();
        e.collaborativeEditBox();
        if ($('.luckysheet-selection-copy').is(':visible')) {
            e.selectionCopyShow();
        }
        if ($('#luckysheet-dropCell-icon').is(':visible')) {
            $('#luckysheet-dropCell-icon').remove();
        }
        if (luckysheetFreezen.freezenhorizontaldata != null && luckysheetFreezen.freezenverticaldata != null) {
            let row_st = luckysheetFreezen.freezenhorizontaldata[1] - 1;
            let col_st = luckysheetFreezen.freezenverticaldata[1] - 1;
            let scrollTop = luckysheetFreezen.freezenhorizontaldata[2];
            let scrollLeft = luckysheetFreezen.freezenverticaldata[2];
            let top = Store.visibledatarow[row_st] - 2 - scrollTop + Store.columnHeaderHeight;
            let freezenhorizontaldata = [
                Store.visibledatarow[row_st],
                row_st + 1,
                scrollTop,
                luckysheetFreezen.cutVolumn(Store.visibledatarow, row_st + 1),
                top
            ];
            let left = Store.visibledatacolumn[col_st] - 2 - scrollLeft + Store.rowHeaderWidth;
            let freezenverticaldata = [
                Store.visibledatacolumn[col_st],
                col_st + 1,
                scrollLeft,
                luckysheetFreezen.cutVolumn(Store.visibledatacolumn, col_st + 1),
                left
            ];
            luckysheetFreezen.saveFreezen(freezenhorizontaldata, top, freezenverticaldata, left);
            luckysheetFreezen.createFreezenHorizontal(freezenhorizontaldata, top);
            luckysheetFreezen.createFreezenVertical(freezenverticaldata, left);
            luckysheetFreezen.createAssistCanvas();
        } else if (luckysheetFreezen.freezenhorizontaldata != null) {
            let row_st = luckysheetFreezen.freezenhorizontaldata[1] - 1;
            let scrollTop = luckysheetFreezen.freezenhorizontaldata[2];
            let top = Store.visibledatarow[row_st] - 2 - scrollTop + Store.columnHeaderHeight;
            let freezenhorizontaldata = [
                Store.visibledatarow[row_st],
                row_st + 1,
                scrollTop,
                luckysheetFreezen.cutVolumn(Store.visibledatarow, row_st + 1),
                top
            ];
            luckysheetFreezen.saveFreezen(freezenhorizontaldata, top, null, null);
            luckysheetFreezen.createFreezenHorizontal(freezenhorizontaldata, top);
            luckysheetFreezen.createAssistCanvas();
        } else if (luckysheetFreezen.freezenverticaldata != null) {
            let col_st = luckysheetFreezen.freezenverticaldata[1] - 1;
            let scrollLeft = luckysheetFreezen.freezenverticaldata[2];
            let left = Store.visibledatacolumn[col_st] - 2 - scrollLeft + Store.rowHeaderWidth;
            let freezenverticaldata = [
                Store.visibledatacolumn[col_st],
                col_st + 1,
                scrollLeft,
                luckysheetFreezen.cutVolumn(Store.visibledatacolumn, col_st + 1),
                left
            ];
            luckysheetFreezen.saveFreezen(null, null, freezenverticaldata, left);
            luckysheetFreezen.createFreezenVertical(freezenverticaldata, left);
            luckysheetFreezen.createAssistCanvas();
        } else {
            if ($('#luckysheet-filter-options-sheet' + Store.currentSheetIndex + ' .luckysheet-filter-options').length > 0) {
                $('#luckysheet-filter-options-sheet' + Store.currentSheetIndex + ' .luckysheet-filter-options').each(function (i, e) {
                    let str = $(e).data('str'), cindex = $(e).data('cindex');
                    let left = Store.visibledatacolumn[cindex] - 20;
                    let top = str - 1 == -1 ? 0 : Store.visibledatarow[str - 1];
                    $(e).css({
                        'left': left,
                        'top': top
                    });
                });
            }
        }
        if ($('#luckysheet-filter-selected-sheet' + Store.currentSheetIndex).length > 0) {
            let luckysheet_filter_save = Store.luckysheetfile[g.getSheetIndex(Store.currentSheetIndex)].filter_select;
            let r1 = luckysheet_filter_save.row[0], r2 = luckysheet_filter_save.row[1];
            let c1 = luckysheet_filter_save.column[0], c2 = luckysheet_filter_save.column[1];
            let row = Store.visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : Store.visibledatarow[r1 - 1];
            let col = Store.visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : Store.visibledatacolumn[c1 - 1];
            $('#luckysheet-filter-selected-sheet' + Store.currentSheetIndex).css({
                'left': col_pre,
                'width': col - col_pre - 1,
                'top': row_pre,
                'height': row - row_pre - 1
            });
        }
        sheetmanage.showSheet();
        if (isRefreshCanvas) {
            refreshCanvasTimeOut = setTimeout(function () {
                luckysheetrefreshgrid();
            }, 1);
        }
    }
    function luckysheetrefreshgrid(scrollWidth, scrollHeight) {
        formula.groupValuesRefresh();
        if (scrollWidth == null) {
            scrollWidth = $('#luckysheet-cell-main').scrollLeft();
        }
        if (scrollHeight == null) {
            scrollHeight = $('#luckysheet-cell-main').scrollTop();
        }
        if (luckysheetFreezen.freezenverticaldata != null || luckysheetFreezen.freezenhorizontaldata != null) {
            let freezen_horizon_px, freezen_horizon_ed, freezen_horizon_scrollTop;
            let freezen_vertical_px, freezen_vertical_ed, freezen_vertical_scrollTop;
            let drawWidth = Store.luckysheetTableContentHW[0], drawHeight = Store.luckysheetTableContentHW[1];
            if (luckysheetFreezen.freezenverticaldata != null && luckysheetFreezen.freezenhorizontaldata != null) {
                freezen_horizon_px = luckysheetFreezen.freezenhorizontaldata[0];
                freezen_horizon_ed = luckysheetFreezen.freezenhorizontaldata[1];
                freezen_horizon_scrollTop = luckysheetFreezen.freezenhorizontaldata[2];
                freezen_vertical_px = luckysheetFreezen.freezenverticaldata[0];
                freezen_vertical_ed = luckysheetFreezen.freezenverticaldata[1];
                freezen_vertical_scrollTop = luckysheetFreezen.freezenverticaldata[2];
                d.luckysheetDrawMain(freezen_vertical_scrollTop, freezen_horizon_scrollTop, freezen_vertical_px, freezen_horizon_px, 1, 1, null, null, 'freezen_3');
                d.luckysheetDrawMain(scrollWidth + freezen_vertical_px - freezen_vertical_scrollTop, freezen_horizon_scrollTop, drawWidth - freezen_vertical_px + freezen_vertical_scrollTop, freezen_horizon_px, 1, 1, null, null, 'freezen_4');
                d.luckysheetDrawMain(freezen_vertical_scrollTop, scrollHeight + freezen_horizon_px - freezen_horizon_scrollTop, freezen_vertical_px, drawHeight - freezen_horizon_px + freezen_horizon_scrollTop, 1, 1, null, null, 'freezen_7');
                d.luckysheetDrawMain(scrollWidth + freezen_vertical_px - freezen_vertical_scrollTop, scrollHeight + freezen_horizon_px - freezen_horizon_scrollTop, drawWidth - freezen_vertical_px + freezen_vertical_scrollTop, drawHeight - freezen_horizon_px + freezen_horizon_scrollTop, freezen_vertical_px - freezen_vertical_scrollTop + Store.rowHeaderWidth, freezen_horizon_px - freezen_horizon_scrollTop + Store.columnHeaderHeight);
                d.luckysheetDrawgridColumnTitle(freezen_vertical_scrollTop, freezen_vertical_px, Store.rowHeaderWidth);
                d.luckysheetDrawgridColumnTitle(scrollWidth + freezen_vertical_px - freezen_vertical_scrollTop, drawWidth - freezen_vertical_px + freezen_vertical_scrollTop, freezen_vertical_px - freezen_vertical_scrollTop + Store.rowHeaderWidth);
                d.luckysheetDrawgridRowTitle(freezen_horizon_scrollTop, freezen_horizon_px, Store.columnHeaderHeight);
                d.luckysheetDrawgridRowTitle(scrollHeight + freezen_horizon_px - freezen_horizon_scrollTop, drawHeight - freezen_horizon_px + freezen_horizon_scrollTop, freezen_horizon_px - freezen_horizon_scrollTop + Store.columnHeaderHeight);
            } else if (luckysheetFreezen.freezenhorizontaldata != null) {
                freezen_horizon_px = luckysheetFreezen.freezenhorizontaldata[0];
                freezen_horizon_ed = luckysheetFreezen.freezenhorizontaldata[1];
                freezen_horizon_scrollTop = luckysheetFreezen.freezenhorizontaldata[2];
                d.luckysheetDrawMain(scrollWidth, freezen_horizon_scrollTop, drawWidth, freezen_horizon_px, 1, 1, null, null, 'freezen_h');
                d.luckysheetDrawMain(scrollWidth, scrollHeight + freezen_horizon_px - freezen_horizon_scrollTop, drawWidth, drawHeight - freezen_horizon_px + freezen_horizon_scrollTop, null, freezen_horizon_px - freezen_horizon_scrollTop + Store.columnHeaderHeight);
                d.luckysheetDrawgridColumnTitle(scrollWidth, drawWidth, null);
                d.luckysheetDrawgridRowTitle(freezen_horizon_scrollTop, freezen_horizon_px, Store.columnHeaderHeight);
                d.luckysheetDrawgridRowTitle(scrollHeight + freezen_horizon_px - freezen_horizon_scrollTop, drawHeight - freezen_horizon_px + freezen_horizon_scrollTop, freezen_horizon_px - freezen_horizon_scrollTop + Store.columnHeaderHeight);
            } else if (luckysheetFreezen.freezenverticaldata != null) {
                freezen_vertical_px = luckysheetFreezen.freezenverticaldata[0];
                freezen_vertical_ed = luckysheetFreezen.freezenverticaldata[1];
                freezen_vertical_scrollTop = luckysheetFreezen.freezenverticaldata[2];
                d.luckysheetDrawMain(freezen_vertical_scrollTop, scrollHeight, freezen_vertical_px, drawHeight, 1, 1, null, null, 'freezen_v');
                d.luckysheetDrawMain(scrollWidth + freezen_vertical_px - freezen_vertical_scrollTop, scrollHeight, drawWidth - freezen_vertical_px + freezen_vertical_scrollTop, drawHeight, freezen_vertical_px - freezen_vertical_scrollTop + Store.rowHeaderWidth, null);
                d.luckysheetDrawgridRowTitle(scrollHeight, drawHeight, null);
                d.luckysheetDrawgridColumnTitle(freezen_vertical_scrollTop, freezen_vertical_px, Store.rowHeaderWidth);
                d.luckysheetDrawgridColumnTitle(scrollWidth + freezen_vertical_px - freezen_vertical_scrollTop, drawWidth - freezen_vertical_px + freezen_vertical_scrollTop, freezen_vertical_px - freezen_vertical_scrollTop + Store.rowHeaderWidth);
            }
        } else {
            if ($('#luckysheetTableContent').length == 0) {
                return;
            }
            let luckysheetTableContent = $('#luckysheetTableContent').get(0).getContext('2d');
            d.luckysheetDrawMain(scrollWidth, scrollHeight);
            d.luckysheetDrawgridColumnTitle(scrollWidth);
            d.luckysheetDrawgridRowTitle(scrollHeight);
            luckysheetTableContent.clearRect(0, 0, Store.rowHeaderWidth * Store.devicePixelRatio - 1, Store.columnHeaderHeight * Store.devicePixelRatio - 1);
        }
    }
    return {
        jfrefreshgrid,
        jfrefreshgridall,
        jfrefreshrange,
        jfrefreshgrid_adRC,
        jfrefreshgrid_deleteCell,
        jfrefreshgrid_pastcut,
        jfrefreshgrid_rhcw,
        luckysheetrefreshgrid
    };
});
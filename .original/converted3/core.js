define([
    './config.js',
    './utils/util',
    './store',
    './controllers/server',
    './controllers/luckysheetConfigsetting',
    './controllers/sheetmanage',
    './controllers/resize',
    './controllers/handler',
    './controllers/filter',
    './controllers/matrixOperation',
    './controllers/sheetBar',
    './controllers/formulaBar',
    './controllers/rowColumnOperation',
    './controllers/keyboard',
    './controllers/orderBy',
    './controllers/expendPlugins',
    './methods/get',
    './methods/set',
    './global/refresh',
    './function/functionlist',
    './controllers/constant',
    './global/getdata',
    './global/setdata',
    './controllers/select',
    './controllers/zoom',
    './controllers/print',
    './global/method',
    './global/api',
    'flatpickr',
    'flatpickr/dist/l10n/zh.js',
    './controllers/listener'
], function (defaultSetting, m_util, Store, server, luckysheetConfigsetting, sheetmanage, luckysheetsizeauto, luckysheetHandler, m_filter, m_matrixOperation, m_sheetBar, m_formulaBar, m_rowColumnOperation, m_keyboard, m_orderBy, m_expendPlugins, m_get, m_set, m_refresh, functionlist, m_constant, m_getdata, m_setdata, m_select, m_zoom, m_print, method, api, flatpickr, Mandarin, m_listener) {
    'use strict';
    const {common_extend} = m_util;
    const {initialFilterHandler} = m_filter;
    const {initialMatrixOperation} = m_matrixOperation;
    const {initialSheetBar} = m_sheetBar;
    const {formulaBarInitial} = m_formulaBar;
    const {rowColumnOperationInitial} = m_rowColumnOperation;
    const {keyboardInitial} = m_keyboard;
    const {orderByInitial} = m_orderBy;
    const {initPlugins} = m_expendPlugins;
    const {getluckysheetfile, getluckysheet_select_save, getconfig} = m_get;
    const {setluckysheet_select_save} = m_set;
    const {luckysheetrefreshgrid, jfrefreshgrid} = m_refresh;
    const {luckysheetlodingHTML} = m_constant;
    const {getcellvalue, getdatabyselection} = m_getdata;
    const {setcellvalue} = m_setdata;
    const {selectHightlightShow} = m_select;
    const {zoomInitial} = m_zoom;
    const {printInitial} = m_print;
    const {initListener} = m_listener;
    let luckysheet = {};    // mount api
                            // luckysheet.api = api;
                            // Object.assign(luckysheet, api);
    // mount api
    // luckysheet.api = api;
    // Object.assign(luckysheet, api);
    luckysheet = common_extend(api, luckysheet);    //创建luckysheet表格
    //创建luckysheet表格
    luckysheet.create = function (setting) {
        method.destroy();    // Store original parameters for api: toJson
        // Store original parameters for api: toJson
        Store.toJsonOptions = {};
        for (let c in setting) {
            if (c !== 'data') {
                Store.toJsonOptions[c] = setting[c];
            }
        }
        let extendsetting = common_extend(defaultSetting, setting);
        let loadurl = extendsetting.loadUrl, menu = extendsetting.menu, title = extendsetting.title;
        let container = extendsetting.container;
        Store.container = container;
        Store.luckysheetfile = extendsetting.data;
        Store.defaultcolumnNum = extendsetting.column;
        Store.defaultrowNum = extendsetting.row;
        Store.fullscreenmode = extendsetting.fullscreenmode;
        Store.lang = extendsetting.lang;    //language
        //language
        Store.allowEdit = extendsetting.allowEdit;
        Store.limitSheetNameLength = extendsetting.limitSheetNameLength;
        Store.defaultSheetNameMaxLength = extendsetting.defaultSheetNameMaxLength;
        Store.fontList = extendsetting.fontList;
        server.gridKey = extendsetting.gridKey;
        server.loadUrl = extendsetting.loadUrl;
        server.updateUrl = extendsetting.updateUrl;
        server.updateImageUrl = extendsetting.updateImageUrl;
        server.title = extendsetting.title;
        server.loadSheetUrl = extendsetting.loadSheetUrl;
        server.allowUpdate = extendsetting.allowUpdate;
        luckysheetConfigsetting.autoFormatw = extendsetting.autoFormatw;
        luckysheetConfigsetting.accuracy = extendsetting.accuracy;
        luckysheetConfigsetting.total = extendsetting.data[0].total;
        luckysheetConfigsetting.allowCopy = extendsetting.allowCopy;
        luckysheetConfigsetting.showtoolbar = extendsetting.showtoolbar;
        luckysheetConfigsetting.showtoolbarConfig = extendsetting.showtoolbarConfig;
        luckysheetConfigsetting.showinfobar = extendsetting.showinfobar;
        luckysheetConfigsetting.showsheetbar = extendsetting.showsheetbar;
        luckysheetConfigsetting.showsheetbarConfig = extendsetting.showsheetbarConfig;
        luckysheetConfigsetting.showstatisticBar = extendsetting.showstatisticBar;
        luckysheetConfigsetting.showstatisticBarConfig = extendsetting.showstatisticBarConfig;
        luckysheetConfigsetting.sheetFormulaBar = extendsetting.sheetFormulaBar;
        luckysheetConfigsetting.cellRightClickConfig = extendsetting.cellRightClickConfig;
        luckysheetConfigsetting.sheetRightClickConfig = extendsetting.sheetRightClickConfig;
        luckysheetConfigsetting.pointEdit = extendsetting.pointEdit;
        luckysheetConfigsetting.pointEditUpdate = extendsetting.pointEditUpdate;
        luckysheetConfigsetting.pointEditZoom = extendsetting.pointEditZoom;
        luckysheetConfigsetting.userInfo = extendsetting.userInfo;
        luckysheetConfigsetting.userMenuItem = extendsetting.userMenuItem;
        luckysheetConfigsetting.myFolderUrl = extendsetting.myFolderUrl;
        luckysheetConfigsetting.functionButton = extendsetting.functionButton;
        luckysheetConfigsetting.showConfigWindowResize = extendsetting.showConfigWindowResize;
        luckysheetConfigsetting.enableAddRow = extendsetting.enableAddRow;
        luckysheetConfigsetting.enableAddBackTop = extendsetting.enableAddBackTop;
        luckysheetConfigsetting.enablePage = extendsetting.enablePage;
        luckysheetConfigsetting.pageInfo = extendsetting.pageInfo;
        luckysheetConfigsetting.editMode = extendsetting.editMode;
        luckysheetConfigsetting.beforeCreateDom = extendsetting.beforeCreateDom;
        luckysheetConfigsetting.workbookCreateBefore = extendsetting.workbookCreateBefore;
        luckysheetConfigsetting.workbookCreateAfter = extendsetting.workbookCreateAfter;
        luckysheetConfigsetting.fireMousedown = extendsetting.fireMousedown;
        luckysheetConfigsetting.forceCalculation = extendsetting.forceCalculation;
        luckysheetConfigsetting.plugins = extendsetting.plugins;
        luckysheetConfigsetting.rowHeaderWidth = extendsetting.rowHeaderWidth;
        luckysheetConfigsetting.columnHeaderHeight = extendsetting.columnHeaderHeight;
        luckysheetConfigsetting.defaultColWidth = extendsetting.defaultColWidth;
        luckysheetConfigsetting.defaultRowHeight = extendsetting.defaultRowHeight;
        luckysheetConfigsetting.title = extendsetting.title;
        luckysheetConfigsetting.container = extendsetting.container;
        luckysheetConfigsetting.hook = extendsetting.hook;
        luckysheetConfigsetting.pager = extendsetting.pager;
        luckysheetConfigsetting.initShowsheetbarConfig = false;
        if (Store.lang === 'zh')
            flatpickr.localize(Mandarin.zh);    // Store the currently used plugins for monitoring asynchronous loading
        // Store the currently used plugins for monitoring asynchronous loading
        Store.asyncLoad.push(...luckysheetConfigsetting.plugins);    // Register plugins
        // Register plugins
        initPlugins(extendsetting.plugins, extendsetting.data);    // Store formula information, including internationalization
        // Store formula information, including internationalization
        functionlist();
        let devicePixelRatio = extendsetting.devicePixelRatio;
        if (devicePixelRatio == null) {
            devicePixelRatio = 1;
        }
        Store.devicePixelRatio = Math.ceil(devicePixelRatio);    //loading
        //loading
        $('#' + container).append(luckysheetlodingHTML());
        if (loadurl == '') {
            sheetmanage.initialjfFile(menu, title);    // luckysheetsizeauto();
            // luckysheetsizeauto();
            initialWorkBook();
        } else {
            $.post(loadurl, { 'gridKey': server.gridKey }, function (d) {
                let data = new Function('return ' + d)();
                Store.luckysheetfile = data;
                sheetmanage.initialjfFile(menu, title);    // luckysheetsizeauto();
                // luckysheetsizeauto();
                initialWorkBook();    //需要更新数据给后台时，建立WebSocket连接
                //需要更新数据给后台时，建立WebSocket连接
                if (server.allowUpdate) {
                    server.openWebSocket();
                }
            });
        }
    };
    function initialWorkBook() {
        luckysheetHandler();    //Overall dom initialization
        //Overall dom initialization
        initialFilterHandler();    //Filter initialization
        //Filter initialization
        initialMatrixOperation();    //Right click matrix initialization
        //Right click matrix initialization
        initialSheetBar();    //bottom sheet bar initialization
        //bottom sheet bar initialization
        formulaBarInitial();    //top formula bar initialization
        //top formula bar initialization
        rowColumnOperationInitial();    //row and coloumn operate initialization
        //row and coloumn operate initialization
        keyboardInitial();    //Keyboard operate initialization
        //Keyboard operate initialization
        orderByInitial();    //menu bar orderby function initialization
        //menu bar orderby function initialization
        zoomInitial();    //zoom method initialization
        //zoom method initialization
        printInitial();    //print initialization
        //print initialization
        initListener();
    }    //获取所有表格数据
    //获取所有表格数据
    luckysheet.getluckysheetfile = getluckysheetfile;    //获取当前表格 选区
    //获取当前表格 选区
    luckysheet.getluckysheet_select_save = getluckysheet_select_save;    //设置当前表格 选区
    //设置当前表格 选区
    luckysheet.setluckysheet_select_save = setluckysheet_select_save;    //获取当前表格 config配置
    //获取当前表格 config配置
    luckysheet.getconfig = getconfig;    //二维数组数据 转化成 {r, c, v}格式 一维数组 (传入参数为二维数据data)
    //二维数组数据 转化成 {r, c, v}格式 一维数组 (传入参数为二维数据data)
    luckysheet.getGridData = sheetmanage.getGridData;    //生成表格所需二维数组 （传入参数为表格数据对象file）
    //生成表格所需二维数组 （传入参数为表格数据对象file）
    luckysheet.buildGridData = sheetmanage.buildGridData;    // Refresh the canvas display data according to scrollHeight and scrollWidth
    // Refresh the canvas display data according to scrollHeight and scrollWidth
    luckysheet.luckysheetrefreshgrid = luckysheetrefreshgrid;    // Refresh canvas
    // Refresh canvas
    luckysheet.jfrefreshgrid = jfrefreshgrid;    // Get the value of the cell
    // Get the value of the cell
    luckysheet.getcellvalue = getcellvalue;    // Set cell value
    // Set cell value
    luckysheet.setcellvalue = setcellvalue;    // Get selection range value
    // Get selection range value
    luckysheet.getdatabyselection = getdatabyselection;
    luckysheet.sheetmanage = sheetmanage;    // Data of the current table
    // Data of the current table
    luckysheet.flowdata = function () {
        return Store.flowdata;
    };    // Set selection highlight
    // Set selection highlight
    luckysheet.selectHightlightShow = selectHightlightShow;    // Reset parameters after destroying the table
    // Reset parameters after destroying the table
    luckysheet.destroy = method.destroy;
    return { luckysheet };
});
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
], function (
    defaultSetting, 
    a, 
    Store, 
    server, 
    luckysheetConfigsetting, 
    sheetmanage, 
    m_resize, 
    luckysheetHandler, 
    b, 
    c, 
    d, 
    e, 
    f, 
    g, 
    h, 
    i, 
    j, 
    k, 
    l, 
    functionlist, 
    m, 
    n, 
    o, 
    p, 
    q, 
    r, 
    method, 
    api, 
    flatpickr, 
    Mandarin, 
s) {
    'use strict';
    const luckysheetsizeauto = m_resize.luckysheetsizeauto;

    let luckysheet = {};
    luckysheet = a.common_extend(api, luckysheet);
    luckysheet.create = function (setting) {
        method.destroy();
        Store.toJsonOptions = {};
        for (let c in setting) {
            if (c !== 'data') {
                Store.toJsonOptions[c] = setting[c];
            }
        }
        let extendsetting = a.common_extend(defaultSetting, setting);
        let loadurl = extendsetting.loadUrl, menu = extendsetting.menu, title = extendsetting.title;
        let container = extendsetting.container;
        Store.container = container;
        Store.luckysheetfile = extendsetting.data;
        Store.defaultcolumnNum = extendsetting.column;
        Store.defaultrowNum = extendsetting.row;
        Store.fullscreenmode = extendsetting.fullscreenmode;
        Store.lang = extendsetting.lang;
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
            flatpickr.localize(Mandarin.zh);
        Store.asyncLoad.push(...luckysheetConfigsetting.plugins);
        i.initPlugins(extendsetting.plugins, extendsetting.data);
        functionlist();
        let devicePixelRatio = extendsetting.devicePixelRatio;
        if (devicePixelRatio == null) {
            devicePixelRatio = 1;
        }
        Store.devicePixelRatio = Math.ceil(devicePixelRatio);
        $('#' + container).append(m.luckysheetlodingHTML());
        if (loadurl == '') {
            sheetmanage.initialjfFile(menu, title);
            initialWorkBook();
        } else {
            $.post(loadurl, { 'gridKey': server.gridKey }, function (d) {
                let data = new Function('return ' + d)();
                Store.luckysheetfile = data;
                sheetmanage.initialjfFile(menu, title);
                initialWorkBook();
                if (server.allowUpdate) {
                    server.openWebSocket();
                }
            });
        }
    };
    function initialWorkBook() {
        luckysheetHandler();
        b.initialFilterHandler();
        c.initialMatrixOperation();
        d.initialSheetBar();
        e.formulaBarInitial();
        f.rowColumnOperationInitial();
        g.keyboardInitial();
        h.orderByInitial();
        q.zoomInitial();
        r.printInitial();
        s.initListener();
    }
    luckysheet.undefined = j.getluckysheetfile;
    luckysheet.undefined = j.getluckysheet_select_save;
    luckysheet.undefined = k.setluckysheet_select_save;
    luckysheet.undefined = j.getconfig;
    luckysheet.getGridData = sheetmanage.getGridData;
    luckysheet.buildGridData = sheetmanage.buildGridData;
    luckysheet.undefined = l.luckysheetrefreshgrid;
    luckysheet.undefined = l.jfrefreshgrid;
    luckysheet.undefined = n.getcellvalue;
    luckysheet.undefined = o.setcellvalue;
    luckysheet.undefined = n.getdatabyselection;
    luckysheet.sheetmanage = sheetmanage;
    luckysheet.flowdata = function () {
        return Store.flowdata;
    };
    luckysheet.undefined = p.selectHightlightShow;
    luckysheet.destroy = method.destroy;
    return { luckysheet };
});
define([
    './getdata',
    './editor',
    './rhchInit',
    './formula',
    './refresh',
    '../controllers/sheetmanage',
    '../store'
], function (m_getdata, editor, rhchInit, formula, m_refresh, sheetmanage, Store) {
    'use strict';
    const {datagridgrowth} = m_getdata;
    const {luckysheetrefreshgrid} = m_refresh;
    return function luckysheetcreatesheet(colwidth, rowheight, data, cfg, active) {
        if (active == null) {
            active = true;
        }
        Store.visibledatarow = [];
        Store.visibledatacolumn = [];
        Store.ch_width = 0;
        Store.rh_height = 0;
        Store.zoomRatio = 1;
        if (cfg != null) {
            Store.config = cfg;
        } else {
            Store.config = {};
        }
        if (data.length == 0) {
            Store.flowdata = datagridgrowth(data, rowheight, colwidth);
        } else if (data.length < rowheight && data[0].length < colwidth) {
            Store.flowdata = datagridgrowth(data, rowheight - data.length, colwidth - data[0].length);
        } else if (data.length < rowheight) {
            Store.flowdata = datagridgrowth(data, rowheight - data.length, 0);
        } else if (data[0].length < colwidth) {
            Store.flowdata = datagridgrowth(data, 0, colwidth - data[0].length);
        } else {
            Store.flowdata = data;
        }
        editor.webWorkerFlowDataCache(Store.flowdata);    //worker存数据
        //worker存数据
        rhchInit(rowheight, colwidth);
        if (active) {
            sheetmanage.showSheet();
            setTimeout(function () {
                sheetmanage.restoreCache();
                formula.execFunctionGroup();
                sheetmanage.restoreSheetAll(Store.currentSheetIndex);
                luckysheetrefreshgrid();
            }, 1);
        }
    };
});
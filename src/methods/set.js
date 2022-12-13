define([
    '../methods/get',
    '../store'
], function (m_get, Store) {
    'use strict';
    const {getSheetIndex} = m_get;
    function setluckysheet_select_save(v) {
        Store.luckysheet_select_save = v;
    }
    function setluckysheet_scroll_status(v) {
        Store.luckysheet_scroll_status = v;
    }
    function setluckysheetfile(d) {
        Store.luckysheetfile = d;
    }
    function setconfig(v) {
        Store.config = v;
        if (Store.luckysheetfile != null) {
            Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].config = v;
        }
    }
    function setvisibledatarow(v) {
        Store.visibledatarow = v;
        if (Store.luckysheetfile != null) {
            Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].visibledatarow = v;
        }
    }
    function setvisibledatacolumn(v) {
        Store.visibledatacolumn = v;
        if (Store.luckysheetfile != null) {
            Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].visibledatacolumn = v;
        }
    }
    return {
        setluckysheet_select_save,
        setluckysheet_scroll_status,
        setluckysheetfile,
        setconfig,
        setvisibledatarow,
        setvisibledatacolumn
    };
});
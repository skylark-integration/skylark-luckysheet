define([
    '../utils/util',
    '../methods/sort_methods',
    '../methods/validate',
    '../methods/datecontroll',
    '../widgets/tooltip',
    '../methods/getRowlen',
    '../methods/protection_methods',
    '../methods/luckysheetConfigsetting',    
    '../store',
    '../vendors/numeral'
], function (m_util,m_sort_methods, m_validate, m_datecontroll, tooltip,  m_getRowlen, m_protection, luckysheetConfigsetting,Store, numeral) {
    'use strict';
    const {getObjType} = m_util;
    const {isRealNull, isRealNum} = m_validate;
    const isEditMode = luckysheetConfigsetting.isEditMode;

    const {isdatetime, diff} = m_datecontroll;
    const {rowlenByRange} = m_getRowlen;
    const {checkProtectionAuthorityNormal} = m_protection;

    const {orderbydata,orderbydata1D} = m_sort_methods;

    //排序选区数据
    function sortSelection(isAsc) {
        if (!checkProtectionAuthorityNormal(Store.currentSheetIndex, 'sort')) {
            return;
        }
        if (Store.luckysheet_select_save.length > 1) {
            if (isEditMode()) {
                alert('不能对多重选择区域执行此操作\uFF0C请选择单个区域\uFF0C然后再试');
            } else {
                tooltip.info('不能对多重选择区域执行此操作\uFF0C请选择单个区域\uFF0C然后再试', '');
            }
            return;
        }
        if (isAsc == null) {
            isAsc = true;
        }
        let d = Store.deepCopyFlowData(Store.flowdata);
        let r1 = Store.luckysheet_select_save[0].row[0], r2 = Store.luckysheet_select_save[0].row[1];
        let c1 = Store.luckysheet_select_save[0].column[0], c2 = Store.luckysheet_select_save[0].column[1];
        let str, edr;
        for (let r = r1; r <= r2; r++) {
            if (d[r] != null && d[r][c1] != null) {
                let cell = d[r][c1];
                if (cell.mc != null || isRealNull(cell.v)) {
                    continue;
                }
                if (str == null && /[\u4e00-\u9fa5]+/g.test(cell.v)) {
                    str = r + 1;
                    edr = r + 1;
                    continue;
                }
                if (str == null) {
                    str = r;
                }
                edr = r;
            }
        }
        if (str == null || str > r2) {
            return;
        }
        let hasMc = false;    //排序选区是否有合并单元格
        //排序选区是否有合并单元格
        let data = [];
        for (let r = str; r <= edr; r++) {
            let data_row = [];
            for (let c = c1; c <= c2; c++) {
                if (d[r][c] != null && d[r][c].mc != null) {
                    hasMc = true;
                    break;
                }
                data_row.push(d[r][c]);
            }
            data.push(data_row);
        }
        if (hasMc) {
            if (isEditMode()) {
                alert('选区有合并单元格\uFF0C无法执行此操作\uFF01');
            } else {
                tooltip.info('选区有合并单元格\uFF0C无法执行此操作\uFF01', '');
            }
            return;
        }
        data = orderbydata(data, 0, isAsc);
        for (let r = str; r <= edr; r++) {
            for (let c = c1; c <= c2; c++) {
                d[r][c] = data[r - str][c - c1];
            }
        }
        let allParam = {};
        if (Store.config['rowlen'] != null) {
            let cfg = $.extend(true, {}, Store.config);
            cfg = rowlenByRange(d, str, edr, cfg);
            allParam = {
                'cfg': cfg,
                'RowlChange': true
            };
        }
        ///jfrefreshgrid(d, [{
        Store.refreshRange(d,[{
                'row': [
                    str,
                    edr
                ],
                'column': [
                    c1,
                    c2
                ]
            }], allParam);
    }    //排序一列数据
    //排序一列数据
    function sortColumnSeletion(colIndex, isAsc) {
        if (!checkProtectionAuthorityNormal(Store.currentSheetIndex, 'sort')) {
            return;
        }
        if (isAsc == null) {
            isAsc = true;
        }
        let d = Store.deepCopyFlowData(Store.flowdata);
        let r1 = 0, r2 = d.length - 1;
        let c1 = 0, c2 = d[0].length - 1;
        let str, edr;
        for (let r = r1; r <= r2; r++) {
            if (d[r][colIndex] != null && d[r][colIndex].mc != null) {
                continue;
            }
            if (d[r][colIndex] != null && !isRealNull(d[r][colIndex].v) && /[\u4e00-\u9fa5]+/g.test(d[r][colIndex].v) && str == null) {
                str = r + 1;
                edr = r + 1;
                continue;
            }
            if (str == null) {
                str = r;
            }
            if (d[r][colIndex] != null && !isRealNull(d[r][colIndex].v)) {
                edr = r;
            }
        }
        if (str == null || str > r2) {
            return;
        }
        let hasMc = false;    //排序选区是否有合并单元格
        //排序选区是否有合并单元格
        let data = [];
        for (let r = str; r <= edr; r++) {
            let data_row = [];
            for (let c = c1; c <= c2; c++) {
                if (d[r][c] != null && d[r][c].mc != null) {
                    hasMc = true;
                    break;
                }
                data_row.push(d[r][c]);
            }
            data.push(data_row);
        }
        if (hasMc) {
            if (isEditMode()) {
                alert('列排序会扩展至整个表格选区\uFF0C选区有合并单元格\uFF0C无法执行此操作\uFF0C请选择功能栏排序功能\uFF01');
            } else {
                tooltip.info('列排序会扩展至整个表格选区\uFF0C选区有合并单元格\uFF0C无法执行此操作\uFF0C请选择功能栏排序功能\uFF01', '');
            }
            return;
        }
        data = orderbydata(data, colIndex, isAsc);
        for (let r = str; r <= edr; r++) {
            for (let c = c1; c <= c2; c++) {
                d[r][c] = data[r - str][c - c1];
            }
        }
        let allParam = {};
        if (Store.config['rowlen'] != null) {
            let cfg = $.extend(true, {}, Store.config);
            cfg = rowlenByRange(d, str, edr, cfg);
            allParam = {
                'cfg': cfg,
                'RowlChange': true
            };
        }
        ///jfrefreshgrid(d, [{
        Store.refreshRange(d,[{
                'row': [
                    str,
                    edr
                ],
                'column': [
                    c1,
                    c2
                ]
            }], allParam);
    }
    return {
        orderbydata,
        orderbydata1D,
        sortSelection,
        sortColumnSeletion
    };
});
define([
    '../utils/util',
    './validate',
    './datecontroll',
    './tooltip',
    './editor',
    './getRowlen',
    './refresh',
    '../controllers/protection',
    '../store',
    'numeral'
], function (m_util, m_validate, m_datecontroll, tooltip, editor, m_getRowlen, m_refresh, m_protection, Store, numeral) {
    'use strict';
    const {getObjType} = m_util;
    const {isRealNull, isRealNum, isEditMode} = m_validate;
    const {isdatetime, diff} = m_datecontroll;
    const {rowlenByRange} = m_getRowlen;
    const {jfrefreshgrid} = m_refresh;
    const {checkProtectionAuthorityNormal} = m_protection;
    //数据排序方法
    function orderbydata(data, index, isAsc) {
        if (isAsc == null) {
            isAsc = true;
        }
        let a = function (x, y) {
            let x1 = x[index], y1 = y[index];
            if (getObjType(x[index]) == 'object') {
                x1 = x[index].v;
            }
            if (getObjType(y[index]) == 'object') {
                y1 = y[index].v;
            }
            if (isRealNull(x1)) {
                return 1;
            }
            if (isRealNull(y1)) {
                return -1;
            }
            if (isdatetime(x1) && isdatetime(y1)) {
                return diff(x1, y1);
            } else if (isRealNum(x1) && isRealNum(y1)) {
                return numeral(x1).value() - numeral(y1).value();
            } else if (!isRealNum(x1) && !isRealNum(y1)) {
                return x1.localeCompare(y1, 'zh');
            } else if (!isRealNum(x1)) {
                return 1;
            } else if (!isRealNum(y1)) {
                return -1;
            }
        };
        let d = function (x, y) {
            let x1 = x[index], y1 = y[index];
            if (getObjType(x[index]) == 'object') {
                x1 = x[index].v;
            }
            if (getObjType(y[index]) == 'object') {
                y1 = y[index].v;
            }
            if (isRealNull(x1)) {
                return 1;
            }
            if (isRealNull(y1)) {
                return -1;
            }
            if (isdatetime(x1) && isdatetime(y1)) {
                return diff(y1, x1);
            } else if (isRealNum(x1) && isRealNum(y1)) {
                return numeral(y1).value() - numeral(x1).value();
            } else if (!isRealNum(x1) && !isRealNum(y1)) {
                return y1.localeCompare(x1, 'zh');
            } else if (!isRealNum(x1)) {
                return -1;
            } else if (!isRealNum(y1)) {
                return 1;
            }
        };
        if (isAsc) {
            return data.sort(a);
        } else {
            return data.sort(d);
        }
    }
    function orderbydata1D(data, isAsc) {
        if (isAsc == null) {
            isAsc = true;
        }
        let a = function (x, y) {
            let x1 = x, y1 = y;
            if (getObjType(x) == 'object') {
                x1 = x.v;
            }
            if (getObjType(y) == 'object') {
                y1 = y.v;
            }
            if (x1 == null) {
                x1 = '';
            }
            if (y1 == null) {
                y1 = '';
            }
            if (isdatetime(x1) && isdatetime(y1)) {
                return diff(x1, y1);
            } else if (isRealNum(x1) && isRealNum(y1)) {
                return numeral(x1).value() - numeral(y1).value();
            } else if (!isRealNum(x1) && !isRealNum(y1)) {
                return x1.localeCompare(y1, 'zh');
            } else if (!isRealNum(x1)) {
                return 1;
            } else if (!isRealNum(y1)) {
                return -1;
            }
        };
        let d = function (x, y) {
            let x1 = x, y1 = y;
            if (getObjType(x) == 'object') {
                x1 = x.v;
            }
            if (getObjType(y) == 'object') {
                y1 = y.v;
            }
            if (x1 == null) {
                x1 = '';
            }
            if (y1 == null) {
                y1 = '';
            }
            if (isdatetime(x1) && isdatetime(y1)) {
                return diff(y1, x1);
            } else if (isRealNum(x1) && isRealNum(y1)) {
                return numeral(y1).value() - numeral(x1).value();
            } else if (!isRealNum(x1) && !isRealNum(y1)) {
                return y1.localeCompare(x1, 'zh');
            } else if (!isRealNum(x1)) {
                return -1;
            } else if (!isRealNum(y1)) {
                return 1;
            }
        };
        if (isAsc) {
            return data.sort(a);
        } else {
            return data.sort(d);
        }
    }    //排序选区数据
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
        let d = editor.deepCopyFlowData(Store.flowdata);
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
        jfrefreshgrid(d, [{
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
        let d = editor.deepCopyFlowData(Store.flowdata);
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
        jfrefreshgrid(d, [{
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
define([
    '../utils/util',
    './get',
    './dynamicArray',
    '../locale/locale',
    '../store'
], function (m_util,m_get,  m_dynamicArray, locale, Store) {
    'use strict';
    const {getObjType, rgbTohex,textTrim,convertCssToStyleList,getFontStyleByCell} = m_util;
    const {getSheetIndex} = m_get;
    const {dynamicArrayCompute} = m_dynamicArray;

    function getdatabyselection(range, sheetIndex) {
        if (range == null) {
            range = Store.luckysheet_select_save[0];
        }
        if (range['row'] == null || range['row'].length == 0) {
            return [];
        }    //取数据
        //取数据
        let d, cfg;
        if (sheetIndex != null && sheetIndex != Store.currentSheetIndex) {
            d = Store.luckysheetfile[getSheetIndex(sheetIndex)]['data'];
            cfg = Store.luckysheetfile[getSheetIndex(sheetIndex)]['config'];
        } else {
            d = Store.deepCopyFlowData(Store.flowdata);
            cfg = Store.config;
        }
        let data = [];
        for (let r = range['row'][0]; r <= range['row'][1]; r++) {
            if (d[r] == null) {
                continue;
            }
            if (cfg['rowhidden'] != null && cfg['rowhidden'][r] != null) {
                continue;
            }
            let row = [];
            for (let c = range['column'][0]; c <= range['column'][1]; c++) {
                row.push(d[r][c]);
            }
            data.push(row);
        }
        return data;
    }
    function getdatabyselectionD(d, range) {
        if (range == null || range['row'] == null || range['row'].length == 0) {
            return [];
        }
        let dynamicArray_compute = dynamicArrayCompute(Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]['dynamicArray']);
        let data = [];
        if (d == null) {
            return data;
        }
        for (let r = range['row'][0]; r <= range['row'][1]; r++) {
            if (d[r] == null) {
                continue;
            }    // if (Store.config["rowhidden"] != null && Store.config["rowhidden"][r] != null) {
                 //     continue;
                 // }
            // if (Store.config["rowhidden"] != null && Store.config["rowhidden"][r] != null) {
            //     continue;
            // }
            let row = [];
            for (let c = range['column'][0]; c <= range['column'][1]; c++) {
                let value;
                if (r + '_' + c in dynamicArray_compute) {
                    value = dynamicArray_compute[r + '_' + c];
                } else {
                    value = d[r][c];
                }
                row.push(value);
            }
            data.push(row);
        }
        return data;
    }
    function getdatabyselectionNoCopy(range) {
        if (range == null || range['row'] == null || range['row'].length == 0) {
            return [];
        }
        let data = [];
        for (let r = range['row'][0]; r <= range['row'][1]; r++) {
            let row = [];
            if (Store.config['rowhidden'] != null && Store.config['rowhidden'][r] != null) {
                continue;
            }
            for (let c = range['column'][0]; c <= range['column'][1]; c++) {
                let value = '';
                if (Store.flowdata[r] != null && Store.flowdata[r][c] != null) {
                    value = Store.flowdata[r][c];
                }
                row.push(value);
            }
            data.push(row);
        }
        return data;
    }
    function getcellvalue(r, c, data, type) {
        if (type == null) {
            type = 'v';
        }
        if (data == null) {
            data = Store.flowdata;
        }
        let d_value;
        if (r != null && c != null) {
            d_value = data[r][c];
        } else if (r != null) {
            d_value = data[r];
        } else if (c != null) {
            let newData = data[0].map(function (col, i) {
                return data.map(function (row) {
                    return row[i];
                });
            });
            d_value = newData[c];
        } else {
            return data;
        }
        let retv = d_value;
        if (getObjType(d_value) == 'object') {
            retv = d_value[type];
            if (type == 'f' && retv != null) {
                ///retv = formula.functionHTMLGenerate(retv); //TODO:lwf
            } else if (type == 'f') {
                retv = d_value['v'];
            } else if (d_value && d_value.ct && d_value.ct.t == 'd') {
                retv = d_value.m;
            }
        }
        if (retv == undefined) {
            retv = null;
        }
        return retv;
    }
    function datagridgrowth(data, addr, addc, iscallback) {
        if (addr <= 0 && addc <= 0) {
            return data;
        }
        if (addr <= 0) {
            addr = 0;
        }
        if (addc <= 0) {
            addc = 0;
        }
        let dataClen = 0;
        if (data.length == 0) {
            data = [];
            dataClen = 0;
        } else {
            dataClen = data[0].length;
        }
        let coladd = [];    //需要额外增加的空列
        //需要额外增加的空列
        for (let c = 0; c < addc; c++) {
            coladd.push(null);
        }
        let rowadd = [];    //完整的一个空行
        //完整的一个空行
        for (let r = 0; r < dataClen + addc; r++) {
            rowadd.push(null);
        }
        for (let r = 0; r < data.length; r++) {
            data[r] = [].concat(data[r].concat(coladd));
        }
        for (let r = 0; r < addr; r++) {
            data.push([].concat(rowadd));
        }
        if (!!iscallback) {
            Store.saveParam('all', Store.currentSheetIndex, data.length, { 'k': 'row' });
            Store.saveParam('all', Store.currentSheetIndex, data[0].length, { 'k': 'column' });
        }
        return data;
    }
    function getcellFormula(r, c, i, data) {
        let cell;
        if (data != null) {
            cell = data[r][c];
        } else {
            cell = getOrigincell(r, c, i);
        }
        if (cell == null) {
            return null;
        }
        return cell.f;
    }
    function getOrigincell(r, c, i) {
        if (r == null || c == null) {
            return;
        }
        let data;
        if (i == null) {
            data = Store.flowdata;
        } else {
            let sheet = Store.getSheetByIndex(i);
            data = sheet.data;
        }
        if (!data || !data[r] || !data[r][c]) {
            return;
        }
        return data[r][c];
    }
    function getRealCellValue(r, c) {
        let value = getcellvalue(r, c, null, 'm');
        if (value == null) {
            value = getcellvalue(r, c);
            if (value == null) {
                let ct = getcellvalue(r, c, null, 'ct');
                if (isInlineStringCT(ct)) {
                    value = ct.s;
                }
            }
        }
        return value;
    }
    function getInlineStringNoStyle(r, c) {
        let ct = getcellvalue(r, c, null, 'ct');
        if (isInlineStringCT(ct)) {
            let strings = ct.s, value = '';
            for (let i = 0; i < strings.length; i++) {
                let strObj = strings[i];
                if (strObj.v != null) {
                    value += strObj.v;
                }
            }
            return value;
        }
        return '';
    }
    function getInlineStringStyle(r, c, data) {
        let ct = getcellvalue(r, c, data, 'ct');
        if (data == null) {
            data = Store.flowdata;
        }
        let cell = data[r][c];
        if (isInlineStringCT(ct)) {
            let strings = ct.s, value = '';
            for (let i = 0; i < strings.length; i++) {
                let strObj = strings[i];
                if (strObj.v != null) {
                    let style = getFontStyleByCell(strObj);
                    value += "<span index='" + i + "' style='" + style + "'>" + strObj.v + '</span>';
                }
            }
            return value;
        }
        return '';
    }

    // from controllers/sheetmanage
    function getGridData(d) {
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
    }

    function isInlineStringCT(ct) {
        let isIs = ct != null && ct.t == 'inlineStr' && ct.s != null && ct.s.length > 0;
        return isIs;
    }

    return {
        getGridData,
        
        getdatabyselection: getdatabyselection,
        getdatabyselectionD: getdatabyselectionD,
        getdatabyselectionNoCopy: getdatabyselectionNoCopy,
        getcellvalue: getcellvalue,
        datagridgrowth: datagridgrowth,
        getcellFormula: getcellFormula,
        getOrigincell: getOrigincell,
        getRealCellValue: getRealCellValue,
        getInlineStringNoStyle: getInlineStringNoStyle,
        getInlineStringStyle: getInlineStringStyle,
        getFontStyleByCell: getFontStyleByCell,
        textTrim: textTrim,
        isInlineStringCT
    };
});
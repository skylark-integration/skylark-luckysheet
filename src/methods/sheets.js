define([
    './getdata',
    './setdata',
    '../utils/util',
    './get',
    './dynamicArray',
    './formula_methods',
    '../locale/locale',
    './luckysheetConfigsetting',
    '../store'
], function (m_getdata,m_setdata,m_util, m_get,  m_dynamicArray, formula, locale,luckysheetConfigsetting , Store) {
    'use strict';
    const {getObjType, rgbTohex,textTrim} = m_util;
    const {getSheetIndex} = m_get;
    const {dynamicArrayCompute} = m_dynamicArray;
    const {getcellvalue, datagridgrowth, getcellFormula} = m_getdata;
    const {setcellvalue} = m_setdata;


    // from controllers/sheetmanage
    const sheets = {
        generateRandomSheetIndex: function (prefix) {
            if (prefix == null) {
                prefix = 'Sheet';
            }
            let userAgent = window.navigator.userAgent.replace(/[^a-zA-Z0-9]/g, '').split('');
            let mid = '';
            for (let i = 0; i < 12; i++) {
                mid += userAgent[Math.round(Math.random() * (userAgent.length - 1))];
            }
            let time = new Date().getTime();
            return prefix + '_' + mid + '_' + time;
        },
        generateRandomSheetName: function (file, isPivotTable) {
            let index = file.length;
            const locale_pivotTable = locale().pivotTable;
            const title = locale_pivotTable.title;
            for (let i = 0; i < file.length; i++) {
                if (file[i].name.indexOf('Sheet') > -1 || file[i].name.indexOf(title) > -1) {
                    let suffix = parseFloat(file[i].name.replace('Sheet', '').replace(title, ''));
                    if (suffix != 'NaN' && Math.ceil(suffix) > index) {
                        index = Math.ceil(suffix);
                    }
                }
            }
            if (isPivotTable) {
                return title + (index + 1);
            } else {
                return 'Sheet' + (index + 1);
            }
        },
        generateCopySheetName: function (file, name) {
            let copySheetName = '';
            let _locale = locale();
            let locale_info = _locale.info;
            if (name.toString().indexOf('(' + locale_info.copy) > -1) {
                let copy_i = name.toString().indexOf('(' + locale_info.copy);
                let name2 = name.toString().substring(0, copy_i) + '(' + locale_info.copy;
                let index = null;
                for (let i = 0; i < file.length; i++) {
                    let fileName = file[i].name.toString();
                    let st_i = fileName.indexOf(name2);
                    if (st_i > -1) {
                        let ed_i = fileName.indexOf(')', st_i + name2.length);
                        let num = fileName.substring(st_i + name2.length, ed_i);
                        if (isRealNum(num)) {
                            if (index == null || parseInt(num) > index) {
                                index = parseInt(num);
                            }
                        }
                    }
                }
                if (index == null) {
                    copySheetName = name2 + '2)';
                } else {
                    index++;
                    copySheetName = name2 + index + ')';
                }
            } else {
                let index = null;
                let hascopy = false;
                let name2 = name + '(' + locale_info.copy;
                for (let i = 0; i < file.length; i++) {
                    let fileName = file[i].name.toString();
                    let st_i = fileName.indexOf(name2);
                    if (st_i > -1) {
                        hascopy = true;
                        let ed_i = fileName.indexOf(')', st_i + name2.length);
                        let num = fileName.substring(st_i + name2.length, ed_i);
                        if (isRealNum(num)) {
                            if (index == null || parseInt(num) > index) {
                                index = parseInt(num);
                            }
                        }
                    }
                }
                if (hascopy) {
                    if (index == null) {
                        copySheetName = name + '(' + locale_info.copy + '2)';
                    } else {
                        index++;
                        copySheetName = name + '(' + locale_info.copy + '' + index + ')';
                    }
                } else {
                    copySheetName = name + '(' + locale_info.copy + ')';
                }
            }
            return copySheetName;
        },
        getSheetByIndex: function (index) {
            return Store.getSheetIndex(index);
        },
        getSheetByName: function (name) {
            return Store.getSheetByName(name);
        },
        getCurSheetnoset: function () {
            return Store.getCurSheetnoset();
        },
        getCurSheet: function () {
            return Store.getCurSheet();
        },
        hasSheet: function (index) {
            return Store.hasSheet(index);
        },

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

        buildGridData: function (file) {
            // 如果已经存在二维数据data,那么直接返回data；如果只有celldata，那么就转化成二维数组data，再返回
            let row = file.row == null ? Store.defaultrowNum : file.row, column = file.column == null ? Store.defaultcolumnNum : file.column, data = file.data && file.data.length > 0 ? file.data : datagridgrowth([], row, column), celldata = file.celldata;
            if (file.data && file.data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[0].length; j++) {
                        setcellvalue(i, j, data, data[i][j]);
                    }
                }
            } else {
                if (celldata && celldata.length > 0) {
                    for (let i = 0; i < celldata.length; i++) {
                        let item = celldata[i];
                        let r = item.r;
                        let c = item.c;
                        let v = item.v;
                        if (r >= data.length) {
                            data = datagridgrowth(data, r - data.length + 1, 0);
                        }
                        if (c >= data[0].length) {
                            data = datagridgrowth(data, 0, c - data[0].length + 1);
                        }
                        setcellvalue(r, c, data, v);
                    }
                }
            }    //亿万格式+精确度 恢复全局初始化
            //亿万格式+精确度 恢复全局初始化
            luckysheetConfigsetting.autoFormatw = false;
            luckysheetConfigsetting.accuracy = undefined;
            return data;
        },
        cutGridData: function (d) {
            let rowindex = 0;
            for (let r = d.length - 1; r >= 0; r--) {
                let isnull = true;
                for (let c = 0; c < d[0].length; c++) {
                    let value = getcellvalue(r, c);
                    if (value != null && $.trim(value).length > 0) {
                        isnull = false;
                        break;
                    }
                }
                if (!isnull) {
                    break;
                } else {
                    rowindex = r;
                }
            }
            return d.slice(0, rowindex);
        },
        addGridData: function (celldata, row, column) {
            let data = datagridgrowth([], row, column);
            if (celldata != null) {
                for (let i = 0; i < celldata.length; i++) {
                    let item = celldata[i];
                    let r = item.r;
                    let c = item.c;
                    let v = item.v;
                    if (r >= data.length) {
                        data = datagridgrowth(data, r - data.length + 1, 0);
                    }
                    if (c >= data[0].length) {
                        data = datagridgrowth(data, 0, c - data[0].length + 1);
                    }
                    setcellvalue(r, c, data, v);
                }
            }
            return data;
        },

        sheetParamRestore: function (file, data) {
            Store.luckysheet_select_save = file['luckysheet_select_save'];
            if (Store.luckysheet_select_save == null || Store.luckysheet_select_save.length == 0) {
                if (data[0] != null && data[0][0] != null && data[0][0].mc != null) {
                    Store.luckysheet_select_save = [{
                            'row': [
                                0,
                                data[0][0].mc.rs - 1
                            ],
                            'column': [
                                0,
                                data[0][0].mc.cs - 1
                            ]
                        }];
                } else {
                    Store.luckysheet_select_save = [{
                            'row': [
                                0,
                                0
                            ],
                            'column': [
                                0,
                                0
                            ]
                        }];
                }
            }
            Store.luckysheet_selection_range = file['luckysheet_selection_range'] == null ? [] : file['luckysheet_selection_range'];
            Store.config = file['config'] == null ? {} : file['config'];
            Store.zoomRatio = file['zoomRatio'] == null ? 1 : file['zoomRatio'];
            if (file['defaultRowHeight'] != null) {
                Store.defaultrowlen = parseFloat(file['defaultRowHeight']);
            } else {
                Store.defaultrowlen = luckysheetConfigsetting['defaultRowHeight'];
            }
            if (file['defaultColWidth'] != null) {
                Store.defaultcollen = parseFloat(file['defaultColWidth']);
            } else {
                Store.defaultcollen = luckysheetConfigsetting['defaultColWidth'];
            }
            if (file['showGridLines'] != null) {
                let showGridLines = file['showGridLines'];
                if (showGridLines == 0 || showGridLines == false) {
                    Store.showGridLines = false;
                } else {
                    Store.showGridLines = true;
                }
            } else {
                Store.showGridLines = true;
            }
        },
        loadOtherFile: function (file) {
            let _this = this;
            // let sheetindexset = _this.checkLoadSheetIndex(file);
            // let sheetindex = [];
            // for(let i = 0; i < sheetindexset.length; i++){
            //     let item = sheetindexset[i];
            //     if(item == file["index"]){
            //         continue;
            //     }
            //     sheetindex.push(item);
            // }
            // for(let i = 0;i<sheetindex.length;i++){
            //     let item = sheetindex[i];
            //     let otherfile = Store.luckysheetfile[_this.getSheetIndex(item)]; 
            //     if(otherfile["load"] == null || otherfile["load"] == "0"){
            //         otherfile["data"] = _this.buildGridData(otherfile);
            //         otherfile["load"] = "1";
            //     }
            // }
            for (let i = 0; i < Store.luckysheetfile.length; i++) {
                let otherfile = Store.luckysheetfile[i];
                if (otherfile.index == file.index) {
                    continue;
                }    // let otherfile = Store.luckysheetfile[_this.getSheetIndex(item)]; 
                // let otherfile = Store.luckysheetfile[_this.getSheetIndex(item)]; 
                if (otherfile['load'] == null || otherfile['load'] == '0') {
                    otherfile['data'] = _this.buildGridData(otherfile);
                    otherfile['load'] = '1';
                }
            }
        },
        checkLoadSheetIndexToDataIndex: {},
        checkLoadSheetIndex: function (file) {
            let calchain = formula.getAllFunctionGroup();    //file.calcChain; //index
            //file.calcChain; //index
            let chart = file.chart;    //dataSheetIndex
            //dataSheetIndex
            let pivotTable = file.pivotTable;    //pivotDataSheetIndex
            //pivotDataSheetIndex
            let ret = [], cache = {};
            if (file.index in this.checkLoadSheetIndexToDataIndex) {
                return [];
            }
            ret.push(file.index);
            cache[file.index.toString()] = 1;
            this.checkLoadSheetIndexToDataIndex[file.index] = 1;
            if (calchain != null) {
                let dataIndexList = {};
                for (let i = 0; i < calchain.length; i++) {
                    let f = calchain[i];
                    let dataindex = f.index;
                    let formulaTxt = getcellFormula(f.r, f.c, dataindex);
                    if (formulaTxt == null) {
                        let file = Store.luckysheetfile[this.getSheetIndex(dataindex)];
                        file.data = this.buildGridData(file);
                        formulaTxt = getcellFormula(f.r, f.c, dataindex);
                        if (formulaTxt == null) {
                            continue;
                        }
                    }
                    if (formulaTxt.indexOf('!') == -1) {
                        // dataIndexList[dataindex] = 1;
                        formula.addToSheetIndexList(formulaTxt, dataindex);
                    } else if (formula.formulaContainSheetList != null && formula.formulaContainSheetList[formulaTxt] != null) {
                        for (let dataSheetIndex in formula.formulaContainSheetList[formulaTxt]) {
                            dataIndexList[dataSheetIndex] = 1;
                        }
                    } else {
                        formula.functionParser(formulaTxt, str => {
                            formula.addToCellList(formulaTxt, str);
                            if (str.indexOf('!') > -1) {
                                let name = str.substr(0, str.indexOf('!'));    // dataNameList[name] = true;
                                // dataNameList[name] = true;
                                let sheet = this.getSheetByName(name);
                                if (sheet != null) {
                                    let dataSheetIndex = sheet.index;
                                    dataIndexList[dataSheetIndex] = 1;
                                    formula.addToSheetIndexList(formulaTxt, dataSheetIndex);
                                }
                            }
                        });
                        if (formula.formulaContainSheetList[formulaTxt] == null) {
                            // dataIndexList[dataindex] = 1;
                            formula.addToSheetIndexList(formulaTxt, dataindex);
                        }
                    }
                    if (dataindex == null) {
                        continue;
                    } 
                }
                // if(cache[dataindex.toString()] == null){
                //  // ret.push(dataindex);
                //     cache[dataindex.toString()] = 1;
                //     this.checkLoadSheetIndexToDataIndex[dataindex] = 1;
                // }
                for (let index in dataIndexList) {
                    // let sheet = this.getSheetByName(n);
                    // if(sheet==null){
                    //     continue;
                    // }
                    // if(index == Store.currentSheetIndex){
                    //     continue;
                    // }
                    let dataindex = index;
                    if (cache[dataindex.toString()] == null) {
                        ret.push(dataindex);
                        cache[dataindex.toString()] = 1;
                        this.checkLoadSheetIndexToDataIndex[dataindex] = 1;
                    }
                }
            }
            if (chart != null) {
                for (let i = 0; i < chart.length; i++) {
                    let cc = chart[i];
                    let dataindex = cc.dataSheetIndex;
                    if (dataindex == null) {
                        continue;
                    }
                    if (cache[dataindex.toString()] == null) {
                        ret.push(dataindex);
                        cache[dataindex.toString()] = 1;
                    }
                }
            }
            if (pivotTable != null) {
                let dataindex = pivotTable.pivotDataSheetIndex;
                if (dataindex != null && cache[dataindex.toString()] == null) {
                    ret.push(dataindex);
                    cache[dataindex.toString()] = 1;
                }
            }
            return ret;
        },
        setCurSheet: function (index) {
            Store.setCurSheet(index);
        },
        getSheetIndex: function (index) {
            return Store.getSheetIndex(index);
        },
        delChart: function (chart_id, sheetIndex) {
            let index = this.getSheetIndex(sheetIndex);
            let file = Store.luckysheetfile[index];
            if (file.chart == null) {
                file.chart = [];
            } else {
                for (let i = 0; i < file.chart.length; i++) {
                    if (file.chart[i].chart_id == chart_id) {
                        Store.luckysheetfile[index].chart.splice(i, 1);
                        break;
                    }
                }
            }
        },
        saveChart: function (json) {
            //采用chartMix store存储，弃用Store.luckysheetfile存储，防止重复存储
            let index = this.getSheetIndex(json.sheetIndex);
            let file = Store.luckysheetfile[index];
            if (file.chart == null) {
                file.chart = [];
                file.chart.push(json);
            } else {
                for (let i = 0; i < file.chart.length; i++) {
                    if (file.chart[i].chart_id == json.chart_id) {
                        let old = $.extend(true, {}, file.chart[i]);
                        file.chart[i] = $.extend(true, {}, old, json);
                        return;
                    }
                }
                file.chart.push(json);
            }
        },
        getChart: function (sheetIndex, chart_id) {
            let index = this.getSheetIndex(sheetIndex);
            let file = Store.luckysheetfile[index];
            if (file.chart == null) {
                return null;
            } else {
                for (let i = 0; i < file.chart.length; i++) {
                    if (file.chart[i].chart_id == chart_id) {
                        return file.chart[i];
                    }
                }
                return null;
            }
        },
        getRangetxt: function (sheetIndex, range, currentIndex) {
            let sheettxt = '';
            if (currentIndex == null) {
                currentIndex = Store.currentSheetIndex;
            }
            if (sheetIndex != currentIndex) {
                sheettxt = Store.luckysheetfile[this.getSheetIndex(sheetIndex)].name + '!';
            }
            let row0 = range['row'][0], row1 = range['row'][1];
            let column0 = range['column'][0], column1 = range['column'][1];
            if (row0 == null && row1 == null) {
                return sheettxt + chatatABC(column0) + ':' + chatatABC(column1);
            } else if (column0 == null && column1 == null) {
                return sheettxt + (row0 + 1) + ':' + (row1 + 1);
            } else {
                if (column0 == column1 && row0 == row1) {
                    return sheettxt + chatatABC(column0) + (row0 + 1);
                } else {
                    return sheettxt + chatatABC(column0) + (row0 + 1) + ':' + chatatABC(column1) + (row1 + 1);
                }
            }
        },
        getSheetName: function (sheetIndex) {
            if (sheetIndex == null) {
                sheetIndex = Store.currentSheetIndex;
            }
            return Store.luckysheetfile[this.getSheetIndex(sheetIndex)].name;
        },

        getSheetData: function (sheetIndex) {
            if (sheetIndex == null) {
                sheetIndex = Store.currentSheetIndex;
            }
            return Store.luckysheetfile[this.getSheetIndex(sheetIndex)].data;
        },
        getSheetConfig: function (sheetIndex) {
            let _this = this;
            if (sheetIndex == null) {
                sheetIndex = Store.currentSheetIndex;
            }
            let config = Store.luckysheetfile[_this.getSheetIndex(sheetIndex)].config;
            if (config == null) {
                Store.luckysheetfile[_this.getSheetIndex(sheetIndex)].config = {};
            }
            return Store.luckysheetfile[_this.getSheetIndex(sheetIndex)].config;
        },
        CacheNotLoadControll: [],
        execCache: function (item) {
            let _this = this;
            let type = item.t;
            let index = item.i;
            let value = item.v;
            let file = Store.luckysheetfile[_this.getSheetIndex(index)];
            if (type == 'sha') {
                Store.luckysheetfile.push(value);
            } else if (type == 'shc') {
                let copyjson = $.extend(true, {}, Store.luckysheetfile[_this.getSheetIndex(value.copyindex)]);
                copyjson.index = index;
                Store.luckysheetfile.push(copyjson);
            } else if (type == 'shd') {
                Store.luckysheetfile.splice(value.deleIndex, 1);
            } else if (type == 'shr') {
                for (let pos in value) {
                    Store.luckysheetfile[_this.getSheetIndex(pos)].order = value[pos];
                }
            }
            if ((file == null || file.load != '1') && !(type in {
                    'sha': 0,
                    'shc': 0,
                    'shd': 0,
                    'shr': 0
                })) {
                _this.CacheNotLoadControll.push(item);
                return;
            }
            if (type == 'v') {
                let r = item.r, c = item.c, v = item.v;
                let data = _this.getSheetData(index);
                file.data[r][c] = v;
            } else if (type == 'fc') {
                let op = item.op, pos = item.pos;
                if (getObjType(value) != 'object') {
                    value = new Function('return ' + value)();
                }
                let r = value.r, c = value.c;
                if (op == 'del') {
                    formula.delFunctionGroup(r, c, index);
                } else {
                    formula.insertUpdateFunctionGroup(r, c, index);
                }
            } else if (type == 'cg') {
                let v = value, k = item.k;
                let config1 = _this.getSheetConfig(index);
                if (!(k in config1)) {
                    config1[k] = {};
                }
                for (let key in v) {
                    config1[k][key] = v[key];
                }
                Store.config = config1;
            } else if (type == 'f') {
                let v = value, op = item.op, pos = item.pos;
                let filter = file.filter;
                if (filter == null) {
                    filter = {};
                }
                if (op == 'upOrAdd') {
                    filter[pos] = v;
                } else if (op == 'del') {
                    delete filter[pos];
                }
            } else if (type == 'fsc') {
                file.filter = null;
                file.filter_select = null;
            } else if (type == 'fsr') {
                let v = value;
                file.filter = v.filter;
                file.filter_select = v.filter_select;
            } else if (type == 'sh') {
                let op = item.op, cur = item.cur, v = value;
                if (op == 'hide') {
                    file.status = 0;
                    Store.luckysheetfile[_this.getSheetIndex(cur)].status = 1;
                } else if (op == 'show') {
                    for (let i = 0; i < Store.luckysheetfile.length; i++) {
                        Store.luckysheetfile[i].status = 0;
                    }
                    file.status = 1;
                }
            } else if (type == 'all') {
                let k = item.k, s = item.s;
                if (s && getObjType(value) != 'object') {
                    file[k] = JSON.stringify(value);
                } else {
                    file[k] = value;
                }
            } else if (type == 'c') {
                let op = item.op, cid = item.cid;
                if (op == 'add') {
                    file.chart.push(value);
                } else if (op == 'xy' || op == 'wh' || op == 'update') {
                    for (let i = 0; i < file.chart.length; i++) {
                        if (file.chart[i].chart_id == cid) {
                            for (let item in file.chart[i]) {
                                for (let vitem in value) {
                                    if (item == vitem) {
                                        file.chart[i][item] = value[vitem];
                                    }
                                }
                            }
                            return;
                        }
                    }
                } else if (op == 'del') {
                    for (let i = 0; i < file.chart.length; i++) {
                        if (file.chart[i].chart_id == cid) {
                            file.chart.splice(i, 1);
                            return;
                        }
                    }
                }
            } else if (type == 'drc') {
                let rc = item.rc, index = value.index, len = value.len;
                let celldata = file.celldata;
                if (rc == 'r') {
                    for (let i = 0; celldata.length == 0; i++) {
                        let cell = celldata[i];
                        if (cell.r >= index && cell.r < index + len) {
                            delete celldata[i];
                        } else if (cell.r >= index + len) {
                            cell.r -= len;
                        }
                    }
                    file.row -= len;
                } else {
                    for (let i = 0; celldata.length == 0; i++) {
                        let cell = celldata[i];
                        if (cell.c >= index && cell.c < index + len) {
                            delete celldata[i];
                        } else if (cell.c >= index + len) {
                            cell.c -= len;
                        }
                    }
                    file.column -= len;
                }
                let ret = [];
                for (let i = 0; i < celldata.length; i++) {
                    if (celldata[i] != null) {
                        ret.push(celldata[i]);
                    }
                }
                file.celldata = ret;
                let mtype, mst, med;
                if (rc == 'r') {
                    mtype = 'row';
                } else {
                    mtype = 'column';
                }
                mst = index;
                med = index + len - 1;
                luckysheetdeletetable(mtype, mst, med, true);
            } else if (type == 'arc') {
                let rc = item.rc, index = value.index, len = value.len;
                let celldata = file.celldata;
                if (rc == 'r') {
                    for (let i = 0; i < celldata.length; i++) {
                        let cell = celldata[i];
                        if (cell.r > index) {
                            cell.r += len;
                        }
                    }
                    file.row += len;
                } else {
                    for (let i = 0; i < celldata.length; i++) {
                        let cell = celldata[i];
                        if (cell.c > index) {
                            cell.c += len;
                        }
                    }
                    file.column += len;
                }
                let mtype;
                if (rc == 'r') {
                    mtype = 'row';
                } else {
                    mtype = 'column';
                }
                luckysheetextendtable(mtype, index, len, true);
            } else if (type == 'na') {
                Store.saveParam('na', null, value);
            } else if (type == 'thumb') {
                setTimeout(function () {
                    _this.imageRequest();
                }, 2000);
            }
        }
    };

    return sheets;
});
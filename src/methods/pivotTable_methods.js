define([
    '../methods/get',
    '../utils/util',
    '../methods/getdata',
    '../methods/datecontroll',
    '../methods/format',
    '../methods/validate',
    '../methods/array',
    '../methods/analysis',
    '../methods/luckysheetConfigsetting',
    './sheets',
    '../methods/protection_methods',
    '../store',
    '../locale/locale',
    '../vendors/numeral'
], function (m_get, m_util, m_getdata, m_datecontroll, m_format, m_validate,  luckysheetArray, analysis,luckysheetConfigsetting, sheets,  m_protection, Store, locale, numeral) {
    'use strict';
    const {getSheetIndex, getRangetxt} = m_get;
    const {replaceHtml, getObjType, ABCatNum, numFormat, numfloatlen, showrightclickmenu, mouseclickposition} = m_util;
    const {getdatabyselectionD, getcellvalue, datagridgrowth} = m_getdata;
    const {isdatetime, diff, isdatatypemulti, isdatatype} = m_datecontroll;
    const {genarate, update} = m_format;
    const {isRealNull} = m_validate;
    const isEditMode = luckysheetConfigsetting.isEditMode;
    const {checkProtectionAuthorityNormal} = m_protection;
    const pivotTable = {
        pivotDatas: null,
        pivotSheetIndex: 0,
        pivotDataSheetIndex: 0,
        celldata: null,
        origindata: null,
        getCellData: function (cursheetindex, datasheetindex, data_select_save) {
            let _this = this;
            let sheetIndex;
            if (cursheetindex != null) {
                sheetIndex = cursheetindex;
            } else {
                sheetIndex = Store.currentSheetIndex;
            }
            let realIndex = getSheetIndex(sheetIndex);
            if (getObjType(Store.luckysheetfile[realIndex].pivotTable) != 'object') {
                Store.luckysheetfile[realIndex].pivotTable = new Function('return ' + Store.luckysheetfile[realIndex].pivotTable)();
            }
            if (Store.luckysheetfile[realIndex].pivotTable != null) {
                _this.column = Store.luckysheetfile[realIndex].pivotTable.column;
                _this.row = Store.luckysheetfile[realIndex].pivotTable.row;
                _this.values = Store.luckysheetfile[realIndex].pivotTable.values;
                _this.filter = Store.luckysheetfile[realIndex].pivotTable.filter;
                _this.showType = Store.luckysheetfile[realIndex].pivotTable.showType;
                _this.filterparm = Store.luckysheetfile[realIndex].pivotTable.filterparm;
                if (Store.luckysheetfile[realIndex].pivotTable.drawPivotTable != null) {
                    _this.drawPivotTable = Store.luckysheetfile[realIndex].pivotTable.drawPivotTable;
                } else {
                    _this.drawPivotTable = true;
                }
                if (Store.luckysheetfile[realIndex].pivotTable.pivotTableBoundary != null) {
                    _this.pivotTableBoundary = Store.luckysheetfile[realIndex].pivotTable.pivotTableBoundary;
                } else {
                    _this.pivotTableBoundary = [
                        12,
                        6
                    ];
                }
                if (data_select_save != null) {
                    _this.pivot_select_save = data_select_save;
                } else {
                    _this.pivot_select_save = Store.luckysheetfile[realIndex].pivotTable.pivot_select_save;
                }
                if (datasheetindex != null) {
                    _this.pivotDataSheetIndex = datasheetindex;
                } else {
                    _this.pivotDataSheetIndex = Store.luckysheetfile[realIndex].pivotTable.pivotDataSheetIndex;
                }
            } else {
                _this.column = null;
                _this.row = null;
                _this.values = null;
                _this.filter = null;
                _this.showType = null;
                _this.filterparm = null;
                _this.drawPivotTable = true;
                _this.pivotTableBoundary = [
                    12,
                    6
                ];
                if (data_select_save != null) {
                    _this.pivot_select_save = data_select_save;
                } else {
                    _this.pivot_select_save = Store.luckysheet_select_save;
                }
                if (datasheetindex != null) {
                    _this.pivotDataSheetIndex = datasheetindex;
                } else {
                    _this.pivotDataSheetIndex = sheetIndex;
                }
            }
            let pivotrealIndex = getSheetIndex(_this.pivotDataSheetIndex);
            let otherfile = Store.luckysheetfile[pivotrealIndex];
            if (otherfile['data'] == null) {
                otherfile['data'] = sheets.buildGridData(otherfile);
            }
            _this.origindata = getdatabyselectionD(otherfile.data, _this.pivot_select_save);
            let rowhidden = {};
            if (_this.filterparm != null) {
                for (let f in _this.filterparm) {
                    // 目的是取出rowhidden
                    for (let h in _this.filterparm[f]) {
                        if (h === 'rowhidden' && _this.filterparm[f][h] != null) {
                            rowhidden = $.extend(true, rowhidden, _this.filterparm[f][h]);
                        }
                    }
                }
            }
            _this.rowhidden = rowhidden;
            _this.pivotSheetIndex = sheetIndex;
            let newdata = [];
            for (let i = 0; i < _this.origindata.length; i++) {
                if (_this.rowhidden != null && _this.rowhidden[i] != null) {
                    continue;
                }
                newdata.push([].concat(_this.origindata[i]));
            }
            _this.celldata = newdata;
            _this.pivot_data_type = {};
            for (let c = 0; c < _this.celldata[1].length; c++) {
                let type = isdatatype(_this.celldata[1][c]);
                _this.pivot_data_type[c.toString()] = type;
            }
        },
        pivot_data_type: {},
        pivot_select_save: null,
        column: null,
        row: null,
        values: null,
        filter: null,
        showType: null,
        rowhidden: null,
        selected: null,
        caljs: null,
        initial: true,
        filterparm: null,
        luckysheet_pivotTable_select_state: false,
        jgridCurrentPivotInput: null,
        movestate: false,
        moveitemposition: [],
        movesave: {},

        getSumTypeName: function (type) {
            let name = '';
            const _locale = locale();
            const locale_pivotTable = _locale.pivotTable;
            if (type == 'SUM') {
                name = locale_pivotTable.valueStatisticsSUM;
            } else if (type == 'COUNT') {
                name = locale_pivotTable.valueStatisticsCOUNT;
            } else if (type == 'COUNTA') {
                name = locale_pivotTable.valueStatisticsCOUNTA;
            } else if (type == 'COUNTUNIQUE') {
                name = locale_pivotTable.valueStatisticsCOUNTUNIQUE;
            } else if (type == 'AVERAGE') {
                name = locale_pivotTable.valueStatisticsAVERAGE;
            } else if (type == 'MAX') {
                name = locale_pivotTable.valueStatisticsMAX;
            } else if (type == 'MIN') {
                name = locale_pivotTable.valueStatisticsMIN;
            } else if (type == 'MEDIAN') {
                name = locale_pivotTable.valueStatisticsMEDIAN;
            } else if (type == 'PRODUCT') {
                name = locale_pivotTable.valueStatisticsPRODUCT;
            } else if (type == 'STDEV') {
                name = locale_pivotTable.valueStatisticsSTDEV;
            } else if (type == 'STDEVP') {
                name = locale_pivotTable.valueStatisticsSTDEVP;
            } else if (type == 'let') {
                name = locale_pivotTable.valueStatisticslet;
            } else if (type == 'VARP') {
                name = locale_pivotTable.valueStatisticsVARP;
            }
            return name;
        },
        setDatatojsfile: function (attr, value, cindex) {
            let _this = this;
            let index = getSheetIndex(_this.pivotSheetIndex);
            if (Store.luckysheetfile[index]['pivotTable'] == null) {
                Store.luckysheetfile[index]['pivotTable'] = {};
            }
            if (cindex == null) {
                Store.luckysheetfile[index]['pivotTable'][attr] = value;
                _this[attr] = value;
            } else {
                if (Store.luckysheetfile[index]['pivotTable']['filterparm'] == null) {
                    Store.luckysheetfile[index]['pivotTable']['filterparm'] = {};
                }
                if (Store.luckysheetfile[index]['pivotTable']['filterparm'][cindex.toString()] == null) {
                    Store.luckysheetfile[index]['pivotTable']['filterparm'][cindex.toString()] = {};
                }
                Store.luckysheetfile[index]['pivotTable']['filterparm'][cindex.toString()][attr] = value;
                if (_this['filterparm'] == null) {
                    _this['filterparm'] = {};
                }
                if (_this['filterparm'][cindex.toString()] == null) {
                    _this['filterparm'][cindex.toString()] = {};
                }
                _this['filterparm'][cindex.toString()][attr] = value;
            }
        },
        drawPivotTable: true,
        pivotTableBoundary: [
            12,
            6
        ],

        isPivotRange: function (row_index, col_index) {
            let _this = this;
            if (!!Store.luckysheetcurrentisPivotTable) {
                if (row_index < _this.pivotTableBoundary[0] && col_index < _this.pivotTableBoundary[1]) {
                    return true;
                } else {
                    return false;
                }
            }
        },

        getPivotTableData: function (dataindex) {
            if (dataindex == null) {
                dataindex = this.pivotSheetIndex;
            }
            let index = getSheetIndex(dataindex);
            let pivotTable = Store.luckysheetfile[index]['pivotTable'];
            if (getObjType(pivotTable) == 'object') {
                pivotTable = $.extend(true, {}, Store.luckysheetfile[index]['pivotTable']);
            } else {
                pivotTable = new Function('return ' + pivotTable)();
            }
            return pivotTable;
        },
        addValuesToTitle: function (titles, values) {
            let rowLen = titles.length * values.length, colLen = titles[0].length + 1;
            let retdata = [];
            if (titles.length == 0 && values.length > 0) {
                for (let v = 0; v < values.length; v++) {
                    retdata.push(values[v].fullname);
                }
                return retdata;
            }
            if (values.length == 0 && titles.length > 0) {
                return titles;
            }
            for (let r = 0; r < rowLen; r++) {
                retdata[r] = new Array(colLen);
                for (let c = 0; c < colLen - 1; c++) {
                    retdata[r][c] = titles[Math.floor(r / values.length)][c];
                }
                retdata[r][colLen - 1] = values[r % values.length].fullname;
            }
            return retdata;
        },

        getComposeArray: function (data) {
            if (data.length == 0) {
                return [];
            }
            let ret = [];
            for (let i = 0; i < data.length; i++) {
                let name = '';
                for (let x = 0; x <= i; x++) {
                    if (!!data[x] && !!data[x]['m']) {
                        name += data[x]['m'];
                    } else {
                        name += getcellvalue(x, null, data);
                    }
                }
                ret.push(name);
            }
            return ret;
        },
        getnameArray: function (data, field) {
            if (data.length == 0) {
                return [];
            }
            if (field.length == 0) {
                return [];
            }
            let ret = [];
            for (let i = 0; i < field.length; i++) {
                let c_value;
                if (!!data[field[i].index] && !!data[field[i].index]['m']) {
                    c_value = data[field[i].index]['m'];
                } else {
                    c_value = getcellvalue(field[i].index, null, data);
                }
                ret.push(c_value);
            }
            return ret;
        },
        getTitleFromGroup: function (group, config, dataposition) {
            let _this = this;
            let orderbygroup = _this.orderbygroup(group, config, dataposition);
            return _this.generategrouparraymain(orderbygroup, config);
        },
        orderbygroup: function (group, config, dataposition) {
            let _this = this;
            let stackset = [];
            if (group.length == 0) {
                return [];
            }
            stackset = group;
            let d = null, alllength = stackset.length, alllengthInital = stackset.length, a = 0;
            while (alllength != 0) {
                d = stackset[a++];
                alllength--;
                if (d.children != null && d.children.length > 0) {
                    d.children = _this.orderbygroupchildren(d.children, config[d.index].orderby, config[d.index].order, dataposition);
                    for (let i = 0; i < d.children.length; i++) {
                        stackset.push(d.children[i]);
                        alllength++;
                    }
                }
            }
            return group.splice(0, alllengthInital);
        },
        orderbygroupchildren: function (childrens, orderby, order, dataposition) {
            if (childrens.length == 0) {
                return [];
            }
            let isAsc = false;
            if (order == null || order == 'asc') {
                isAsc = true;
            }
            const _locale = locale();
            const locale_filter = _locale.filter;
            let a = function (x, y) {
                let f = null, s = null;
                if (orderby == 'self' || orderby == null) {
                    if (x.name == null) {
                        f = locale_filter.valueBlank;
                    } else {
                        f = x.name.toString();
                    }
                    if (y.name == null) {
                        s = locale_filter.valueBlank;
                    } else {
                        s = y.name.toString();
                    }
                    if (isdatetime(f) && isdatetime(s)) {
                        return diff(f, s);
                    }
                } else {
                    f = parseFloat(dataposition[x.orderby].result);
                    s = parseFloat(dataposition[y.orderby].result);
                }
                if (!isNaN(f) && !isNaN(s)) {
                    return numeral(f).value() - numeral(s).value();
                } else if (isNaN(f) && isNaN(s)) {
                    return f.localeCompare(s);
                } else if (isNaN(f)) {
                    return 1;
                } else if (isNaN(s)) {
                    return -1;
                }
            };
            let d = function (x, y) {
                let f = null, s = null;
                if (orderby == 'self' || orderby == null) {
                    if (x.name == null) {
                        f = locale_filter.valueBlank;
                    } else {
                        f = x.name.toString();
                    }
                    if (y.name == null) {
                        s = locale_filter.valueBlank;
                    } else {
                        s = y.name.toString();
                    }
                    if (isdatetime(f) && isdatetime(s)) {
                        return diff(f, s);
                    }
                } else {
                    f = parseFloat(dataposition[x.orderby].result);
                    s = parseFloat(dataposition[y.orderby].result);
                }
                if (!isNaN(f) && !isNaN(s)) {
                    return numeral(s).value() - numeral(f).value();
                } else if (isNaN(f) && isNaN(s)) {
                    return s.localeCompare(f);
                } else if (isNaN(f)) {
                    return -1;
                } else if (isNaN(s)) {
                    return 1;
                }
            };
            if (isAsc) {
                return childrens.sort(a);
            } else {
                return childrens.sort(d);
            }
        },
        generategroupaddstatic: function (arr, name) {
            let stasticarr = [];
            const _locale = locale();
            const locale_pivotTable = _locale.pivotTable;
            for (let a = 0; a < arr[0].length; a++) {
                if (a == 0) {
                    if (name == locale_pivotTable.valueSum) {
                        stasticarr.push(name);
                    } else {
                        stasticarr.push({
                            'name': name,
                            'issum': true
                        });
                    }
                } else {
                    stasticarr.push('');
                }
            }
            return stasticarr;
        },
        generategrouparraymain: function (group, config) {
            let _this = this;    //生成数组
            //生成数组
            let ret = [];
            for (let i = 0; i < group.length; i++) {
                let name = group[i].name;
                let arr = _this.generategrouparray(group[i].children, config, 1);
                if (config[0].stastic == '1' || config[0].stastic == null) {
                    arr.push(_this.generategroupaddstatic(arr, name));
                }
                ret = ret.concat(arr);
            }
            return ret;
        },
        generategrouparray: function (group, config, level) {
            let _this = this;
            let ret = [];
            for (let i = 0; i < group.length; i++) {
                let name = group[i].name;
                let arr;
                if (group[i].children == 0 || group[i].children.length == 0) {
                    arr = [name];
                    ret.push(arr);
                } else {
                    arr = _this.generategrouparray(group[i].children, config, level + 1);
                    for (let a = 0; a < arr.length; a++) {
                        arr[a].unshift(name);
                    }
                    if (config[level].stastic == '1' || config[level].stastic == null) {
                        arr.push(_this.generategroupaddstatic(arr, name));
                    }
                    ret = ret.concat(arr);
                }
            }
            return ret;
        },
        addStatisticsData: function (dataposition, valueobj, indicator, d_value) {
            if (dataposition[indicator] == null) {
                dataposition[indicator] = {
                    'data': [],
                    'count': 0,
                    'max': -Infinity,
                    'min': Infinity,
                    'counta': 0,
                    'countunique': 0,
                    'countuniquedata': {},
                    'sum': 0,
                    'digitaldata': [],
                    'sumtype': valueobj.sumtype,
                    'index': valueobj.index,
                    'name': valueobj.fullname,
                    'acc': 0
                };
            }
            if (isdatatypemulti(d_value)['num'] === true) {
                let num = numFormat(d_value);
                dataposition[indicator]['digitaldata'].push(num);
                dataposition[indicator]['count'] += 1;
                dataposition[indicator]['sum'] += num;
                if (num > dataposition[indicator]['max']) {
                    dataposition[indicator]['max'] = num;
                }
                if (num < dataposition[indicator]['min']) {
                    dataposition[indicator]['min'] = num;
                }
                let newAcc = numfloatlen(num);
                if (newAcc > dataposition[indicator]['acc']) {
                    dataposition[indicator]['acc'] = newAcc;
                }
            }
            if (d_value != '') {
                dataposition[indicator]['data'].push(d_value);
                dataposition[indicator]['counta'] += 1;
                if (!(d_value in dataposition[indicator]['countuniquedata'])) {
                    dataposition[indicator]['countuniquedata'][d_value] = 1;
                    dataposition[indicator]['countunique'] += 1;
                }
            }
        },
        dataHandler: function (column, row, values, showType, celldata) {
            //column:[{"index":1, name:"列1", "order":"asc", "orderby":"self/0/1/2", "stastic":"0/1"}]
            //row:[{"index":1, name:"列3", "order":"asc", "orderby":"self/0/1/2", "stastic":"0/1"}]
            //values:[{"index":1, "sumtype":"SUM/COUNT/COUNTA/COUNTUNIQUE/AVERAGE/MAX/MIN/MEDIAN/PRODUCT/STDEV/STDEVP/let/VARP", "name":"求和:fyc"}]
            let _this = this;
            const _locale = locale();
            const locale_filter = _locale.filter;
            const locale_pivotTable = _locale.pivotTable;
            if (showType == null) {
                showType = 'column';
            }
            if (column.length == 0 && row.length == 0 && values.length == 0 || celldata.length == 0) {
                _this.pivotDatas = [];
                return [];
            }    //生成透视表值及定位
            //生成透视表值及定位
            let dataposition = {}, data = celldata, datarowtitle = [], datarowtitlegroup = [], datarowposition = {}, datarowposition_i = 0, datacoltitle = [], datacoltitlegroup = [], datacolposition = {}, datacolposition_i = 0;
            for (let i = 1; i < data.length; i++) {
                let d = data[i];
                let groupbyrowtxt = '', groupbycoltxt = '', rowtxt = '', rowtitle = [], rowtitlename = [], coltxt = '', coltitle = [], coltitlename = [];    //["四川", "成都", "邛崃"] 转换为 ["四川", "四川成都", "四川成都邛崃"]
                //["四川", "成都", "邛崃"] 转换为 ["四川", "四川成都", "四川成都邛崃"]
                rowtitlename = _this.getnameArray(d, row);
                coltitlename = _this.getnameArray(d, column);
                rowtitle = _this.getComposeArray(rowtitlename);
                coltitle = _this.getComposeArray(coltitlename);
                if (rowtitle.length > 0) {
                    rowtitle.unshift(locale_pivotTable.valueSum);
                }
                if (coltitle.length > 0) {
                    coltitle.unshift(locale_pivotTable.valueSum);
                }
                let curentLevelobj_row = datarowposition, curentLevelarr_row = datarowtitlegroup;
                for (let r = 0; r < rowtitle.length; r++) {
                    let item = rowtitle[r], name = r == 0 ? locale_pivotTable.valueSum : rowtitlename[r - 1];    //修改
                    //修改
                    if (curentLevelobj_row[r.toString()] != null && curentLevelobj_row[r.toString()][item] != null) {
                        //修改
                        curentLevelarr_row = curentLevelarr_row[curentLevelobj_row[r.toString()][item]].children;
                    } else {
                        let orderby = r == 0 ? 'self' : row[r - 1].orderby == 'self' || row[r - 1].orderby == null ? item : showType == 'column' ? item + values[parseInt(row[r - 1].orderby)].fullname : item + locale_pivotTable.valueSum;
                        if (name == null) {
                            name = locale_filter.valueBlank;
                        }
                        curentLevelarr_row.push({
                            'name': name,
                            'fullname': item,
                            'index': r,
                            'orderby': orderby,
                            'children': []
                        });
                        if (curentLevelobj_row[r.toString()] == null) {
                            curentLevelobj_row[r.toString()] = {};
                        }
                        if (curentLevelobj_row[r.toString()][item] == null) {
                            curentLevelobj_row[r.toString()][item] = curentLevelarr_row.length - 1;
                        }
                        curentLevelarr_row = curentLevelarr_row[curentLevelarr_row.length - 1].children;
                    }
                }
                let curentLevelobj_col = datacolposition, curentLevelarr_col = datacoltitlegroup;
                for (let r = 0; r < coltitle.length; r++) {
                    let item = coltitle[r], name = r == 0 ? locale_pivotTable.valueSum : coltitlename[r - 1];
                    if (curentLevelobj_col[r.toString()] != null && curentLevelobj_col[r.toString()][item] != null) {
                        curentLevelarr_col = curentLevelarr_col[curentLevelobj_col[r.toString()][item]].children;
                    } else {
                        let orderby = r == 0 ? 'self' : column[r - 1].orderby == 'self' || column[r - 1].orderby == null ? item : showType == 'column' ? locale_pivotTable.valueSum + item : values[parseInt(column[r - 1].orderby)].fullname + item;
                        if (name == null) {
                            name = locale_filter.valueBlank;
                        }
                        curentLevelarr_col.push({
                            'name': name,
                            'fullname': item,
                            'index': r,
                            'orderby': orderby,
                            'children': []
                        });
                        if (curentLevelobj_col[r.toString()] == null) {
                            curentLevelobj_col[r.toString()] = {};
                        }
                        if (curentLevelobj_col[r.toString()][item] == null) {
                            curentLevelobj_col[r.toString()][item] = curentLevelarr_col.length - 1;
                        }
                        curentLevelarr_col = curentLevelarr_col[curentLevelarr_col.length - 1].children;
                    }
                }
                let v_str = '';
                for (let v = 0; v < values.length; v++) {
                    let d_value = getcellvalue(values[v].index, null, d);
                    let coltitle_c = [].concat(coltitle), rowtitle_c = [].concat(rowtitle);
                    if (showType == 'column') {
                        if (coltitle_c.length > 0) {
                            coltitle_c.push('');
                            coltitle_c = coltitle_c.join(values[v].fullname + '|||').split('|||').slice(0, coltitle_c.length - 1);
                        } else {
                            coltitle_c.push(values[v].fullname);
                        }
                    } else {
                        if (rowtitle_c.length > 0) {
                            rowtitle_c.push('');
                            rowtitle_c = rowtitle_c.join(values[v].fullname + '|||').split('|||').slice(0, rowtitle_c.length - 1);
                        } else {
                            rowtitle_c.push(values[v].fullname);
                        }
                    }
                    if (coltitle_c.length == 0) {
                        coltitle_c.push('');
                    }
                    if (rowtitle_c.length == 0) {
                        rowtitle_c.push('');
                    }
                    for (let r = 0; r < rowtitle_c.length; r++) {
                        for (let c = 0; c < coltitle_c.length; c++) {
                            let indicator = rowtitle_c[r] + coltitle_c[c];
                            _this.addStatisticsData(dataposition, values[v], indicator, d_value);
                        }
                    }
                }
            }    //计算值列
                 //SUM/COUNT/COUNTA/COUNTUNIQUE/AVERAGE/MAX/MIN/MEDIAN/PRODUCT/STDEV/STDEVP/let/VARP
            //计算值列
            //SUM/COUNT/COUNTA/COUNTUNIQUE/AVERAGE/MAX/MIN/MEDIAN/PRODUCT/STDEV/STDEVP/let/VARP
            for (let indicator in dataposition) {
                let json = dataposition[indicator];
                if (json.sumtype == 'SUM') {
                    json.result = json.sum;
                } else if (json.sumtype == 'COUNT') {
                    json.result = json.count;
                } else if (json.sumtype == 'COUNTA') {
                    json.result = json.counta;
                } else if (json.sumtype == 'COUNTUNIQUE') {
                    json.result = json.countunique;
                } else if (json.sumtype == 'AVERAGE') {
                    json.result = numFormat(json.sum / json.count);
                } else if (json.sumtype == 'MAX') {
                    json.result = json.max;
                } else if (json.sumtype == 'MIN') {
                    json.result = json.min;
                } else if (json.sumtype == 'MEDIAN') {
                    let numArr = json.digitaldata.sort(function (a, b) {
                        return a - b;
                    });
                    let numLen = numArr.length;
                    let numindex = parseInt(numLen / 2);
                    if (numLen % 2 == 0) {
                        json.result = (numArr[numindex - 1] + numArr[numindex]) / 2;
                    } else {
                        json.result = numArr[numindex];
                    }
                } else if (json.sumtype == 'PRODUCT') {
                    json.result = new Function('return ' + json.digitaldata.join('*'))();
                } else if (json.sumtype == 'STDEV') {
                    let mean = json.sum / json.count;
                    json.result = analysis.STDEV(mean, json.digitaldata);
                } else if (json.sumtype == 'STDEVP') {
                    let mean = json.sum / json.count;
                    json.result = analysis.STDEVP(mean, json.digitaldata);
                } else if (json.sumtype == 'let') {
                    let mean = json.sum / json.count;
                    json.result = analysis.let(mean, json.digitaldata);
                } else if (json.sumtype == 'VARP') {
                    let mean = json.sum / json.count;
                    json.result = analysis.VARP(mean, json.digitaldata);
                }
                let newAcc = numfloatlen(json.result);
                if (newAcc > json.acc) {
                    json.acc = newAcc;
                }
                json.result = numFormat(json.result, json.acc);
            }
            datarowtitle = _this.getTitleFromGroup(datarowtitlegroup, row, dataposition);
            datacoltitle = _this.getTitleFromGroup(datacoltitlegroup, column, dataposition);    //加入值到列/行形成新的表头
            //加入值到列/行形成新的表头
            if (showType == 'column') {
                if (datacoltitle.length > 0 && datacoltitle[0].length > 0) {
                    datacoltitle = _this.addValuesToTitle(datacoltitle, values);
                } else {
                    for (let v = 0; v < values.length; v++) {
                        datacoltitle.push([values[v].fullname]);
                    }
                }
            } else {
                if (datarowtitle.length > 0 && datarowtitle[0].length > 0) {
                    datarowtitle = _this.addValuesToTitle(datarowtitle, values);
                } else {
                    for (let v = 0; v < values.length; v++) {
                        datarowtitle.push([values[v].fullname]);
                    }
                }
            }
            let datacoltitle_index = datacoltitle;
            datacoltitle = luckysheetArray.transpose(datacoltitle, false);
            let valuenslen = values.length == 0 ? 0 : 1;
            let rowLen = (datacoltitle.length == 0 ? valuenslen : datacoltitle.length) + (datarowtitle.length == 0 ? valuenslen : datarowtitle.length), colLen = (datacoltitle.length == 0 ? valuenslen : datacoltitle[0].length) + (datarowtitle.length == 0 ? valuenslen : datarowtitle[0].length);
            let rowOver = datacoltitle.length, colOver = datarowtitle.length == 0 ? 0 : datarowtitle[0].length;
            let retdata = [];
            for (let r = 0; r < rowLen; r++) {
                retdata[r] = new Array(colLen);
                for (let c = 0; c < colLen; c++) {
                    let drt = datarowtitle[r - rowOver];
                    if (r < rowOver && c < colOver) {
                        //空白列头
                        retdata[r][c] = '';
                    } else if (r < rowOver && c >= colOver) {
                        //列标题
                        if (datacoltitle[r] != null) {
                            if (getObjType(datacoltitle[r][c - colOver]) == 'object') {
                                retdata[r][c] = datacoltitle[r][c - colOver].name + locale_pivotTable.valueSum;
                            } else {
                                retdata[r][c] = datacoltitle[r][c - colOver];
                            }
                        } else {
                            retdata[r][c] = '';
                        }
                    } else if (r >= rowOver && c < colOver) {
                        //行标题
                        if (drt != null) {
                            if (getObjType(drt[c]) == 'object') {
                                retdata[r][c] = drt[c].name + locale_pivotTable.valueSum;
                            } else {
                                retdata[r][c] = drt[c];
                            }
                        } else {
                            retdata[r][c] = '';
                        }
                    } else {
                        //单元格内容
                        let prefix = '';
                        if (drt != null) {
                            if (!(drt instanceof Array) || drt.length == 1) {
                                if (drt instanceof Array) {
                                    prefix = drt[0];
                                } else {
                                    prefix = drt;
                                }
                            } else {
                                for (let x = 0; x < drt.length; x++) {
                                    if (getObjType(drt[x]) == 'object') {
                                        prefix += drt[x].name;
                                    } else {
                                        prefix += drt[x];
                                    }
                                }
                            }
                        }
                        let suffix = '';
                        let dct = datacoltitle_index[c - colOver];
                        if (dct != null) {
                            if (!(dct instanceof Array) || dct.length == 1) {
                                if (dct instanceof Array) {
                                    suffix = dct[0];
                                } else {
                                    suffix = dct;
                                }
                            } else {
                                for (let x = 0; x < dct.length; x++) {
                                    if (getObjType(dct[x]) == 'object') {
                                        suffix += dct[x].name;
                                    } else {
                                        suffix += dct[x];
                                    }
                                }
                            }
                        }
                        let indicator = prefix;
                        if (prefix != '' && suffix != '') {
                            indicator = prefix + suffix;
                        } else if (prefix == '') {
                            indicator = suffix;
                        }
                        if (dataposition[indicator] == null) {
                            retdata[r][c] = '';
                        } else {
                            retdata[r][c] = dataposition[indicator].result;
                        }
                    }
                }
            }
            if (values.length == 1 && column.length > 0 && row.length > 0) {
                retdata[0][0] = values[0].fullname;
                retdata.splice(column.length, 1);
            } else if (values.length == 1 && column.length > 0) {
                // 0: (6) ["English", "foreign language", "mathematics", "science", "Sum", undefined]
                // 1: (6) ["CountA:score", "CountA:score", "CountA:score", "CountA:score", "CountA:score", undefined]
                // 2: (6) [3, 3, 3, 3, 12, ""]
                //The above format does not meet viewing habits,Process retdata into the correct format
                let titleRow = retdata.splice(column.length, 1);
                let newRetdata = [];
                for (let r = 0; r < retdata.length; r++) {
                    let row = [];
                    if (r == retdata.length - 1) {
                        row.push(titleRow[0][0]);
                    } else {
                        row.push('');
                    }
                    for (let c = 0; c < retdata[r].length - 1; c++) {
                        row.push(retdata[r][c]);
                    }
                    newRetdata.push(row);
                }
                retdata = newRetdata;
            }
            _this.pivotDatas = retdata;
            return retdata;
        }
    };
    return pivotTable;
});
define([
    '../utils/util',
    './get',
    './set',
    './validate',
    './datecontroll',
    './getRowlen',
    './getdata',
    './setdata',
    './format',
    './location',
    './luckysheetConfigsetting',    
    '../function/func',
    '../store',
    '../locale/locale',
    './json'
], function (m_util, m_get, m_set,  m_validate, m_datecontroll, m_getRowlen, m_getdata, m_setdata, m_format,  m_location,  luckysheetConfigsetting, m_func, Store, locale, json) {
    'use strict';
    const {replaceHtml, getObjType, chatatABC, ABCatNum, luckysheetfontformat} = m_util;
    const {getSheetIndex, getRangetxt, getluckysheetfile} = m_get;
    const {setluckysheetfile} = m_set;
    const {isRealNum, isRealNull, valueIsError} = m_validate;
    const isEditMode = luckysheetConfigsetting.isEditMode;
    const {isdatetime, isdatatype} = m_datecontroll;
    const {getCellTextSplitArr, getCellTextInfo} = m_getRowlen;
    const {getcellvalue, getcellFormula, getInlineStringNoStyle, getOrigincell} = m_getdata;
    const {setcellvalue} = m_setdata;
    const {genarate, valueShowEs} = m_format;
    const {rowLocation, colLocation, colLocationByIndex, mouseposition} = m_location;
    const {luckysheet_compareWith, luckysheet_getarraydata, luckysheet_getcelldata, luckysheet_parseData, luckysheet_getValue, luckysheet_indirect_check, luckysheet_indirect_check_return, luckysheet_offset_check, luckysheet_calcADPMM, luckysheet_getSpecialReference} = m_func;
    const luckysheetformula = {
        error: {
            v: '#VALUE!',
            //错误的参数或运算符
            n: '#NAME?',
            //公式名称错误
            na: '#N/A',
            //函数或公式中没有可用数值
            r: '#REF!',
            //删除了由其他公式引用的单元格
            d: '#DIV/0!',
            //除数是0或空单元格
            nm: '#NUM!',
            //当公式或函数中某个数字有问题时
            nl: '#NULL!',
            //交叉运算符（空格）使用不正确
            sp: '#SPILL!'    //数组范围有其它值
        },
        //数组范围有其它值
        errorInfo: function (err) {
            return err;
        },
        errorParamCheck: function (thisp, data, i) {
            let type, require;
            let _locale = locale();
            let locale_formulaMore = _locale.formulaMore;
            if (i < thisp.length) {
                type = thisp[i].type;
                require = thisp[i].require;
            } else {
                type = thisp[thisp.length - 1].type;
                require = thisp[thisp.length - 1].require;
            }
            if (require == 'o' && (data == null || data == '')) {
                return [
                    true,
                    locale_formulaMore.tipSuccessText
                ];
            }
            if (type.indexOf('all') > -1) {
                return [
                    true,
                    locale_formulaMore.tipSuccessText
                ];
            } else {
                if (type.indexOf('range') > -1 && (getObjType(data) == 'object' || getObjType(data) == 'array')) {
                    return [
                        true,
                        locale_formulaMore.tipSuccessText
                    ];
                }
                if (type.indexOf('number') > -1 && (isRealNum(data) || getObjType(data) == 'boolean')) {
                    return [
                        true,
                        locale_formulaMore.tipSuccessText
                    ];
                }
                if (type.indexOf('string') > -1 && getObjType(data) == 'string') {
                    return [
                        true,
                        locale_formulaMore.tipSuccessText
                    ];
                }
                if (type.indexOf('date') > -1 && isdatetime(data)) {
                    return [
                        true,
                        locale_formulaMore.tipSuccessText
                    ];
                }
                return [
                    false,
                    locale_formulaMore.tipParamErrorText
                ];
            }
        },
        getPureValueByData: function (data) {
            if (data.length == 0) {
                return [];
            }
            let output = [];
            if (getObjType(data) == 'array') {
                if (getObjType(data[0]) == 'array') {
                    for (let r = 0; r < data.length; r++) {
                        let row = [];
                        for (let c = 0; c < data[0].length; c++) {
                            let cell = data[r][c];
                            if (getObjType(cell) == 'object') {
                                row.push(cell.v);
                            } else {
                                row.push(cell);
                            }
                        }
                        output.push(row);
                    }
                } else {
                    for (let i = 0; i < data.length; i++) {
                        let cell = data[i];
                        if (getObjType(cell) == 'object') {
                            output.push(cell.v);
                        } else {
                            output.push(cell);
                        }
                    }
                }
            } else {
                let cell = data;
                if (getObjType(cell) == 'object') {
                    output.push(cell.v);
                } else {
                    output.push(cell);
                }
            }
            return output;
        },
        //sparklines添加
        readCellDataToOneArray: function (rangeValue) {
            let _this = this;
            if (rangeValue == null) {
                return [];
            }
            if (getObjType(rangeValue) != 'object') {
                return [rangeValue];
            }
            let dataformat = [];
            let data = [];
            if (rangeValue != null && rangeValue.data != null) {
                data = rangeValue.data;
            } else if (rangeValue != null && !isRealNull(rangeValue.v)) {
                return [rangeValue.v];
            } else {
                return [];
            }    //适配excel的动态数组格式，{1，2，3，4，5}或者{{1，2，3}，{4，5，6}，{7，8，9}}
            //适配excel的动态数组格式，{1，2，3，4，5}或者{{1，2，3}，{4，5，6}，{7，8，9}}
            if (getObjType(data) == 'array') {
                data = _this.getPureValueByData(data);
            } else if (getObjType(data) == 'object') {
                data = data.v;
                return [data];
            } else {
                if (/\{.*?\}/.test(data)) {
                    data = data.replace(/\{/g, '[').replace(/\}/g, ']');
                }
                data = new Function('return ' + data)();
            }    //把二维数组转换为一维数组，sparklines要求数据格式为一维数组
                 //let dataformat = [];
            //把二维数组转换为一维数组，sparklines要求数据格式为一维数组
            //let dataformat = [];
            if (getObjType(data[0]) == 'array') {
                for (let i = 0; i < data.length; i++) {
                    dataformat = dataformat.concat(data[i]);
                }
            } else {
                dataformat = data;
            }
            return dataformat;
        },
        //sparklines添加
        //获得函数里某个参数的值，使用此函数需要在函数中执行luckysheet_getValue方法
        getValueByFuncData: function (value, arg) {
            if (value == null) {
                return null;
            }
            let _this = this;
            if (getObjType(value) == 'array') {
                if (arg == 'avg') {
                    return luckysheet_function.AVERAGE.f.apply(luckysheet_function.AVERAGE, value);
                } else if (arg == 'sum') {
                    return luckysheet_function.SUM.f.apply(luckysheet_function.SUM, value);
                } else {
                    if (getObjType(value[0]) == 'object') {
                        return luckysheet.mask.getValueByFormat(value[0]);
                    } else {
                        return value[0];
                    }
                }
            } else if (getObjType(value) == 'object') {
                return luckysheet.mask.getValueByFormat(value);
            } else {
                return value;
            }
        },
        //sparklines添加
        sparklinesColorMap: function (args, len) {
            let _this = this;
            let colorLists = null;
            if (len == null) {
                len = 5;
            }
            let index = 0;
            if (args.length > len) {
                for (let i = len; i < args.length; i++) {
                    let colorMap = args[i];
                    let colorListArray = _this.readCellDataToOneArray(colorMap);
                    for (let a = 0; a < colorListArray.length; a++) {
                        let ca = colorListArray[a];
                        if (ca.indexOf(':') > -1) {
                            if (!colorLists) {
                                colorLists = {};
                            }
                            let calist = ca.split(':');
                            if (calist.length == 2) {
                                colorLists[calist[0]] = calist[1];
                            } else if (calist.length > 1) {
                                colorLists[calist[0] + ':' + calist[1]] = calist[2];
                            }
                        } else {
                            if (!colorLists) {
                                colorLists = [];
                            }
                            colorLists.push(ca);
                        }
                    }
                    index++;
                }
            }
            return colorLists;
        },
        //sparklines添加
        colorList: [
            '#2ec7c9',
            '#fc5c5c',
            '#5ab1ef',
            '#ffb980',
            '#d87a80',
            '#8d98b3',
            '#e5cf0d',
            '#97b552',
            '#95706d',
            '#dc69aa',
            '#07a2a4',
            '#9a7fd1',
            '#588dd5',
            '#f5994e',
            '#c05050',
            '#59678c',
            '#c9ab00',
            '#7eb00a',
            '#6f5553',
            '#c14089'
        ],
        classlist: {
            'province': {
                11: '北京',
                12: '天津',
                13: '河北',
                14: '山西',
                15: '内蒙古',
                21: '辽宁',
                22: '吉林',
                23: '黑龙江',
                31: '上海',
                32: '江苏',
                33: '浙江',
                34: '安徽',
                35: '福建',
                36: '江西',
                37: '山东',
                41: '河南',
                42: '湖北',
                43: '湖南',
                44: '广东',
                45: '广西',
                46: '海南',
                50: '重庆',
                51: '四川',
                52: '贵州',
                53: '云南',
                54: '西藏',
                61: '陕西',
                62: '甘肃',
                63: '青海',
                64: '宁夏',
                65: '新疆',
                71: '台湾',
                81: '香港',
                82: '澳门',
                91: '国外'
            }
        },
        //获得某个单元格或区域的偏移一定距离后的单元格( Sheet1!B6:C8 格式)
        cellOffset: function (range, rows, cols, height, width) {
            // 参数：range or cell , rows,cols,height,width
            let startCell = range.startCell;
            let rowl = range.rowl;
            let coll = range.coll;
            let startCellRow = parseInt(startCell.replace(/[^0-9]/g, ''));
            let startCellCol = ABCatNum(startCell.replace(/[^A-Za-z]/g, ''));
            let row = [], col = [], offsetRange;
            row[0] = startCellRow + rows;
            col[0] = startCellCol + cols;
            row[1] = row[0] + height - 1;
            col[1] = col[0] + width - 1;
            col[0] = chatatABC(col[0]);
            col[1] = chatatABC(col[1]);
            let cellF = col[0] + row[0];
            let cellL = col[1] + row[1];
            if (cellF == cellL) {
                offsetRange = range.sheetName + '!' + cellF;
            } else {
                offsetRange = range.sheetName + '!' + cellF + ':' + cellL;
            }
            return offsetRange;
        },
        parseDatetoNum: function (date) {
            //函数中获取到时间格式或者数字形式统一转化为数字进行运算
            let _this = this;
            if (typeof date == 'object' && typeof date.v == 'number') {
                date = date.v;
            } else if (isdatatype(date) == 'num') {
                date = parseFloat(date);
            } else if (isdatatype(date) == 'date') {
                date = genarate(date)[2];
            } else {
                return _this.error.v;
            }
            return date;
        },
        //获取一维数组
        getRangeArray: function (range) {
            let rangeNow = [];
            let fmt = 'General';
            if (range.length == 1) {
                //一行
                for (let c = 0; c < range[0].length; c++) {
                    if (range[0][c] != null && range[0][c].v) {
                        rangeNow.push(range[0][c].v);
                        let f = range[0][c].ct.fa;
                        fmt = fmt == 'General' ? f : fmt;
                    } else {
                        //若单元格为null或为空，此处推入null（待考虑是否使用"null"）
                        rangeNow.push(null);
                    }
                }
            } else if (range[0].length == 1) {
                //一列
                for (let r = 0; r < range.length; r++) {
                    if (range[r][0] != null && range[r][0].v) {
                        rangeNow.push(range[r][0].v);
                        let f = range[r][0].ct.fa;
                        fmt = fmt == 'General' ? f : fmt;
                    } else {
                        rangeNow.push(null);
                    }
                }
            } else {
                for (let r = 0; r < range.length; r++) {
                    for (let c = 0; c < range[r].length; c++) {
                        if (range[r][c] != null && range[r][c].v) {
                            rangeNow.push(range[r][c].v);
                            let f = range[r][c].ct.fa;
                            fmt = fmt == 'General' ? f : fmt;
                        } else {
                            rangeNow.push(null);
                        }
                    }
                }
            }
            range = rangeNow;
            return [
                range,
                fmt
            ];
        },
        //获取二维数组：qksheet格式[[{v,m,ct}] ==> [1]
        getRangeArrayTwo: function (range) {
            let data = $.extend(true, [], range);
            if (data.length == 1) {
                //一行
                for (let c = 0; c < data[0].length; c++) {
                    if (data[0][c] instanceof Object) {
                        if (data[0][c] != null && data[0][c] instanceof Object && !!data[0][c].m) {
                            data[0][c] = data[0][c].m;
                        } else {
                            if (data[0][c] != null && data[0][c] instanceof Object && !!data[0][c].v) {
                                data[0][c] = data[0][c].v;
                            } else {
                                data[0][c] = null;
                            }
                        }
                    }
                }
            } else if (data[0].length == 1) {
                //一列
                for (let r = 0; r < data.length; r++) {
                    if (data[r][0] instanceof Object) {
                        if (data[r][0] != null && data[r][0] instanceof Object && !!data[r][0].m) {
                            data[r][0] = data[r][0].m;
                        } else {
                            if (data[r][0] != null && data[r][0] instanceof Object && !!data[r][0].v) {
                                data[r][0] = data[r][0].v;
                            } else {
                                data[r][0] = null;
                            }
                        }
                    }
                }
            } else {
                for (let r = 0; r < data.length; r++) {
                    for (let c = 0; c < data[r].length; c++) {
                        if (data[r][c] instanceof Object) {
                            if (data[r][c] != null && data[r][c] instanceof Object && !!data[r][c].m) {
                                data[r][c] = data[r][c].m;
                            } else {
                                if (data[r][c] != null && data[r][c] instanceof Object && !!data[r][c].v) {
                                    data[r][c] = data[r][c].v;
                                } else {
                                    data[r][c] = null;
                                }
                            }
                        }
                    }
                }
            }
            return data;
        },
        isWildcard: function (a, b) {
            //正则匹配通配符: * ? ~* ~?,a目标参数，b通配符
            let _this = this;
            a = a.toString();
            b = b.toString();
            if (_this.isCompareOperator(b).flag) {
                b = _this.isCompareOperator(b).num;
            }
            let str = '';
            for (let i = 0; i < b.length; i++) {
                let v = b.charAt(i);
                if (v == '*') {
                    str += '.*';
                } else if (v == '?') {
                    str += '.';
                } else if (v == '~') {
                    if (b.charAt(i + 1) == '*') {
                        str += '\\*';
                        i++;
                    } else if (b.charAt(i + 1) == '?') {
                        str += '\\?';
                        i++;
                    } else {
                        str += '~';
                    }
                } else {
                    str += v;
                }
            }
            let reg = new RegExp('^' + str + '$', 'g');
            return !!a.match(reg);
        },
        isCompareOperator: function (str) {
            //判断前一个或者两个字符是否是比较运算符
            str = str.toString();
            let ope = '';    //存放比较运算符
            //存放比较运算符
            let num = '';    //截取比较运算符之后的数字用于实际比较
            //截取比较运算符之后的数字用于实际比较
            let strOne = str.substr(0, 1);
            let strTwo = str.substr(1, 1);
            let flag = false;
            let ret;
            if (strOne == '>') {
                if (strTwo == '=') {
                    ope = str.substr(0, 2);
                    num = str.substr(2);
                    flag = true;
                } else if (strTwo != '=') {
                    ope = str.substr(0, 1);
                    num = str.substr(1);
                    flag = true;
                }
            } else if (strOne == '<') {
                if (strTwo == '=' || strTwo == '>') {
                    ope = str.substr(0, 2);
                    num = str.substr(2);
                    flag = true;
                } else if (strTwo != '=' && strTwo != '>') {
                    ope = str.substr(0, 1);
                    num = str.substr(1);
                    flag = true;
                }
            } else if (strOne == '=' && strTwo != '=') {
                ope = str.substr(0, 1);
                num = str.substr(1);
                flag = true;
            }
            ret = {
                'flag': flag,
                'ope': ope,
                'num': num
            };
            return ret;
        },
        acompareb: function (a, b) {
            //a 与 b比较，b可为含比较符，通配符
            let _this = this;
            let flag = false;
            if (isRealNum(b)) {
                flag = luckysheet_compareWith(a, '==', b);
            } else if (typeof b == 'string') {
                //条件输入字符串，如：">233"
                if (b.indexOf('*') != -1 || b.indexOf('?') != -1) {
                    // 正则匹配：输入通配符："黑*","白?",以及"白?黑*~*"
                    //通配符函数
                    return _this.isWildcard(a, b);
                } else if (_this.isCompareOperator(b).flag) {
                    //"黑糖"
                    let ope = _this.isCompareOperator(b).ope;
                    let num = _this.isCompareOperator(b).num;
                    flag = luckysheet_compareWith(a, ope, num);
                } else {
                    flag = luckysheet_compareWith(a, '==', b);
                }
            }
            return flag;
        },
        compareParams: function (fp, sp, sym) {
            //比较两个字符串或者数字的大小，支持比较对象,暂不支持数组
            let flag = false;    //判断a和b的数据类型
            //判断a和b的数据类型
            let classNameA = toString.call(fp), classNameB = toString.call(sp);
            if (sym == '>' && fp > sp) {
                flag = true;
            } else if (sym == '>=' && fp >= sp) {
                flag = true;
            } else if (sym == '<' && fp < sp) {
                flag = true;
            } else if (sym == '<=' && fp <= sp) {
                flag = true;
            } else if (sym == '=' && fp == sp) {
                flag = true;
            } else if (sym == '<>' && fp != sp) {
                flag = true;
            }    //对象类型比较相等
            //对象类型比较相等
            if (classNameA == '[object Object]' && classNameB == '[object Object]') {
                //获取a和b的属性长度
                let propsA = Object.getOwnPropertyNames(fp), propsB = Object.getOwnPropertyNames(sp);
                if (propsA.length != propsB.length) {
                    return false;
                }
                for (let i = 0; i < propsA.length; i++) {
                    let propName = propsA[i];    //如果对应属性对应值不相等，则返回false
                    //如果对应属性对应值不相等，则返回false
                    if (fp[propName] !== sp[propName]) {
                        return false;
                    }
                }
                return true;
            }    //数组类型
            //数组类型
            if (classNameA == '[object Array]' && classNameB == '[object Array]') {
                if (fp.toString() == sp.toString()) {
                    return true;
                }
                return false;
            }
            return flag;
        },
        parseDecimal: function (num) {
            num = parseFloat(num);
            let d = parseInt(num, 10);
            if (d == 0) {
                return num;
            }
            num = num % d;
            return num;
        },
        getcellrange: function (txt, formulaIndex) {
            if (txt == null || txt.length == 0) {
                return;
            }
            let sheettxt = '', rangetxt = '', sheetIndex = null, sheetdata = null;
            let luckysheetfile = getluckysheetfile();
            if (txt.indexOf('!') > -1) {
                if (txt in this.cellTextToIndexList) {
                    return this.cellTextToIndexList[txt];
                }
                let val = txt.split('!');
                sheettxt = val[0];
                rangetxt = val[1];
                sheettxt = sheettxt.replace(/\\'/g, "'").replace(/''/g, "'");
                if (sheettxt.substr(0, 1) == "'" && sheettxt.substr(sheettxt.length - 1, 1) == "'") {
                    sheettxt = sheettxt.substring(1, sheettxt.length - 1);
                }
                for (let i in luckysheetfile) {
                    if (sheettxt == luckysheetfile[i].name) {
                        sheetIndex = luckysheetfile[i].index;
                        sheetdata = luckysheetfile[i].data;
                        break;
                    }
                }
            } else {
                let i = formulaIndex;
                if (i == null) {
                    i = Store.currentSheetIndex;
                }
                if (txt + '_' + i in this.cellTextToIndexList) {
                    return this.cellTextToIndexList[txt + '_' + i];
                }
                let index = getSheetIndex(i);
                sheettxt = luckysheetfile[index].name;
                sheetIndex = luckysheetfile[index].index;
                sheetdata = Store.flowdata;
                rangetxt = txt;
            }
            if (rangetxt.indexOf(':') == -1) {
                let row = parseInt(rangetxt.replace(/[^0-9]/g, '')) - 1;
                let col = ABCatNum(rangetxt.replace(/[^A-Za-z]/g, ''));
                if (!isNaN(row) && !isNaN(col)) {
                    let item = {
                        'row': [
                            row,
                            row
                        ],
                        'column': [
                            col,
                            col
                        ],
                        'sheetIndex': sheetIndex
                    };
                    this.addToCellIndexList(txt, item);
                    return item;
                } else {
                    return null;
                }
            } else {
                rangetxt = rangetxt.split(':');
                let row = [], col = [];
                row[0] = parseInt(rangetxt[0].replace(/[^0-9]/g, '')) - 1;
                row[1] = parseInt(rangetxt[1].replace(/[^0-9]/g, '')) - 1;
                if (isNaN(row[0])) {
                    row[0] = 0;
                }
                if (isNaN(row[1])) {
                    row[1] = sheetdata.length - 1;
                }
                if (row[0] > row[1]) {
                    return null;
                }
                col[0] = ABCatNum(rangetxt[0].replace(/[^A-Za-z]/g, ''));
                col[1] = ABCatNum(rangetxt[1].replace(/[^A-Za-z]/g, ''));
                if (isNaN(col[0])) {
                    col[0] = 0;
                }
                if (isNaN(col[1])) {
                    col[1] = sheetdata[0].length - 1;
                }
                if (col[0] > col[1]) {
                    return null;
                }
                let item = {
                    'row': row,
                    'column': col,
                    'sheetIndex': sheetIndex
                };
                this.addToCellIndexList(txt, item);
                return item;
            }
        },
       iscellformat: function (txt) {
            let re_abc = /[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ][123456789]/;
        },
        iscelldata: function (txt) {
            //判断是否为单元格格式
            let val = txt.split('!'), rangetxt;
            if (val.length > 1) {
                rangetxt = val[1];
            } else {
                rangetxt = val[0];
            }
            let reg_cell = /^(([a-zA-Z]+)|([$][a-zA-Z]+))(([0-9]+)|([$][0-9]+))$/g;    //增加正则判断单元格为字母+数字的格式：如 A1:B3
            //增加正则判断单元格为字母+数字的格式：如 A1:B3
            let reg_cellRange = /^(((([a-zA-Z]+)|([$][a-zA-Z]+))(([0-9]+)|([$][0-9]+)))|((([a-zA-Z]+)|([$][a-zA-Z]+))))$/g;    //增加正则判断单元格为字母+数字或字母的格式：如 A1:B3，A:A
            //增加正则判断单元格为字母+数字或字母的格式：如 A1:B3，A:A
            if (rangetxt.indexOf(':') == -1) {
                let row = parseInt(rangetxt.replace(/[^0-9]/g, '')) - 1;
                let col = ABCatNum(rangetxt.replace(/[^A-Za-z]/g, ''));
                if (!isNaN(row) && !isNaN(col) && rangetxt.toString().match(reg_cell)) {
                    return true;
                } else if (!isNaN(row)) {
                    return false;
                } else if (!isNaN(col)) {
                    return false;
                } else {
                    return false;
                }
            } else {
                reg_cellRange = /^(((([a-zA-Z]+)|([$][a-zA-Z]+))(([0-9]+)|([$][0-9]+)))|((([a-zA-Z]+)|([$][a-zA-Z]+)))|((([0-9]+)|([$][0-9]+s))))$/g;
                rangetxt = rangetxt.split(':');
                let row = [], col = [];
                row[0] = parseInt(rangetxt[0].replace(/[^0-9]/g, '')) - 1;
                row[1] = parseInt(rangetxt[1].replace(/[^0-9]/g, '')) - 1;
                if (row[0] > row[1]) {
                    return false;
                }
                col[0] = ABCatNum(rangetxt[0].replace(/[^A-Za-z]/g, ''));
                col[1] = ABCatNum(rangetxt[1].replace(/[^A-Za-z]/g, ''));
                if (col[0] > col[1]) {
                    return false;
                }
                if (rangetxt[0].toString().match(reg_cellRange) && rangetxt[1].toString().match(reg_cellRange)) {
                    return true;
                } else {
                    return false;
                }
            }
        },

        getfunctionParam: function (txt) {
            let _this = this;
            if (_this.operatorjson == null) {
                let arr = _this.operator.split('|'), op = {};
                for (let i = 0; i < arr.length; i++) {
                    op[arr[i].toString()] = 1;
                }
                _this.operatorjson = op;
            }
            if (txt.substr(0, 1) == '=') {
                txt = txt.substr(1);
            }
            let funcstack = txt.split('');
            let i = 0, str = '', function_str = '';
            let matchConfig = {
                'bracket': 0,
                'comma': 0,
                'squote': 0,
                'dquote': 0,
                'compare': 0
            };    //bracket 0为运算符括号、1为函数括号
            //bracket 0为运算符括号、1为函数括号
            let fn = null, param = [], bracket = [];
            while (i < funcstack.length) {
                let s = funcstack[i];
                if (s == '(' && matchConfig.dquote == 0) {
                    if (str.length > 0 && bracket.length == 0) {
                        fn = str.toUpperCase();
                        bracket.push(1);
                        str = '';
                    } else if (bracket.length == 0) {
                        //function_str += "(";
                        bracket.push(0);
                        str = '';
                    } else {
                        bracket.push(0);
                        str += s;
                    }
                } else if (s == ')' && matchConfig.dquote == 0) {
                    let bt = bracket.pop();
                    if (bracket.length == 0) {
                        param.push(str);
                        str = '';
                    } else {
                        str += s;
                    }
                } else if (s == '"') {
                    str += '"';
                    if (matchConfig.dquote > 0) {
                        matchConfig.dquote -= 1;
                        str = '';
                    } else {
                        matchConfig.dquote += 1;
                    }
                } else if (s == ',' && matchConfig.dquote == 0) {
                    if (bracket.length <= 1) {
                        param.push(str);
                        str = '';
                    } else {
                        str += ',';
                    }
                } else if (s in _this.operatorjson && matchConfig.dquote == 0) {
                    let s_next = '';
                    if (i + 1 < funcstack.length) {
                        s_next = funcstack[i + 1];
                    }
                    let p = i - 1, s_pre = null;
                    if (p >= 0) {
                        do {
                            s_pre = funcstack[p--];
                        } while (p >= 0 && s_pre == ' ');
                    }
                    if (!/[^0-9]/.test(s_next) && s == '-' && (s_pre == '(' || s_pre == null || s_pre == ',' || s_pre == ' ' || s_pre in _this.operatorjson)) {
                        if (matchConfig.dquote == 0) {
                            str += $.trim(s);
                        } else {
                            str += s;
                        }
                    } else {
                        function_str = '';
                        str = '';
                    }
                } else {
                    if (matchConfig.dquote == 0) {
                        str += $.trim(s);
                    } else {
                        str += s;
                    }
                }
                i++;
            }
            return {
                'fn': fn,
                'param': param
            };
        },
        calPostfixExpression: function (cal) {
            if (cal.length == 0) {
                return '';
            }
            let stack = [];
            for (let i = cal.length - 1; i >= 0; i--) {
                let c = cal[i];
                if (c in this.operatorjson) {
                    let s2 = stack.pop();
                    let s1 = stack.pop();
                    let str = 'luckysheet_compareWith(' + s1 + ",'" + c + "', " + s2 + ')';
                    stack.push(str);
                } else {
                    stack.push(c);
                }
            }
            if (stack.length > 0) {
                return stack[0];
            } else {
                return '';
            }
        },
        checkBracketNum: function (fp) {
            let bra_l = fp.match(/\(/g), bra_r = fp.match(/\)/g), bra_tl_txt = fp.match(/(['"])(?:(?!\1).)*?\1/g), bra_tr_txt = fp.match(/(['"])(?:(?!\1).)*?\1/g);
            let bra_l_len = 0, bra_r_len = 0;
            if (bra_l != null) {
                bra_l_len += bra_l.length;
            }
            if (bra_r != null) {
                bra_r_len += bra_r.length;
            }
            let bra_tl_len = 0, bra_tr_len = 0;
            if (bra_tl_txt != null) {
                for (let i = 0; i < bra_tl_txt.length; i++) {
                    let bra_tl = bra_tl_txt[i].match(/\(/g);
                    if (bra_tl != null) {
                        bra_tl_len += bra_tl.length;
                    }
                }
            }
            if (bra_tr_txt != null) {
                for (let i = 0; i < bra_tr_txt.length; i++) {
                    let bra_tr = bra_tr_txt[i].match(/\)/g);
                    if (bra_tr != null) {
                        bra_tr_len += bra_tr.length;
                    }
                }
            }
            bra_l_len -= bra_tl_len;
            bra_r_len -= bra_tr_len;
            if (bra_l_len != bra_r_len) {
                return false;
            } else {
                return true;
            }
        },
        operatorPriority: {
            '^': 0,
            '%': 1,
            '*': 1,
            '/': 1,
            '+': 2,
            '-': 2
        },
        functionParserExe: function (txt) {
            let _this = this;    // let txt1 = txt.toUpperCase();
                                 // return this.functionParser(txt, function(c){
                                 //     _this.addToCellList(txt, c);
                                 // });
            // let txt1 = txt.toUpperCase();
            // return this.functionParser(txt, function(c){
            //     _this.addToCellList(txt, c);
            // });
            return this.functionParser(txt);
        },
        functionParser: function (txt, cellRangeFunction) {
            let _this = this;
            if (_this.operatorjson == null) {
                let arr = _this.operator.split('|'), op = {};
                for (let i = 0; i < arr.length; i++) {
                    op[arr[i].toString()] = 1;
                }
                _this.operatorjson = op;
            }
            if (txt == null) {
                return '';
            }
            if (txt.substr(0, 2) == '=+') {
                txt = txt.substr(2);
            } else if (txt.substr(0, 1) == '=') {
                txt = txt.substr(1);
            }
            let funcstack = txt.split('');
            let i = 0, str = '', function_str = '';
            let matchConfig = {
                'bracket': 0,
                'comma': 0,
                'squote': 0,
                'dquote': 0,
                'compare': 0,
                'braces': 0
            };    //=(sum(b1:c10)+10)*5-100
                  //=MAX(B1:C10,10)*5-100
                  // =(sum(max(B1:C10,10)*5-100,((1+1)*2+5)/2,10)+count(B1:C10,10*5-100))*5-100
                  //=SUM(MAX(B1:C10,10)*5-100,((1+1)*2+5)/2,10)+COUNT(B1:C10,10*5-100)
                  //=SUM(MAX(B1:C10,10)*5-100,((1+1)*2+5)/2,10)
                  //=SUM(10,((1+1)*2+5)/2,10)
                  //=SUM(MAX(B1:C10,10)*5-100)
                  //=IFERROR(IF(ROW()-ROW($G$3)=1,$F4+$D4,SUM($D1:INDEX($D$4:$D$9,1,1),$F1:INDEX($F$4:$F$9,1,1))), "")
                  //=IFERROR(IF(ROW()-ROW($G$3)=1,$F4+$D4,SUM(INDEX($D$4:$D$9,1,1):$D4,INDEX($F$4:$F$9,1,1):$F4)), "")
                  //=SUM(I$4:OFFSET(I10,0,0))
                  //bracket 0为运算符括号、1为函数括号
            //=(sum(b1:c10)+10)*5-100
            //=MAX(B1:C10,10)*5-100
            // =(sum(max(B1:C10,10)*5-100,((1+1)*2+5)/2,10)+count(B1:C10,10*5-100))*5-100
            //=SUM(MAX(B1:C10,10)*5-100,((1+1)*2+5)/2,10)+COUNT(B1:C10,10*5-100)
            //=SUM(MAX(B1:C10,10)*5-100,((1+1)*2+5)/2,10)
            //=SUM(10,((1+1)*2+5)/2,10)
            //=SUM(MAX(B1:C10,10)*5-100)
            //=IFERROR(IF(ROW()-ROW($G$3)=1,$F4+$D4,SUM($D1:INDEX($D$4:$D$9,1,1),$F1:INDEX($F$4:$F$9,1,1))), "")
            //=IFERROR(IF(ROW()-ROW($G$3)=1,$F4+$D4,SUM(INDEX($D$4:$D$9,1,1):$D4,INDEX($F$4:$F$9,1,1):$F4)), "")
            //=SUM(I$4:OFFSET(I10,0,0))
            //bracket 0为运算符括号、1为函数括号
            let cal1 = [], cal2 = [], bracket = [];
            let firstSQ = -1;
            while (i < funcstack.length) {
                let s = funcstack[i];
                if (s == '(' && matchConfig.squote == 0 && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                    if (str.length > 0 && bracket.length == 0) {
                        str = str.toUpperCase();
                        if (str.indexOf(':') > -1) {
                            let funcArray = str.split(':');
                            function_str += "luckysheet_getSpecialReference(true,'" + $.trim(funcArray[0]).replace(/'/g, "\\'") + "', luckysheet_function." + funcArray[1] + '.f(#lucky#';
                        } else {
                            function_str += 'luckysheet_function.' + str + '.f(';
                        }
                        bracket.push(1);
                        str = '';
                    } else if (bracket.length == 0) {
                        function_str += '(';
                        bracket.push(0);
                        str = '';
                    } else {
                        bracket.push(0);
                        str += s;
                    }
                } else if (s == ')' && matchConfig.squote == 0 && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                    let bt = bracket.pop();
                    if (bracket.length == 0) {
                        let functionS = _this.functionParser(str, cellRangeFunction);
                        if (functionS.indexOf('#lucky#') > -1) {
                            functionS = functionS.replace(/#lucky#/g, '') + ')';
                        }
                        function_str += functionS + ')';
                        str = '';
                    } else {
                        str += s;
                    }
                } else if (s == '{' && matchConfig.squote == 0 && matchConfig.dquote == 0) {
                    str += '{';
                    matchConfig.braces += 1;
                } else if (s == '}' && matchConfig.squote == 0 && matchConfig.dquote == 0) {
                    str += '}';
                    matchConfig.braces -= 1;
                } else if (s == '"' && matchConfig.squote == 0) {
                    if (matchConfig.dquote > 0) {
                        //如果是""代表着输出"
                        if (i < funcstack.length - 1 && funcstack[i + 1] == '"') {
                            i++;
                            str += '\x7F';    //用非打印控制字符DEL替换一下""
                        } else
                            //用非打印控制字符DEL替换一下""
                            {
                                matchConfig.dquote -= 1;
                                str += '"';
                            }
                    } else {
                        matchConfig.dquote += 1;
                        str += '"';
                    }
                } else if (s == "'" && matchConfig.dquote == 0) {
                    str += "'";
                    if (matchConfig.squote > 0) {
                        if (firstSQ == i - 1)
                            //配对的单引号后第一个字符不能是单引号
                            {
                                return '';
                            }    //如果是''代表着输出'
                        //如果是''代表着输出'
                        if (i < funcstack.length - 1 && funcstack[i + 1] == "'") {
                            i++;
                            str += "'";
                        } else {
                            //如果下一个字符不是'代表单引号结束
                            if (funcstack[i - 1] == "'") {
                                //配对的单引号后最后一个字符不能是单引号
                                return '';
                            } else {
                                matchConfig.squote -= 1;
                            }
                        }
                    } else {
                        matchConfig.squote += 1;
                        firstSQ = i;
                    }
                } else if (s == ',' && matchConfig.squote == 0 && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                    if (bracket.length <= 1) {
                        let functionS = _this.functionParser(str, cellRangeFunction);
                        if (functionS.indexOf('#lucky#') > -1) {
                            functionS = functionS.replace(/#lucky#/g, '') + ')';
                        }
                        function_str += functionS + ',';
                        str = '';
                    } else {
                        str += ',';
                    }
                } else if (s in _this.operatorjson && matchConfig.squote == 0 && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                    let s_next = '';
                    let op = _this.operatorPriority;
                    if (i + 1 < funcstack.length) {
                        s_next = funcstack[i + 1];
                    }
                    if (s + s_next in _this.operatorjson) {
                        if (bracket.length == 0) {
                            if ($.trim(str).length > 0) {
                                cal2.unshift(_this.functionParser($.trim(str), cellRangeFunction));
                            } else if ($.trim(function_str).length > 0) {
                                cal2.unshift($.trim(function_str));
                            }
                            if (cal1[0] in _this.operatorjson) {
                                let stackCeilPri = op[cal1[0]];
                                while (cal1.length > 0 && stackCeilPri != null) {
                                    cal2.unshift(cal1.shift());
                                    stackCeilPri = op[cal1[0]];
                                }
                            }
                            cal1.unshift(s + s_next);
                            function_str = '';
                            str = '';
                        } else {
                            str += s + s_next;
                        }
                        i++;
                    } else {
                        if (bracket.length == 0) {
                            if ($.trim(str).length > 0) {
                                cal2.unshift(_this.functionParser($.trim(str), cellRangeFunction));
                            } else if ($.trim(function_str).length > 0) {
                                cal2.unshift($.trim(function_str));
                            }
                            if (cal1[0] in _this.operatorjson) {
                                let stackCeilPri = op[cal1[0]];
                                stackCeilPri = stackCeilPri == null ? 1000 : stackCeilPri;
                                let sPri = op[s];
                                sPri = sPri == null ? 1000 : sPri;
                                while (cal1.length > 0 && sPri >= stackCeilPri) {
                                    cal2.unshift(cal1.shift());
                                    stackCeilPri = op[cal1[0]];
                                    stackCeilPri = stackCeilPri == null ? 1000 : stackCeilPri;
                                }
                            }
                            cal1.unshift(s);
                            function_str = '';
                            str = '';
                        } else {
                            str += s;
                        }
                    }
                } else {
                    if (matchConfig.dquote == 0 && matchConfig.squote == 0) {
                        // str += $.trim(s);
                        str += s;    //Do not use $.trim(s). When obtaining the worksheet name that contains spaces, you should keep the spaces
                    } else
                        //Do not use $.trim(s). When obtaining the worksheet name that contains spaces, you should keep the spaces
                        {
                            str += s;
                        }
                }
                if (i == funcstack.length - 1) {
                    let endstr = '';
                    let str_nb = $.trim(str).replace(/'/g, "\\'");
                    if (_this.iscelldata(str_nb) && str_nb.substr(0, 1) != ':') {
                        endstr = "luckysheet_getcelldata('" + str_nb + "')";
                        if (typeof cellRangeFunction == 'function') {
                            cellRangeFunction(str_nb);
                        }
                    } else if (str_nb.substr(0, 1) == ':') {
                        str_nb = str_nb.substr(1);
                        if (_this.iscelldata(str_nb)) {
                            endstr = 'luckysheet_getSpecialReference(false,' + function_str + ",'" + str_nb + "')";
                        }
                    } else {
                        str = $.trim(str);
                        let regx = /{.*?}/;
                        if (regx.test(str) && str.substr(0, 1) != '"' && str.substr(str.length - 1, 1) != '"') {
                            let arraytxt = regx.exec(str)[0];
                            let arraystart = str.search(regx);
                            let alltxt = '';
                            if (arraystart > 0) {
                                endstr += str.substr(0, arraystart);
                            }
                            endstr += "luckysheet_getarraydata('" + arraytxt + "')";
                            if (arraystart + arraytxt.length < str.length) {
                                endstr += str.substr(arraystart + arraytxt.length, str.length);
                            }
                        } else {
                            endstr = str;
                        }
                    }
                    if (endstr.length > 0) {
                        cal2.unshift(endstr);
                    }
                    if (cal1.length > 0) {
                        if (function_str.length > 0) {
                            cal2.unshift(function_str);
                            function_str = '';
                        }
                        while (cal1.length > 0) {
                            cal2.unshift(cal1.shift());
                        }
                    }
                    if (cal2.length > 0) {
                        function_str = _this.calPostfixExpression(cal2);
                    } else {
                        function_str += endstr;
                    }
                }
                i++;
            }    // console.log(function_str);
            // console.log(function_str);
            return function_str;
        },
        insertUpdateDynamicArray: function (dynamicArrayItem) {
            let r = dynamicArrayItem.r, c = dynamicArrayItem.c, index = dynamicArrayItem.index;
            if (index == null) {
                index = Store.currentSheetIndex;
            }
            let luckysheetfile = getluckysheetfile();
            let file = luckysheetfile[getSheetIndex(index)];
            let dynamicArray = file.dynamicArray;
            if (dynamicArray == null) {
                dynamicArray = [];
            }
            for (let i = 0; i < dynamicArray.length; i++) {
                let calc = dynamicArray[i];
                if (calc.r == r && calc.c == c && calc.index == index) {
                    calc.data = dynamicArrayItem.data;
                    calc.f = dynamicArrayItem.f;
                    return dynamicArray;
                }
            }
            dynamicArray.push(dynamicArrayItem);
            return dynamicArray;
        },
        addFunctionGroup: function (r, c, func, index) {
            if (index == null) {
                index = Store.currentSheetIndex;
            }
            let luckysheetfile = getluckysheetfile();
            let file = luckysheetfile[getSheetIndex(index)];
            if (file.calcChain == null) {
                file.calcChain = [];
            }
            let cc = {
                'r': r,
                'c': c,
                'index': index,
                'func': func
            };
            file.calcChain.push(cc);
            Store.saveParam('fc', index, JSON.stringify(cc), {
                'op': 'add',
                'pos': file.calcChain.length - 1
            });
            setluckysheetfile(luckysheetfile);
        },
        getAllFunctionGroup: function () {
            let luckysheetfile = getluckysheetfile();
            let ret = [];
            for (let i = 0; i < luckysheetfile.length; i++) {
                let file = luckysheetfile[i];
                let calcChain = file.calcChain;    /* 备注：再次加载表格获取的数据可能是JSON字符串格式(需要进行发序列化处理) */
                /* 备注：再次加载表格获取的数据可能是JSON字符串格式(需要进行发序列化处理) */
                if (calcChain) {
                    let tempCalcChain = [];
                    calcChain.forEach((item, idx) => {
                        if (typeof item === 'string') {
                            tempCalcChain.push(JSON.parse(item));
                        } else {
                            tempCalcChain.push(item);
                        }
                    });
                    calcChain = file.calcChain = tempCalcChain;
                }
                let dynamicArray_compute = file.dynamicArray_compute;
                if (calcChain == null) {
                    calcChain = [];
                }
                if (dynamicArray_compute == null) {
                    dynamicArray_compute = [];
                }
                ret = ret.concat(calcChain);
                for (let i = 0; i < dynamicArray_compute.length; i++) {
                    let d = dynamicArray_compute[0];
                    ret.push({
                        r: d.r,
                        c: d.c,
                        index: d.index
                    });
                }
            }
            return ret;
        },
        getFunctionGroup: function (index) {
            if (index == null) {
                index = Store.currentSheetIndex;
            }
            let luckysheetfile = getluckysheetfile();
            let file = luckysheetfile[getSheetIndex(index)];
            if (file.calcChain == null) {
                return [];
            }
            return file.calcChain;
        },
        updateFunctionGroup: function (r, c, index) {
            if (index == null) {
                index = Store.currentSheetIndex;
            }
            let luckysheetfile = getluckysheetfile();
            let file = luckysheetfile[getSheetIndex(index)];
            let calcChain = file.calcChain;
            if (calcChain != null) {
                for (let i = 0; i < calcChain.length; i++) {
                    let calc = calcChain[i];
                    if (calc.r == r && calc.c == c && calc.index == index) {
                        Store.saveParam('fc', index, JSON.stringify(calc), {
                            'op': 'update',
                            'pos': i
                        });
                        break;
                    }
                }
            }
            setluckysheetfile(luckysheetfile);
        },
        insertUpdateFunctionGroup: function (r, c, index) {
            if (index == null) {
                index = Store.currentSheetIndex;
            } 
            // let func = getcellFormula(r, c, index);
            // if (func == null || func.length==0) {
            //     this.delFunctionGroup(r, c, index);
            //     return;
            // }
            let luckysheetfile = getluckysheetfile();
            let file = luckysheetfile[getSheetIndex(index)];
            let calcChain = file.calcChain;
            if (calcChain == null) {
                calcChain = [];
            }
            for (let i = 0; i < calcChain.length; i++) {
                let calc = calcChain[i];
                if (calc.r == r && calc.c == c && calc.index == index) {
                    Store.saveParam('fc', index, JSON.stringify(calc), {
                        'op': 'update',
                        'pos': i
                    });
                    return;
                }
            }
            let cc = {
                'r': r,
                'c': c,
                'index': index
            };
            calcChain.push(cc);
            file.calcChain = calcChain;
            Store.saveParam('fc', index, JSON.stringify(cc), {
                'op': 'add',
                'pos': file.calcChain.length - 1
            });
            setluckysheetfile(luckysheetfile);
        },
        isFunctionRangeSave: false,
        isFunctionRangeSimple: function (txt, r, c, index, dynamicArray_compute) {
            if (txt == null || txt.length == 0) {
                return;
            }
            let txtArray = txt.split(/==|!=|<>|<=|>=|[,()=+-\/*%&^><]/g);
            if (txtArray.length > 0) {
                for (let i = 0; i < txtArray.length; i++) {
                    let t = txtArray[i];
                    if (t.length <= 1) {
                        continue;
                    }
                    if (t.substr(0, 1) == '"' && t.substr(t.length - 1, 1) == '"') {
                        continue;
                    }
                    this.isFunctionRangeSaveChange(t, r, c, index, dynamicArray_compute);
                }
            }
        },
        isFunctionRangeSimple1: function (txt, r, c, index, dynamicArray_compute) {
            let _this = this;
            if (_this.operatorjson == null) {
                let arr = _this.operator.split('|'), op = {};
                for (let i = 0; i < arr.length; i++) {
                    op[arr[i].toString()] = 1;
                }
                _this.operatorjson = op;
            }
            if (txt.substr(0, 1) == '=') {
                txt = txt.substr(1);
            }
            let funcstack = txt.split('');
            let i = 0, str = '', function_str = '', ispassby = true;
            let matchConfig = {
                'bracket': 0,
                'comma': 0,
                'squote': 0,
                'dquote': 0
            };
            let luckysheetfile = getluckysheetfile();
            while (i < funcstack.length) {
                let s = funcstack[i];
                if (s == '(' && matchConfig.dquote == 0) {
                    matchConfig.bracket += 1;
                    if (str.length > 0) {
                        function_str += 'luckysheet_function.' + str.toUpperCase() + '.f(';
                    } else {
                        function_str += '(';
                    }
                    str = '';
                } else if (s == ')' && matchConfig.dquote == 0) {
                    matchConfig.bracket -= 1;
                    function_str += _this.isFunctionRangeSimple(str, r, c, index, dynamicArray_compute) + ')';
                    str = '';
                } else if (s == ',' && matchConfig.dquote == 0) {
                    //matchConfig.comma += 1;
                    function_str += _this.isFunctionRangeSimple(str, r, c, index, dynamicArray_compute) + ',';
                    str = '';
                } else if (s in _this.operatorjson && matchConfig.dquote == 0) {
                    let s_next = '';
                    if (i + 1 < funcstack.length) {
                        s_next = funcstack[i + 1];
                    }
                    if (s + s_next in _this.operatorjson) {
                        if (str.length > 0) {
                            function_str += _this.isFunctionRangeSimple(str, r, c, index, dynamicArray_compute) + s + s_next;
                            str = '';
                        } else {
                            function_str += s + s_next;
                        }
                        i++;
                    } else {
                        if (str.length > 0) {
                            function_str += _this.isFunctionRangeSimple(str, r, c, index, dynamicArray_compute) + s;
                            str = '';
                        } else {
                            function_str += s;
                        }
                    }
                } else {
                    str += s;
                }
                if (i == funcstack.length - 1) {
                    if (_this.iscelldata($.trim(str))) {
                        _this.isFunctionRangeSaveChange(str, r, c, index, dynamicArray_compute);    // if (r != null && c != null) {
                                                                                                    //     let range = _this.getcellrange($.trim(str));
                                                                                                    //     let row = range.row,
                                                                                                    //         col = range.column;
                                                                                                    //     if ((r + "_" + c) in dynamicArray_compute) {
                                                                                                    //         let isd_range = false;
                                                                                                    //         for (let d_r = row[0]; d_r <= row[1]; d_r++) {
                                                                                                    //             for (let d_c = col[0]; d_c <= col[1]; d_c++) {
                                                                                                    //                 if ((d_r + "_" + d_c) in dynamicArray_compute && dynamicArray_compute[d_r + "_" + d_c].r == r && dynamicArray_compute[d_r + "_" + d_c].c == c) {
                                                                                                    //                     isd_range = true;
                                                                                                    //                 }
                                                                                                    //             }
                                                                                                    //         }
                                                                                                    //         if (isd_range) {
                                                                                                    //             _this.isFunctionRangeSave = _this.isFunctionRangeSave || true;
                                                                                                    //         }
                                                                                                    //         else {
                                                                                                    //             _this.isFunctionRangeSave = _this.isFunctionRangeSave || false;
                                                                                                    //         }
                                                                                                    //     }
                                                                                                    //     else {
                                                                                                    //         if (r >= row[0] && r <= row[1] && c >= col[0] && c <= col[1]) {
                                                                                                    //             _this.isFunctionRangeSave = _this.isFunctionRangeSave || true;
                                                                                                    //         }
                                                                                                    //         else {
                                                                                                    //             _this.isFunctionRangeSave = _this.isFunctionRangeSave || false;
                                                                                                    //         }
                                                                                                    //     }
                                                                                                    // }
                                                                                                    // else {
                                                                                                    //     let sheetlen = $.trim(str).split("!");
                                                                                                    //     if (sheetlen.length > 1) {
                                                                                                    //         _this.isFunctionRangeSave = _this.isFunctionRangeSave || true;
                                                                                                    //     }
                                                                                                    //     else {
                                                                                                    //         _this.isFunctionRangeSave = _this.isFunctionRangeSave || false;
                                                                                                    //     }
                                                                                                    // }
                    } else {
                    }
                }
                i++;
            }    //console.log(function_str);
            //console.log(function_str);
            return function_str;
        },
        isFunctionRangeSelect: function (txt, r, c, index, dynamicArray_compute) {
            if (txt == null || txt == '') {
                return;
            }
            if (index == null) {
                index = Store.currentSheetIndex;
            }
            if (dynamicArray_compute == null) {
                dynamicArray_compute = {};
            }
            let _this = this;
            let txt1 = txt.toUpperCase();
            let isOffsetFunc = txt1.indexOf('INDIRECT(') > -1 || txt1.indexOf('OFFSET(') > -1 || txt1.indexOf('INDEX(') > -1;
            if (txt in this.formulaContainCellList) {
                let cellList = this.formulaContainCellList[txt];
                if (isOffsetFunc) {
                    let isoff = cellList['__LuckyisOff__'];
                    if (isoff == true) {
                        for (let cellStr in cellList) {
                            if (cellStr == '__LuckyisOff__') {
                                continue;
                            }
                            this.isFunctionRangeSaveChange(cellStr, r, c, index, dynamicArray_compute);
                        }
                    } else {
                        this.isFunctionRange(txt, r, c, index, dynamicArray_compute, function (str) {
                            _this.addToCellList(txt, str);
                        });
                        cellList['__LuckyisOff__'] = true;
                    }
                } else {
                    for (let cellStr in cellList) {
                        if (cellStr == '__LuckyisOff__') {
                            continue;
                        }
                        this.isFunctionRangeSaveChange(cellStr, r, c, index, dynamicArray_compute);
                    }
                }
                return;
            }
            if (isOffsetFunc) {
                this.isFunctionRange(txt, r, c, index, dynamicArray_compute);
            } else {
                this.isFunctionRangeSimple(txt, r, c, index, dynamicArray_compute);
            }
        },
        isFunctionRange: function (txt, r, c, index, dynamicArray_compute, cellRangeFunction) {
            let _this = this;
            if (_this.operatorjson == null) {
                let arr = _this.operator.split('|'), op = {};
                for (let i = 0; i < arr.length; i++) {
                    op[arr[i].toString()] = 1;
                }
                _this.operatorjson = op;
            }
            if (txt.substr(0, 1) == '=') {
                txt = txt.substr(1);
            }
            let funcstack = txt.split('');
            let i = 0, str = '', function_str = '', ispassby = true;
            let matchConfig = {
                'bracket': 0,
                'comma': 0,
                'squote': 0,
                'dquote': 0,
                'compare': 0,
                'braces': 0
            };    // let luckysheetfile = getluckysheetfile();
                  // let dynamicArray_compute = luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["dynamicArray_compute"] == null ? {} : luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["dynamicArray_compute"];
                  //bracket 0为运算符括号、1为函数括号
            // let luckysheetfile = getluckysheetfile();
            // let dynamicArray_compute = luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["dynamicArray_compute"] == null ? {} : luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["dynamicArray_compute"];
            //bracket 0为运算符括号、1为函数括号
            let cal1 = [], cal2 = [], bracket = [];
            let firstSQ = -1;
            while (i < funcstack.length) {
                let s = funcstack[i];
                if (s == '(' && matchConfig.squote == 0 && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                    if (str.length > 0 && bracket.length == 0) {
                        str = str.toUpperCase();
                        if (str.indexOf(':') > -1) {
                            let funcArray = str.split(':');
                            function_str += "luckysheet_getSpecialReference(true,'" + $.trim(funcArray[0]).replace(/'/g, "\\'") + "', luckysheet_function." + funcArray[1] + '.f(#lucky#';
                        } else {
                            function_str += 'luckysheet_function.' + str + '.f(';
                        }
                        bracket.push(1);
                        str = '';
                    } else if (bracket.length == 0) {
                        function_str += '(';
                        bracket.push(0);
                        str = '';
                    } else {
                        bracket.push(0);
                        str += s;
                    }
                } else if (s == ')' && matchConfig.squote == 0 && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                    let bt = bracket.pop();
                    if (bracket.length == 0) {
                        // function_str += _this.isFunctionRange(str,r,c, index,dynamicArray_compute,cellRangeFunction) + ")";
                        // str = "";
                        let functionS = _this.isFunctionRange(str, r, c, index, dynamicArray_compute, cellRangeFunction);
                        if (functionS.indexOf('#lucky#') > -1) {
                            functionS = functionS.replace(/#lucky#/g, '') + ')';
                        }
                        function_str += functionS + ')';
                        str = '';
                    } else {
                        str += s;
                    }
                } else if (s == '{' && matchConfig.squote == 0 && matchConfig.dquote == 0) {
                    str += '{';
                    matchConfig.braces += 1;
                } else if (s == '}' && matchConfig.squote == 0 && matchConfig.dquote == 0) {
                    str += '}';
                    matchConfig.braces -= 1;
                } else if (s == '"' && matchConfig.squote == 0) {
                    if (matchConfig.dquote > 0) {
                        //如果是""代表着输出"
                        if (i < funcstack.length - 1 && funcstack[i + 1] == '"') {
                            i++;
                            str += '\x7F';    //用DEL替换一下""
                        } else
                            //用DEL替换一下""
                            {
                                matchConfig.dquote -= 1;
                                str += '"';
                            }
                    } else {
                        matchConfig.dquote += 1;
                        str += '"';
                    }
                } else if (s == "'" && matchConfig.dquote == 0) {
                    str += "'";
                    if (matchConfig.squote > 0) {
                        //if (firstSQ == i - 1)//配对的单引号后第一个字符不能是单引号
                        //{
                        //    代码到了此处应该是公式错误
                        //}
                        //如果是''代表着输出'
                        if (i < funcstack.length - 1 && funcstack[i + 1] == "'") {
                            i++;
                            str += "'";
                        } else {
                            //如果下一个字符不是'代表单引号结束
                            //if (funcstack[i - 1] == "'") {//配对的单引号后最后一个字符不能是单引号
                            //    代码到了此处应该是公式错误
                            //} else {
                            matchConfig.squote -= 1;    //}
                        }
                    } else
                        //}
                        {
                            matchConfig.squote += 1;
                            firstSQ = i;
                        }
                } else if (s == ',' && matchConfig.squote == 0 && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                    if (bracket.length <= 1) {
                        // function_str += _this.isFunctionRange(str, r, c, index,dynamicArray_compute,cellRangeFunction) + ",";
                        // str = "";
                        let functionS = _this.isFunctionRange(str, r, c, index, dynamicArray_compute, cellRangeFunction);
                        if (functionS.indexOf('#lucky#') > -1) {
                            functionS = functionS.replace(/#lucky#/g, '') + ')';
                        }
                        function_str += functionS + ',';
                        str = '';
                    } else {
                        str += ',';
                    }
                } else if (s in _this.operatorjson && matchConfig.squote == 0 && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                    let s_next = '';
                    let op = _this.operatorPriority;
                    if (i + 1 < funcstack.length) {
                        s_next = funcstack[i + 1];
                    }
                    if (s + s_next in _this.operatorjson) {
                        if (bracket.length == 0) {
                            if ($.trim(str).length > 0) {
                                cal2.unshift(_this.isFunctionRange($.trim(str), r, c, index, dynamicArray_compute, cellRangeFunction));
                            } else if ($.trim(function_str).length > 0) {
                                cal2.unshift($.trim(function_str));
                            }
                            if (cal1[0] in _this.operatorjson) {
                                let stackCeilPri = op[cal1[0]];
                                while (cal1.length > 0 && stackCeilPri != null) {
                                    cal2.unshift(cal1.shift());
                                    stackCeilPri = op[cal1[0]];
                                }
                            }
                            cal1.unshift(s + s_next);
                            function_str = '';
                            str = '';
                        } else {
                            str += s + s_next;
                        }
                        i++;
                    } else {
                        if (bracket.length == 0) {
                            if ($.trim(str).length > 0) {
                                cal2.unshift(_this.isFunctionRange($.trim(str), r, c, index, dynamicArray_compute, cellRangeFunction));
                            } else if ($.trim(function_str).length > 0) {
                                cal2.unshift($.trim(function_str));
                            }
                            if (cal1[0] in _this.operatorjson) {
                                let stackCeilPri = op[cal1[0]];
                                stackCeilPri = stackCeilPri == null ? 1000 : stackCeilPri;
                                let sPri = op[s];
                                sPri = sPri == null ? 1000 : sPri;
                                while (cal1.length > 0 && sPri >= stackCeilPri) {
                                    cal2.unshift(cal1.shift());
                                    stackCeilPri = op[cal1[0]];
                                    stackCeilPri = stackCeilPri == null ? 1000 : stackCeilPri;
                                }
                            }
                            cal1.unshift(s);
                            function_str = '';
                            str = '';
                        } else {
                            str += s;
                        }
                    }
                } else {
                    if (matchConfig.dquote == 0 && matchConfig.squote == 0) {
                        str += $.trim(s);
                    } else {
                        str += s;
                    }
                }
                if (i == funcstack.length - 1) {
                    let endstr = '';
                    let str_nb = $.trim(str).replace(/'/g, "\\'");
                    if (_this.iscelldata(str_nb) && str_nb.substr(0, 1) != ':') {
                        // endstr = "luckysheet_getcelldata('" + $.trim(str) + "')";
                        endstr = "luckysheet_getcelldata('" + str_nb + "')";
                        _this.isFunctionRangeSaveChange(str, r, c, index, dynamicArray_compute);
                    } else if (str_nb.substr(0, 1) == ':') {
                        str_nb = str_nb.substr(1);
                        if (_this.iscelldata(str_nb)) {
                            endstr = 'luckysheet_getSpecialReference(false,' + function_str + ",'" + str_nb + "')";
                        }
                    } else {
                        str = $.trim(str);
                        let regx = /{.*?}/;
                        if (regx.test(str) && str.substr(0, 1) != '"' && str.substr(str.length - 1, 1) != '"') {
                            let arraytxt = regx.exec(str)[0];
                            let arraystart = str.search(regx);
                            let alltxt = '';
                            if (arraystart > 0) {
                                endstr += str.substr(0, arraystart);
                            }
                            endstr += "luckysheet_getarraydata('" + arraytxt + "')";
                            if (arraystart + arraytxt.length < str.length) {
                                endstr += str.substr(arraystart + arraytxt.length, str.length);
                            }
                        } else {
                            endstr = str;
                        }
                    }
                    if (endstr.length > 0) {
                        cal2.unshift(endstr);
                    }
                    if (cal1.length > 0) {
                        if (function_str.length > 0) {
                            cal2.unshift(function_str);
                            function_str = '';
                        }
                        while (cal1.length > 0) {
                            cal2.unshift(cal1.shift());
                        }
                    }
                    if (cal2.length > 0) {
                        function_str = _this.calPostfixExpression(cal2);
                    } else {
                        function_str += endstr;
                    }
                }
                i++;
            }    // console.log(function_str);
            // console.log(function_str);
            _this.checkSpecialFunctionRange(function_str, r, c, index, dynamicArray_compute, cellRangeFunction);
            return function_str;
        },
        isFunctionRangeSaveChange: function (str, r, c, index, dynamicArray_compute) {
            let _this = this;
            if (r != null && c != null) {
                let range = _this.getcellrange($.trim(str), index);
                if (range == null) {
                    return;
                }
                let row = range.row, col = range.column, sheetIndex = range.sheetIndex;
                if (r + '_' + c in dynamicArray_compute && (index == sheetIndex || index == null)) {
                    let isd_range = false;
                    for (let d_r = row[0]; d_r <= row[1]; d_r++) {
                        for (let d_c = col[0]; d_c <= col[1]; d_c++) {
                            if (d_r + '_' + d_c in dynamicArray_compute && dynamicArray_compute[d_r + '_' + d_c].r == r && dynamicArray_compute[d_r + '_' + d_c].c == c) {
                                isd_range = true;
                            }
                        }
                    }
                    if (isd_range) {
                        _this.isFunctionRangeSave = _this.isFunctionRangeSave || true;
                    } else {
                        _this.isFunctionRangeSave = _this.isFunctionRangeSave || false;
                    }
                } else {
                    if (r >= row[0] && r <= row[1] && c >= col[0] && c <= col[1] && (index == sheetIndex || index == null)) {
                        _this.isFunctionRangeSave = _this.isFunctionRangeSave || true;
                    } else {
                        _this.isFunctionRangeSave = _this.isFunctionRangeSave || false;
                    }
                }
            } else {
                _this.isFunctionRangeSave = _this.isFunctionRangeSave || false;    // let sheetlen = $.trim(str).split("!");
                                                                                   // if (sheetlen.length > 1) {
                                                                                   //     _this.isFunctionRangeSave = _this.isFunctionRangeSave || true;//if change sheet, it must be true, but this is very slow
                                                                                   // }
                                                                                   // else {
                                                                                   //     _this.isFunctionRangeSave = _this.isFunctionRangeSave || false;
                                                                                   // }
            }
        },
        // let sheetlen = $.trim(str).split("!");
        // if (sheetlen.length > 1) {
        //     _this.isFunctionRangeSave = _this.isFunctionRangeSave || true;//if change sheet, it must be true, but this is very slow
        // }
        // else {
        //     _this.isFunctionRangeSave = _this.isFunctionRangeSave || false;
        // }
        checkSpecialFunctionRange: function (function_str, r, c, index, dynamicArray_compute, cellRangeFunction) {
            if (function_str.substr(0, 30) == 'luckysheet_getSpecialReference' || function_str.substr(0, 20) == 'luckysheet_function.') {
                if (function_str.substr(0, 20) == 'luckysheet_function.') {
                    let funcName = function_str.split('.')[1];
                    if (funcName != null) {
                        funcName = funcName.toUpperCase();
                        if (funcName != 'INDIRECT' && funcName != 'OFFSET' && funcName != 'INDEX') {
                            return;
                        }
                    }
                }
                try {
                    Store.calculateSheetIndex = index;
                    let str = new Function('return ' + function_str)();
                    if (str instanceof Object && str.startCell != null) {
                        str = str.startCell;
                    }
                    let str_nb = $.trim(str);    // console.log(function_str, tempFunc,str, this.iscelldata(str_nb),this.isFunctionRangeSave,r,c);
                    // console.log(function_str, tempFunc,str, this.iscelldata(str_nb),this.isFunctionRangeSave,r,c);
                    if (this.iscelldata(str_nb)) {
                        if (typeof cellRangeFunction == 'function') {
                            cellRangeFunction(str_nb);
                        }    // this.isFunctionRangeSaveChange(str, r, c, index, dynamicArray_compute);
                             // console.log(function_str, str, this.isFunctionRangeSave,r,c);
                    }
                } // this.isFunctionRangeSaveChange(str, r, c, index, dynamicArray_compute);
                // console.log(function_str, str, this.isFunctionRangeSave,r,c);
                catch (e) {
                }
            }    // if (function_str.substr(0, 20) == "luckysheet_function.") {
                 //     let funcName = function_str.split(".")[1];
                 //     if (funcName != null) {
                 //         funcName = funcName.toUpperCase();
                 //         if (funcName == "INDIRECT") {
                 //             let tempFunc = "luckysheet_indirect_check" + function_str.substr(30, function_str.length);
                 //             //tempFunc = tempFunc.replace(/luckysheet_getcelldata/g, "luckysheet_indirect_check_return");
                 //             try {
                 //                 Store.calculateSheetIndex = index;
                 //                 let str = eval(tempFunc);
                 //                 if(str instanceof Object && str.data!=null){
                 //                     str = str.data.v;
                 //                 }
                 //                 let str_nb = $.trim(str);
                 //                 // console.log(function_str, tempFunc,str, this.iscelldata(str_nb),this.isFunctionRangeSave,r,c);
                 //                 if (this.iscelldata(str_nb)) {
                 //                     if(typeof(cellRangeFunction)=="function"){
                 //                         cellRangeFunction(str_nb);
                 //                     }
                 //                     this.isFunctionRangeSaveChange(str, r, c, index, dynamicArray_compute);
                 //                     // console.log(function_str, str, this.isFunctionRangeSave,r,c);
                 //                 }
                 //             }
                 //             catch{
                 //             }
                 //         }
                 //         else if (funcName == "OFFSET") {
                 //             let tempFunc = "luckysheet_offset_check" + function_str.substr(28, function_str.length);
                 //             try {
                 //                 Store.calculateSheetIndex = index;
                 //                 let str = eval(tempFunc);
                 //                 if(str instanceof Object && str.data!=null){
                 //                     str = str.data.v;
                 //                 }
                 //                 let str_nb = $.trim(str);
                 //                 if (this.iscelldata(str_nb)) {
                 //                     if(typeof(cellRangeFunction)=="function"){
                 //                         cellRangeFunction(str_nb);
                 //                     }
                 //                     this.isFunctionRangeSaveChange(str, r, c, index,dynamicArray_compute);
                 //                     //console.log(function_str, str, this.isFunctionRangeSave,r,c);
                 //                 }
                 //             }
                 //             catch{
                 //             }
                 //             //let result = eval(function_str);
                 //             //console.log(function_str, result);
                 //         }
                 //     }
                 // }
        },
        // if (function_str.substr(0, 20) == "luckysheet_function.") {
        //     let funcName = function_str.split(".")[1];
        //     if (funcName != null) {
        //         funcName = funcName.toUpperCase();
        //         if (funcName == "INDIRECT") {
        //             let tempFunc = "luckysheet_indirect_check" + function_str.substr(30, function_str.length);
        //             //tempFunc = tempFunc.replace(/luckysheet_getcelldata/g, "luckysheet_indirect_check_return");
        //             try {
        //                 Store.calculateSheetIndex = index;
        //                 let str = eval(tempFunc);
        //                 if(str instanceof Object && str.data!=null){
        //                     str = str.data.v;
        //                 }
        //                 let str_nb = $.trim(str);
        //                 // console.log(function_str, tempFunc,str, this.iscelldata(str_nb),this.isFunctionRangeSave,r,c);
        //                 if (this.iscelldata(str_nb)) {
        //                     if(typeof(cellRangeFunction)=="function"){
        //                         cellRangeFunction(str_nb);
        //                     }
        //                     this.isFunctionRangeSaveChange(str, r, c, index, dynamicArray_compute);
        //                     // console.log(function_str, str, this.isFunctionRangeSave,r,c);
        //                 }
        //             }
        //             catch{
        //             }
        //         }
        //         else if (funcName == "OFFSET") {
        //             let tempFunc = "luckysheet_offset_check" + function_str.substr(28, function_str.length);
        //             try {
        //                 Store.calculateSheetIndex = index;
        //                 let str = eval(tempFunc);
        //                 if(str instanceof Object && str.data!=null){
        //                     str = str.data.v;
        //                 }
        //                 let str_nb = $.trim(str);
        //                 if (this.iscelldata(str_nb)) {
        //                     if(typeof(cellRangeFunction)=="function"){
        //                         cellRangeFunction(str_nb);
        //                     }
        //                     this.isFunctionRangeSaveChange(str, r, c, index,dynamicArray_compute);
        //                     //console.log(function_str, str, this.isFunctionRangeSave,r,c);
        //                 }
        //             }
        //             catch{
        //             }
        //             //let result = eval(function_str);
        //             //console.log(function_str, result);
        //         }
        //     }
        // }
        execvertex: {},
        execFunctionGroupData: null,
        execFunctionExist: null,
        formulaContainSheetList: {},
        formulaContainCellList: {},
        cellTextToIndexList: {},
        addToCellList: function (formulaTxt, cellstring) {
            if (formulaTxt == null || formulaTxt.length == 0 || cellstring == null || cellstring.length == 0) {
                return;
            }
            if (this.formulaContainCellList == null) {
                this.formulaContainCellList = {};
            }    // formulaTxt = formulaTxt.toUpperCase();
            // formulaTxt = formulaTxt.toUpperCase();
            if (this.formulaContainCellList[formulaTxt] == null) {
                this.formulaContainCellList[formulaTxt] = {};
            }
            this.formulaContainCellList[formulaTxt][cellstring] = 1;
        },
        addToCellIndexList: function (txt, infoObj) {
            if (txt == null || txt.length == 0 || infoObj == null) {
                return;
            }
            if (this.cellTextToIndexList == null) {
                this.cellTextToIndexList = {};
            }
            if (txt.indexOf('!') > -1) {
                txt = txt.replace(/\\'/g, "'").replace(/''/g, "'");
                this.cellTextToIndexList[txt] = infoObj;
            } else {
                this.cellTextToIndexList[txt + '_' + infoObj.sheetIndex] = infoObj;
            }    // console.log(this.cellTextToIndexList);
        },
        // console.log(this.cellTextToIndexList);
        addToSheetIndexList: function (formulaTxt, sheetIndex, obIndex) {
            if (formulaTxt == null || formulaTxt.length == 0) {
                return;
            }
            if (sheetIndex == null || sheetIndex.length == 0) {
                sheetIndex = Store.currentSheetIndex;
            }
            if (obIndex == null || obIndex.length == 0) {
                obIndex = '';
            }
            if (this.formulaContainSheetList == null) {
                this.formulaContainSheetList = {};
            }
            if (this.formulaContainSheetList[formulaTxt] == null) {
                this.formulaContainSheetList[formulaTxt] = {};
            }
            this.formulaContainSheetList[formulaTxt][sheetIndex] = obIndex;
        },
        execFunctionGlobalData: {},
        execFunctionGroupForce: function (isForce) {
            if (isForce) {
                this.execFunctionGroup(undefined, undefined, undefined, undefined, undefined, true);
            } else {
                this.execFunctionGroup();
            }
        },
        execFunctionGroup: function (origin_r, origin_c, value, index, data, isForce = false) {
            let _this = this;
            if (data == null) {
                data = Store.flowdata;
            }
            if (!window.luckysheet_compareWith) {
                window.luckysheet_compareWith = luckysheet_compareWith;
                window.luckysheet_getarraydata = luckysheet_getarraydata;
                window.luckysheet_getcelldata = luckysheet_getcelldata;
                window.luckysheet_parseData = luckysheet_parseData;
                window.luckysheet_getValue = luckysheet_getValue;
                window.luckysheet_indirect_check = luckysheet_indirect_check;
                window.luckysheet_indirect_check_return = luckysheet_indirect_check_return;
                window.luckysheet_offset_check = luckysheet_offset_check;
                window.luckysheet_calcADPMM = luckysheet_calcADPMM;
                window.luckysheet_getSpecialReference = luckysheet_getSpecialReference;
            }
            if (_this.execFunctionGlobalData == null) {
                _this.execFunctionGlobalData = {};
            }    // let luckysheetfile = getluckysheetfile();
                 // let dynamicArray_compute = luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["dynamicArray_compute"] == null ? {} : luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["dynamicArray_compute"];
            // let luckysheetfile = getluckysheetfile();
            // let dynamicArray_compute = luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["dynamicArray_compute"] == null ? {} : luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["dynamicArray_compute"];
            if (index == null) {
                index = Store.currentSheetIndex;
            }
            if (value != null) {
                //此处setcellvalue 中this.execFunctionGroupData会保存想要更新的值，本函数结尾不要设为null,以备后续函数使用
                // setcellvalue(origin_r, origin_c, _this.execFunctionGroupData, value);
                let cellCache = [[{ v: null }]];
                setcellvalue(0, 0, cellCache, value);
                _this.execFunctionGlobalData[origin_r + '_' + origin_c + '_' + index] = cellCache[0][0];
            }    //{ "r": r, "c": c, "index": index, "func": func}
            //{ "r": r, "c": c, "index": index, "func": func}
            let calcChains = _this.getAllFunctionGroup(), formulaObjects = {};
            let sheets = getluckysheetfile();
            let sheetData = {};
            for (let i = 0; i < sheets.length; i++) {
                let sheet = sheets[i];
                sheetData[sheet.index] = sheet.data;
            }    //把修改涉及的单元格存储为对象
            //把修改涉及的单元格存储为对象
            let updateValueOjects = {}, updateValueArray = [];
            if (_this.execFunctionExist == null) {
                let key = 'r' + origin_r + 'c' + origin_c + 'i' + index;
                updateValueOjects[key] = 1;
            } else {
                for (let x = 0; x < _this.execFunctionExist.length; x++) {
                    let cell = _this.execFunctionExist[x];
                    let key = 'r' + cell.r + 'c' + cell.c + 'i' + cell.i;
                    updateValueOjects[key] = 1;
                }
            }
            let arrayMatchCache = {};
            let arrayMatch = function (formulaArray, formulaObjects, updateValueOjects, func) {
                for (let a = 0; a < formulaArray.length; a++) {
                    let range = formulaArray[a];
                    let cacheKey = 'r' + range.row[0] + '' + range.row[1] + 'c' + range.column[0] + '' + range.column[1] + 'index' + range.sheetIndex;
                    if (cacheKey in arrayMatchCache) {
                        let amc = arrayMatchCache[cacheKey];    // console.log(amc);
                        // console.log(amc);
                        amc.forEach(item => {
                            func(item.key, item.r, item.c, item.sheetIndex);
                        });
                    } else {
                        let functionArr = [];
                        for (let r = range.row[0]; r <= range.row[1]; r++) {
                            for (let c = range.column[0]; c <= range.column[1]; c++) {
                                let key = 'r' + r + 'c' + c + 'i' + range.sheetIndex;
                                func(key, r, c, range.sheetIndex);
                                if (formulaObjects && key in formulaObjects || updateValueOjects && key in updateValueOjects) {
                                    functionArr.push({
                                        key: key,
                                        r: r,
                                        c: c,
                                        sheetIndex: range.sheetIndex
                                    });
                                }
                            }
                        }
                        if (formulaObjects || updateValueOjects) {
                            arrayMatchCache[cacheKey] = functionArr;
                        }
                    }
                }
            };
            let existsChildFormulaMatch = {}, ii = 0;    //创建公式缓存及其范围的缓存
                                                         // console.time("1");
            //创建公式缓存及其范围的缓存
            // console.time("1");
            for (let i = 0; i < calcChains.length; i++) {
                let formulaCell = calcChains[i];
                let key = 'r' + formulaCell.r + 'c' + formulaCell.c + 'i' + formulaCell.index;
                let calc_funcStr = getcellFormula(formulaCell.r, formulaCell.c, formulaCell.index);
                if (calc_funcStr == null) {
                    continue;
                }
                let txt1 = calc_funcStr.toUpperCase();
                let isOffsetFunc = txt1.indexOf('INDIRECT(') > -1 || txt1.indexOf('OFFSET(') > -1 || txt1.indexOf('INDEX(') > -1;
                let formulaArray = [];
                if (isOffsetFunc) {
                    this.isFunctionRange(calc_funcStr, null, null, formulaCell.index, null, function (str_nb) {
                        let range = _this.getcellrange($.trim(str_nb), formulaCell.index);
                        if (range != null) {
                            formulaArray.push(range);
                        }
                    });
                } else if (!(calc_funcStr.substr(0, 2) == '="' && calc_funcStr.substr(calc_funcStr.length - 1, 1) == '"')) {
                    //let formulaTextArray = calc_funcStr.split(/==|!=|<>|<=|>=|[,()=+-\/*%&^><]/g);//无法正确分割单引号或双引号之间有==、!=、-等运算符的情况。导致如='1-2'!A1公式中表名1-2的A1单元格内容更新后，公式的值不更新的bug
                    //解决='1-2'!A1+5会被calc_funcStr.split(/==|!=|<>|<=|>=|[,()=+-\/*%&^><]/g)分割成["","'1","2'!A1",5]的错误情况
                    let point = 0;    //指针
                    //指针
                    let squote = -1;    //双引号
                    //双引号
                    let dquote = -1;    //单引号
                    //单引号
                    let formulaTextArray = [];
                    let sq_end_array = [];    //保存了配对的单引号在formulaTextArray的index索引。
                    //保存了配对的单引号在formulaTextArray的index索引。
                    let calc_funcStr_length = calc_funcStr.length;
                    for (let i = 0; i < calc_funcStr_length; i++) {
                        let char = calc_funcStr.charAt(i);
                        if (char == "'" && dquote == -1) {
                            //如果是单引号开始
                            if (squote == -1) {
                                if (point != i) {
                                    formulaTextArray.push(...calc_funcStr.substring(point, i).split(/==|!=|<>|<=|>=|[,()=+-\/*%&\^><]/));
                                }
                                squote = i;
                                point = i;
                            } else
                                //单引号结束
                                {
                                    //if (squote == i - 1)//配对的单引号后第一个字符不能是单引号
                                    //{
                                    //    ;//到此处说明公式错误
                                    //}
                                    //如果是''代表着输出'
                                    if (i < calc_funcStr_length - 1 && calc_funcStr.charAt(i + 1) == "'") {
                                        i++;
                                    } else {
                                        //如果下一个字符不是'代表单引号结束
                                        //if (calc_funcStr.charAt(i - 1) == "'") {//配对的单引号后最后一个字符不能是单引号
                                        //    ;//到此处说明公式错误
                                        point = i + 1;
                                        formulaTextArray.push(calc_funcStr.substring(squote, point));
                                        sq_end_array.push(formulaTextArray.length - 1);
                                        squote = -1;    //} else {
                                                        //    point = i + 1;
                                                        //    formulaTextArray.push(calc_funcStr.substring(squote, point));
                                                        //    sq_end_array.push(formulaTextArray.length - 1);
                                                        //    squote = -1;
                                                        //}
                                    }
                                }
                        }
                        //} else {
                        //    point = i + 1;
                        //    formulaTextArray.push(calc_funcStr.substring(squote, point));
                        //    sq_end_array.push(formulaTextArray.length - 1);
                        //    squote = -1;
                        //}
                        if (char == '"' && squote == -1) {
                            //如果是双引号开始
                            if (dquote == -1) {
                                if (point != i) {
                                    formulaTextArray.push(...calc_funcStr.substring(point, i).split(/==|!=|<>|<=|>=|[,()=+-\/*%&\^><]/));
                                }
                                dquote = i;
                                point = i;
                            } else {
                                //如果是""代表着输出"
                                if (i < calc_funcStr_length - 1 && calc_funcStr.charAt(i + 1) == '"') {
                                    i++;
                                } else {
                                    //双引号结束
                                    point = i + 1;
                                    formulaTextArray.push(calc_funcStr.substring(dquote, point));
                                    dquote = -1;
                                }
                            }
                        }
                    }
                    if (point != calc_funcStr_length) {
                        formulaTextArray.push(...calc_funcStr.substring(point, calc_funcStr_length).split(/==|!=|<>|<=|>=|[,()=+-\/*%&\^><]/));
                    }    //拼接所有配对单引号及之后一个单元格内容，例如["'1-2'","!A1"]拼接为["'1-2'!A1"]
                    //拼接所有配对单引号及之后一个单元格内容，例如["'1-2'","!A1"]拼接为["'1-2'!A1"]
                    for (let i = sq_end_array.length - 1; i >= 0; i--) {
                        if (sq_end_array[i] != formulaTextArray.length - 1) {
                            formulaTextArray[sq_end_array[i]] = formulaTextArray[sq_end_array[i]] + formulaTextArray[sq_end_array[i] + 1];
                            formulaTextArray.splice(sq_end_array[i] + 1, 1);
                        }
                    }    //至此=SUM('1-2'!A1:A2&"'1-2'!A2")由原来的["","SUM","'1","2'!A1:A2","",""'1","2'!A2""]更正为["","SUM","","'1-2'!A1:A2","","",""'1-2'!A2""]
                    //至此=SUM('1-2'!A1:A2&"'1-2'!A2")由原来的["","SUM","'1","2'!A1:A2","",""'1","2'!A2""]更正为["","SUM","","'1-2'!A1:A2","","",""'1-2'!A2""]
                    for (let i = 0; i < formulaTextArray.length; i++) {
                        let t = formulaTextArray[i];
                        if (t.length <= 1) {
                            continue;
                        }
                        if (t.substr(0, 1) == '"' && t.substr(t.length - 1, 1) == '"' && !_this.iscelldata(t)) {
                            continue;
                        }
                        let range = _this.getcellrange($.trim(t), formulaCell.index);
                        if (range == null) {
                            continue;
                        }
                        formulaArray.push(range);
                    }
                }
                let item = {
                    formulaArray: formulaArray,
                    calc_funcStr: calc_funcStr,
                    key: key,
                    r: formulaCell.r,
                    c: formulaCell.c,
                    index: formulaCell.index,
                    parents: {},
                    chidren: {},
                    color: 'w'
                };
                formulaObjects[key] = item;    
            } 
            // if(isForce){
            //     updateValueArray.push(item);
            // }
            // else{
            //     arrayMatch(formulaArray, null, function(key){
            //         if(key in updateValueOjects){
            //             updateValueArray.push(item);
            //         }
            //     });
            // }
            // console.timeEnd("1");
            // console.time("2");
            //形成一个公式之间引用的图结构
            Object.keys(formulaObjects).forEach(key => {
                let formulaObject = formulaObjects[key];
                arrayMatch(formulaObject.formulaArray, formulaObjects, updateValueOjects, function (childKey) {
                    if (childKey in formulaObjects) {
                        let childFormulaObject = formulaObjects[childKey];
                        formulaObject.chidren[childKey] = 1;
                        childFormulaObject.parents[key] = 1;
                    }    // console.log(childKey,formulaObject.formulaArray);
                    // console.log(childKey,formulaObject.formulaArray);
                    if (!isForce && childKey in updateValueOjects) {
                        updateValueArray.push(formulaObject);
                    }
                });
                if (isForce) {
                    updateValueArray.push(formulaObject);
                }
            }); 
            // console.log(formulaObjects)
            // console.timeEnd("2");
            // console.time("3");
            let formulaRunList = [];
            //计算，采用深度优先遍历公式形成的图结构
            // updateValueArray.forEach((key)=>{
            //     let formulaObject = formulaObjects[key];
            // });
            let stack = updateValueArray, existsFormulaRunList = {};
            while (stack.length > 0) {
                let formulaObject = stack.pop();
                if (formulaObject == null || formulaObject.key in existsFormulaRunList) {
                    continue;
                }
                if (formulaObject.color == 'b') {
                    formulaRunList.push(formulaObject);
                    existsFormulaRunList[formulaObject.key] = 1;
                    continue;
                }
                let cacheStack = [];
                Object.keys(formulaObject.parents).forEach(parentKey => {
                    let parentFormulaObject = formulaObjects[parentKey];
                    if (parentFormulaObject != null) {
                        cacheStack.push(parentFormulaObject);
                    }
                });
                ii++;
                if (cacheStack.length == 0) {
                    formulaRunList.push(formulaObject);
                    existsFormulaRunList[formulaObject.key] = 1;
                } else {
                    formulaObject.color = 'b';
                    stack.push(formulaObject);
                    stack = stack.concat(cacheStack);
                }
            }
            formulaRunList.reverse(); 
            // console.log(formulaObjects, ii)
            // console.timeEnd("3");
            // console.time("4");
            for (let i = 0; i < formulaRunList.length; i++) {
                let formulaCell = formulaRunList[i];
                if (formulaCell.level == Math.max) {
                    continue;
                }
                window.luckysheet_getcelldata_cache = null;
                let calc_funcStr = formulaCell.calc_funcStr;
                let v = _this.execfunction(calc_funcStr, formulaCell.r, formulaCell.c, formulaCell.index);
                _this.groupValuesRefreshData.push({
                    'r': formulaCell.r,
                    'c': formulaCell.c,
                    'v': v[1],
                    'f': v[2],
                    'spe': v[3],
                    'index': formulaCell.index
                });    // _this.execFunctionGroupData[u.r][u.c] = value;
                // _this.execFunctionGroupData[u.r][u.c] = value;
                _this.execFunctionGlobalData[formulaCell.r + '_' + formulaCell.c + '_' + formulaCell.index] = {
                    v: v[1],
                    f: v[2]
                };
            } 
            // console.log(formulaRunList);
            // console.timeEnd("4");
            _this.execFunctionExist = null;
        },
        // When set origin_r and origin_c, that mean just refresh cell value link to [origin_r,origin_c] cell
        execFunctionGroup1: function (origin_r, origin_c, value, index, data, isForce = false) {
            let _this = this;
            if (data == null) {
                data = Store.flowdata;
            }
            if (!window.luckysheet_compareWith) {
                window.luckysheet_compareWith = luckysheet_compareWith;
                window.luckysheet_getarraydata = luckysheet_getarraydata;
                window.luckysheet_getcelldata = luckysheet_getcelldata;
                window.luckysheet_parseData = luckysheet_parseData;
                window.luckysheet_getValue = luckysheet_getValue;
                window.luckysheet_indirect_check = luckysheet_indirect_check;
                window.luckysheet_indirect_check_return = luckysheet_indirect_check_return;
                window.luckysheet_offset_check = luckysheet_offset_check;
                window.luckysheet_calcADPMM = luckysheet_calcADPMM;
                window.luckysheet_getSpecialReference = luckysheet_getSpecialReference;
            }
            if (_this.execFunctionGlobalData == null) {
                _this.execFunctionGlobalData = {};
            }
            let luckysheetfile = getluckysheetfile();
            let dynamicArray_compute = luckysheetfile[getSheetIndex(Store.currentSheetIndex)]['dynamicArray_compute'] == null ? {} : luckysheetfile[getSheetIndex(Store.currentSheetIndex)]['dynamicArray_compute'];
            if (index == null) {
                index = Store.currentSheetIndex;
            }
            if (value != null) {
                //此处setcellvalue 中this.execFunctionGroupData会保存想要更新的值，本函数结尾不要设为null,以备后续函数使用
                // setcellvalue(origin_r, origin_c, _this.execFunctionGroupData, value);
                let cellCache = [[{ v: null }]];
                setcellvalue(0, 0, cellCache, value);
                _this.execFunctionGlobalData[origin_r + '_' + origin_c + '_' + index] = cellCache[0][0];
            }    //{ "r": r, "c": c, "index": index, "func": func}
            //{ "r": r, "c": c, "index": index, "func": func}
            let group = _this.getAllFunctionGroup(), vertex1 = {}, stack = [], count = 0;
            _this.execvertex = {};
            if (_this.execFunctionExist == null) {
                for (let i = 0; i < group.length; i++) {
                    let item = group[i];
                    let file = luckysheetfile[getSheetIndex(item['index'])];
                    if (file == null) {
                        continue;
                    }
                    let cell = file.data[item.r][item.c];
                    let calc_funcStr = getcellFormula(item.r, item.c, item.index);
                    if (cell != null && cell.f != null && cell.f == calc_funcStr) {
                        if (!(item instanceof Object)) {
                            item = new Function('return ' + item)();
                        }
                        item.color = 'w';
                        item.parent = null;
                        item.chidren = {};
                        item.times = 0;
                        vertex1['r' + item.r + 'c' + item.c + 'i' + item.index] = item;
                        _this.isFunctionRangeSave = false;
                        if (isForce) {
                            _this.isFunctionRangeSave = true;
                        } else if (origin_r != null && origin_c != null) {
                            _this.isFunctionRangeSelect(calc_funcStr, origin_r, origin_c, index, dynamicArray_compute);
                        }    // else {
                             //     _this.isFunctionRangeSelect(calc_funcStr, undefined, undefined ,dynamicArray_compute);
                             // }
                        // else {
                        //     _this.isFunctionRangeSelect(calc_funcStr, undefined, undefined ,dynamicArray_compute);
                        // }
                        if (_this.isFunctionRangeSave) {
                            stack.push(item);
                            _this.execvertex['r' + item.r + 'c' + item.c + 'i' + item.index] = item;
                            count++;
                        }
                    }
                }
            } else {
                for (let x = 0; x < _this.execFunctionExist.length; x++) {
                    let cell = _this.execFunctionExist[x];
                    if ('r' + cell.r + 'c' + cell.c + 'i' + cell.i in vertex1) {
                        continue;
                    }
                    for (let i = 0; i < group.length; i++) {
                        let item = group[i];
                        let calc_funcStr = getcellFormula(item.r, item.c, item.index);
                        item.color = 'w';
                        item.parent = null;
                        item.chidren = {};
                        item.times = 0;
                        vertex1['r' + item.r + 'c' + item.c + 'i' + item.index] = item;
                        _this.isFunctionRangeSave = false;
                        if (isForce) {
                            _this.isFunctionRangeSave = true;
                        } else {
                            _this.isFunctionRangeSelect(calc_funcStr, cell.r, cell.c, cell.i, dynamicArray_compute);
                        }
                        if (_this.isFunctionRangeSave) {
                            stack.push(item);
                            _this.execvertex['r' + item.r + 'c' + item.c + 'i' + item.index] = item;
                            count++;
                        }
                    }
                }
            } 
            // console.time("1");
            // console.log(group.length);
            // let iii = 0, ii=0;
            //先进先出法，构建逆向执行结构树
            while (stack.length > 0) {
                let u = stack.shift();
                let excludeList = {};
                _this.getChildrenVertex(u, vertex1, excludeList);    // ii++;
                                                                     // console.log(JSON.stringify(excludeList));
                // ii++;
                // console.log(JSON.stringify(excludeList));
                for (let name in vertex1) {
                    let item = vertex1[name];
                    if (item == null) {
                        continue;
                    }
                    let ukey = 'r' + u.r + 'c' + u.c + 'i' + u.index;    // if ((u.r == item.r && u.c == item.c && u.index == item.index) ) {
                                                                         //     continue;
                                                                         // }
                    // if ((u.r == item.r && u.c == item.c && u.index == item.index) ) {
                    //     continue;
                    // }
                    if (name in excludeList) {
                        continue;
                    }
                    _this.isFunctionRangeSave = false;
                    let calc_funcStr = getcellFormula(item.r, item.c, item.index);
                    _this.isFunctionRangeSelect(calc_funcStr, u.r, u.c, u.index, dynamicArray_compute);    // iii++;
                    // iii++;
                    if (_this.isFunctionRangeSave) {
                        if (!(name in _this.execvertex)) {
                            // console.log(JSON.stringify(item), JSON.stringify(u), _this.isFunctionRangeSave);
                            stack.push(item);
                            _this.execvertex[name] = item;
                        }
                        count++;
                        _this.execvertex[name].chidren[ukey] = 1;
                    }
                }
            }    // console.log(iii, ii);
                 // console.timeEnd("1");
                 // console.time("2");
            // console.log(iii, ii);
            // console.timeEnd("1");
            // console.time("2");
            _this.groupValuesRefreshData = [];
            let i = 0;
            while (i < count) {
                for (let name in _this.execvertex) {
                    let u = _this.execvertex[name];
                    if (u.color == 'w') {
                        _this.functionDFS(u);
                    } else if (u.color == 'b') {
                        i++;
                    }
                }
            }    // console.timeEnd("2");
            // console.timeEnd("2");
            _this.execFunctionExist = null;
        },
        //递归得到引用节点
        getChildrenVertex: function (u, vertex1, obj) {
            let ukey = 'r' + u.r + 'c' + u.c + 'i' + u.index;
            obj[ukey] = 1;
            if (u.chidren != null) {
                for (let key in u.chidren) {
                    if (vertex1[key] && !(key in obj)) {
                        this.getChildrenVertex(vertex1[key], vertex1, obj);
                    }
                }
            }
        },
        //深度优先算法，处理多级调用函数
        functionDFS: function (u) {
            let _this = this;
            u.color = 'g';
            u.times += 1;
            for (let chd in u.chidren) {
                let v = _this.execvertex[chd];
                if (v.color == 'w') {
                    v.parent = 'r' + u.r.toString() + 'c' + u.c.toString() + 'i' + u.index;
                    _this.functionDFS(v);
                }
            }
            u.color = 'b';
            window.luckysheet_getcelldata_cache = null;
            let calc_funcStr = getcellFormula(u.r, u.c, u.index);
            let v = _this.execfunction(calc_funcStr, u.r, u.c, u.index);
            // let value = _this.execFunctionGroupData[u.r][u.c];
            // if(value == null){
            //     value = {};
            // }
            // value.v = v[1];
            // value.f = v[2];
            // let cell = getOrigincell(u.r,u.c,u.index);
            // let spl;
            // if(v[3]!=null){
            //     if(v[3].type=="sparklines"){
            //         window.luckysheetCurrentRow = u.r;
            //         window.luckysheetCurrentColumn = u.c;
            //         window.luckysheetCurrentIndex = u.index;
            //         window.luckysheetCurrentFunction = calc_funcStr;
            //         let fp = $.trim(_this.functionParserExe(calc_funcStr));
            //         let sparklines = eval(fp);
            //         spl = sparklines;
            //     }
            // }
            _this.groupValuesRefreshData.push({
                'r': u.r,
                'c': u.c,
                'v': v[1],
                'f': v[2],
                'spe': v[3],
                'index': u.index
            });    // _this.execFunctionGroupData[u.r][u.c] = value;
            // _this.execFunctionGroupData[u.r][u.c] = value;
            _this.execFunctionGlobalData[u.r + '_' + u.c + '_' + u.index] = {
                v: v[1],
                f: v[2]
            };
        },
        groupValuesRefreshData: [],
        groupValuesRefresh: function () {
            let _this = this;
            let luckysheetfile = getluckysheetfile();
            if (_this.groupValuesRefreshData.length > 0) {
                for (let i = 0; i < _this.groupValuesRefreshData.length; i++) {
                    let item = _this.groupValuesRefreshData[i];    // if(item.i != Store.currentSheetIndex){
                                                                   //     continue;
                                                                   // }
                    // if(item.i != Store.currentSheetIndex){
                    //     continue;
                    // }
                    let file = luckysheetfile[getSheetIndex(item.index)];
                    let data = file.data;
                    if (data == null) {
                        continue;
                    }
                    let updateValue = {};
                    if (item.spe != null) {
                        if (item.spe.type == 'sparklines') {
                            updateValue.spl = item.spe.data;
                        } else if (item.spe.type == 'dynamicArrayItem') {
                            file.dynamicArray = _this.insertUpdateDynamicArray(item.spe.data);
                        }
                    }
                    updateValue.v = item.v;
                    updateValue.f = item.f;
                    setcellvalue(item.r, item.c, data, updateValue);
                    Store.saveParam('v', item.index, item.v, {
                        'r': item.r,
                        'c': item.c
                    });
                }
                Store.webWorkerFlowDataCache(Store.flowdata);    //worker存数据
                //worker存数据
                _this.groupValuesRefreshData = [];
            }
        },
        delFunctionGroup: function (r, c, index) {
            if (index == null) {
                index = Store.currentSheetIndex;
            }
            let luckysheetfile = getluckysheetfile();
            let file = luckysheetfile[getSheetIndex(index)];
            let calcChain = file.calcChain;
            if (calcChain != null) {
                for (let i = 0; i < calcChain.length; i++) {
                    let calc = calcChain[i];
                    if (calc.r == r && calc.c == c && calc.index == index) {
                        calcChain.splice(i, 1);
                        Store.saveParam('fc', index, null, {
                            'op': 'del',
                            'pos': i
                        });
                        break;
                    }
                }
            }
            let dynamicArray = file.dynamicArray;
            if (dynamicArray != null) {
                for (let i = 0; i < dynamicArray.length; i++) {
                    let calc = dynamicArray[i];
                    if (calc.r == r && calc.c == c && (calc.index == null || calc.index == index)) {
                        dynamicArray.splice(i, 1);
                        Store.saveParam('ac', index, null, {
                            'op': 'del',
                            'pos': i
                        });
                        break;
                    }
                }
            }
            setluckysheetfile(luckysheetfile);
        },
        execfunction: function (txt, r, c, index, isrefresh, notInsertFunc) {
            let _this = this;
            let _locale = locale();
            let locale_formulaMore = _locale.formulaMore;    // console.log(txt,r,c)
            // console.log(txt,r,c)
            if (txt.indexOf(_this.error.r) > -1) {
                return [
                    false,
                    _this.error.r,
                    txt
                ];
            }
            if (!_this.checkBracketNum(txt)) {
                txt += ')';
            }
            if (index == null) {
                index = Store.currentSheetIndex;
            }
            Store.calculateSheetIndex = index;
            let fp = $.trim(_this.functionParserExe(txt));    //console.log(fp)
            //console.log(fp)
            if (fp.substr(0, 20) == 'luckysheet_function.' || fp.substr(0, 22) == 'luckysheet_compareWith') {
                _this.functionHTMLIndex = 0;
            }
            if (!_this.testFunction(txt, fp) || fp == '') {
                tooltip.info('', locale_formulaMore.execfunctionError);
                return [
                    false,
                    _this.error.n,
                    txt
                ];
            }
            let result = null;
            window.luckysheetCurrentRow = r;
            window.luckysheetCurrentColumn = c;
            window.luckysheetCurrentIndex = index;
            window.luckysheetCurrentFunction = txt;
            let sparklines = null;
            try {
                if (fp.indexOf('luckysheet_getcelldata') > -1) {
                    let funcg = fp.split("luckysheet_getcelldata('");
                    for (let i = 1; i < funcg.length; i++) {
                        let funcgStr = funcg[i].split("')")[0];
                        let funcgRange = _this.getcellrange(funcgStr);
                        if (funcgRange.row[0] < 0 || funcgRange.column[0] < 0) {
                            return [
                                true,
                                _this.error.r,
                                txt
                            ];
                        }
                        if (funcgRange.sheetIndex == Store.calculateSheetIndex && r >= funcgRange.row[0] && r <= funcgRange.row[1] && c >= funcgRange.column[0] && c <= funcgRange.column[1]) {
                            if (isEditMode()) {
                                alert(locale_formulaMore.execfunctionSelfError);
                            } else {
                                tooltip.info('', locale_formulaMore.execfunctionSelfErrorResult);
                            }
                            return [
                                false,
                                0,
                                txt
                            ];
                        }
                    }
                }
                result = new Function('return ' + fp)();
                if (typeof result == 'string') {
                    //把之前的非打印控制字符DEL替换回一个双引号。
                    result = result.replace(/\x7F/g, '"');
                }    //加入sparklines的参数项目
                //加入sparklines的参数项目
                if (fp.indexOf('SPLINES') > -1) {
                    sparklines = result;
                    result = '';
                }
            } catch (e) {
                let err = e;    //err错误提示处理
                //err错误提示处理
                console.log(e, fp);
                err = _this.errorInfo(err);
                result = [
                    _this.error.n,
                    err
                ];
            }
            //公式结果是对象，则表示只是选区。如果是单个单元格，则返回其值；如果是多个单元格，则返回 #VALUE!。
            if (getObjType(result) == 'object' && result.startCell != null) {
                if (getObjType(result.data) == 'array') {
                    result = _this.error.v;
                } else {
                    if (getObjType(result.data) == 'object' && !isRealNull(result.data.v)) {
                        result = result.data.v;
                    } else if (!isRealNull(result.data)) {
                        //只有data长或宽大于1才可能是选区
                        if (result.cell > 1 || result.rowl > 1) {
                            result = result.data;
                        } else
                            //否则就是单个不为null的没有值v的单元格
                            {
                                result = 0;
                            }
                    } else {
                        result = 0;
                    }
                }
            }    //公式结果是数组，分错误值 和 动态数组 两种情况
            //公式结果是数组，分错误值 和 动态数组 两种情况
            let dynamicArrayItem = null;
            if (getObjType(result) == 'array') {
                let isErr = false;
                if (getObjType(result[0]) != 'array' && result.length == 2) {
                    isErr = valueIsError(result[0]);
                }
                if (!isErr) {
                    if (getObjType(result[0]) == 'array' && result.length == 1 && result[0].length == 1) {
                        result = result[0][0];
                    } else {
                        dynamicArrayItem = {
                            'r': r,
                            'c': c,
                            'f': txt,
                            'index': index,
                            'data': result
                        };
                        result = '';
                    }
                } else {
                    result = result[0];
                }
            }
            window.luckysheetCurrentRow = null;
            window.luckysheetCurrentColumn = null;
            window.luckysheetCurrentIndex = null;
            window.luckysheetCurrentFunction = null;
            if (r != null && c != null) {
                if (isrefresh) {
                    _this.execFunctionGroup(r, c, result, index);
                }
                if (!notInsertFunc) {
                    _this.insertUpdateFunctionGroup(r, c, index);
                }
            }
            if (!!sparklines) {
                return [
                    true,
                    result,
                    txt,
                    {
                        type: 'sparklines',
                        data: sparklines
                    }
                ];
            }
            if (!!dynamicArrayItem) {
                return [
                    true,
                    result,
                    txt,
                    {
                        type: 'dynamicArrayItem',
                        data: dynamicArrayItem
                    }
                ];
            }    // console.log(result, txt);
            // console.log(result, txt);
            return [
                true,
                result,
                txt
            ];
        },
        testFunction: function (txt, fp) {
            if (txt.substr(0, 1) == '=') {
                return true;
            } else {
                return false;
            }
        },
        //供function/functionImplementation.js的EVALUATE函数调用。
        execstringformula: function (txt, r, c, index) {
            let _this = this;
            return this.execfunction(txt, r, c, index);
        },
        functionResizeData: {},
        functionResizeStatus: false,
        functionResizeTimeout: null,
        data_parm_index: 0    //选择公式后参数索引标记

    };
    //选择公式后参数索引标记
    return luckysheetformula;
});
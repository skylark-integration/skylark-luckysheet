define([
    './func',
    './matrix_methods',
    '../methods/get',
    '../controllers/menuButton',
    '../controllers/sparkline',
    '../global/formula',
    '../global/func_methods',
    '../global/editor',
    '../global/datecontroll',
    '../global/validate',
    '../global/refresh',
    '../global/format',
    '../global/sort',
    '../global/getdata',
    '../utils/util',
    '../store',
    'dayjs',
    'numeral'
], function (a, b, c, menuButton, luckysheetSparkline, formula, func_methods, editor, d, e, f, g, h, i, j, Store, dayjs, numeral) {
    'use strict';
    const functionImplementation = {
        'SUM': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        if (!e.isRealNum(data)) {
                            if (j.getObjType(data) == 'boolean') {
                                if (data.toString().toLowerCase() == 'true') {
                                    dataArr.push(1);
                                } else if (data.toString().toLowerCase() == 'false') {
                                    dataArr.push(0);
                                }
                            } else {
                                return formula.undefined.v;
                            }
                        } else {
                            dataArr.push(data);
                        }
                    }
                }
                var sum = 0;
                if (dataArr.length > 0) {
                    for (var i = 0; i < dataArr.length; i++) {
                        if (e.valueIsError(dataArr[i])) {
                            return dataArr[i];
                        }
                        if (!e.isRealNum(dataArr[i])) {
                            continue;
                        }
                        sum = luckysheet_calcADPMM(sum, '+', dataArr[i]);
                    }
                }
                return sum;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'AVERAGE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array') {
                            if (!func_methods.isDyadicArr(data)) {
                                return formula.undefined.v;
                            }
                            dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                        } else {
                            dataArr = dataArr.concat(data);
                        }
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'text', true));
                    } else {
                        dataArr.push(data);
                    }
                }
                var sum = 0, count = 0;
                for (var i = 0; i < dataArr.length; i++) {
                    if (e.valueIsError(dataArr[i])) {
                        return dataArr[i];
                    } else if (!e.isRealNum(dataArr[i])) {
                        return formula.undefined.v;
                    }
                    sum = luckysheet_calcADPMM(sum, '+', dataArr[i]);
                    count++;
                }
                if (count == 0) {
                    return formula.undefined.d;
                }
                return luckysheet_calcADPMM(sum, '/', count);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COUNT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array') {
                            if (!func_methods.isDyadicArr(data)) {
                                return formula.undefined.v;
                            }
                            dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                        } else {
                            dataArr = dataArr.concat(data);
                        }
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'text', true));
                    } else {
                        if (j.getObjType(data) == 'boolean') {
                            if (data.toString().toLowerCase() == 'true') {
                                dataArr.push(1);
                            } else if (data.toString().toLowerCase() == 'false') {
                                dataArr.push(0);
                            }
                        } else {
                            dataArr.push(data);
                        }
                    }
                }
                var count = 0;
                for (var i = 0; i < dataArr.length; i++) {
                    if (e.isRealNum(dataArr[i])) {
                        count++;
                    }
                }
                return count;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COUNTA': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array') {
                            if (!func_methods.isDyadicArr(data)) {
                                return formula.undefined.v;
                            }
                            dataArr = dataArr.concat(func_methods.getDataArr(data));
                        } else {
                            dataArr = dataArr.concat(data);
                        }
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'text', true));
                    } else {
                        dataArr.push(data);
                    }
                }
                return dataArr.length;
            } catch (err) {
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MAX': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array') {
                            if (!func_methods.isDyadicArr(data)) {
                                return formula.undefined.v;
                            }
                            dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                        } else {
                            dataArr = dataArr.concat(data);
                        }
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        dataArr.push(data);
                    }
                }
                var max = null;
                for (var i = 0; i < dataArr.length; i++) {
                    if (e.valueIsError(dataArr[i])) {
                        return dataArr[i];
                    }
                    if (!e.isRealNum(dataArr[i])) {
                        continue;
                    }
                    if (max == null || parseFloat(dataArr[i]) > max) {
                        max = parseFloat(dataArr[i]);
                    }
                }
                return max == null ? 0 : max;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MIN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array') {
                            if (!func_methods.isDyadicArr(data)) {
                                return formula.undefined.v;
                            }
                            dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                        } else {
                            dataArr = dataArr.concat(data);
                        }
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        dataArr.push(data);
                    }
                }
                var min = null;
                for (var i = 0; i < dataArr.length; i++) {
                    if (e.valueIsError(dataArr[i])) {
                        return dataArr[i];
                    }
                    if (!e.isRealNum(dataArr[i])) {
                        continue;
                    }
                    if (min == null || parseFloat(dataArr[i]) < min) {
                        min = parseFloat(dataArr[i]);
                    }
                }
                return min == null ? 0 : min;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'AGE_BY_IDCARD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var UUserCard = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(UUserCard)) {
                    return UUserCard;
                }
                if (!window.luckysheet_function.ISIDCARD.f(UUserCard)) {
                    return formula.undefined.v;
                }
                var birthday = window.luckysheet_function.BIRTHDAY_BY_IDCARD.f(UUserCard);
                if (e.valueIsError(birthday)) {
                    return birthday;
                }
                birthday = dayjs(birthday);
                var cuurentdate = dayjs();
                if (arguments.length == 2) {
                    cuurentdate = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(cuurentdate)) {
                        return cuurentdate;
                    }
                    cuurentdate = dayjs(cuurentdate);
                }
                var age = cuurentdate.undefined(birthday, 'years');
                if (age < 0 || age.toString() == 'NaN') {
                    return formula.undefined.v;
                }
                return age;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SEX_BY_IDCARD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var UUserCard = func_methods.getFirstValue(arguments[0]).toString();
                if (e.valueIsError(UUserCard)) {
                    return UUserCard;
                }
                if (!window.luckysheet_function.ISIDCARD.f(UUserCard)) {
                    return formula.undefined.v;
                }
                if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
                    return '男';
                } else {
                    return '女';
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'BIRTHDAY_BY_IDCARD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var UUserCard = func_methods.getFirstValue(arguments[0]).toString();
                if (e.valueIsError(UUserCard)) {
                    return UUserCard;
                }
                if (!window.luckysheet_function.ISIDCARD.f(UUserCard)) {
                    return formula.undefined.v;
                }
                var birthday = '';
                if (UUserCard.length == 15) {
                    var year = '19' + UUserCard.substring(6, 8) + '/' + UUserCard.substring(8, 10) + '/' + UUserCard.substring(10, 12);
                    birthday = year;
                } else if (UUserCard.length == 18) {
                    var year = UUserCard.substring(6, 10) + '/' + UUserCard.substring(10, 12) + '/' + UUserCard.substring(12, 14);
                    birthday = year;
                }
                var datetype = 0;
                if (arguments[1] != null) {
                    datetype = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(datetype)) {
                        return datetype;
                    }
                }
                if (!e.isRealNum(datetype)) {
                    return formula.undefined.v;
                }
                datetype = parseInt(datetype);
                if (datetype < 0 || datetype > 2) {
                    return formula.undefined.v;
                }
                if (parseInt(datetype) == 0) {
                    return birthday;
                } else if (parseInt(datetype) == 1) {
                    return dayjs(birthday).format('YYYY-MM-DD');
                } else if (parseInt(datetype) == 2) {
                    return dayjs(birthday).format('YYYY年M月D日');
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PROVINCE_BY_IDCARD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var UUserCard = func_methods.getFirstValue(arguments[0]).toString();
                if (e.valueIsError(UUserCard)) {
                    return UUserCard;
                }
                if (!window.luckysheet_function.ISIDCARD.f(UUserCard)) {
                    return formula.undefined.v;
                }
                var native = '未知';
                var provinceArray = formula.classlist.province;
                if (UUserCard.substring(0, 2) in provinceArray) {
                    native = provinceArray[UUserCard.substring(0, 2)];
                }
                return native;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'CITY_BY_IDCARD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var UUserCard = func_methods.getFirstValue(arguments[0]).toString();
                if (e.valueIsError(UUserCard)) {
                    return UUserCard;
                }
                if (!window.luckysheet_function.ISIDCARD.f(UUserCard)) {
                    return formula.undefined.v;
                }
                var dataNum = cityData.length, native = '未知';
                for (var i = 0; i < dataNum; i++) {
                    if (UUserCard.substring(0, 6) == cityData[i].code) {
                        native = cityData[i].title;
                        break;
                    }
                }
                return native;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'STAR_BY_IDCARD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var UUserCard = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(UUserCard)) {
                    return UUserCard;
                }
                if (!window.luckysheet_function.ISIDCARD.f(UUserCard)) {
                    return formula.undefined.v;
                }
                var birthday = window.luckysheet_function.BIRTHDAY_BY_IDCARD.f(UUserCard);
                if (e.valueIsError(birthday)) {
                    return birthday;
                }
                birthday = new Date(birthday);
                var month = birthday.getMonth(), day = birthday.getDate();
                var d = new Date(1999, month, day, 0, 0, 0);
                var arr = [];
                arr.push([
                    '魔羯座',
                    new Date(1999, 0, 1, 0, 0, 0)
                ]);
                arr.push([
                    '水瓶座',
                    new Date(1999, 0, 20, 0, 0, 0)
                ]);
                arr.push([
                    '双鱼座',
                    new Date(1999, 1, 19, 0, 0, 0)
                ]);
                arr.push([
                    '白羊座',
                    new Date(1999, 2, 21, 0, 0, 0)
                ]);
                arr.push([
                    '金牛座',
                    new Date(1999, 3, 21, 0, 0, 0)
                ]);
                arr.push([
                    '双子座',
                    new Date(1999, 4, 21, 0, 0, 0)
                ]);
                arr.push([
                    '巨蟹座',
                    new Date(1999, 5, 22, 0, 0, 0)
                ]);
                arr.push([
                    '狮子座',
                    new Date(1999, 6, 23, 0, 0, 0)
                ]);
                arr.push([
                    '处女座',
                    new Date(1999, 7, 23, 0, 0, 0)
                ]);
                arr.push([
                    '天秤座',
                    new Date(1999, 8, 23, 0, 0, 0)
                ]);
                arr.push([
                    '天蝎座',
                    new Date(1999, 9, 23, 0, 0, 0)
                ]);
                arr.push([
                    '射手座',
                    new Date(1999, 10, 22, 0, 0, 0)
                ]);
                arr.push([
                    '魔羯座',
                    new Date(1999, 11, 22, 0, 0, 0)
                ]);
                for (var i = arr.length - 1; i >= 0; i--) {
                    if (d >= arr[i][1]) {
                        return arr[i][0];
                    }
                }
                return '未找到匹配星座信息';
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ANIMAL_BY_IDCARD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var UUserCard = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(UUserCard)) {
                    return UUserCard;
                }
                if (!window.luckysheet_function.ISIDCARD.f(UUserCard)) {
                    return formula.undefined.v;
                }
                var birthday = window.luckysheet_function.BIRTHDAY_BY_IDCARD.f(UUserCard);
                if (e.valueIsError(birthday)) {
                    return birthday;
                }
                birthday = new Date(birthday);
                var list = new Array('猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗');
                var index = (parseInt(birthday.getFullYear()) + 9) % 12;
                if (index != null && !isNaN(index)) {
                    return list[index];
                } else {
                    return '未找到匹配生肖信息';
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ISIDCARD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var idcard = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(idcard)) {
                    return idcard;
                }
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (reg.test(idcard)) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DM_TEXT_CUTWORD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                var datetype = 0;
                if (arguments[1] != null) {
                    datetype = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(datetype)) {
                        return datetype;
                    }
                }
                if (!e.isRealNum(datetype)) {
                    return formula.undefined.v;
                }
                datetype = parseInt(datetype);
                if (datetype != 0 && datetype != 1 && datetype != 2) {
                    return formula.undefined.v;
                }
                $.post('/dataqk/tu/api/cutword', {
                    'text': text,
                    'type': datetype
                }, function (data) {
                    var d = [].concat(Store.flowdata);
                    formula.execFunctionGroup(cell_r, cell_c, data);
                    d[cell_r][cell_c] = {
                        'v': data,
                        'f': cell_fp
                    };
                    f.jfrefreshgrid(d, [{
                            'row': [
                                cell_r,
                                cell_r
                            ],
                            'column': [
                                cell_c,
                                cell_c
                            ]
                        }]);
                });
                return 'loading...';
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DM_TEXT_TFIDF': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                var count = 20;
                if (arguments[1] != null) {
                    count = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(count)) {
                        return count;
                    }
                }
                if (!e.isRealNum(count)) {
                    return formula.undefined.v;
                }
                count = parseInt(count);
                var set = 0;
                if (arguments[2] != null) {
                    set = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(set)) {
                        return set;
                    }
                }
                if (!e.isRealNum(set)) {
                    return formula.undefined.v;
                }
                set = parseInt(set);
                if (count < 0) {
                    return formula.undefined.v;
                }
                if (set != 0 && set != 1 && set != 2) {
                    return formula.undefined.v;
                }
                $.post('/dataqk/tu/api/tfidf', {
                    'text': text,
                    'count': count,
                    'set': set
                }, function (data) {
                    var d = editor.deepCopyFlowData(Store.flowdata);
                    formula.execFunctionGroup(cell_r, cell_c, data);
                    d[cell_r][cell_c] = {
                        'v': data,
                        'f': cell_fp
                    };
                    f.jfrefreshgrid(d, [{
                            'row': [
                                cell_r,
                                cell_r
                            ],
                            'column': [
                                cell_c,
                                cell_c
                            ]
                        }]);
                });
                return 'loading...';
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DM_TEXT_TEXTRANK': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                var count = 20;
                if (arguments[1] != null) {
                    count = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(count)) {
                        return count;
                    }
                }
                if (!e.isRealNum(count)) {
                    return formula.undefined.v;
                }
                count = parseInt(count);
                var set = 0;
                if (arguments[2] != null) {
                    set = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(set)) {
                        return set;
                    }
                }
                if (!e.isRealNum(set)) {
                    return formula.undefined.v;
                }
                set = parseInt(set);
                if (count < 0) {
                    return formula.undefined.v;
                }
                if (set != 0 && set != 1 && set != 2) {
                    return formula.undefined.v;
                }
                $.post('/dataqk/tu/api/tfidf', {
                    'text': text,
                    'count': count,
                    'set': set
                }, function (data) {
                    var d = editor.deepCopyFlowData(Store.flowdata);
                    formula.execFunctionGroup(cell_r, cell_c, data);
                    d[cell_r][cell_c] = {
                        'v': data,
                        'f': cell_fp
                    };
                    f.jfrefreshgrid(d, [{
                            'row': [
                                cell_r,
                                cell_r
                            ],
                            'column': [
                                cell_c,
                                cell_c
                            ]
                        }]);
                });
                return 'loading...';
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DATA_CN_STOCK_CLOSE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var stockcode = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(stockcode)) {
                    return stockcode;
                }
                var date = null;
                if (arguments[1] != null) {
                    var data_date = arguments[1];
                    if (j.getObjType(data_date) == 'array') {
                        return formula.undefined.v;
                    } else if (j.getObjType(data_date) == 'object' && data_date.startCell != null) {
                        if (data_date.data != null && j.getObjType(data_date.data) != 'array' && data_date.data.ct != null && data_date.data.ct.t == 'd') {
                            date = g.update('yyyy-mm-dd', data_date.data.v);
                        } else {
                            return formula.undefined.v;
                        }
                    } else {
                        date = data_date;
                    }
                    if (!d.isdatetime(date)) {
                        return [
                            formula.undefined.v,
                            '日期错误'
                        ];
                    }
                    date = dayjs(date).format('YYYY-MM-DD');
                }
                var price = 0;
                if (arguments[2] != null) {
                    price = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(price)) {
                        return price;
                    }
                }
                if (!e.isRealNum(price)) {
                    return formula.undefined.v;
                }
                price = parseInt(price);
                if (price != 0 && price != 1 && price != 2) {
                    return formula.undefined.v;
                }
                $.post('/dataqk/tu/api/getstockinfo', {
                    'stockCode': stockcode,
                    'date': date,
                    'price': price,
                    type: '0'
                }, function (data) {
                    var d = editor.deepCopyFlowData(Store.flowdata);
                    var v = j.numFormat(data);
                    if (v == null) {
                        v = data;
                    }
                    formula.execFunctionGroup(cell_r, cell_c, v);
                    d[cell_r][cell_c] = {
                        'v': v,
                        'f': cell_fp
                    };
                    f.jfrefreshgrid(d, [{
                            'row': [
                                cell_r,
                                cell_r
                            ],
                            'column': [
                                cell_c,
                                cell_c
                            ]
                        }]);
                });
                return 'loading...';
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DATA_CN_STOCK_OPEN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var stockcode = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(stockcode)) {
                    return stockcode;
                }
                var date = null;
                if (arguments[1] != null) {
                    var data_date = arguments[1];
                    if (j.getObjType(data_date) == 'array') {
                        return formula.undefined.v;
                    } else if (j.getObjType(data_date) == 'object' && data_date.startCell != null) {
                        if (data_date.data != null && j.getObjType(data_date.data) != 'array' && data_date.data.ct != null && data_date.data.ct.t == 'd') {
                            date = g.update('yyyy-mm-dd', data_date.data.v);
                        } else {
                            return formula.undefined.v;
                        }
                    } else {
                        date = data_date;
                    }
                    if (!d.isdatetime(date)) {
                        return [
                            formula.undefined.v,
                            '日期错误'
                        ];
                    }
                    date = dayjs(date).format('YYYY-MM-DD');
                }
                var price = 0;
                if (arguments[2] != null) {
                    price = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(price)) {
                        return price;
                    }
                }
                if (!e.isRealNum(price)) {
                    return formula.undefined.v;
                }
                price = parseInt(price);
                if (price != 0 && price != 1 && price != 2) {
                    return formula.undefined.v;
                }
                $.post('/dataqk/tu/api/getstockinfo', {
                    'stockCode': stockcode,
                    'date': date,
                    'price': price,
                    type: '1'
                }, function (data) {
                    var d = editor.deepCopyFlowData(Store.flowdata);
                    formula.execFunctionGroup(cell_r, cell_c, data);
                    d[cell_r][cell_c] = {
                        'v': data,
                        'f': cell_fp
                    };
                    f.jfrefreshgrid(d, [{
                            'row': [
                                cell_r,
                                cell_r
                            ],
                            'column': [
                                cell_c,
                                cell_c
                            ]
                        }]);
                });
                return 'loading...';
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DATA_CN_STOCK_MAX': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var stockcode = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(stockcode)) {
                    return stockcode;
                }
                var date = null;
                if (arguments[1] != null) {
                    var data_date = arguments[1];
                    if (j.getObjType(data_date) == 'array') {
                        return formula.undefined.v;
                    } else if (j.getObjType(data_date) == 'object' && data_date.startCell != null) {
                        if (data_date.data != null && j.getObjType(data_date.data) != 'array' && data_date.data.ct != null && data_date.data.ct.t == 'd') {
                            date = g.update('yyyy-mm-dd', data_date.data.v);
                        } else {
                            return formula.undefined.v;
                        }
                    } else {
                        date = data_date;
                    }
                    if (!d.isdatetime(date)) {
                        return [
                            formula.undefined.v,
                            '日期错误'
                        ];
                    }
                    date = dayjs(date).format('YYYY-MM-DD');
                }
                var price = 0;
                if (arguments[2] != null) {
                    price = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(price)) {
                        return price;
                    }
                }
                if (!e.isRealNum(price)) {
                    return formula.undefined.v;
                }
                price = parseInt(price);
                if (price != 0 && price != 1 && price != 2) {
                    return formula.undefined.v;
                }
                $.post('/dataqk/tu/api/getstockinfo', {
                    'stockCode': stockcode,
                    'date': date,
                    'price': price,
                    type: '2'
                }, function (data) {
                    var d = editor.deepCopyFlowData(Store.flowdata);
                    formula.execFunctionGroup(cell_r, cell_c, data);
                    d[cell_r][cell_c] = {
                        'v': data,
                        'f': cell_fp
                    };
                    f.jfrefreshgrid(d, [{
                            'row': [
                                cell_r,
                                cell_r
                            ],
                            'column': [
                                cell_c,
                                cell_c
                            ]
                        }]);
                });
                return 'loading...';
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DATA_CN_STOCK_MIN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var stockcode = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(stockcode)) {
                    return stockcode;
                }
                var date = null;
                if (arguments[1] != null) {
                    var data_date = arguments[1];
                    if (j.getObjType(data_date) == 'array') {
                        return formula.undefined.v;
                    } else if (j.getObjType(data_date) == 'object' && data_date.startCell != null) {
                        if (data_date.data != null && j.getObjType(data_date.data) != 'array' && data_date.data.ct != null && data_date.data.ct.t == 'd') {
                            date = g.update('yyyy-mm-dd', data_date.data.v);
                        } else {
                            return formula.undefined.v;
                        }
                    } else {
                        date = data_date;
                    }
                    if (!d.isdatetime(date)) {
                        return [
                            formula.undefined.v,
                            '日期错误'
                        ];
                    }
                    date = dayjs(date).format('YYYY-MM-DD');
                }
                var price = 0;
                if (arguments[2] != null) {
                    price = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(price)) {
                        return price;
                    }
                }
                if (!e.isRealNum(price)) {
                    return formula.undefined.v;
                }
                price = parseInt(price);
                if (price != 0 && price != 1 && price != 2) {
                    return formula.undefined.v;
                }
                $.post('/dataqk/tu/api/getstockinfo', {
                    'stockCode': stockcode,
                    'date': date,
                    'price': price,
                    type: '3'
                }, function (data) {
                    var d = editor.deepCopyFlowData(Store.flowdata);
                    formula.execFunctionGroup(cell_r, cell_c, data);
                    d[cell_r][cell_c] = {
                        'v': data,
                        'f': cell_fp
                    };
                    f.jfrefreshgrid(d, [{
                            'row': [
                                cell_r,
                                cell_r
                            ],
                            'column': [
                                cell_c,
                                cell_c
                            ]
                        }]);
                });
                return 'loading...';
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DATA_CN_STOCK_VOLUMN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var stockcode = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(stockcode)) {
                    return stockcode;
                }
                var date = null;
                if (arguments[1] != null) {
                    var data_date = arguments[1];
                    if (j.getObjType(data_date) == 'array') {
                        return formula.undefined.v;
                    } else if (j.getObjType(data_date) == 'object' && data_date.startCell != null) {
                        if (data_date.data != null && j.getObjType(data_date.data) != 'array' && data_date.data.ct != null && data_date.data.ct.t == 'd') {
                            date = g.update('yyyy-mm-dd', data_date.data.v);
                        } else {
                            return formula.undefined.v;
                        }
                    } else {
                        date = data_date;
                    }
                    if (!d.isdatetime(date)) {
                        return [
                            formula.undefined.v,
                            '日期错误'
                        ];
                    }
                    date = dayjs(date).format('YYYY-MM-DD');
                }
                var price = 0;
                if (arguments[2] != null) {
                    price = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(price)) {
                        return price;
                    }
                }
                if (!e.isRealNum(price)) {
                    return formula.undefined.v;
                }
                price = parseInt(price);
                if (price != 0 && price != 1 && price != 2) {
                    return formula.undefined.v;
                }
                $.post('/dataqk/tu/api/getstockinfo', {
                    'stockCode': stockcode,
                    'date': date,
                    'price': price,
                    type: '4'
                }, function (data) {
                    var d = editor.deepCopyFlowData(Store.flowdata);
                    formula.execFunctionGroup(cell_r, cell_c, data);
                    d[cell_r][cell_c] = {
                        'v': data,
                        'f': cell_fp
                    };
                    f.jfrefreshgrid(d, [{
                            'row': [
                                cell_r,
                                cell_r
                            ],
                            'column': [
                                cell_c,
                                cell_c
                            ]
                        }]);
                });
                return 'loading...';
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DATA_CN_STOCK_AMOUNT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var stockcode = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(stockcode)) {
                    return stockcode;
                }
                var date = null;
                if (arguments[1] != null) {
                    var data_date = arguments[1];
                    if (j.getObjType(data_date) == 'array') {
                        return formula.undefined.v;
                    } else if (j.getObjType(data_date) == 'object' && data_date.startCell != null) {
                        if (data_date.data != null && j.getObjType(data_date.data) != 'array' && data_date.data.ct != null && data_date.data.ct.t == 'd') {
                            date = g.update('yyyy-mm-dd', data_date.data.v);
                        } else {
                            return formula.undefined.v;
                        }
                    } else {
                        date = data_date;
                    }
                    if (!d.isdatetime(date)) {
                        return [
                            formula.undefined.v,
                            '日期错误'
                        ];
                    }
                    date = dayjs(date).format('YYYY-MM-DD');
                }
                var price = 0;
                if (arguments[2] != null) {
                    price = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(price)) {
                        return price;
                    }
                }
                if (!e.isRealNum(price)) {
                    return formula.undefined.v;
                }
                price = parseInt(price);
                if (price != 0 && price != 1 && price != 2) {
                    return formula.undefined.v;
                }
                $.post('/dataqk/tu/api/getstockinfo', {
                    'stockCode': stockcode,
                    'date': date,
                    'price': price,
                    type: '5'
                }, function (data) {
                    var d = editor.deepCopyFlowData(Store.flowdata);
                    formula.execFunctionGroup(cell_r, cell_c, data);
                    d[cell_r][cell_c] = {
                        'v': data,
                        'f': cell_fp
                    };
                    f.jfrefreshgrid(d, [{
                            'row': [
                                cell_r,
                                cell_r
                            ],
                            'column': [
                                cell_c,
                                cell_c
                            ]
                        }]);
                });
                return 'loading...';
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ISDATE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var date = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(date)) {
                    return date;
                }
                return d.isdatetime(date);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SUMIF': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var sum = 0;
                var rangeData = arguments[0].data;
                var rangeRow = arguments[0].rowl;
                var rangeCol = arguments[0].coll;
                var criteria = a.luckysheet_parseData(arguments[1]);
                rangeData = formula.getRangeArray(rangeData)[0];
                if (arguments[2]) {
                    var sumRangeData = [];
                    var sumRangeStart = arguments[2].startCell;
                    var sumRangeRow = arguments[2].rowl;
                    var sumRangeCol = arguments[2].coll;
                    var sumRangeSheet = arguments[2].sheetName;
                    if (rangeRow == sumRangeRow && rangeCol == sumRangeCol) {
                        sumRangeData = arguments[2].data;
                    } else {
                        var row = [], col = [];
                        var sumRangeEnd = '';
                        var realSumRange = '';
                        row[0] = parseInt(sumRangeStart.replace(/[^0-9]/g, '')) - 1;
                        col[0] = j.ABCatNum(sumRangeStart.replace(/[^A-Za-z]/g, ''));
                        row[1] = row[0] + rangeRow - 1;
                        col[1] = col[0] + rangeCol - 1;
                        var real_ABC = j.chatatABC(col[1]);
                        var real_Num = row[1] + 1;
                        sumRangeEnd = real_ABC + real_Num;
                        realSumRange = sumRangeSheet + '!' + sumRangeStart + ':' + sumRangeEnd;
                        sumRangeData = a.luckysheet_getcelldata(realSumRange).data;
                    }
                    sumRangeData = formula.getRangeArray(sumRangeData)[0];
                    for (var i = 0; i < rangeData.length; i++) {
                        var v = rangeData[i];
                        if (!!v && formula.acompareb(v, criteria)) {
                            if (!e.isRealNum(sumRangeData[i])) {
                                continue;
                            }
                            sum = luckysheet_calcADPMM(sum, '+', sumRangeData[i]);
                        }
                    }
                } else {
                    for (var i = 0; i < rangeData.length; i++) {
                        var v = rangeData[i];
                        if (!!v && formula.acompareb(v, criteria)) {
                            if (!e.isRealNum(v)) {
                                continue;
                            }
                            sum = luckysheet_calcADPMM(sum, '', v);
                        }
                    }
                }
                return sum;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TAN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                return Math.tan(number);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TANH': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var e2 = Math.exp(2 * number);
                return (e2 - 1) / (e2 + 1);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'CEILING': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var significance = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(significance)) {
                    return significance;
                }
                if (!e.isRealNum(significance)) {
                    return formula.undefined.v;
                }
                significance = parseFloat(significance);
                if (significance == 0) {
                    return 0;
                }
                if (number > 0 && significance < 0) {
                    return formula.undefined.nm;
                }
                return Math.ceil(number / significance) * significance;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ATAN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                return Math.atan(number);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ASINH': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                return Math.log(number + Math.sqrt(number * number + 1));
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ABS': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                return Math.abs(number);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ACOS': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                if (number < -1 || number > 1) {
                    return formula.undefined.nm;
                }
                return Math.acos(number);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ACOSH': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                if (number < 1) {
                    return formula.undefined.nm;
                }
                return Math.log(number + Math.sqrt(number * number - 1));
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MULTINOMIAL': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        dataArr.push(data);
                    }
                }
                var sum = 0, divisor = 1;
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (!e.isRealNum(number)) {
                        return formula.undefined.v;
                    }
                    number = parseFloat(number);
                    if (number < 0) {
                        return formula.undefined.nm;
                    }
                    sum += number;
                    divisor *= func_methods.factorial(number);
                }
                return func_methods.factorial(sum) / divisor;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ATANH': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                if (number <= -1 || number >= 1) {
                    return formula.undefined.nm;
                }
                return Math.log((1 + number) / (1 - number)) / 2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ATAN2': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number_x = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number_x)) {
                    return number_x;
                }
                if (!e.isRealNum(number_x)) {
                    return formula.undefined.v;
                }
                number_x = parseFloat(number_x);
                var number_y = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(number_y)) {
                    return number_y;
                }
                if (!e.isRealNum(number_y)) {
                    return formula.undefined.v;
                }
                number_y = parseFloat(number_y);
                if (number_x == 0 && number_y == 0) {
                    return formula.undefined.d;
                }
                return Math.atan2(number_y, number_x);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COUNTBLANK': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data = arguments[0];
                var sum = 0;
                if (j.getObjType(data) == 'object' && data.startCell != null) {
                    if (data.data == null) {
                        return 1;
                    }
                    if (j.getObjType(data.data) == 'array') {
                        for (var r = 0; r < data.data.length; r++) {
                            for (var c = 0; c < data.data[r].length; c++) {
                                if (data.data[r][c] == null || e.isRealNull(data.data[r][c].v)) {
                                    sum++;
                                }
                            }
                        }
                    } else {
                        if (e.isRealNull(data.data.v)) {
                            sum++;
                        }
                    }
                }
                return sum;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COSH': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                return (Math.exp(number) + Math.exp(-number)) / 2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'INT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data = arguments[0];
                if (j.getObjType(data) == 'array') {
                    if (j.getObjType(data[0]) == 'array') {
                        if (!func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        if (!e.isRealNum(data[0][0])) {
                            return formula.undefined.v;
                        }
                        return Math.floor(parseFloat(data[0][0]));
                    } else {
                        if (!e.isRealNum(data[0])) {
                            return formula.undefined.v;
                        }
                        return Math.floor(parseFloat(data[0]));
                    }
                } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                    if (data.coll > 1) {
                        return formula.undefined.v;
                    }
                    if (data.rowl > 1) {
                        var cellrange = formula.getcellrange(data.startCell);
                        var str = cellrange.row[0];
                        if (window.luckysheetCurrentRow < str || window.luckysheetCurrentRow > str + data.rowl - 1) {
                            return formula.undefined.v;
                        }
                        var cell = data.data[window.luckysheetCurrentRow - str][0];
                    } else {
                        var cell = data.data;
                    }
                    if (cell == null || e.isRealNull(cell.v)) {
                        return 0;
                    }
                    if (!e.isRealNum(cell.v)) {
                        return formula.undefined.v;
                    }
                    return Math.floor(parseFloat(cell.v));
                } else {
                    if (j.getObjType(data) == 'boolean') {
                        if (data.toString().toLowerCase() == 'true') {
                            return 1;
                        }
                        if (data.toString().toLowerCase() == 'false') {
                            return 0;
                        }
                    }
                    if (!e.isRealNum(data)) {
                        return formula.undefined.v;
                    }
                    return Math.floor(parseFloat(data));
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ISEVEN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseInt(number);
                return Math.abs(number) & 1 ? false : true;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ISODD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseInt(number);
                return Math.abs(number) & 1 ? true : false;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'LCM': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var o = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array') {
                            if (!func_methods.isDyadicArr(data)) {
                                return formula.undefined.v;
                            }
                            o = o.concat(func_methods.getDataArr(data));
                        } else {
                            o = o.concat(data);
                        }
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        o = o.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        o.push(data);
                    }
                }
                for (var y = 0; y < o.length; y++) {
                    var number = o[y];
                    if (!e.isRealNum(number)) {
                        return formula.undefined.v;
                    }
                    number = parseInt(number);
                    if (number < 0) {
                        return formula.undefined.nm;
                    }
                    o[y] = number;
                }
                for (var i, j, n, d, r = 1; (n = o.pop()) !== undefined;) {
                    if (n == 0) {
                        r = 0;
                    }
                    while (n > 1) {
                        if (n % 2) {
                            for (i = 3, j = Math.floor(Math.sqrt(n)); i <= j && n % i; i += 2) {
                            }
                            d = i <= j ? i : n;
                        } else {
                            d = 2;
                        }
                        for (n /= d, r *= d, i = o.length; i; o[--i] % d === 0 && (o[i] /= d) === 1 && o.splice(i, 1)) {
                        }
                    }
                }
                if (r >= Math.pow(2, 53)) {
                    return formula.undefined.nm;
                }
                return r;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'LN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                if (number <= 0) {
                    return formula.undefined.nm;
                }
                return Math.log(number);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'LOG': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                if (number <= 0) {
                    return formula.undefined.nm;
                }
                if (arguments.length == 2) {
                    var base = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(base)) {
                        return base;
                    }
                    if (!e.isRealNum(base)) {
                        return formula.undefined.v;
                    }
                    base = parseFloat(base);
                    if (base <= 0) {
                        return formula.undefined.nm;
                    }
                } else {
                    var base = 10;
                }
                return Math.log(number) / Math.log(base);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'LOG10': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                if (number <= 0) {
                    return formula.undefined.nm;
                }
                return Math.log(number) / Math.log(10);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MOD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var divisor = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(divisor)) {
                    return divisor;
                }
                if (!e.isRealNum(divisor)) {
                    return formula.undefined.v;
                }
                divisor = parseFloat(divisor);
                if (divisor == 0) {
                    return formula.undefined.d;
                }
                var modulus = Math.abs(number % divisor);
                return divisor > 0 ? modulus : -modulus;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MROUND': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var multiple = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(multiple)) {
                    return multiple;
                }
                if (!e.isRealNum(multiple)) {
                    return formula.undefined.v;
                }
                multiple = parseFloat(multiple);
                if (number * multiple < 0) {
                    return formula.undefined.nm;
                }
                return Math.round(number / multiple) * multiple;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ODD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var temp = Math.ceil(Math.abs(number));
                temp = temp & 1 ? temp : temp + 1;
                return number >= 0 ? temp : -temp;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SUMSQ': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        dataArr.push(data);
                    }
                }
                var sum = 0;
                if (dataArr.length > 0) {
                    for (var i = 0; i < dataArr.length; i++) {
                        var number = dataArr[i];
                        if (!e.isRealNum(number)) {
                            return formula.undefined.v;
                        }
                        number = parseFloat(number);
                        sum += number * number;
                    }
                }
                return sum;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COMBIN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseInt(number);
                var number_chosen = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(number_chosen)) {
                    return number_chosen;
                }
                if (!e.isRealNum(number_chosen)) {
                    return formula.undefined.v;
                }
                number_chosen = parseInt(number_chosen);
                if (number < 0 || number_chosen < 0 || number < number_chosen) {
                    return formula.undefined.nm;
                }
                return func_methods.factorial(number) / (func_methods.factorial(number_chosen) * func_methods.factorial(number - number_chosen));
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SUBTOTAL': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_function_num = arguments[0];
                var function_num;
                if (j.getObjType(data_function_num) == 'array') {
                    if (j.getObjType(data_function_num[0]) == 'array') {
                        if (!func_methods.isDyadicArr(data_function_num)) {
                            return formula.undefined.v;
                        }
                        function_num = [];
                        for (var i = 0; i < data_function_num.length; i++) {
                            var rowArr = [];
                            for (var j = 0; j < data_function_num[i].length; j++) {
                                rowArr.push(data_function_num[i][j]);
                            }
                            function_num.push(rowArr);
                        }
                    } else {
                        function_num = [];
                        for (var i = 0; i < data_function_num.length; i++) {
                            function_num.push(data_function_num[i]);
                        }
                    }
                } else if (j.getObjType(data_function_num) == 'object' && data_function_num.startCell != null) {
                    function_num = func_methods.getFirstValue(data_function_num);
                } else {
                    function_num = data_function_num;
                }
                var arr = Array.prototype.slice.apply(arguments);
                arr.shift();
                if (j.getObjType(function_num) == 'array') {
                    var result = [];
                    if (j.getObjType(function_num[0]) == 'array') {
                        for (var i = 0; i < function_num.length; i++) {
                            var rowArr = [];
                            for (var j = 0; j < function_num[i].length; j++) {
                                var value = function_num[i][j];
                                if (e.valueIsError(value)) {
                                    rowArr.push(value);
                                } else if (!e.isRealNum(value)) {
                                    rowArr.push(formula.undefined.v);
                                } else {
                                    value = parseInt(value);
                                    if (value < 1 || value > 111 || value > 11 && value < 101) {
                                        rowArr.push(formula.undefined.v);
                                    } else {
                                        rowArr.push(compute(value));
                                    }
                                }
                            }
                            result.push(rowArr);
                        }
                    } else {
                        for (var i = 0; i < function_num.length; i++) {
                            var value = function_num[i];
                            if (e.valueIsError(value)) {
                                result.push(value);
                            } else if (!e.isRealNum(value)) {
                                result.push(formula.undefined.v);
                            } else {
                                value = parseInt(value);
                                if (value < 1 || value > 111 || value > 11 && value < 101) {
                                    result.push(formula.undefined.v);
                                } else {
                                    result.push(compute(value));
                                }
                            }
                        }
                    }
                    return result;
                } else {
                    if (e.valueIsError(function_num)) {
                        return function_num;
                    }
                    if (!e.isRealNum(function_num)) {
                        return formula.undefined.v;
                    }
                    function_num = parseInt(function_num);
                    if (function_num < 1 || function_num > 111 || function_num > 11 && function_num < 101) {
                        return formula.undefined.v;
                    }
                    return compute(function_num);
                }
                function compute(function_num) {
                    switch (function_num) {
                    case 1:
                    case 101:
                        return window.luckysheet_function.AVERAGE.f.apply(window.luckysheet_function.AVERAGE, arr);
                        break;
                    case 2:
                    case 102:
                        return window.luckysheet_function.COUNT.f.apply(window.luckysheet_function.COUNT, arr);
                        break;
                    case 3:
                    case 103:
                        return window.luckysheet_function.COUNTA.f.apply(window.luckysheet_function.COUNTA, arr);
                        break;
                    case 4:
                    case 104:
                        return window.luckysheet_function.MAX.f.apply(window.luckysheet_function.MAX, arr);
                        break;
                    case 5:
                    case 105:
                        return window.luckysheet_function.MIN.f.apply(window.luckysheet_function.MIN, arr);
                        break;
                    case 6:
                    case 106:
                        return window.luckysheet_function.PRODUCT.f.apply(window.luckysheet_function.PRODUCT, arr);
                        break;
                    case 7:
                    case 107:
                        return window.luckysheet_function.STDEVA.f.apply(window.luckysheet_function.STDEVA, arr);
                        break;
                    case 8:
                    case 108:
                        return window.luckysheet_function.STDEVP.f.apply(window.luckysheet_function.STDEVP, arr);
                        break;
                    case 9:
                    case 109:
                        return window.luckysheet_function.SUM.f.apply(window.luckysheet_function.SUM, arr);
                        break;
                    case 10:
                    case 110:
                        return window.luckysheet_function.VAR_S.f.apply(window.luckysheet_function.VAR_S, arr);
                        break;
                    case 11:
                    case 111:
                        return window.luckysheet_function.VAR_P.f.apply(window.luckysheet_function.VAR_P, arr);
                        break;
                    }
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ASIN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                if (number < -1 || number > 1) {
                    return formula.undefined.nm;
                }
                return Math.asin(number);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COUNTIF': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_range = arguments[0];
                var range;
                if (j.getObjType(data_range) == 'object' && data_range.startCell != null) {
                    range = data_range.data;
                } else {
                    return formula.undefined.v;
                }
                var data_criteria = arguments[1];
                var criteria;
                if (j.getObjType(data_criteria) == 'array') {
                    criteria = [];
                    if (j.getObjType(data_criteria[0]) == 'array') {
                        if (!func_methods.isDyadicArr(data_criteria)) {
                            return formula.undefined.v;
                        }
                        for (var i = 0; i < data_criteria.length; i++) {
                            var rowArr = [];
                            for (var j = 0; j < data_criteria[i].length; j++) {
                                rowArr.push(data_criteria[i][j]);
                            }
                            criteria.push(rowArr);
                        }
                    } else {
                        for (var i = 0; i < data_criteria.length; i++) {
                            criteria.push(data_criteria[i]);
                        }
                    }
                } else if (j.getObjType(data_criteria) == 'object' && data_criteria.startCell != null) {
                    if (data_criteria.rowl > 1 || data_criteria.coll > 1) {
                        return 0;
                    }
                    criteria = data_criteria.data.v;
                } else {
                    criteria = data_criteria;
                }
                if (j.getObjType(criteria) == 'array') {
                    var result = [];
                    if (j.getObjType(criteria[0]) == 'array') {
                        for (var i = 0; i < criteria.length; i++) {
                            var rowArr = [];
                            for (var j = 0; j < criteria[i].length; j++) {
                                rowArr.push(getCriteriaResult(range, criteria[i][j]));
                            }
                            result.push(rowArr);
                        }
                    } else {
                        for (var i = 0; i < criteria.length; i++) {
                            result.push(getCriteriaResult(range, criteria[i]));
                        }
                    }
                    return result;
                } else {
                    return getCriteriaResult(range, criteria);
                }
                function getCriteriaResult(range, criter) {
                    if (!/[<>=!*?]/.test(criter)) {
                        criter = '=="' + criter + '"';
                    }
                    criter = criter.replace('<>', '!=');
                    var matches = 0;
                    if (j.getObjType(range) == 'array') {
                        for (var i = 0; i < range.length; i++) {
                            for (var j = 0; j < range[i].length; j++) {
                                if (range[i][j] != null && !e.isRealNull(range[i][j].v)) {
                                    var value = range[i][j].v;
                                    if (criter.indexOf('*') > -1 || criter.indexOf('?') > -1) {
                                        if (formula.isWildcard(value, criter)) {
                                            matches++;
                                        }
                                    } else {
                                        if (typeof value !== 'string') {
                                            if (new Function('return ' + value + criter)()) {
                                                matches++;
                                            }
                                        } else {
                                            if (new Function('return ' + '"' + value + '"' + criter)()) {
                                                matches++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (range != null && !e.isRealNull(range.v)) {
                            var value = range.v;
                            if (criter.indexOf('*') > -1 || criter.indexOf('?') > -1) {
                                if (formula.isWildcard(value, criter)) {
                                    matches++;
                                }
                            } else {
                                if (typeof value !== 'string') {
                                    if (new Function('return ' + value + criter)()) {
                                        matches++;
                                    }
                                } else {
                                    if (new Function('return ' + '"' + value + '"' + criter)()) {
                                        matches++;
                                    }
                                }
                            }
                        }
                    }
                    return matches;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'RADIANS': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                return number * Math.PI / 180;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'RAND': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            try {
                return Math.floor(Math.random() * 1000000000) / 1000000000;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COUNTUNIQUE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'text', true));
                    } else {
                        dataArr.push(data);
                    }
                }
                return window.luckysheet_function.UNIQUE.f(dataArr);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DEGREES': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                return number * 180 / Math.PI;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ERFC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                return jStat.erfc(number);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'EVEN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var temp = Math.ceil(Math.abs(number));
                temp = temp & 1 ? temp + 1 : temp;
                return number > 0 ? temp : -temp;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'EXP': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                return Math.exp(number);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'FACT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    if (j.getObjType(number) == 'boolean') {
                        if (number.toString().toLowerCase() == 'true') {
                            number = 1;
                        } else if (number.toString().toLowerCase() == 'false') {
                            number = 0;
                        }
                    } else {
                        return formula.undefined.v;
                    }
                }
                number = parseInt(number);
                if (number < 0) {
                    return formula.undefined.nm;
                }
                return func_methods.factorial(number);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'FACTDOUBLE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    if (j.getObjType(number) == 'boolean') {
                        if (number.toString().toLowerCase() == 'true') {
                            number = 1;
                        } else if (number.toString().toLowerCase() == 'false') {
                            number = 0;
                        }
                    } else {
                        return formula.undefined.v;
                    }
                }
                number = parseInt(number);
                if (number < 0) {
                    return formula.undefined.nm;
                }
                return func_methods.factorialDouble(number);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PI': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            try {
                return Math.PI;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'FLOOR': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var significance = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(significance)) {
                    return significance;
                }
                if (!e.isRealNum(significance)) {
                    return formula.undefined.v;
                }
                significance = parseFloat(significance);
                if (significance == 0) {
                    return formula.undefined.d;
                }
                if (number > 0 && significance < 0) {
                    return formula.undefined.nm;
                }
                var precision = -Math.floor(Math.log(Math.abs(significance)) / Math.log(10));
                if (number >= 0) {
                    return Math.floor(number / significance) * significance * Math.pow(10, precision) / Math.pow(10, precision);
                } else {
                    return -(Math.ceil(Math.abs(number) / significance) * significance * Math.pow(10, precision)) / Math.pow(10, precision);
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'GCD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, false));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', false));
                    } else {
                        dataArr.push(data);
                    }
                }
                if (!e.isRealNum(dataArr[0])) {
                    return formula.undefined.v;
                }
                var x = parseInt(dataArr[0]);
                if (x < 0 || x >= Math.pow(2, 53)) {
                    return formula.undefined.nm;
                }
                for (var i = 1; i < dataArr.length; i++) {
                    var y = dataArr[i];
                    if (!e.isRealNum(y)) {
                        return formula.undefined.v;
                    }
                    y = parseInt(y);
                    if (y < 0 || y >= Math.pow(2, 53)) {
                        return formula.undefined.nm;
                    }
                    while (x && y) {
                        if (x > y) {
                            x %= y;
                        } else {
                            y %= x;
                        }
                    }
                    x += y;
                }
                return x;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'RANDBETWEEN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var bottom = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(bottom)) {
                    return bottom;
                }
                if (!e.isRealNum(bottom)) {
                    return formula.undefined.v;
                }
                bottom = parseInt(bottom);
                var top = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(top)) {
                    return top;
                }
                if (!e.isRealNum(top)) {
                    return formula.undefined.v;
                }
                top = parseInt(top);
                if (bottom > top) {
                    return formula.undefined.nm;
                }
                return bottom + Math.ceil((top - bottom + 1) * Math.random()) - 1;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ROUND': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var digits = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(digits)) {
                    return digits;
                }
                if (!e.isRealNum(digits)) {
                    return formula.undefined.v;
                }
                digits = parseInt(digits);
                var sign = number > 0 ? 1 : -1;
                return sign * Math.round(Math.abs(number) * Math.pow(10, digits)) / Math.pow(10, digits);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ROUNDDOWN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var digits = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(digits)) {
                    return digits;
                }
                if (!e.isRealNum(digits)) {
                    return formula.undefined.v;
                }
                digits = parseInt(digits);
                var sign = number > 0 ? 1 : -1;
                return sign * Math.floor(Math.abs(number) * Math.pow(10, digits)) / Math.pow(10, digits);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ROUNDUP': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var digits = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(digits)) {
                    return digits;
                }
                if (!e.isRealNum(digits)) {
                    return formula.undefined.v;
                }
                digits = parseInt(digits);
                var sign = number > 0 ? 1 : -1;
                return sign * Math.ceil(Math.abs(number) * Math.pow(10, digits)) / Math.pow(10, digits);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SERIESSUM': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(x)) {
                    return x;
                }
                if (!e.isRealNum(x)) {
                    return formula.undefined.v;
                }
                x = parseFloat(x);
                var n = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(n)) {
                    return n;
                }
                if (!e.isRealNum(n)) {
                    return formula.undefined.v;
                }
                n = parseFloat(n);
                var m = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(m)) {
                    return m;
                }
                if (!e.isRealNum(m)) {
                    return formula.undefined.v;
                }
                m = parseFloat(m);
                var data_coefficients = arguments[3];
                var coefficients = [];
                if (j.getObjType(data_coefficients) == 'array') {
                    if (j.getObjType(data_coefficients[0]) == 'array' && !func_methods.isDyadicArr(data_coefficients)) {
                        return formula.undefined.v;
                    }
                    coefficients = coefficients.concat(func_methods.getDataArr(data_coefficients, false));
                } else if (j.getObjType(data_coefficients) == 'object' && data_coefficients.startCell != null) {
                    coefficients = coefficients.concat(func_methods.getCellDataArr(data_coefficients, 'number', false));
                } else {
                    coefficients.push(data_coefficients);
                }
                if (!e.isRealNum(coefficients[0])) {
                    return formula.undefined.v;
                }
                var result = parseFloat(coefficients[0]) * Math.pow(x, n);
                for (var i = 1; i < coefficients.length; i++) {
                    var number = coefficients[i];
                    if (!e.isRealNum(number)) {
                        return formula.undefined.v;
                    }
                    number = parseFloat(number);
                    result += number * Math.pow(x, n + i * m);
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SIGN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                if (number > 0) {
                    return 1;
                } else if (number == 0) {
                    return 0;
                } else if (number < 0) {
                    return -1;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SIN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                return Math.sin(number);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SINH': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                return (Math.exp(number) - Math.exp(-number)) / 2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SQRT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                if (number < 0) {
                    return formula.undefined.nm;
                }
                return Math.sqrt(number);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SQRTPI': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                if (number < 0) {
                    return formula.undefined.nm;
                }
                return Math.sqrt(number * Math.PI);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'GAMMALN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                if (number <= 0) {
                    return formula.undefined.nm;
                }
                return jStat.gammaln(number);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COS': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                return Math.cos(number);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TRUNC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                if (arguments.length == 2) {
                    var digits = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(digits)) {
                        return digits;
                    }
                    if (!e.isRealNum(digits)) {
                        return formula.undefined.v;
                    }
                    digits = parseInt(digits);
                } else {
                    var digits = 0;
                }
                var sign = number > 0 ? 1 : -1;
                return sign * Math.floor(Math.abs(number) * Math.pow(10, digits)) / Math.pow(10, digits);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'QUOTIENT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var numerator = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(numerator)) {
                    return numerator;
                }
                if (!e.isRealNum(numerator)) {
                    return formula.undefined.v;
                }
                numerator = parseFloat(numerator);
                var denominator = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(denominator)) {
                    return denominator;
                }
                if (!e.isRealNum(denominator)) {
                    return formula.undefined.v;
                }
                denominator = parseFloat(denominator);
                if (denominator == 0) {
                    return formula.undefined.d;
                }
                return parseInt(numerator / denominator, 10);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'POWER': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var power = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(power)) {
                    return power;
                }
                if (!e.isRealNum(power)) {
                    return formula.undefined.v;
                }
                power = parseFloat(power);
                if (number == 0 && power == 0) {
                    return formula.undefined.nm;
                }
                if (number < 0 && power.toString().indexOf('.') > -1) {
                    return formula.undefined.nm;
                }
                return Math.pow(number, power);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SUMIFS': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var sum = 0;
                var args = arguments;
                a.luckysheet_getValue(args);
                var rangeData = formula.getRangeArray(args[0])[0];
                var results = new Array(rangeData.length);
                for (var i = 0; i < results.length; i++) {
                    results[i] = true;
                }
                for (var i = 1; i < args.length; i += 2) {
                    var range = formula.getRangeArray(args[i])[0];
                    var criteria = args[i + 1];
                    for (var j = 0; j < range.length; j++) {
                        var v = range[j];
                        results[j] = results[j] && !!v && formula.acompareb(v, criteria);
                    }
                }
                for (var i = 0; i < rangeData.length; i++) {
                    if (results[i]) {
                        sum = luckysheet_calcADPMM(sum, '+', rangeData[i]);
                    }
                }
                return sum;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COUNTIFS': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var args = arguments;
                a.luckysheet_getValue(args);
                var results = new Array(formula.getRangeArray(args[0])[0].length);
                for (var i = 0; i < results.length; i++) {
                    results[i] = true;
                }
                for (var i = 0; i < args.length; i += 2) {
                    var range = formula.getRangeArray(args[i])[0];
                    var criteria = args[i + 1];
                    for (var j = 0; j < range.length; j++) {
                        var v = range[j];
                        results[j] = results[j] && !!v && formula.acompareb(v, criteria);
                    }
                }
                var result = 0;
                for (var i = 0; i < results.length; i++) {
                    if (results[i]) {
                        result++;
                    }
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PRODUCT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        dataArr.push(data);
                    }
                }
                var result = 1;
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (!e.isRealNum(number)) {
                        return formula.undefined.v;
                    }
                    number = parseFloat(number);
                    result *= number;
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'HARMEAN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        dataArr.push(data);
                    }
                }
                var den = 0, len = 0;
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (!e.isRealNum(number)) {
                        return formula.undefined.v;
                    }
                    number = parseFloat(number);
                    if (number <= 0) {
                        return formula.undefined.nm;
                    }
                    den += 1 / number;
                    len++;
                }
                return len / den;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'HYPGEOMDIST': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var sample_s = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(sample_s)) {
                    return sample_s;
                }
                if (!e.isRealNum(sample_s)) {
                    return formula.undefined.v;
                }
                sample_s = parseInt(sample_s);
                var number_sample = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(number_sample)) {
                    return number_sample;
                }
                if (!e.isRealNum(number_sample)) {
                    return formula.undefined.v;
                }
                number_sample = parseInt(number_sample);
                var population_s = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(population_s)) {
                    return population_s;
                }
                if (!e.isRealNum(population_s)) {
                    return formula.undefined.v;
                }
                population_s = parseInt(population_s);
                var number_pop = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(number_pop)) {
                    return number_pop;
                }
                if (!e.isRealNum(number_pop)) {
                    return formula.undefined.v;
                }
                number_pop = parseInt(number_pop);
                var cumulative = func_methods.getCellBoolen(arguments[4]);
                if (e.valueIsError(cumulative)) {
                    return cumulative;
                }
                if (sample_s < 0 || sample_s > Math.min(number_sample, population_s) || sample_s < Math.max(0, number_sample - number_pop + population_s)) {
                    return formula.undefined.nm;
                }
                if (number_sample <= 0 || number_sample > number_pop) {
                    return formula.undefined.nm;
                }
                if (population_s <= 0 || population_s > number_pop) {
                    return formula.undefined.nm;
                }
                if (number_pop <= 0) {
                    return formula.undefined.nm;
                }
                function pdf(x, n, M, N) {
                    var a = func_methods.factorial(M) / (func_methods.factorial(x) * func_methods.factorial(M - x));
                    var b = func_methods.factorial(N - M) / (func_methods.factorial(n - x) * func_methods.factorial(N - M - n + x));
                    var c = func_methods.factorial(N) / (func_methods.factorial(n) * func_methods.factorial(N - n));
                    return a * b / c;
                }
                function cdf(x, n, M, N) {
                    var sum = 0;
                    for (var i = 0; i <= x; i++) {
                        sum += pdf(i, n, M, N);
                    }
                    return sum;
                }
                return cumulative ? cdf(sample_s, number_sample, population_s, number_pop) : pdf(sample_s, number_sample, population_s, number_pop);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'INTERCEPT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = 0;
                var data_known_y = arguments[0];
                var known_y = [];
                if (j.getObjType(data_known_y) == 'array') {
                    if (j.getObjType(data_known_y[0]) == 'array' && !func_methods.isDyadicArr(data_known_y)) {
                        return formula.undefined.v;
                    }
                    known_y = known_y.concat(func_methods.getDataArr(data_known_y, false));
                } else if (j.getObjType(data_known_y) == 'object' && data_known_y.startCell != null) {
                    known_y = known_y.concat(func_methods.getCellDataArr(data_known_y, 'text', false));
                } else {
                    known_y.push(data_known_y);
                }
                var data_known_x = arguments[1];
                var known_x = [];
                if (j.getObjType(data_known_x) == 'array') {
                    if (j.getObjType(data_known_x[0]) == 'array' && !func_methods.isDyadicArr(data_known_x)) {
                        return formula.undefined.v;
                    }
                    known_x = known_x.concat(func_methods.getDataArr(data_known_x, false));
                } else if (j.getObjType(data_known_x) == 'object' && data_known_x.startCell != null) {
                    known_x = known_x.concat(func_methods.getCellDataArr(data_known_x, 'text', false));
                } else {
                    known_x.push(data_known_x);
                }
                if (known_y.length != known_x.length) {
                    return formula.undefined.na;
                }
                var data_y = [], data_x = [];
                for (var i = 0; i < known_y.length; i++) {
                    var num_y = known_y[i];
                    var num_x = known_x[i];
                    if (e.isRealNum(num_y) && e.isRealNum(num_x)) {
                        data_y.push(parseFloat(num_y));
                        data_x.push(parseFloat(num_x));
                    }
                }
                if (func_methods.variance_s(data_x) == 0) {
                    return formula.undefined.d;
                }
                var xmean = jStat.mean(data_x);
                var ymean = jStat.mean(data_y);
                var n = data_x.length;
                var num = 0;
                var den = 0;
                for (var i = 0; i < n; i++) {
                    num += (data_x[i] - xmean) * (data_y[i] - ymean);
                    den += Math.pow(data_x[i] - xmean, 2);
                }
                var b = num / den;
                var a = ymean - b * xmean;
                return a + b * x;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'KURT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'text', true));
                    } else {
                        dataArr.push(data);
                    }
                }
                var dataArr_n = [];
                for (var j = 0; j < dataArr.length; j++) {
                    var number = dataArr[j];
                    if (!e.isRealNum(number)) {
                        return formula.undefined.v;
                    }
                    number = parseFloat(number);
                    dataArr_n.push(number);
                }
                if (dataArr_n.length < 4 || func_methods.standardDeviation_s(dataArr_n) == 0) {
                    return formula.undefined.d;
                }
                var mean = jStat.mean(dataArr_n);
                var n = dataArr_n.length;
                var sigma = 0;
                for (var i = 0; i < n; i++) {
                    sigma += Math.pow(dataArr_n[i] - mean, 4);
                }
                sigma = sigma / Math.pow(jStat.stdev(dataArr_n, true), 4);
                return n * (n + 1) / ((n - 1) * (n - 2) * (n - 3)) * sigma - 3 * (n - 1) * (n - 1) / ((n - 2) * (n - 3));
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'LARGE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                if (j.getObjType(arguments[0]) == 'array') {
                    if (j.getObjType(arguments[0][0]) == 'array' && !func_methods.isDyadicArr(arguments[0])) {
                        return formula.undefined.v;
                    }
                    dataArr = dataArr.concat(func_methods.getDataArr(arguments[0], true));
                } else if (j.getObjType(arguments[0]) == 'object' && arguments[0].startCell != null) {
                    dataArr = dataArr.concat(func_methods.getCellDataArr(arguments[0], 'text', true));
                } else {
                    dataArr.push(arguments[0]);
                }
                var dataArr_n = [];
                for (var j = 0; j < dataArr.length; j++) {
                    var number = dataArr[j];
                    if (!e.isRealNum(number)) {
                        return formula.undefined.v;
                    }
                    number = parseFloat(number);
                    dataArr_n.push(number);
                }
                var n;
                if (j.getObjType(arguments[1]) == 'array') {
                    if (j.getObjType(arguments[1][0]) == 'array' && !func_methods.isDyadicArr(arguments[1])) {
                        return formula.undefined.v;
                    }
                    n = func_methods.getDataArr(arguments[1]);
                } else if (j.getObjType(arguments[1]) == 'object' && arguments[1].startCell != null) {
                    if (arguments[1].rowl > 1 || arguments[1].coll > 1) {
                        return formula.undefined.v;
                    }
                    var cell = arguments[1].data;
                    if (cell == null || e.isRealNull(cell.v)) {
                        var n = 0;
                    } else {
                        var n = cell.v;
                    }
                } else {
                    n = arguments[1];
                }
                if (j.getObjType(n) == 'array') {
                    if (dataArr_n.length == 0) {
                        return formula.undefined.nm;
                    }
                    var result = [];
                    for (var i = 0; i < n.length; i++) {
                        if (!e.isRealNum(n[i])) {
                            result.push(formula.undefined.v);
                            continue;
                        }
                        n[i] = Math.ceil(parseFloat(n[i]));
                        if (n[i] <= 0 || n[i] > dataArr_n.length) {
                            result.push(formula.undefined.nm);
                            continue;
                        }
                        result.push(dataArr.sort(function (a, b) {
                            return b - a;
                        })[n[i] - 1]);
                    }
                    return result;
                } else {
                    if (!e.isRealNum(n)) {
                        return formula.undefined.v;
                    }
                    n = Math.ceil(parseFloat(n));
                    if (dataArr_n.length == 0) {
                        return formula.undefined.nm;
                    }
                    if (n <= 0 || n > dataArr_n.length) {
                        return formula.undefined.nm;
                    }
                    return dataArr.sort(function (a, b) {
                        return b - a;
                    })[n - 1];
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'STDEVA': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, false));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'text', false));
                    } else {
                        dataArr.push(data);
                    }
                }
                var dataArr_n = [];
                for (var j = 0; j < dataArr.length; j++) {
                    var number = dataArr[j];
                    if (!e.isRealNum(number)) {
                        if (number.toString().toLowerCase() == 'true') {
                            number = 1;
                        } else {
                            number = 0;
                        }
                    } else {
                        number = parseFloat(number);
                    }
                    dataArr_n.push(number);
                }
                if (dataArr_n.length == 0) {
                    return 0;
                }
                if (dataArr_n.length == 1) {
                    return formula.undefined.d;
                }
                return func_methods.standardDeviation_s(dataArr_n);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'STDEVP': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'text', true));
                    } else {
                        dataArr.push(data);
                    }
                }
                var dataArr_n = [];
                for (var j = 0; j < dataArr.length; j++) {
                    var number = dataArr[j];
                    if (!e.isRealNum(number)) {
                        return formula.undefined.v;
                    }
                    number = parseFloat(number);
                    dataArr_n.push(number);
                }
                if (dataArr_n.length == 0) {
                    return 0;
                }
                if (dataArr_n.length == 1) {
                    return formula.undefined.d;
                }
                return func_methods.standardDeviation(dataArr_n);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'GEOMEAN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'text', true));
                    } else {
                        if (j.getObjType(data) == 'boolean') {
                            if (data.toString().toLowerCase() == 'true') {
                                dataArr.push(1);
                            } else if (data.toString().toLowerCase() == 'false') {
                                dataArr.push(0);
                            }
                        } else if (e.isRealNum(data)) {
                            dataArr.push(data);
                        } else {
                            return formula.undefined.v;
                        }
                    }
                }
                var dataArr_n = [];
                for (var j = 0; j < dataArr.length; j++) {
                    var number = dataArr[j];
                    if (!e.isRealNum(number)) {
                        continue;
                    }
                    number = parseFloat(number);
                    if (number <= 0) {
                        return formula.undefined.nm;
                    }
                    dataArr_n.push(number);
                }
                if (dataArr_n.length == 0) {
                    return formula.undefined.nm;
                }
                return jStat.geomean(dataArr_n);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'RANK_EQ': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var data_ref = arguments[1];
                var ref = [];
                if (j.getObjType(data_ref) == 'array') {
                    if (j.getObjType(data_ref[0]) == 'array' && !func_methods.isDyadicArr(data_ref)) {
                        return formula.undefined.v;
                    }
                    ref = ref.concat(func_methods.getDataArr(data_ref, true));
                } else if (j.getObjType(data_ref) == 'object' && data_ref.startCell != null) {
                    ref = ref.concat(func_methods.getCellDataArr(data_ref, 'number', true));
                } else {
                    ref.push(data_ref);
                }
                var ref_n = [];
                for (var j = 0; j < ref.length; j++) {
                    var num = ref[j];
                    if (!e.isRealNum(num)) {
                        return formula.undefined.v;
                    }
                    num = parseFloat(num);
                    ref_n.push(num);
                }
                if (arguments.length == 3) {
                    var order = func_methods.getCellBoolen(arguments[2]);
                    if (e.valueIsError(order)) {
                        return order;
                    }
                } else {
                    var order = false;
                }
                var sort = order ? function (a, b) {
                    return a - b;
                } : function (a, b) {
                    return b - a;
                };
                ref_n = ref_n.sort(sort);
                var index = ref_n.indexOf(number);
                if (index == -1) {
                    return formula.undefined.na;
                } else {
                    return index + 1;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'RANK_AVG': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var data_ref = arguments[1];
                var ref = [];
                if (j.getObjType(data_ref) == 'array') {
                    if (j.getObjType(data_ref[0]) == 'array' && !func_methods.isDyadicArr(data_ref)) {
                        return formula.undefined.v;
                    }
                    ref = ref.concat(func_methods.getDataArr(data_ref, true));
                } else if (j.getObjType(data_ref) == 'object' && data_ref.startCell != null) {
                    ref = ref.concat(func_methods.getCellDataArr(data_ref, 'number', true));
                } else {
                    ref.push(data_ref);
                }
                var ref_n = [];
                for (var j = 0; j < ref.length; j++) {
                    var num = ref[j];
                    if (!e.isRealNum(num)) {
                        return formula.undefined.v;
                    }
                    num = parseFloat(num);
                    ref_n.push(num);
                }
                if (arguments.length == 3) {
                    var order = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(order)) {
                        return order;
                    }
                    if (j.getObjType(order) == 'boolean') {
                    } else if (j.getObjType(order) == 'string' && (order.toLowerCase() == 'true' || order.toLowerCase() == 'false')) {
                        if (order.toLowerCase() == 'true') {
                            order = true;
                        }
                        if (order.toLowerCase() == 'false') {
                            order = false;
                        }
                    } else if (e.isRealNum(order)) {
                        order = parseFloat(order);
                        order = order == 0 ? false : true;
                    } else {
                        return formula.undefined.v;
                    }
                } else {
                    var order = false;
                }
                var sort = order ? function (a, b) {
                    return a - b;
                } : function (a, b) {
                    return b - a;
                };
                ref_n = ref_n.sort(sort);
                var count = 0;
                for (var i = 0; i < ref_n.length; i++) {
                    if (ref_n[i] == number) {
                        count++;
                    }
                }
                return count > 1 ? (2 * ref_n.indexOf(number) + count + 1) / 2 : ref_n.indexOf(number) + 1;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PERCENTRANK_EXC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_ref = arguments[0];
                var ref = [];
                if (j.getObjType(data_ref) == 'array') {
                    if (j.getObjType(data_ref[0]) == 'array' && !func_methods.isDyadicArr(data_ref)) {
                        return formula.undefined.v;
                    }
                    ref = ref.concat(func_methods.getDataArr(data_ref, true));
                } else if (j.getObjType(data_ref) == 'object' && data_ref.startCell != null) {
                    ref = ref.concat(func_methods.getCellDataArr(data_ref, 'number', true));
                } else {
                    ref.push(data_ref);
                }
                var ref_n = [];
                for (var j = 0; j < ref.length; j++) {
                    var number = ref[j];
                    if (!e.isRealNum(number)) {
                        return formula.undefined.v;
                    }
                    number = parseFloat(number);
                    ref_n.push(number);
                }
                var x = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(x)) {
                    return x;
                }
                if (!e.isRealNum(x)) {
                    return formula.undefined.v;
                }
                x = parseFloat(x);
                if (arguments.length == 3) {
                    var significance = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(significance)) {
                        return significance;
                    }
                    if (!e.isRealNum(significance)) {
                        return formula.undefined.v;
                    }
                    significance = parseInt(significance);
                } else {
                    var significance = 3;
                }
                if (ref_n.length == 0) {
                    return formula.undefined.nm;
                }
                if (significance < 1) {
                    return formula.undefined.nm;
                }
                if (ref_n.length == 1 && ref_n[0] == x) {
                    return 1;
                }
                ref_n = ref_n.sort(function (a, b) {
                    return a - b;
                });
                var uniques = window.luckysheet_function.UNIQUE.f(ref_n)[0];
                var n = ref_n.length;
                var m = uniques.length;
                var power = Math.pow(10, significance);
                var result = 0;
                var match = false;
                var i = 0;
                while (!match && i < m) {
                    if (x === uniques[i]) {
                        result = (ref_n.indexOf(uniques[i]) + 1) / (n + 1);
                        match = true;
                    } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
                        result = (ref_n.lastIndexOf(uniques[i]) + 1 + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n + 1);
                        match = true;
                    }
                    i++;
                }
                if (isNaN(result)) {
                    return formula.undefined.na;
                } else {
                    return Math.floor(result * power) / power;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PERCENTRANK_INC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_ref = arguments[0];
                var ref = [];
                if (j.getObjType(data_ref) == 'array') {
                    if (j.getObjType(data_ref[0]) == 'array' && !func_methods.isDyadicArr(data_ref)) {
                        return formula.undefined.v;
                    }
                    ref = ref.concat(func_methods.getDataArr(data_ref, true));
                } else if (j.getObjType(data_ref) == 'object' && data_ref.startCell != null) {
                    ref = ref.concat(func_methods.getCellDataArr(data_ref, 'number', true));
                } else {
                    ref.push(data_ref);
                }
                var ref_n = [];
                for (var j = 0; j < ref.length; j++) {
                    var number = ref[j];
                    if (!e.isRealNum(number)) {
                        return formula.undefined.v;
                    }
                    number = parseFloat(number);
                    ref_n.push(number);
                }
                var x = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(x)) {
                    return x;
                }
                if (!e.isRealNum(x)) {
                    return formula.undefined.v;
                }
                x = parseFloat(x);
                if (arguments.length == 3) {
                    var significance = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(significance)) {
                        return significance;
                    }
                    if (!e.isRealNum(significance)) {
                        return formula.undefined.v;
                    }
                    significance = parseInt(significance);
                } else {
                    var significance = 3;
                }
                if (ref_n.length == 0) {
                    return formula.undefined.nm;
                }
                if (significance < 1) {
                    return formula.undefined.nm;
                }
                if (ref_n.length == 1 && ref_n[0] == x) {
                    return 1;
                }
                ref_n = ref_n.sort(function (a, b) {
                    return a - b;
                });
                var uniques = window.luckysheet_function.UNIQUE.f(ref_n)[0];
                var n = ref_n.length;
                var m = uniques.length;
                var power = Math.pow(10, significance);
                var result = 0;
                var match = false;
                var i = 0;
                while (!match && i < m) {
                    if (x === uniques[i]) {
                        result = ref_n.indexOf(uniques[i]) / (n - 1);
                        match = true;
                    } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
                        result = (ref_n.lastIndexOf(uniques[i]) + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n - 1);
                        match = true;
                    }
                    i++;
                }
                if (isNaN(result)) {
                    return formula.undefined.na;
                } else {
                    return Math.floor(result * power) / power;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'FORECAST': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(x)) {
                    return x;
                }
                if (!e.isRealNum(x)) {
                    return formula.undefined.v;
                }
                x = parseFloat(x);
                var data_known_y = arguments[1];
                var known_y = [];
                if (j.getObjType(data_known_y) == 'array') {
                    if (j.getObjType(data_known_y[0]) == 'array' && !func_methods.isDyadicArr(data_known_y)) {
                        return formula.undefined.v;
                    }
                    known_y = known_y.concat(func_methods.getDataArr(data_known_y, false));
                } else if (j.getObjType(data_known_y) == 'object' && data_known_y.startCell != null) {
                    known_y = known_y.concat(func_methods.getCellDataArr(data_known_y, 'text', false));
                } else {
                    known_y.push(data_known_y);
                }
                var data_known_x = arguments[2];
                var known_x = [];
                if (j.getObjType(data_known_x) == 'array') {
                    if (j.getObjType(data_known_x[0]) == 'array' && !func_methods.isDyadicArr(data_known_x)) {
                        return formula.undefined.v;
                    }
                    known_x = known_x.concat(func_methods.getDataArr(data_known_x, false));
                } else if (j.getObjType(data_known_x) == 'object' && data_known_x.startCell != null) {
                    known_x = known_x.concat(func_methods.getCellDataArr(data_known_x, 'text', false));
                } else {
                    known_x.push(data_known_x);
                }
                if (known_y.length != known_x.length) {
                    return formula.undefined.na;
                }
                var data_y = [], data_x = [];
                for (var i = 0; i < known_y.length; i++) {
                    var num_y = known_y[i];
                    var num_x = known_x[i];
                    if (e.isRealNum(num_y) && e.isRealNum(num_x)) {
                        data_y.push(parseFloat(num_y));
                        data_x.push(parseFloat(num_x));
                    }
                }
                if (func_methods.variance_s(data_x) == 0) {
                    return formula.undefined.d;
                }
                var xmean = jStat.mean(data_x);
                var ymean = jStat.mean(data_y);
                var n = data_x.length;
                var num = 0;
                var den = 0;
                for (var i = 0; i < n; i++) {
                    num += (data_x[i] - xmean) * (data_y[i] - ymean);
                    den += Math.pow(data_x[i] - xmean, 2);
                }
                var b = num / den;
                var a = ymean - b * xmean;
                return a + b * x;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'FISHERINV': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var y = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(y)) {
                    return y;
                }
                if (!e.isRealNum(y)) {
                    return formula.undefined.v;
                }
                y = parseFloat(y);
                var e2y = Math.exp(2 * y);
                return (e2y - 1) / (e2y + 1);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'FISHER': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(x)) {
                    return x;
                }
                if (!e.isRealNum(x)) {
                    return formula.undefined.v;
                }
                x = parseFloat(x);
                if (x <= -1 || x >= 1) {
                    return formula.undefined.nm;
                }
                return Math.log((1 + x) / (1 - x)) / 2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MODE_SNGL': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        if (!e.isRealNum(data)) {
                            return formula.undefined.v;
                        }
                        dataArr.push(data);
                    }
                }
                var dataArr_n = [];
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (e.isRealNum(number)) {
                        dataArr_n.push(parseFloat(number));
                    }
                }
                var count = {};
                var maxItems = [];
                var max = 0;
                var currentItem;
                for (var i = 0; i < dataArr_n.length; i++) {
                    currentItem = dataArr_n[i];
                    count[currentItem] = count[currentItem] ? count[currentItem] + 1 : 1;
                    if (count[currentItem] > max) {
                        max = count[currentItem];
                        maxItems = [];
                    }
                    if (count[currentItem] == max) {
                        maxItems[maxItems.length] = currentItem;
                    }
                }
                if (max <= 1) {
                    return formula.undefined.na;
                }
                var resultIndex = dataArr_n.indexOf(maxItems[0]);
                for (var j = 0; j < maxItems.length; j++) {
                    var index = dataArr_n.indexOf(maxItems[j]);
                    if (index < resultIndex) {
                        resultIndex = index;
                    }
                }
                return dataArr_n[resultIndex];
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'WEIBULL_DIST': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(x)) {
                    return x;
                }
                if (!e.isRealNum(x)) {
                    return formula.undefined.v;
                }
                x = parseFloat(x);
                var alpha = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(alpha)) {
                    return alpha;
                }
                if (!e.isRealNum(alpha)) {
                    return formula.undefined.v;
                }
                alpha = parseFloat(alpha);
                var beta = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(beta)) {
                    return beta;
                }
                if (!e.isRealNum(beta)) {
                    return formula.undefined.v;
                }
                beta = parseFloat(beta);
                var cumulative = func_methods.getCellBoolen(arguments[3]);
                if (e.valueIsError(cumulative)) {
                    return cumulative;
                }
                if (x < 0 || alpha <= 0 || beta <= 0) {
                    return formula.undefined.nm;
                }
                return cumulative ? 1 - Math.exp(-Math.pow(x / beta, alpha)) : Math.pow(x, alpha - 1) * Math.exp(-Math.pow(x / beta, alpha)) * alpha / Math.pow(beta, alpha);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'AVEDEV': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        if (!e.isRealNum(data)) {
                            return formula.undefined.v;
                        }
                        dataArr.push(data);
                    }
                }
                var dataArr_n = [];
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (e.isRealNum(number)) {
                        dataArr_n.push(parseFloat(number));
                    }
                }
                if (dataArr_n.length == 0) {
                    return formula.undefined.nm;
                }
                return jStat.sum(jStat(dataArr_n).subtract(jStat.mean(dataArr_n)).abs()[0]) / dataArr_n.length;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'AVERAGEA': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, false));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        if (number.toString.toLowerCase() == 'true') {
                            dataArr.push(1);
                        } else if (number.toString.toLowerCase() == 'false') {
                            dataArr.push(0);
                        } else if (e.isRealNum(data)) {
                            dataArr.push(data);
                        } else {
                            return formula.undefined.v;
                        }
                    }
                }
                var sum = 0, count = 0;
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (e.isRealNum(number)) {
                        sum += parseFloat(number);
                    } else {
                        if (number.toString().toLowerCase() == 'true') {
                            sum += 1;
                        } else {
                            sum += 0;
                        }
                    }
                    count++;
                }
                if (count == 0) {
                    return formula.undefined.d;
                }
                return sum / count;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'BINOM_DIST': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number_s = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number_s)) {
                    return number_s;
                }
                if (!e.isRealNum(number_s)) {
                    return formula.undefined.v;
                }
                number_s = parseInt(number_s);
                var trials = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(trials)) {
                    return trials;
                }
                if (!e.isRealNum(trials)) {
                    return formula.undefined.v;
                }
                trials = parseInt(trials);
                var probability_s = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(probability_s)) {
                    return probability_s;
                }
                if (!e.isRealNum(probability_s)) {
                    return formula.undefined.v;
                }
                probability_s = parseFloat(probability_s);
                var cumulative = func_methods.getCellBoolen(arguments[3]);
                if (e.valueIsError(cumulative)) {
                    return cumulative;
                }
                if (number_s < 0 || number_s > trials) {
                    return formula.undefined.nm;
                }
                if (probability_s < 0 || probability_s > 1) {
                    return formula.undefined.nm;
                }
                return cumulative ? jStat.binomial.cdf(number_s, trials, probability_s) : jStat.binomial.pdf(number_s, trials, probability_s);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'BINOM_INV': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var trials = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(trials)) {
                    return trials;
                }
                if (!e.isRealNum(trials)) {
                    return formula.undefined.v;
                }
                trials = parseInt(trials);
                var probability_s = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(probability_s)) {
                    return probability_s;
                }
                if (!e.isRealNum(probability_s)) {
                    return formula.undefined.v;
                }
                probability_s = parseFloat(probability_s);
                var alpha = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(alpha)) {
                    return alpha;
                }
                if (!e.isRealNum(alpha)) {
                    return formula.undefined.v;
                }
                alpha = parseFloat(alpha);
                if (trials < 0) {
                    return formula.undefined.nm;
                }
                if (probability_s < 0 || probability_s > 1) {
                    return formula.undefined.nm;
                }
                if (alpha < 0 || alpha > 1) {
                    return formula.undefined.nm;
                }
                var x = 0;
                while (x <= trials) {
                    if (jStat.binomial.cdf(x, trials, probability_s) >= alpha) {
                        return x;
                    }
                    x++;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'CONFIDENCE_NORM': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var alpha = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(alpha)) {
                    return alpha;
                }
                if (!e.isRealNum(alpha)) {
                    return formula.undefined.v;
                }
                alpha = parseFloat(alpha);
                var standard_dev = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(standard_dev)) {
                    return standard_dev;
                }
                if (!e.isRealNum(standard_dev)) {
                    return formula.undefined.v;
                }
                standard_dev = parseFloat(standard_dev);
                var size = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(size)) {
                    return size;
                }
                if (!e.isRealNum(size)) {
                    return formula.undefined.v;
                }
                size = parseInt(size);
                if (alpha <= 0 || alpha >= 1) {
                    return formula.undefined.nm;
                }
                if (standard_dev <= 0) {
                    return formula.undefined.nm;
                }
                if (size < 1) {
                    return formula.undefined.nm;
                }
                return jStat.normalci(1, alpha, standard_dev, size)[1] - 1;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'CORREL': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_known_y = arguments[0];
                var known_y = [];
                if (j.getObjType(data_known_y) == 'array') {
                    if (j.getObjType(data_known_y[0]) == 'array' && !func_methods.isDyadicArr(data_known_y)) {
                        return formula.undefined.v;
                    }
                    known_y = known_y.concat(func_methods.getDataArr(data_known_y, false));
                } else if (j.getObjType(data_known_y) == 'object' && data_known_y.startCell != null) {
                    known_y = known_y.concat(func_methods.getCellDataArr(data_known_y, 'text', false));
                } else {
                    known_y.push(data_known_y);
                }
                var data_known_x = arguments[1];
                var known_x = [];
                if (j.getObjType(data_known_x) == 'array') {
                    if (j.getObjType(data_known_x[0]) == 'array' && !func_methods.isDyadicArr(data_known_x)) {
                        return formula.undefined.v;
                    }
                    known_x = known_x.concat(func_methods.getDataArr(data_known_x, false));
                } else if (j.getObjType(data_known_x) == 'object' && data_known_x.startCell != null) {
                    known_x = known_x.concat(func_methods.getCellDataArr(data_known_x, 'text', false));
                } else {
                    known_x.push(data_known_x);
                }
                if (known_y.length != known_x.length) {
                    return formula.undefined.na;
                }
                var data_y = [], data_x = [];
                for (var i = 0; i < known_y.length; i++) {
                    var num_y = known_y[i];
                    var num_x = known_x[i];
                    if (e.isRealNum(num_y) && e.isRealNum(num_x)) {
                        data_y.push(parseFloat(num_y));
                        data_x.push(parseFloat(num_x));
                    }
                }
                if (data_y.length == 0 || data_x.length == 0 || func_methods.standardDeviation(data_y) == 0 || func_methods.standardDeviation(data_x) == 0) {
                    return formula.undefined.d;
                }
                return jStat.corrcoeff(data_y, data_x);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COVARIANCE_P': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_known_x = arguments[0];
                var known_x = [];
                if (j.getObjType(data_known_x) == 'array') {
                    if (j.getObjType(data_known_x[0]) == 'array' && !func_methods.isDyadicArr(data_known_x)) {
                        return formula.undefined.v;
                    }
                    known_x = known_x.concat(func_methods.getDataArr(data_known_x, false));
                } else if (j.getObjType(data_known_x) == 'object' && data_known_x.startCell != null) {
                    known_x = known_x.concat(func_methods.getCellDataArr(data_known_x, 'text', false));
                } else {
                    known_x.push(data_known_x);
                }
                var data_known_y = arguments[1];
                var known_y = [];
                if (j.getObjType(data_known_y) == 'array') {
                    if (j.getObjType(data_known_y[0]) == 'array' && !func_methods.isDyadicArr(data_known_y)) {
                        return formula.undefined.v;
                    }
                    known_y = known_y.concat(func_methods.getDataArr(data_known_y, false));
                } else if (j.getObjType(data_known_y) == 'object' && data_known_y.startCell != null) {
                    known_y = known_y.concat(func_methods.getCellDataArr(data_known_y, 'text', false));
                } else {
                    known_y.push(data_known_y);
                }
                if (known_x.length != known_y.length) {
                    return formula.undefined.na;
                }
                var data_x = [], data_y = [];
                for (var i = 0; i < known_x.length; i++) {
                    var num_x = known_x[i];
                    var num_y = known_y[i];
                    if (e.isRealNum(num_x) && e.isRealNum(num_y)) {
                        data_x.push(parseFloat(num_x));
                        data_y.push(parseFloat(num_y));
                    }
                }
                if (data_x.length == 0 || data_y.length == 0) {
                    return formula.undefined.d;
                }
                var mean1 = jStat.mean(data_x);
                var mean2 = jStat.mean(data_y);
                var result = 0;
                for (var i = 0; i < data_x.length; i++) {
                    result += (data_x[i] - mean1) * (data_y[i] - mean2);
                }
                result = result / data_x.length;
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COVARIANCE_S': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_known_x = arguments[0];
                var known_x = [];
                if (j.getObjType(data_known_x) == 'array') {
                    if (j.getObjType(data_known_x[0]) == 'array' && !func_methods.isDyadicArr(data_known_x)) {
                        return formula.undefined.v;
                    }
                    known_x = known_x.concat(func_methods.getDataArr(data_known_x, false));
                } else if (j.getObjType(data_known_x) == 'object' && data_known_x.startCell != null) {
                    known_x = known_x.concat(func_methods.getCellDataArr(data_known_x, 'text', false));
                } else {
                    known_x.push(data_known_x);
                }
                var data_known_y = arguments[1];
                var known_y = [];
                if (j.getObjType(data_known_y) == 'array') {
                    if (j.getObjType(data_known_y[0]) == 'array' && !func_methods.isDyadicArr(data_known_y)) {
                        return formula.undefined.v;
                    }
                    known_y = known_y.concat(func_methods.getDataArr(data_known_y, false));
                } else if (j.getObjType(data_known_y) == 'object' && data_known_y.startCell != null) {
                    known_y = known_y.concat(func_methods.getCellDataArr(data_known_y, 'text', false));
                } else {
                    known_y.push(data_known_y);
                }
                if (known_x.length != known_y.length) {
                    return formula.undefined.na;
                }
                var data_x = [], data_y = [];
                for (var i = 0; i < known_x.length; i++) {
                    var num_x = known_x[i];
                    var num_y = known_y[i];
                    if (e.isRealNum(num_x) && e.isRealNum(num_y)) {
                        data_x.push(parseFloat(num_x));
                        data_y.push(parseFloat(num_y));
                    }
                }
                if (data_x.length == 0 || data_y.length == 0) {
                    return formula.undefined.d;
                }
                return jStat.covariance(data_x, data_y);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DEVSQ': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        if (!e.isRealNum(data)) {
                            if (j.getObjType(data) == 'boolean') {
                                if (data.toString().toLowerCase() == 'true') {
                                    dataArr.push(1);
                                } else if (data.toString().toLowerCase() == 'false') {
                                    dataArr.push(0);
                                }
                            } else {
                                return formula.undefined.v;
                            }
                        } else {
                            dataArr.push(data);
                        }
                    }
                }
                var dataArr_n = [];
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (e.isRealNum(number)) {
                        dataArr_n.push(parseFloat(number));
                    }
                }
                var mean = jStat.mean(dataArr_n);
                var result = 0;
                for (var i = 0; i < dataArr_n.length; i++) {
                    result += Math.pow(dataArr_n[i] - mean, 2);
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'EXPON_DIST': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(x)) {
                    return x;
                }
                if (!e.isRealNum(x)) {
                    return formula.undefined.v;
                }
                x = parseFloat(x);
                var lambda = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(lambda)) {
                    return lambda;
                }
                if (!e.isRealNum(lambda)) {
                    return formula.undefined.v;
                }
                lambda = parseFloat(lambda);
                var cumulative = func_methods.getCellBoolen(arguments[2]);
                if (e.valueIsError(cumulative)) {
                    return cumulative;
                }
                if (x < 0) {
                    return formula.undefined.nm;
                }
                if (lambda < 0) {
                    return formula.undefined.nm;
                }
                return cumulative ? jStat.exponential.cdf(x, lambda) : jStat.exponential.pdf(x, lambda);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'AVERAGEIF': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var sum = 0;
                var count = 0;
                var rangeData = arguments[0].data;
                var rangeRow = arguments[0].rowl;
                var rangeCol = arguments[0].coll;
                var criteria = a.luckysheet_parseData(arguments[1]);
                var sumRangeData = [];
                if (arguments[2]) {
                    var sumRangeStart = arguments[2].startCell;
                    var sumRangeRow = arguments[2].rowl;
                    var sumRangeCol = arguments[2].coll;
                    var sumRangeSheet = arguments[2].sheetName;
                    if (rangeRow == sumRangeRow && rangeCol == sumRangeCol) {
                        sumRangeData = arguments[2].data;
                    } else {
                        var row = [], col = [];
                        var sumRangeEnd = '';
                        var realSumRange = '';
                        row[0] = parseInt(sumRangeStart.replace(/[^0-9]/g, '')) - 1;
                        col[0] = j.ABCatNum(sumRangeStart.replace(/[^A-Za-z]/g, ''));
                        row[1] = row[0] + rangeRow - 1;
                        col[1] = col[0] + rangeCol - 1;
                        var real_ABC = j.chatatABC(col[1]);
                        var real_Num = row[1] + 1;
                        sumRangeEnd = real_ABC + real_Num;
                        realSumRange = sumRangeSheet + '!' + sumRangeStart + ':' + sumRangeEnd;
                        sumRangeData = a.luckysheet_getcelldata(realSumRange).data;
                    }
                    sumRangeData = formula.getRangeArray(sumRangeData)[0];
                }
                rangeData = formula.getRangeArray(rangeData)[0];
                for (var i = 0; i < rangeData.length; i++) {
                    var v = rangeData[i];
                    if (!!v && formula.acompareb(v, criteria)) {
                        var vnow = sumRangeData[i] || v;
                        if (!e.isRealNum(vnow)) {
                            continue;
                        }
                        sum += parseFloat(vnow);
                        count++;
                    }
                }
                if (sum == 0 || count == 0) {
                    return formula.undefined.d;
                } else {
                    return j.numFormat(sum / count);
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'AVERAGEIFS': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var sum = 0;
                var count = 0;
                var args = arguments;
                a.luckysheet_getValue(args);
                var rangeData = formula.getRangeArray(args[0])[0];
                var results = new Array(rangeData.length);
                for (var i = 0; i < results.length; i++) {
                    results[i] = true;
                }
                for (var i = 1; i < args.length; i += 2) {
                    var range = formula.getRangeArray(args[i])[0];
                    var criteria = args[i + 1];
                    for (var j = 0; j < range.length; j++) {
                        var v = range[j];
                        results[j] = results[j] && !!v && formula.acompareb(v, criteria);
                    }
                }
                for (var i = 0; i < rangeData.length; i++) {
                    if (results[i] && e.isRealNum(rangeData[i])) {
                        sum += parseFloat(rangeData[i]);
                        count++;
                    }
                }
                if (sum == 0 || count == 0) {
                    return formula.undefined.d;
                } else {
                    return j.numFormat(sum / count);
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PERMUT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseInt(number);
                var number_chosen = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(number_chosen)) {
                    return number_chosen;
                }
                if (!e.isRealNum(number_chosen)) {
                    return formula.undefined.v;
                }
                number_chosen = parseInt(number_chosen);
                if (number <= 0 || number_chosen < 0) {
                    return formula.undefined.nm;
                }
                if (number < number_chosen) {
                    return formula.undefined.nm;
                }
                return func_methods.factorial(number) / func_methods.factorial(number - number_chosen);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TRIMMEAN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_dataArr = arguments[0];
                var dataArr = [];
                if (j.getObjType(data_dataArr) == 'array') {
                    if (j.getObjType(data_dataArr[0]) == 'array' && !func_methods.isDyadicArr(data_dataArr)) {
                        return formula.undefined.v;
                    }
                    dataArr = dataArr.concat(func_methods.getDataArr(data_dataArr, false));
                } else if (j.getObjType(data_dataArr) == 'object' && data_dataArr.startCell != null) {
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data_dataArr, 'number', false));
                } else {
                    dataArr.push(data_dataArr);
                }
                var dataArr_n = [];
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (e.isRealNum(number)) {
                        dataArr_n.push(parseFloat(number));
                    }
                }
                var percent = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(percent)) {
                    return percent;
                }
                if (!e.isRealNum(percent)) {
                    return formula.undefined.v;
                }
                percent = parseFloat(percent);
                if (dataArr_n.length == 0) {
                    return formula.undefined.nm;
                }
                if (percent < 0 || percent > 1) {
                    return formula.undefined.nm;
                }
                function rest(array, idx) {
                    idx = idx || 1;
                    if (!array || typeof array.slice !== 'function') {
                        return array;
                    }
                    return array.slice(idx);
                }
                ;
                function initial(array, idx) {
                    idx = idx || 1;
                    if (!array || typeof array.slice !== 'function') {
                        return array;
                    }
                    return array.slice(0, array.length - idx);
                }
                ;
                dataArr_n.sort(function (a, b) {
                    return a - b;
                });
                var trim = window.luckysheet_function.FLOOR.f(dataArr_n.length * percent, 2) / 2;
                var result = rest(dataArr_n, trim);
                result = initial(result, trim);
                result = jStat.mean(result);
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PERCENTILE_EXC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_dataArr = arguments[0];
                var dataArr = [];
                if (j.getObjType(data_dataArr) == 'array') {
                    if (j.getObjType(data_dataArr[0]) == 'array' && !func_methods.isDyadicArr(data_dataArr)) {
                        return formula.undefined.v;
                    }
                    dataArr = dataArr.concat(func_methods.getDataArr(data_dataArr, false));
                } else if (j.getObjType(data_dataArr) == 'object' && data_dataArr.startCell != null) {
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data_dataArr, 'number', false));
                } else {
                    dataArr.push(data_dataArr);
                }
                var dataArr_n = [];
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (e.isRealNum(number)) {
                        dataArr_n.push(parseFloat(number));
                    }
                }
                var k = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(k)) {
                    return k;
                }
                if (!e.isRealNum(k)) {
                    return formula.undefined.v;
                }
                k = parseFloat(k);
                if (dataArr_n.length == 0) {
                    return formula.undefined.nm;
                }
                if (k <= 0 || k >= 1) {
                    return formula.undefined.nm;
                }
                dataArr_n = dataArr_n.sort(function (a, b) {
                    return a - b;
                });
                var n = dataArr_n.length;
                if (k < 1 / (n + 1) || k > 1 - 1 / (n + 1)) {
                    return formula.undefined.nm;
                }
                var l = k * (n + 1) - 1;
                var fl = Math.floor(l);
                return l === fl ? dataArr_n[l] : dataArr_n[fl] + (l - fl) * (dataArr_n[fl + 1] - dataArr_n[fl]);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PERCENTILE_INC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_dataArr = arguments[0];
                var dataArr = [];
                if (j.getObjType(data_dataArr) == 'array') {
                    if (j.getObjType(data_dataArr[0]) == 'array' && !func_methods.isDyadicArr(data_dataArr)) {
                        return formula.undefined.v;
                    }
                    dataArr = dataArr.concat(func_methods.getDataArr(data_dataArr, false));
                } else if (j.getObjType(data_dataArr) == 'object' && data_dataArr.startCell != null) {
                    dataArr = dataArr.concat(func_methods.getCellDataArr(data_dataArr, 'number', false));
                } else {
                    dataArr.push(data_dataArr);
                }
                var dataArr_n = [];
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (e.isRealNum(number)) {
                        dataArr_n.push(parseFloat(number));
                    }
                }
                var k = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(k)) {
                    return k;
                }
                if (!e.isRealNum(k)) {
                    return formula.undefined.v;
                }
                k = parseFloat(k);
                if (dataArr_n.length == 0) {
                    return formula.undefined.nm;
                }
                if (k < 0 || k > 1) {
                    return formula.undefined.nm;
                }
                dataArr_n = dataArr_n.sort(function (a, b) {
                    return a - b;
                });
                var n = dataArr_n.length;
                var l = k * (n - 1);
                var fl = Math.floor(l);
                return l === fl ? dataArr_n[l] : dataArr_n[fl] + (l - fl) * (dataArr_n[fl + 1] - dataArr_n[fl]);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PEARSON': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_known_x = arguments[0];
                var known_x = [];
                if (j.getObjType(data_known_x) == 'array') {
                    if (j.getObjType(data_known_x[0]) == 'array' && !func_methods.isDyadicArr(data_known_x)) {
                        return formula.undefined.v;
                    }
                    known_x = known_x.concat(func_methods.getDataArr(data_known_x, false));
                } else if (j.getObjType(data_known_x) == 'object' && data_known_x.startCell != null) {
                    known_x = known_x.concat(func_methods.getCellDataArr(data_known_x, 'text', false));
                } else {
                    known_x.push(data_known_x);
                }
                var data_known_y = arguments[1];
                var known_y = [];
                if (j.getObjType(data_known_y) == 'array') {
                    if (j.getObjType(data_known_y[0]) == 'array' && !func_methods.isDyadicArr(data_known_y)) {
                        return formula.undefined.v;
                    }
                    known_y = known_y.concat(func_methods.getDataArr(data_known_y, false));
                } else if (j.getObjType(data_known_y) == 'object' && data_known_y.startCell != null) {
                    known_y = known_y.concat(func_methods.getCellDataArr(data_known_y, 'text', false));
                } else {
                    known_y.push(data_known_y);
                }
                if (known_x.length != known_y.length) {
                    return formula.undefined.na;
                }
                var data_x = [], data_y = [];
                for (var i = 0; i < known_x.length; i++) {
                    var num_x = known_x[i];
                    var num_y = known_y[i];
                    if (e.isRealNum(num_x) && e.isRealNum(num_y)) {
                        data_x.push(parseFloat(num_x));
                        data_y.push(parseFloat(num_y));
                    }
                }
                if (data_y.length == 0 || data_x.length == 0) {
                    return formula.undefined.d;
                }
                var xmean = jStat.mean(data_x);
                var ymean = jStat.mean(data_y);
                var n = data_x.length;
                var num = 0;
                var den1 = 0;
                var den2 = 0;
                for (var i = 0; i < n; i++) {
                    num += (data_x[i] - xmean) * (data_y[i] - ymean);
                    den1 += Math.pow(data_x[i] - xmean, 2);
                    den2 += Math.pow(data_y[i] - ymean, 2);
                }
                return num / Math.sqrt(den1 * den2);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'NORM_S_INV': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var probability = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(probability)) {
                    return probability;
                }
                if (!e.isRealNum(probability)) {
                    return formula.undefined.v;
                }
                probability = parseFloat(probability);
                if (probability <= 0 || probability >= 1) {
                    return formula.undefined.nm;
                }
                return jStat.normal.inv(probability, 0, 1);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'NORM_S_DIST': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var z = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(z)) {
                    return z;
                }
                if (!e.isRealNum(z)) {
                    return formula.undefined.v;
                }
                z = parseFloat(z);
                var cumulative = func_methods.getCellBoolen(arguments[1]);
                if (e.valueIsError(cumulative)) {
                    return cumulative;
                }
                return cumulative ? jStat.normal.cdf(z, 0, 1) : jStat.normal.pdf(z, 0, 1);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'NORM_INV': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var probability = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(probability)) {
                    return probability;
                }
                if (!e.isRealNum(probability)) {
                    if (j.getObjType(probability) == 'boolean') {
                        if (probability.toString().toLowerCase() == 'true') {
                            probability = 1;
                        } else if (probability.toString().toLowerCase() == 'false') {
                            probability = 0;
                        }
                    } else {
                        return formula.undefined.v;
                    }
                }
                probability = parseFloat(probability);
                var mean = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(mean)) {
                    return mean;
                }
                if (!e.isRealNum(mean)) {
                    if (j.getObjType(mean) == 'boolean') {
                        if (mean.toString().toLowerCase() == 'true') {
                            mean = 1;
                        } else if (mean.toString().toLowerCase() == 'false') {
                            mean = 0;
                        }
                    } else {
                        return formula.undefined.v;
                    }
                }
                mean = parseFloat(mean);
                var standard_dev = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(standard_dev)) {
                    return standard_dev;
                }
                if (!e.isRealNum(standard_dev)) {
                    if (j.getObjType(standard_dev) == 'boolean') {
                        if (standard_dev.toString().toLowerCase() == 'true') {
                            standard_dev = 1;
                        } else if (standard_dev.toString().toLowerCase() == 'false') {
                            standard_dev = 0;
                        }
                    } else {
                        return formula.undefined.v;
                    }
                }
                standard_dev = parseFloat(standard_dev);
                if (probability <= 0 || probability >= 1) {
                    return formula.undefined.nm;
                }
                if (standard_dev <= 0) {
                    return formula.undefined.nm;
                }
                return jStat.normal.inv(probability, mean, standard_dev);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'NORM_DIST': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(x)) {
                    return x;
                }
                if (!e.isRealNum(x)) {
                    if (j.getObjType(x) == 'boolean') {
                        if (x.toString().toLowerCase() == 'true') {
                            x = 1;
                        } else if (x.toString().toLowerCase() == 'false') {
                            x = 0;
                        }
                    } else {
                        return formula.undefined.v;
                    }
                }
                x = parseFloat(x);
                var mean = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(mean)) {
                    return mean;
                }
                if (!e.isRealNum(mean)) {
                    return formula.undefined.v;
                }
                mean = parseFloat(mean);
                var standard_dev = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(standard_dev)) {
                    return standard_dev;
                }
                if (!e.isRealNum(standard_dev)) {
                    return formula.undefined.v;
                }
                standard_dev = parseFloat(standard_dev);
                var cumulative = func_methods.getCellBoolen(arguments[3]);
                if (e.valueIsError(cumulative)) {
                    return cumulative;
                }
                if (standard_dev <= 0) {
                    return formula.undefined.nm;
                }
                return cumulative ? jStat.normal.cdf(x, mean, standard_dev) : jStat.normal.pdf(x, mean, standard_dev);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'NEGBINOM_DIST': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number_f = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number_f)) {
                    return number_f;
                }
                if (!e.isRealNum(number_f)) {
                    return formula.undefined.v;
                }
                number_f = parseInt(number_f);
                var number_s = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(number_s)) {
                    return number_s;
                }
                if (!e.isRealNum(number_s)) {
                    return formula.undefined.v;
                }
                number_s = parseInt(number_s);
                var probability_s = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(probability_s)) {
                    return probability_s;
                }
                if (!e.isRealNum(probability_s)) {
                    return formula.undefined.v;
                }
                probability_s = parseFloat(probability_s);
                var cumulative = func_methods.getCellBoolen(arguments[3]);
                if (e.valueIsError(cumulative)) {
                    return cumulative;
                }
                if (probability_s < 0 || probability_s > 1) {
                    return formula.undefined.nm;
                }
                if (number_f < 0 || number_s < 1) {
                    return formula.undefined.nm;
                }
                return cumulative ? jStat.negbin.cdf(number_f, number_s, probability_s) : jStat.negbin.pdf(number_f, number_s, probability_s);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MINA': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, false));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        if (number.toString.toLowerCase() == 'true') {
                            dataArr.push(1);
                        } else if (number.toString.toLowerCase() == 'false') {
                            dataArr.push(0);
                        } else if (e.isRealNum(data)) {
                            dataArr.push(data);
                        } else {
                            return formula.undefined.v;
                        }
                    }
                }
                var dataArr_n = [];
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (e.isRealNum(number)) {
                        dataArr_n.push(parseFloat(number));
                    } else {
                        if (number.toString().toLowerCase() == 'true') {
                            dataArr_n.push(1);
                        } else {
                            dataArr_n.push(0);
                        }
                    }
                }
                return dataArr_n.length === 0 ? 0 : Math.min.apply(Math, dataArr_n);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MEDIAN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        if (!e.isRealNum(data)) {
                            return formula.undefined.v;
                        }
                        dataArr.push(data);
                    }
                }
                var dataArr_n = [];
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (e.isRealNum(number)) {
                        dataArr_n.push(parseFloat(number));
                    }
                }
                return jStat.median(dataArr_n);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MAXA': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, false));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        if (number.toString.toLowerCase() == 'true') {
                            dataArr.push(1);
                        } else if (number.toString.toLowerCase() == 'false') {
                            dataArr.push(0);
                        } else if (e.isRealNum(data)) {
                            dataArr.push(data);
                        } else {
                            return formula.undefined.v;
                        }
                    }
                }
                var dataArr_n = [];
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (e.isRealNum(number)) {
                        dataArr_n.push(parseFloat(number));
                    } else {
                        if (number.toString().toLowerCase() == 'true') {
                            dataArr_n.push(1);
                        } else {
                            dataArr_n.push(0);
                        }
                    }
                }
                return dataArr_n.length === 0 ? 0 : Math.max.apply(Math, dataArr_n);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'LOGNORM_INV': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var probability = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(probability)) {
                    return probability;
                }
                if (!e.isRealNum(probability)) {
                    return formula.undefined.v;
                }
                probability = parseFloat(probability);
                var mean = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(mean)) {
                    return mean;
                }
                if (!e.isRealNum(mean)) {
                    return formula.undefined.v;
                }
                mean = parseFloat(mean);
                var standard_dev = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(standard_dev)) {
                    return standard_dev;
                }
                if (!e.isRealNum(standard_dev)) {
                    return formula.undefined.v;
                }
                standard_dev = parseFloat(standard_dev);
                if (probability <= 0 || probability >= 1) {
                    return formula.undefined.nm;
                }
                if (standard_dev <= 0) {
                    return formula.undefined.nm;
                }
                return jStat.lognormal.inv(probability, mean, standard_dev);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'LOGNORM_DIST': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(x)) {
                    return x;
                }
                if (!e.isRealNum(x)) {
                    return formula.undefined.v;
                }
                x = parseFloat(x);
                var mean = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(mean)) {
                    return mean;
                }
                if (!e.isRealNum(mean)) {
                    return formula.undefined.v;
                }
                mean = parseFloat(mean);
                var standard_dev = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(standard_dev)) {
                    return standard_dev;
                }
                if (!e.isRealNum(standard_dev)) {
                    return formula.undefined.v;
                }
                standard_dev = parseFloat(standard_dev);
                var cumulative = func_methods.getCellBoolen(arguments[3]);
                if (e.valueIsError(cumulative)) {
                    return cumulative;
                }
                if (x <= 0 || standard_dev <= 0) {
                    return formula.undefined.nm;
                }
                return cumulative ? jStat.lognormal.cdf(x, mean, standard_dev) : jStat.lognormal.pdf(x, mean, standard_dev);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'Z_TEST': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                if (j.getObjType(arguments[0]) == 'array') {
                    if (j.getObjType(arguments[0][0]) == 'array' && !func_methods.isDyadicArr(arguments[0])) {
                        return formula.undefined.v;
                    }
                    dataArr = dataArr.concat(func_methods.getDataArr(arguments[0], true));
                } else if (j.getObjType(arguments[0]) == 'object' && arguments[0].startCell != null) {
                    dataArr = dataArr.concat(func_methods.getCellDataArr(arguments[0], 'text', true));
                } else {
                    dataArr.push(arguments[0]);
                }
                var dataArr_n = [];
                for (var j = 0; j < dataArr.length; j++) {
                    var number = dataArr[j];
                    if (e.isRealNum(number)) {
                        dataArr_n.push(parseFloat(number));
                    }
                }
                var x = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(x)) {
                    return x;
                }
                if (!e.isRealNum(x)) {
                    return formula.undefined.v;
                }
                x = parseFloat(x);
                if (dataArr_n.length == 0) {
                    return formula.undefined.na;
                }
                var sigma = func_methods.standardDeviation_s(dataArr_n);
                if (arguments.length == 3) {
                    sigma = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(sigma)) {
                        return sigma;
                    }
                    if (!e.isRealNum(sigma)) {
                        return formula.undefined.v;
                    }
                    sigma = parseFloat(sigma);
                }
                var n = dataArr_n.length;
                var mean = window.luckysheet_function.AVERAGE.f.apply(window.luckysheet_function.AVERAGE, dataArr_n);
                return 1 - window.luckysheet_function.NORM_S_DIST.f((mean - x) / (sigma / Math.sqrt(n)), 'true');
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PROB': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_x_range = [];
                if (j.getObjType(arguments[0]) == 'array') {
                    if (j.getObjType(arguments[0][0]) == 'array' && !func_methods.isDyadicArr(arguments[0])) {
                        return formula.undefined.v;
                    }
                    data_x_range = data_x_range.concat(func_methods.getDataArr(arguments[0], false));
                } else if (j.getObjType(arguments[0]) == 'object' && arguments[0].startCell != null) {
                    data_x_range = data_x_range.concat(func_methods.getCellDataArr(arguments[0], 'text', false));
                } else {
                    data_x_range.push(arguments[0]);
                }
                var data_prob_range = [];
                if (j.getObjType(arguments[1]) == 'array') {
                    if (j.getObjType(arguments[1][0]) == 'array' && !func_methods.isDyadicArr(arguments[1])) {
                        return formula.undefined.v;
                    }
                    data_prob_range = data_prob_range.concat(func_methods.getDataArr(arguments[1], false));
                } else if (j.getObjType(arguments[1]) == 'object' && arguments[1].startCell != null) {
                    data_prob_range = data_prob_range.concat(func_methods.getCellDataArr(arguments[1], 'text', false));
                } else {
                    data_prob_range.push(arguments[1]);
                }
                if (data_x_range.length != data_prob_range.length) {
                    return formula.undefined.na;
                }
                var x_range = [], prob_range = [], prob_range_sum = 0;
                for (var i = 0; i < data_x_range.length; i++) {
                    var num_x_range = data_x_range[i];
                    var num_prob_range = data_prob_range[i];
                    if (e.isRealNum(num_x_range) && e.isRealNum(num_prob_range)) {
                        x_range.push(parseFloat(num_x_range));
                        prob_range.push(parseFloat(num_prob_range));
                        prob_range_sum += parseFloat(num_prob_range);
                        if (parseFloat(num_prob_range) <= 0 || parseFloat(num_prob_range) > 1) {
                            return formula.undefined.nm;
                        }
                    }
                }
                if (prob_range_sum != 1) {
                    return formula.undefined.nm;
                }
                var lower_limit = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(lower_limit)) {
                    return lower_limit;
                }
                if (!e.isRealNum(lower_limit)) {
                    return formula.undefined.v;
                }
                lower_limit = parseFloat(lower_limit);
                var upper_limit = lower_limit;
                if (arguments.length == 4) {
                    upper_limit = func_methods.getFirstValue(arguments[3]);
                    if (e.valueIsError(upper_limit)) {
                        return upper_limit;
                    }
                    if (!e.isRealNum(upper_limit)) {
                        return formula.undefined.v;
                    }
                    upper_limit = parseFloat(upper_limit);
                }
                var result = 0;
                for (var i = 0; i < x_range.length; i++) {
                    if (x_range[i] >= lower_limit && x_range[i] <= upper_limit) {
                        result += prob_range[i];
                    }
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'QUARTILE_EXC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_array = [];
                if (j.getObjType(arguments[0]) == 'array') {
                    if (j.getObjType(arguments[0][0]) == 'array' && !func_methods.isDyadicArr(arguments[0])) {
                        return formula.undefined.v;
                    }
                    data_array = data_array.concat(func_methods.getDataArr(arguments[0], true));
                } else if (j.getObjType(arguments[0]) == 'object' && arguments[0].startCell != null) {
                    data_array = data_array.concat(func_methods.getCellDataArr(arguments[0], 'text', true));
                } else {
                    if (!e.isRealNum(arguments[0])) {
                        return formula.undefined.v;
                    }
                    data_array.push(arguments[0]);
                }
                var array = [];
                for (var i = 0; i < data_array.length; i++) {
                    var number = data_array[i];
                    if (e.isRealNum(number)) {
                        array.push(parseFloat(number));
                    }
                }
                var quart = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(quart)) {
                    return quart;
                }
                if (!e.isRealNum(quart)) {
                    return formula.undefined.v;
                }
                quart = parseInt(quart);
                if (array.length == 0) {
                    return formula.undefined.nm;
                }
                if (quart <= 0 || quart >= 4) {
                    return formula.undefined.nm;
                }
                switch (quart) {
                case 1:
                    return window.luckysheet_function.PERCENTILE_EXC.f(array, 0.25);
                case 2:
                    return window.luckysheet_function.PERCENTILE_EXC.f(array, 0.5);
                case 3:
                    return window.luckysheet_function.PERCENTILE_EXC.f(array, 0.75);
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'QUARTILE_INC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_array = [];
                if (j.getObjType(arguments[0]) == 'array') {
                    if (j.getObjType(arguments[0][0]) == 'array' && !func_methods.isDyadicArr(arguments[0])) {
                        return formula.undefined.v;
                    }
                    data_array = data_array.concat(func_methods.getDataArr(arguments[0], true));
                } else if (j.getObjType(arguments[0]) == 'object' && arguments[0].startCell != null) {
                    data_array = data_array.concat(func_methods.getCellDataArr(arguments[0], 'text', true));
                } else {
                    if (!e.isRealNum(arguments[0])) {
                        return formula.undefined.v;
                    }
                    data_array.push(arguments[0]);
                }
                var array = [];
                for (var i = 0; i < data_array.length; i++) {
                    var number = data_array[i];
                    if (e.isRealNum(number)) {
                        array.push(parseFloat(number));
                    }
                }
                var quart = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(quart)) {
                    return quart;
                }
                if (!e.isRealNum(quart)) {
                    return formula.undefined.v;
                }
                quart = parseInt(quart);
                if (array.length == 0) {
                    return formula.undefined.nm;
                }
                if (quart < 0 || quart > 4) {
                    return formula.undefined.nm;
                }
                switch (quart) {
                case 0:
                    return Math.min.apply(Math, array);
                case 1:
                    return window.luckysheet_function.PERCENTILE_INC.f(array, 0.25);
                case 2:
                    return window.luckysheet_function.PERCENTILE_INC.f(array, 0.5);
                case 3:
                    return window.luckysheet_function.PERCENTILE_INC.f(array, 0.75);
                case 4:
                    return Math.max.apply(Math, array);
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'POISSON_DIST': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(x)) {
                    return x;
                }
                if (!e.isRealNum(x)) {
                    return formula.undefined.v;
                }
                x = parseInt(x);
                var mean = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(mean)) {
                    return mean;
                }
                if (!e.isRealNum(mean)) {
                    return formula.undefined.v;
                }
                mean = parseFloat(mean);
                var cumulative = func_methods.getCellBoolen(arguments[2]);
                if (e.valueIsError(cumulative)) {
                    return cumulative;
                }
                if (x < 0 || mean < 0) {
                    return formula.undefined.nm;
                }
                return cumulative ? jStat.poisson.cdf(x, mean) : jStat.poisson.pdf(x, mean);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'RSQ': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_known_y = arguments[0];
                var known_y = [];
                if (j.getObjType(data_known_y) == 'array') {
                    if (j.getObjType(data_known_y[0]) == 'array' && !func_methods.isDyadicArr(data_known_y)) {
                        return formula.undefined.v;
                    }
                    known_y = known_y.concat(func_methods.getDataArr(data_known_y, false));
                } else if (j.getObjType(data_known_y) == 'object' && data_known_y.startCell != null) {
                    known_y = known_y.concat(func_methods.getCellDataArr(data_known_y, 'text', false));
                } else {
                    if (!e.isRealNum(data_known_y)) {
                        return formula.undefined.v;
                    }
                    known_y.push(data_known_y);
                }
                var data_known_x = arguments[1];
                var known_x = [];
                if (j.getObjType(data_known_x) == 'array') {
                    if (j.getObjType(data_known_x[0]) == 'array' && !func_methods.isDyadicArr(data_known_x)) {
                        return formula.undefined.v;
                    }
                    known_x = known_x.concat(func_methods.getDataArr(data_known_x, false));
                } else if (j.getObjType(data_known_x) == 'object' && data_known_x.startCell != null) {
                    known_x = known_x.concat(func_methods.getCellDataArr(data_known_x, 'text', false));
                } else {
                    if (!e.isRealNum(data_known_x)) {
                        return formula.undefined.v;
                    }
                    known_x.push(data_known_x);
                }
                if (known_y.length != known_x.length) {
                    return formula.undefined.na;
                }
                var data_y = [], data_x = [];
                for (var i = 0; i < known_y.length; i++) {
                    var num_y = known_y[i];
                    var num_x = known_x[i];
                    if (e.isRealNum(num_y) && e.isRealNum(num_x)) {
                        data_y.push(parseFloat(num_y));
                        data_x.push(parseFloat(num_x));
                    }
                }
                if (data_y.length == 0 || data_x.length == 0) {
                    return formula.undefined.d;
                }
                return Math.pow(window.luckysheet_function.PEARSON.f(data_y, data_x), 2);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'T_DIST': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(x)) {
                    return x;
                }
                if (!e.isRealNum(x)) {
                    return formula.undefined.v;
                }
                x = parseFloat(x);
                var degrees_freedom = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(degrees_freedom)) {
                    return degrees_freedom;
                }
                if (!e.isRealNum(degrees_freedom)) {
                    return formula.undefined.v;
                }
                degrees_freedom = parseInt(degrees_freedom);
                var cumulative = func_methods.getCellBoolen(arguments[2]);
                if (e.valueIsError(cumulative)) {
                    return cumulative;
                }
                if (degrees_freedom < 1) {
                    return formula.undefined.nm;
                }
                return cumulative ? jStat.studentt.cdf(x, degrees_freedom) : jStat.studentt.pdf(x, degrees_freedom);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'T_DIST_2T': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(x)) {
                    return x;
                }
                if (!e.isRealNum(x)) {
                    return formula.undefined.v;
                }
                x = parseFloat(x);
                var degrees_freedom = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(degrees_freedom)) {
                    return degrees_freedom;
                }
                if (!e.isRealNum(degrees_freedom)) {
                    return formula.undefined.v;
                }
                degrees_freedom = parseInt(degrees_freedom);
                if (x < 0 || degrees_freedom < 1) {
                    return formula.undefined.nm;
                }
                return (1 - jStat.studentt.cdf(x, degrees_freedom)) * 2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'T_DIST_RT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(x)) {
                    return x;
                }
                if (!e.isRealNum(x)) {
                    return formula.undefined.v;
                }
                x = parseFloat(x);
                var degrees_freedom = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(degrees_freedom)) {
                    return degrees_freedom;
                }
                if (!e.isRealNum(degrees_freedom)) {
                    return formula.undefined.v;
                }
                degrees_freedom = parseInt(degrees_freedom);
                if (degrees_freedom < 1) {
                    return formula.undefined.nm;
                }
                return 1 - jStat.studentt.cdf(x, degrees_freedom);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'T_INV': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var probability = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(probability)) {
                    return probability;
                }
                if (!e.isRealNum(probability)) {
                    return formula.undefined.v;
                }
                probability = parseFloat(probability);
                var deg_freedom = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(deg_freedom)) {
                    return deg_freedom;
                }
                if (!e.isRealNum(deg_freedom)) {
                    return formula.undefined.v;
                }
                deg_freedom = parseInt(deg_freedom);
                if (probability <= 0 || probability > 1) {
                    return formula.undefined.nm;
                }
                if (deg_freedom < 1) {
                    return formula.undefined.nm;
                }
                return jStat.studentt.inv(probability, deg_freedom);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'T_INV_2T': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var probability = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(probability)) {
                    return probability;
                }
                if (!e.isRealNum(probability)) {
                    return formula.undefined.v;
                }
                probability = parseFloat(probability);
                var deg_freedom = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(deg_freedom)) {
                    return deg_freedom;
                }
                if (!e.isRealNum(deg_freedom)) {
                    return formula.undefined.v;
                }
                deg_freedom = parseInt(deg_freedom);
                if (probability <= 0 || probability > 1) {
                    return formula.undefined.nm;
                }
                if (deg_freedom < 1) {
                    return formula.undefined.nm;
                }
                return Math.abs(jStat.studentt.inv(probability / 2, deg_freedom));
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'T_TEST': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var known_x = [];
                if (j.getObjType(arguments[0]) == 'array') {
                    if (j.getObjType(arguments[0][0]) == 'array' && !func_methods.isDyadicArr(arguments[0])) {
                        return formula.undefined.v;
                    }
                    known_x = known_x.concat(func_methods.getDataArr(arguments[0], false));
                } else if (j.getObjType(arguments[0]) == 'object' && arguments[0].startCell != null) {
                    known_x = known_x.concat(func_methods.getCellDataArr(arguments[0], 'text', false));
                } else {
                    if (!e.isRealNum(arguments[0])) {
                        return formula.undefined.v;
                    }
                    known_x.push(arguments[0]);
                }
                var data_x = known_x;
                var known_y = [];
                if (j.getObjType(arguments[1]) == 'array') {
                    if (j.getObjType(arguments[1][0]) == 'array' && !func_methods.isDyadicArr(arguments[1])) {
                        return formula.undefined.v;
                    }
                    known_y = known_y.concat(func_methods.getDataArr(arguments[1], false));
                } else if (j.getObjType(arguments[1]) == 'object' && arguments[1].startCell != null) {
                    known_y = known_y.concat(func_methods.getCellDataArr(arguments[1], 'text', false));
                } else {
                    if (!e.isRealNum(arguments[1])) {
                        return formula.undefined.v;
                    }
                    known_y.push(arguments[1]);
                }
                var data_y = known_y;
                var tails = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(tails)) {
                    return tails;
                }
                if (!e.isRealNum(tails)) {
                    return formula.undefined.v;
                }
                tails = parseInt(tails);
                var type = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(type)) {
                    return type;
                }
                if (!e.isRealNum(type)) {
                    return formula.undefined.v;
                }
                type = parseInt(type);
                if ([
                        1,
                        2
                    ].indexOf(tails) == -1) {
                    return formula.undefined.nm;
                }
                if ([
                        1,
                        2,
                        3
                    ].indexOf(type) == -1) {
                    return formula.undefined.nm;
                }
                var t = null, df = null;
                if (type == 1) {
                    var diff_arr = [];
                    for (i = 0; i < data_x.length; i++) {
                        diff_arr.push(data_x[i] - data_y[i]);
                    }
                    var diff_mean = Math.abs(jStat.mean(diff_arr));
                    var diff_sd = func_methods.standardDeviation_s(diff_arr);
                    t = diff_mean / (diff_sd / Math.sqrt(data_x.length));
                    df = data_x.length - 1;
                } else {
                    var mean_x = jStat.mean(data_x);
                    var mean_y = jStat.mean(data_y);
                    var s_x = func_methods.variance_s(data_x);
                    var s_y = func_methods.variance_s(data_y);
                    t = Math.abs(mean_x - mean_y) / Math.sqrt(s_x / data_x.length + s_y / data_y.length);
                    switch (type) {
                    case 2:
                        df = data_x.length + data_y.length - 2;
                        break;
                    case 3:
                        df = Math.pow(s_x / data_x.length + s_y / data_y.length, 2) / (Math.pow(s_x / data_x.length, 2) / (data_x.length - 1) + Math.pow(s_y / data_y.length, 2) / (data_y.length - 1));
                        break;
                    }
                }
                if (tails == 1) {
                    var result = window.luckysheet_function.T_DIST_RT.f(t, df);
                } else if (tails == 2) {
                    var result = window.luckysheet_function.T_DIST_2T.f(t, df);
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'F_DIST': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(x)) {
                    return x;
                }
                if (!e.isRealNum(x)) {
                    return formula.undefined.v;
                }
                x = parseFloat(x);
                var degrees_freedom1 = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(degrees_freedom1)) {
                    return degrees_freedom1;
                }
                if (!e.isRealNum(degrees_freedom1)) {
                    return formula.undefined.v;
                }
                degrees_freedom1 = parseInt(degrees_freedom1);
                var degrees_freedom2 = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(degrees_freedom2)) {
                    return degrees_freedom2;
                }
                if (!e.isRealNum(degrees_freedom2)) {
                    return formula.undefined.v;
                }
                degrees_freedom2 = parseInt(degrees_freedom2);
                var cumulative = func_methods.getCellBoolen(arguments[3]);
                if (e.valueIsError(cumulative)) {
                    return cumulative;
                }
                if (x < 0) {
                    return formula.undefined.nm;
                }
                if (degrees_freedom1 < 1) {
                    return formula.undefined.nm;
                }
                if (degrees_freedom2 < 1) {
                    return formula.undefined.nm;
                }
                return cumulative ? jStat.centralF.cdf(x, degrees_freedom1, degrees_freedom2) : jStat.centralF.pdf(x, degrees_freedom1, degrees_freedom2);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'F_DIST_RT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(x)) {
                    return x;
                }
                if (!e.isRealNum(x)) {
                    return formula.undefined.v;
                }
                x = parseFloat(x);
                var degrees_freedom1 = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(degrees_freedom1)) {
                    return degrees_freedom1;
                }
                if (!e.isRealNum(degrees_freedom1)) {
                    return formula.undefined.v;
                }
                degrees_freedom1 = parseInt(degrees_freedom1);
                var degrees_freedom2 = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(degrees_freedom2)) {
                    return degrees_freedom2;
                }
                if (!e.isRealNum(degrees_freedom2)) {
                    return formula.undefined.v;
                }
                degrees_freedom2 = parseInt(degrees_freedom2);
                if (x < 0) {
                    return formula.undefined.nm;
                }
                if (degrees_freedom1 < 1) {
                    return formula.undefined.nm;
                }
                if (degrees_freedom2 < 1) {
                    return formula.undefined.nm;
                }
                return 1 - jStat.centralF.cdf(x, degrees_freedom1, degrees_freedom2);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'VAR_P': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        if (!e.isRealNum(data)) {
                            return formula.undefined.v;
                        }
                        dataArr.push(data);
                    }
                }
                var dataArr_n = [];
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (e.isRealNum(number)) {
                        dataArr_n.push(parseFloat(number));
                    }
                }
                if (dataArr_n.length == 0) {
                    return formula.undefined.d;
                }
                var n = dataArr_n.length;
                var sigma = 0;
                var mean = window.luckysheet_function.AVERAGE.f.apply(window.luckysheet_function.AVERAGE, dataArr_n);
                for (var i = 0; i < n; i++) {
                    sigma += Math.pow(dataArr_n[i] - mean, 2);
                }
                return sigma / n;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'VAR_S': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        if (!e.isRealNum(data)) {
                            return formula.undefined.v;
                        }
                        dataArr.push(data);
                    }
                }
                var dataArr_n = [];
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (e.isRealNum(number)) {
                        dataArr_n.push(parseFloat(number));
                    }
                }
                if (dataArr_n.length == 0) {
                    return formula.undefined.d;
                }
                var n = dataArr_n.length;
                var sigma = 0;
                var mean = window.luckysheet_function.AVERAGE.f.apply(window.luckysheet_function.AVERAGE, dataArr_n);
                for (var i = 0; i < n; i++) {
                    sigma += Math.pow(dataArr_n[i] - mean, 2);
                }
                return sigma / (n - 1);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'VARA': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, false));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        if (number.toString.toLowerCase() == 'true') {
                            dataArr.push(1);
                        } else if (number.toString.toLowerCase() == 'false') {
                            dataArr.push(0);
                        } else if (e.isRealNum(data)) {
                            dataArr.push(data);
                        } else {
                            return formula.undefined.v;
                        }
                    }
                }
                var dataArr_n = [];
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (e.isRealNum(number)) {
                        dataArr_n.push(parseFloat(number));
                    } else {
                        if (number.toString().toLowerCase() == 'true') {
                            dataArr_n.push(1);
                        } else {
                            dataArr_n.push(0);
                        }
                    }
                }
                var n = dataArr_n.length;
                var sigma = 0;
                var mean = window.luckysheet_function.AVERAGE.f.apply(window.luckysheet_function.AVERAGE, dataArr_n);
                for (var i = 0; i < n; i++) {
                    sigma += Math.pow(dataArr_n[i] - mean, 2);
                }
                return sigma / (n - 1);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'VARPA': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, false));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        if (number.toString.toLowerCase() == 'true') {
                            dataArr.push(1);
                        } else if (number.toString.toLowerCase() == 'false') {
                            dataArr.push(0);
                        } else if (e.isRealNum(data)) {
                            dataArr.push(data);
                        } else {
                            return formula.undefined.v;
                        }
                    }
                }
                var dataArr_n = [];
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (e.isRealNum(number)) {
                        dataArr_n.push(parseFloat(number));
                    } else {
                        if (number.toString().toLowerCase() == 'true') {
                            dataArr_n.push(1);
                        } else {
                            dataArr_n.push(0);
                        }
                    }
                }
                var n = dataArr_n.length;
                var sigma = 0;
                var mean = window.luckysheet_function.AVERAGE.f.apply(window.luckysheet_function.AVERAGE, dataArr_n);
                for (var i = 0; i < n; i++) {
                    sigma += Math.pow(dataArr_n[i] - mean, 2);
                }
                return sigma / n;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'STEYX': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var known_y = [];
                if (j.getObjType(arguments[0]) == 'array') {
                    if (j.getObjType(arguments[0][0]) == 'array' && !func_methods.isDyadicArr(arguments[0])) {
                        return formula.undefined.v;
                    }
                    known_y = known_y.concat(func_methods.getDataArr(arguments[0], false));
                } else if (j.getObjType(arguments[0]) == 'object' && arguments[0].startCell != null) {
                    known_y = known_y.concat(func_methods.getCellDataArr(arguments[0], 'text', false));
                } else {
                    if (!e.isRealNum(arguments[0])) {
                        return formula.undefined.v;
                    }
                    known_y.push(arguments[0]);
                }
                var known_x = [];
                if (j.getObjType(arguments[1]) == 'array') {
                    if (j.getObjType(arguments[1][0]) == 'array' && !func_methods.isDyadicArr(arguments[1])) {
                        return formula.undefined.v;
                    }
                    known_x = known_x.concat(func_methods.getDataArr(arguments[1], false));
                } else if (j.getObjType(arguments[1]) == 'object' && arguments[1].startCell != null) {
                    known_x = known_x.concat(func_methods.getCellDataArr(arguments[1], 'text', false));
                } else {
                    if (!e.isRealNum(arguments[1])) {
                        return formula.undefined.v;
                    }
                    known_x.push(arguments[1]);
                }
                if (known_y.length != known_x.length) {
                    return formula.undefined.na;
                }
                var data_y = [], data_x = [];
                for (var i = 0; i < known_y.length; i++) {
                    var num_y = known_y[i];
                    var num_x = known_x[i];
                    if (e.isRealNum(num_y) && e.isRealNum(num_x)) {
                        data_y.push(parseFloat(num_y));
                        data_x.push(parseFloat(num_x));
                    }
                }
                if (data_y.length < 3 || data_x.length < 3) {
                    return formula.undefined.d;
                }
                var xmean = jStat.mean(data_x);
                var ymean = jStat.mean(data_y);
                var n = data_x.length;
                var lft = 0;
                var num = 0;
                var den = 0;
                for (var i = 0; i < n; i++) {
                    lft += Math.pow(data_y[i] - ymean, 2);
                    num += (data_x[i] - xmean) * (data_y[i] - ymean);
                    den += Math.pow(data_x[i] - xmean, 2);
                }
                return Math.sqrt((lft - num * num / den) / (n - 2));
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'STANDARDIZE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(x)) {
                    return x;
                }
                if (!e.isRealNum(x)) {
                    return formula.undefined.v;
                }
                x = parseFloat(x);
                var mean = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(mean)) {
                    return mean;
                }
                if (!e.isRealNum(mean)) {
                    return formula.undefined.v;
                }
                mean = parseFloat(mean);
                var standard_dev = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(standard_dev)) {
                    return standard_dev;
                }
                if (!e.isRealNum(standard_dev)) {
                    return formula.undefined.v;
                }
                standard_dev = parseFloat(standard_dev);
                if (standard_dev <= 0) {
                    return formula.undefined.nm;
                }
                return (x - mean) / standard_dev;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SMALL': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                if (j.getObjType(arguments[0]) == 'array') {
                    if (j.getObjType(arguments[0][0]) == 'array' && !func_methods.isDyadicArr(arguments[0])) {
                        return formula.undefined.v;
                    }
                    dataArr = dataArr.concat(func_methods.getDataArr(arguments[0], true));
                } else if (j.getObjType(arguments[0]) == 'object' && arguments[0].startCell != null) {
                    dataArr = dataArr.concat(func_methods.getCellDataArr(arguments[0], 'number', true));
                } else {
                    if (!e.isRealNum(arguments[0])) {
                        return formula.undefined.v;
                    }
                    dataArr.push(arguments[0]);
                }
                var dataArr_n = [];
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (e.isRealNum(number)) {
                        dataArr_n.push(parseFloat(number));
                    }
                }
                var k = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(k)) {
                    return k;
                }
                if (!e.isRealNum(k)) {
                    return formula.undefined.v;
                }
                k = parseInt(k);
                if (dataArr_n.length == 0) {
                    return formula.undefined.nm;
                }
                if (k <= 0 || k > dataArr_n.length) {
                    return formula.undefined.nm;
                }
                return dataArr_n.sort(function (a, b) {
                    return a - b;
                })[k - 1];
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SLOPE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var known_y = [];
                if (j.getObjType(arguments[0]) == 'array') {
                    if (j.getObjType(arguments[0][0]) == 'array' && !func_methods.isDyadicArr(arguments[0])) {
                        return formula.undefined.v;
                    }
                    known_y = known_y.concat(func_methods.getDataArr(arguments[0], false));
                } else if (j.getObjType(arguments[0]) == 'object' && arguments[0].startCell != null) {
                    known_y = known_y.concat(func_methods.getCellDataArr(arguments[0], 'text', false));
                } else {
                    if (!e.isRealNum(arguments[0])) {
                        return formula.undefined.v;
                    }
                    known_y.push(arguments[0]);
                }
                var known_x = [];
                if (j.getObjType(arguments[1]) == 'array') {
                    if (j.getObjType(arguments[1][0]) == 'array' && !func_methods.isDyadicArr(arguments[1])) {
                        return formula.undefined.v;
                    }
                    known_x = known_x.concat(func_methods.getDataArr(arguments[1], false));
                } else if (j.getObjType(arguments[1]) == 'object' && arguments[1].startCell != null) {
                    known_x = known_x.concat(func_methods.getCellDataArr(arguments[1], 'text', false));
                } else {
                    if (!e.isRealNum(arguments[1])) {
                        return formula.undefined.v;
                    }
                    known_x.push(arguments[1]);
                }
                if (known_y.length != known_x.length) {
                    return formula.undefined.na;
                }
                var data_y = [], data_x = [];
                for (var i = 0; i < known_y.length; i++) {
                    var num_y = known_y[i];
                    var num_x = known_x[i];
                    if (e.isRealNum(num_y) && e.isRealNum(num_x)) {
                        data_y.push(parseFloat(num_y));
                        data_x.push(parseFloat(num_x));
                    }
                }
                if (data_y.length < 3 || data_x.length < 3) {
                    return formula.undefined.d;
                }
                var xmean = jStat.mean(data_x);
                var ymean = jStat.mean(data_y);
                var n = data_x.length;
                var num = 0;
                var den = 0;
                for (var i = 0; i < n; i++) {
                    num += (data_x[i] - xmean) * (data_y[i] - ymean);
                    den += Math.pow(data_x[i] - xmean, 2);
                }
                return num / den;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SKEW': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        if (!e.isRealNum(data)) {
                            return formula.undefined.v;
                        }
                        dataArr.push(data);
                    }
                }
                var dataArr_n = [];
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (e.isRealNum(number)) {
                        dataArr_n.push(parseFloat(number));
                    }
                }
                if (dataArr_n.length < 3 || func_methods.standardDeviation_s(dataArr_n) == 0) {
                    return formula.undefined.d;
                }
                var mean = jStat.mean(dataArr_n);
                var n = dataArr_n.length;
                var sigma = 0;
                for (var i = 0; i < n; i++) {
                    sigma += Math.pow(dataArr_n[i] - mean, 3);
                }
                return n * sigma / ((n - 1) * (n - 2) * Math.pow(jStat.stdev(dataArr_n, true), 3));
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SKEW_P': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var dataArr = [];
                for (var i = 0; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        if (!e.isRealNum(data)) {
                            return formula.undefined.v;
                        }
                        dataArr.push(data);
                    }
                }
                var dataArr_n = [];
                for (var i = 0; i < dataArr.length; i++) {
                    var number = dataArr[i];
                    if (e.isRealNum(number)) {
                        dataArr_n.push(parseFloat(number));
                    }
                }
                if (dataArr_n.length < 3 || func_methods.standardDeviation_s(dataArr_n) == 0) {
                    return formula.undefined.d;
                }
                var mean = jStat.mean(dataArr_n);
                var n = dataArr_n.length;
                var m2 = 0;
                var m3 = 0;
                for (var i = 0; i < n; i++) {
                    m3 += Math.pow(dataArr_n[i] - mean, 3);
                    m2 += Math.pow(dataArr_n[i] - mean, 2);
                }
                m3 = m3 / n;
                m2 = m2 / n;
                return m3 / Math.pow(m2, 3 / 2);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ADDRESS': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var row_num = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(row_num)) {
                    return row_num;
                }
                if (!e.isRealNum(row_num)) {
                    return formula.undefined.v;
                }
                row_num = parseInt(row_num);
                var column_num = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(column_num)) {
                    return column_num;
                }
                if (!e.isRealNum(column_num)) {
                    return formula.undefined.v;
                }
                column_num = parseInt(column_num);
                var abs_num = 1;
                if (arguments.length >= 3) {
                    abs_num = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(abs_num)) {
                        return abs_num;
                    }
                    if (!e.isRealNum(abs_num)) {
                        return formula.undefined.v;
                    }
                    abs_num = parseInt(abs_num);
                }
                var A1 = true;
                if (arguments.length >= 4) {
                    A1 = func_methods.getCellBoolen(arguments[3]);
                    if (e.valueIsError(A1)) {
                        return A1;
                    }
                }
                if (row_num <= 0 || column_num <= 0) {
                    return formula.undefined.v;
                }
                if ([
                        1,
                        2,
                        3,
                        4
                    ].indexOf(abs_num) == -1) {
                    return formula.undefined.v;
                }
                var str;
                if (A1) {
                    column_num = j.chatatABC(column_num - 1);
                    switch (abs_num) {
                    case 1:
                        str = '$' + column_num + '$' + row_num;
                        break;
                    case 2:
                        str = column_num + '$' + row_num;
                        break;
                    case 3:
                        str = '$' + column_num + row_num;
                        break;
                    case 4:
                        str = column_num + row_num;
                        break;
                    }
                } else {
                    switch (abs_num) {
                    case 1:
                        str = 'R' + row_num + 'C' + column_num;
                        break;
                    case 2:
                        str = 'R' + row_num + 'C[' + column_num + ']';
                        break;
                    case 3:
                        str = 'R[' + row_num + ']' + 'C' + column_num;
                        break;
                    case 4:
                        str = 'R[' + row_num + ']' + 'C[' + column_num + ']';
                        break;
                    }
                }
                if (arguments.length == 5) {
                    var sheet_text = func_methods.getFirstValue(arguments[4]);
                    if (e.valueIsError(sheet_text)) {
                        return sheet_text;
                    }
                    return sheet_text + '!' + str;
                } else {
                    return str;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'INDIRECT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var ref_text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(ref_text)) {
                    return ref_text;
                }
                var A1 = true;
                if (arguments.length == 2) {
                    A1 = func_methods.getCellBoolen(arguments[1]);
                    if (e.valueIsError(A1)) {
                        return A1;
                    }
                }
                let luckysheetfile = c.getluckysheetfile();
                let index = c.getSheetIndex(Store.calculateSheetIndex);
                let currentSheet = luckysheetfile[index];
                let sheetdata = currentSheet.data;
                if (A1) {
                } else {
                }
                if (formula.iscelldata(ref_text)) {
                    let cellrange = formula.getcellrange(ref_text);
                    let row = cellrange.row[0], col = cellrange.column[0];
                    if (row < 0 || row >= sheetdata.length || col < 0 || col >= sheetdata[0].length) {
                        return formula.undefined.r;
                    }
                    if (sheetdata[row][col] == null || e.isRealNull(sheetdata[row][col].v)) {
                        return 0;
                    }
                    let value = sheetdata[row][col].v;
                    if (formula.execFunctionGlobalData != null) {
                        let ef = formula.execFunctionGlobalData[row + '_' + col + '_' + Store.calculateSheetIndex];
                        if (ef != null) {
                            value = ef.v;
                        }
                    }
                    let retAll = {
                        'sheetName': currentSheet.name,
                        'startCell': ref_text,
                        'rowl': row,
                        'coll': col,
                        'data': value
                    };
                    return retAll;
                } else {
                    return formula.undefined.r;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ROW': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                if (arguments.length == 1) {
                    var reference;
                    if (j.getObjType(arguments[0]) == 'array') {
                        return formula.undefined.v;
                    } else if (j.getObjType(arguments[0]) == 'object' && arguments[0].startCell != null) {
                        reference = arguments[0].startCell;
                    } else {
                        reference = arguments[0];
                    }
                    if (formula.iscelldata(reference)) {
                        var cellrange = formula.getcellrange(reference);
                        return cellrange['row'][0] + 1;
                    } else {
                        return formula.undefined.v;
                    }
                } else {
                    return window.luckysheetCurrentRow + 1;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ROWS': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                if (j.getObjType(arguments[0]) == 'array') {
                    if (j.getObjType(arguments[0][0]) == 'array') {
                        return arguments[0].length;
                    } else {
                        return 1;
                    }
                } else if (j.getObjType(arguments[0]) == 'object' && arguments[0].startCell != null) {
                    return arguments[0].rowl;
                } else {
                    return 1;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COLUMN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                if (arguments.length == 1) {
                    var reference;
                    if (j.getObjType(arguments[0]) == 'array') {
                        return formula.undefined.v;
                    } else if (j.getObjType(arguments[0]) == 'object' && arguments[0].startCell != null) {
                        reference = arguments[0].startCell;
                    } else {
                        reference = arguments[0];
                    }
                    if (formula.iscelldata(reference)) {
                        var cellrange = formula.getcellrange(reference);
                        return cellrange['column'][0] + 1;
                    } else {
                        return formula.undefined.v;
                    }
                } else {
                    return window.luckysheetCurrentColumn + 1;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COLUMNS': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                if (j.getObjType(arguments[0]) == 'array') {
                    if (j.getObjType(arguments[0][0]) == 'array') {
                        return arguments[0][0].length;
                    } else {
                        return arguments[0].length;
                    }
                } else if (j.getObjType(arguments[0]) == 'object' && arguments[0].startCell != null) {
                    return arguments[0].coll;
                } else {
                    return 1;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'OFFSET': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                if (!(j.getObjType(arguments[0]) == 'object' && arguments[0].startCell != null)) {
                    return formula.undefined.v;
                }
                var reference = arguments[0].startCell;
                let sheetName = arguments[0].sheetName;
                var rows = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(rows)) {
                    return rows;
                }
                if (!e.isRealNum(rows)) {
                    return formula.undefined.v;
                }
                rows = parseInt(rows);
                var cols = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(cols)) {
                    return cols;
                }
                if (!e.isRealNum(cols)) {
                    return formula.undefined.v;
                }
                cols = parseInt(cols);
                var height = arguments[0].rowl;
                if (arguments.length >= 4) {
                    height = func_methods.getFirstValue(arguments[3]);
                    if (e.valueIsError(height)) {
                        return height;
                    }
                    if (!e.isRealNum(height)) {
                        return formula.undefined.v;
                    }
                    height = parseInt(height);
                }
                var width = arguments[0].coll;
                if (arguments.length == 5) {
                    width = func_methods.getFirstValue(arguments[4]);
                    if (e.valueIsError(width)) {
                        return width;
                    }
                    if (!e.isRealNum(width)) {
                        return formula.undefined.v;
                    }
                    width = parseInt(width);
                }
                if (height < 1 || width < 1) {
                    return formula.undefined.r;
                }
                var cellrange = formula.getcellrange(reference);
                var cellRow0 = cellrange['row'][0];
                var cellCol0 = cellrange['column'][0];
                cellRow0 += rows;
                cellCol0 += cols;
                var cellRow1 = cellRow0 + height - 1;
                var cellCol1 = cellCol0 + width - 1;
                let luckysheetfile = c.getluckysheetfile();
                let index = c.getSheetIndex(Store.calculateSheetIndex);
                let sheetdata = luckysheetfile[index].data;
                if (cellRow0 < 0 || cellRow1 >= sheetdata.length || cellCol0 < 0 || cellCol1 >= sheetdata[0].length) {
                    return formula.undefined.r;
                }
                var result = [];
                for (var r = cellRow0; r <= cellRow1; r++) {
                    var rowArr = [];
                    for (var c = cellCol0; c <= cellCol1; c++) {
                        if (formula.execFunctionGlobalData != null && formula.execFunctionGlobalData[r + '_' + c + '_' + Store.calculateSheetIndex] != null) {
                            let ef = formula.execFunctionGlobalData[r + '_' + c + '_' + Store.calculateSheetIndex];
                            if (ef != null) {
                                rowArr.push(ef.v);
                            } else {
                                rowArr.push(0);
                            }
                        } else if (sheetdata[r][c] != null && !e.isRealNull(sheetdata[r][c].v)) {
                            rowArr.push(sheetdata[r][c].v);
                        } else {
                            rowArr.push(0);
                        }
                    }
                    result.push(rowArr);
                }
                let retAll = {
                    'sheetName': sheetName,
                    'startCell': c.getRangetxt(Store.calculateSheetIndex, {
                        row: [
                            cellRow0,
                            cellRow1
                        ],
                        column: [
                            cellCol0,
                            cellCol1
                        ]
                    }),
                    'rowl': cellRow0,
                    'coll': cellCol0,
                    'data': result
                };
                return retAll;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MATCH': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var lookup_value = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(lookup_value)) {
                    return lookup_value;
                }
                var data_lookup_array = arguments[1];
                var lookup_array = [];
                if (j.getObjType(data_lookup_array) == 'array') {
                    if (j.getObjType(data_lookup_array[0]) == 'array') {
                        if (!func_methods.isDyadicArr(data_lookup_array)) {
                            return formula.undefined.v;
                        }
                        return formula.undefined.na;
                    } else {
                        for (var i = 0; i < data_lookup_array.length; i++) {
                            lookup_array.push(data_lookup_array[i]);
                        }
                    }
                } else if (j.getObjType(data_lookup_array) == 'object' && data_lookup_array.startCell != null) {
                    if (data_lookup_array.rowl > 1 && data_lookup_array.coll > 1) {
                        return formula.undefined.na;
                    }
                    if (data_lookup_array.data != null) {
                        if (j.getObjType(data_lookup_array.data) == 'array') {
                            for (var i = 0; i < data_lookup_array.data.length; i++) {
                                for (var j = 0; j < data_lookup_array.data[i].length; j++) {
                                    if (data_lookup_array.data[i][j] != null && !e.isRealNull(data_lookup_array.data[i][j].v)) {
                                        lookup_array.push(data_lookup_array.data[i][j].v);
                                    }
                                }
                            }
                        } else {
                            lookup_array.push(data_lookup_array.data.v);
                        }
                    }
                }
                var match_type = 1;
                if (arguments.length == 3) {
                    match_type = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(match_type)) {
                        return match_type;
                    }
                    if (!e.isRealNum(match_type)) {
                        return formula.undefined.v;
                    }
                    match_type = Math.ceil(parseFloat(match_type));
                }
                if ([
                        -1,
                        0,
                        1
                    ].indexOf(match_type) == -1) {
                    return formula.undefined.na;
                }
                var index;
                var indexValue;
                for (var idx = 0; idx < lookup_array.length; idx++) {
                    if (match_type === 1) {
                        if (lookup_array[idx] === lookup_value) {
                            return idx + 1;
                        } else if (lookup_array[idx] < lookup_value) {
                            if (!indexValue) {
                                index = idx + 1;
                                indexValue = lookup_array[idx];
                            } else if (lookup_array[idx] > indexValue) {
                                index = idx + 1;
                                indexValue = lookup_array[idx];
                            }
                        }
                    } else if (match_type === 0) {
                        if (typeof lookup_value === 'string') {
                            lookup_value = lookup_value.replace(/\?/g, '.');
                            if (lookup_array[idx].toLowerCase().match(lookup_value.toLowerCase())) {
                                return idx + 1;
                            }
                        } else {
                            if (lookup_array[idx] === lookup_value) {
                                return idx + 1;
                            }
                        }
                    } else if (match_type === -1) {
                        if (lookup_array[idx] === lookup_value) {
                            return idx + 1;
                        } else if (lookup_array[idx] > lookup_value) {
                            if (!indexValue) {
                                index = idx + 1;
                                indexValue = lookup_array[idx];
                            } else if (lookup_array[idx] < indexValue) {
                                index = idx + 1;
                                indexValue = lookup_array[idx];
                            }
                        }
                    }
                }
                return index ? index : formula.undefined.na;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'VLOOKUP': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var lookup_value = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(lookup_value)) {
                    return lookup_value;
                }
                if (lookup_value.toString().replace(/\s/g, '') == '') {
                    return formula.undefined.na;
                }
                var data_table_array = arguments[1];
                var table_array = [];
                if (j.getObjType(data_table_array) == 'array') {
                    if (j.getObjType(data_table_array[0]) == 'array') {
                        if (!func_methods.isDyadicArr(data_table_array)) {
                            return formula.undefined.v;
                        }
                        for (var i = 0; i < data_table_array.length; i++) {
                            var rowArr = [];
                            for (var j = 0; j < data_table_array[i].length; j++) {
                                rowArr.push(data_table_array[i][j]);
                            }
                            table_array.push(rowArr);
                        }
                    } else {
                        var rowArr = [];
                        for (var i = 0; i < data_table_array.length; i++) {
                            rowArr.push(data_table_array[i]);
                        }
                        table_array.push(rowArr);
                    }
                } else if (j.getObjType(data_table_array) == 'object' && data_table_array.startCell != null) {
                    table_array = func_methods.getCellDataDyadicArr(data_table_array, 'text');
                } else {
                    return formula.undefined.v;
                }
                var col_index_num = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(col_index_num)) {
                    return col_index_num;
                }
                if (!e.isRealNum(col_index_num)) {
                    return formula.undefined.v;
                }
                col_index_num = parseInt(col_index_num);
                var range_lookup = true;
                if (arguments.length == 4) {
                    range_lookup = func_methods.getCellBoolen(arguments[3]);
                    if (e.valueIsError(range_lookup)) {
                        return range_lookup;
                    }
                }
                if (col_index_num < 1) {
                    return formula.undefined.v;
                } else if (col_index_num > table_array[0].length) {
                    return formula.undefined.r;
                }
                if (range_lookup) {
                    table_array = h.orderbydata(table_array, 0, true);
                    for (var r = 0; r < table_array.length; r++) {
                        var v = table_array[r][0];
                        var result;
                        if (d.isdatetime(lookup_value) && d.isdatetime(v)) {
                            result = d.diff(lookup_value, v);
                        } else if (e.isRealNum(lookup_value) && e.isRealNum(v)) {
                            result = numeral(lookup_value).value() - numeral(v).value();
                        } else if (!e.isRealNum(lookup_value) && !e.isRealNum(v)) {
                            result = lookup_value.localeCompare(v, 'zh');
                        } else if (!e.isRealNum(lookup_value)) {
                            result = 1;
                        } else if (!e.isRealNum(v)) {
                            result = -1;
                        }
                        if (result < 0) {
                            if (r == 0) {
                                return formula.undefined.na;
                            } else {
                                return table_array[r - 1][col_index_num - 1];
                            }
                        } else {
                            if (r == table_array.length - 1) {
                                return table_array[r][col_index_num - 1];
                            }
                        }
                    }
                } else {
                    var index = null;
                    for (var r = 0; r < table_array.length; r++) {
                        if (lookup_value.toString() == table_array[r][0].toString()) {
                            index = r;
                            break;
                        }
                    }
                    if (index == null) {
                        return formula.undefined.na;
                    }
                    return table_array[index][col_index_num - 1];
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'HLOOKUP': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var searchkey = arguments[0];
                if (typeof searchkey == 'object') {
                    searchkey = arguments[0].data;
                    if (j.getObjType(searchkey) == 'array') {
                        searchkey = searchkey[r];
                        if (j.getObjType(searchkey) == 'array') {
                            searchkey = searchkey[c];
                        }
                    } else {
                        searchkey = searchkey.v;
                    }
                }
                var range = arguments[1].data;
                var index = arguments[2];
                var isaccurate = false;
                if (arguments.length > 3) {
                    isaccurate = !!arguments[3];
                }
                if (index > range.rowl) {
                    return [
                        formula.undefined.v,
                        '索引超过了范围的长度\uFF0C' + range[0].length
                    ];
                }
                if (index < 1) {
                    return [
                        formula.undefined.v,
                        '索引必须大于1'
                    ];
                }
                var result = formula.undefined.na;
                for (var c = 0; c < range[0].length; c++) {
                    var matchv = i.getcellvalue(0, c, range);
                    var showv = i.getcellvalue(index - 1, c, range);
                    if (isaccurate) {
                        if (matchv.indexOf(searchkey) > -1) {
                            result = showv;
                        }
                    } else {
                        if (formula.acompareb(matchv, searchkey)) {
                            result = showv;
                            return result;
                        }
                    }
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'LOOKUP': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var searchkey = arguments[0];
                if (typeof searchkey == 'object') {
                    searchkey = arguments[0].data;
                    if (j.getObjType(searchkey) == 'array') {
                        searchkey = searchkey[r];
                        if (j.getObjType(searchkey) == 'array') {
                            searchkey = searchkey[c];
                        }
                    } else {
                        searchkey = searchkey.v;
                    }
                }
                var range = arguments[1].data;
                var range2;
                var result = formula.undefined.na;
                function sortNum(a, b) {
                    return b - a;
                }
                range = formula.getRangeArray(range)[0];
                if (arguments[2]) {
                    range2 = arguments[2].data;
                    range2 = formula.getRangeArray(range2)[0];
                }
                if (typeof searchkey == 'string') {
                    for (var i = 0; i < range.length; i++) {
                        var matchv = range[i];
                        var showv;
                        if (arguments[2]) {
                            showv = range2[i];
                            if (matchv == searchkey) {
                                result = showv;
                            }
                        } else {
                            if (formula.acompareb(matchv, searchkey)) {
                                result = matchv;
                            }
                        }
                    }
                } else if (d.isdatatype(searchkey) == 'num') {
                    var rangeNow = [];
                    for (var i = 0; i < range.length; i++) {
                        var matchv = range[i];
                        var showv;
                        if (arguments[2]) {
                            showv = range2[i];
                            if (matchv == searchkey) {
                                result = showv;
                                return result;
                            } else if (matchv != searchkey && d.isdatatype(matchv) == 'num') {
                                rangeNow.push(matchv);
                            }
                        } else {
                            if (matchv == searchkey) {
                                result = matchv;
                                return result;
                            } else if (matchv != searchkey && d.isdatatype(matchv) == 'num') {
                                rangeNow.push(matchv);
                            }
                        }
                    }
                    if (rangeNow.length != 0) {
                        rangeNow.push(searchkey);
                        rangeNow.sort(sortNum);
                        var index = rangeNow.indexOf(searchkey);
                        if (index == rangeNow.length - 1) {
                            return [
                                formula.undefined.na,
                                '找不到对应参数'
                            ];
                        } else {
                            var mat = rangeNow[index + 1];
                            if (arguments[2]) {
                                var i = range.indexOf(mat);
                                result = range2[i];
                            } else {
                                result = mat;
                            }
                        }
                    }
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'INDEX': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_array = arguments[0];
                var array = [];
                let isReference = false;
                if (j.getObjType(data_array) == 'array') {
                    if (j.getObjType(data_array[0]) == 'array' && !func_methods.isDyadicArr(data_array)) {
                        return formula.undefined.v;
                    }
                    array = func_methods.getDataDyadicArr(data_array);
                } else if (j.getObjType(data_array) == 'object' && data_array.startCell != null) {
                    array = func_methods.getCellDataDyadicArr(data_array, 'number');
                    isReference = true;
                }
                var rowlen = array.length, collen = array[0].length;
                var row_num = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(row_num)) {
                    return row_num;
                }
                if (!e.isRealNum(row_num)) {
                    return formula.undefined.v;
                }
                row_num = parseInt(row_num);
                var column_num = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(column_num)) {
                    return column_num;
                }
                if (row_num < 0 || e.isRealNum(column_num) && column_num < 0) {
                    return formula.undefined.v;
                }
                if (row_num > rowlen || e.isRealNum(column_num) && column_num > collen) {
                    return formula.undefined.r;
                }
                if (isReference) {
                    var cellrange = formula.getcellrange(data_array.startCell);
                    var cellRow0 = cellrange['row'][0];
                    var cellCol0 = cellrange['column'][0];
                    let data = array;
                    if (row_num == 0 || column_num == 0) {
                        if (row_num == 0) {
                            data = array[0];
                            row_num = 1;
                        } else {
                            data = array[row_num - 1];
                        }
                        if (e.isRealNum(column_num)) {
                            if (column_num == 0) {
                                data = data[0];
                                column_num = 1;
                            } else {
                                data = data[column_num - 1];
                            }
                        } else {
                            column_num = 1;
                        }
                    } else {
                        if (!e.isRealNum(row_num)) {
                            row_num = 1;
                        }
                        if (!e.isRealNum(column_num)) {
                            column_num = 1;
                        }
                        data = array[row_num - 1][column_num - 1];
                    }
                    let row_index = cellRow0 + row_num - 1, column_index = cellCol0 + column_num - 1;
                    let retAll = {
                        'sheetName': data_array.sheetName,
                        'startCell': c.getRangetxt(Store.calculateSheetIndex, {
                            row: [
                                row_index,
                                row_index
                            ],
                            column: [
                                column_index,
                                column_index
                            ]
                        }),
                        'rowl': row_index,
                        'coll': column_index,
                        'data': data
                    };
                    return retAll;
                } else {
                    if (!e.isRealNum(column_num)) {
                        return formula.undefined.v;
                    }
                    column_num = parseInt(column_num);
                    if (row_num <= 0 || column_num <= 0) {
                        return formula.undefined.v;
                    }
                    return array[row_num - 1][column_num - 1];
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'GETPIVOTDATA': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                return formula.undefined.v;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'CHOOSE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var index_num = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(index_num)) {
                    return index_num;
                }
                if (!e.isRealNum(index_num)) {
                    return formula.undefined.v;
                }
                index_num = parseInt(index_num);
                if (index_num < 1 || index_num > arguments.length - 1) {
                    return formula.undefined.v;
                }
                var data_result = arguments[index_num];
                if (j.getObjType(data_result) == 'array') {
                    if (j.getObjType(data_result[0]) == 'array' && !func_methods.isDyadicArr(data_result)) {
                        return formula.undefined.v;
                    }
                    return data_result;
                } else if (j.getObjType(data_result) == 'object' && data_result.startCell != null) {
                    if (data_result.data == null) {
                        return 0;
                    }
                    if (j.getObjType(data_result.data) == 'array') {
                        var result = func_methods.getCellDataDyadicArr(data_result.data, 'number');
                        return result;
                    } else {
                        if (e.isRealNull(data_result.data.v)) {
                            return 0;
                        }
                        return data_result.data.v;
                    }
                } else {
                    return data_result;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'HYPERLINK': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                return formula.undefined.v;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TIME': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var hour = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(hour)) {
                    return hour;
                }
                if (!e.isRealNum(hour)) {
                    return formula.undefined.v;
                }
                hour = parseInt(hour);
                var minute = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(minute)) {
                    return minute;
                }
                if (!e.isRealNum(minute)) {
                    return formula.undefined.v;
                }
                minute = parseInt(minute);
                var second = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(second)) {
                    return second;
                }
                if (!e.isRealNum(second)) {
                    return formula.undefined.v;
                }
                second = parseInt(second);
                if (hour < 0 || hour > 32767) {
                    return formula.undefined.nm;
                } else if (hour > 24) {
                    hour = hour % 24;
                }
                if (minute < 0 || minute > 32767) {
                    return formula.undefined.nm;
                }
                if (second < 0 || second > 32767) {
                    return formula.undefined.nm;
                }
                var time = dayjs().set({
                    'hour': hour,
                    'minute': minute,
                    'second': second
                });
                return dayjs(time).format('h:mm:ss a');
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TIMEVALUE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var time_text = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(time_text)) {
                    return time_text;
                }
                if (!dayjs(time_text).isValid()) {
                    return formula.undefined.v;
                }
                return (3600 * dayjs(time_text).get('hour') + 60 * dayjs(time_text).get('minute') + dayjs(time_text).get('second')) / 86400;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'EOMONTH': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var start_date = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(start_date)) {
                    return start_date;
                }
                var months = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(months)) {
                    return months;
                }
                if (!e.isRealNum(months)) {
                    return formula.undefined.v;
                }
                months = parseInt(months);
                if (!dayjs(start_date).isValid()) {
                    return formula.undefined.v;
                }
                var date = dayjs(start_date).add(months + 1, 'months').set('date', 1).subtract(1, 'days');
                var mask = g.genarate(dayjs(date).format('YYYY-MM-DD H:mm:ss'));
                var result = mask[2];
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'EDATE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var start_date = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(start_date)) {
                    return start_date;
                }
                var months = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(months)) {
                    return months;
                }
                if (!e.isRealNum(months)) {
                    return formula.undefined.v;
                }
                months = parseInt(months);
                if (!dayjs(start_date).isValid()) {
                    return formula.undefined.v;
                }
                var date = dayjs(start_date).add(months, 'months');
                var mask = g.genarate(dayjs(date).format('YYYY-MM-DD h:mm:ss'));
                var result = mask[2];
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SECOND': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var time_text = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(time_text)) {
                    return time_text;
                }
                if (!dayjs(time_text).isValid()) {
                    return formula.undefined.v;
                }
                var result = dayjs(time_text).seconds();
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MINUTE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var time_text = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(time_text)) {
                    return time_text;
                }
                if (!dayjs(time_text).isValid()) {
                    return formula.undefined.v;
                }
                var result = dayjs(time_text).minutes();
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'HOUR': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var time_text = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(time_text)) {
                    return time_text;
                }
                if (!dayjs(time_text).isValid()) {
                    return formula.undefined.v;
                }
                var result = dayjs(time_text).hours();
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'NOW': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                return dayjs().format('YYYY-M-D HH:mm');
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'NETWORKDAYS': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                if (arguments.length == 3) {
                    var result = window.luckysheet_function.NETWORKDAYS_INTL.f(arguments[0], arguments[1], 1, arguments[2]);
                } else {
                    var result = window.luckysheet_function.NETWORKDAYS_INTL.f(arguments[0], arguments[1], 1);
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'NETWORKDAYS_INTL': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var WEEKEND_TYPES = [
                    [],
                    [
                        6,
                        0
                    ],
                    [
                        0,
                        1
                    ],
                    [
                        1,
                        2
                    ],
                    [
                        2,
                        3
                    ],
                    [
                        3,
                        4
                    ],
                    [
                        4,
                        5
                    ],
                    [
                        5,
                        6
                    ],
                    undefined,
                    undefined,
                    undefined,
                    [
                        0,
                        0
                    ],
                    [
                        1,
                        1
                    ],
                    [
                        2,
                        2
                    ],
                    [
                        3,
                        3
                    ],
                    [
                        4,
                        4
                    ],
                    [
                        5,
                        5
                    ],
                    [
                        6,
                        6
                    ]
                ];
                var start_date = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(start_date)) {
                    return start_date;
                }
                if (!dayjs(start_date).isValid()) {
                    return formula.undefined.v;
                }
                var end_date = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(end_date)) {
                    return end_date;
                }
                if (!dayjs(end_date).isValid()) {
                    return formula.undefined.v;
                }
                var weekend = WEEKEND_TYPES[1];
                if (arguments.length >= 3) {
                    weekend = arguments[2];
                    if (typeof weekend == 'string' && weekend.length == '7' && /^[0-1]{7}$/g.test(weekend)) {
                    } else {
                        weekend = func_methods.getFirstValue(arguments[2]);
                        if (e.valueIsError(weekend)) {
                            return weekend;
                        }
                        if (!e.isRealNum(weekend)) {
                            return formula.undefined.v;
                        }
                        weekend = parseInt(weekend);
                        if (weekend < 1 || weekend > 7 && weekend < 11 || weekend > 17) {
                            return formula.undefined.nm;
                        }
                        weekend = WEEKEND_TYPES[weekend];
                    }
                }
                var holidays = [];
                if (arguments.length == 4) {
                    holidays = func_methods.getCellrangeDate(arguments[3]);
                    if (e.valueIsError(holidays)) {
                        return holidays;
                    }
                }
                for (var i = 0; i < holidays.length; i++) {
                    if (!dayjs(holidays[i]).isValid()) {
                        return formula.undefined.v;
                    }
                }
                var days = dayjs(end_date).undefined(dayjs(start_date), 'days') + 1;
                var total = days;
                var day = dayjs(start_date);
                for (i = 0; i < days; i++) {
                    var d = dayjs(day).weekday();
                    var dec = false;
                    if (j.getObjType(weekend) == 'array') {
                        if (d === weekend[0] || d === weekend[1]) {
                            dec = true;
                        }
                    } else {
                        if (d == 0) {
                            d = 7;
                        }
                        if (weekend.charAt(d - 1) == '0') {
                            dec = true;
                        }
                    }
                    for (var j = 0; j < holidays.length; j++) {
                        if (dayjs(day).undefined(dayjs(holidays[j]), 'days') === 0) {
                            dec = true;
                            break;
                        }
                    }
                    if (dec) {
                        total--;
                    }
                    day = dayjs(day).add(1, 'days');
                }
                return total;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ISOWEEKNUM': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var date = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(date)) {
                    return date;
                }
                if (!dayjs(date).isValid()) {
                    return formula.undefined.v;
                }
                return dayjs(date).isoWeeks();
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'WEEKNUM': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var WEEK_STARTS = [
                    undefined,
                    7,
                    1,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7
                ];
                var serial_number = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(serial_number)) {
                    return serial_number;
                }
                if (!dayjs(serial_number).isValid()) {
                    return formula.undefined.v;
                }
                var return_type = 1;
                if (arguments.length == 2) {
                    return_type = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(return_type)) {
                        return return_type;
                    }
                    if (!e.isRealNum(return_type)) {
                        return formula.undefined.v;
                    }
                    return_type = parseInt(return_type);
                }
                if (return_type == 21) {
                    return window.luckysheet_function.ISOWEEKNUM.f(arguments[0]);
                }
                if ([
                        1,
                        2,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17
                    ].indexOf(return_type) == -1) {
                    return formula.undefined.nm;
                }
                var week_start = WEEK_STARTS[return_type];
                var inc = dayjs(serial_number).isoWeekday() >= week_start ? 1 : 0;
                var result = dayjs(serial_number).isoWeeks() + inc;
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'WEEKDAY': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var WEEK_TYPES = [
                    [],
                    [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                    ],
                    [
                        7,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6
                    ],
                    [
                        6,
                        0,
                        1,
                        2,
                        3,
                        4,
                        5
                    ],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [
                        7,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6
                    ],
                    [
                        6,
                        7,
                        1,
                        2,
                        3,
                        4,
                        5
                    ],
                    [
                        5,
                        6,
                        7,
                        1,
                        2,
                        3,
                        4
                    ],
                    [
                        4,
                        5,
                        6,
                        7,
                        1,
                        2,
                        3
                    ],
                    [
                        3,
                        4,
                        5,
                        6,
                        7,
                        1,
                        2
                    ],
                    [
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        1
                    ],
                    [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                    ]
                ];
                var serial_number = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(serial_number)) {
                    return serial_number;
                }
                if (!dayjs(serial_number).isValid()) {
                    return formula.undefined.v;
                }
                var return_type = 1;
                if (arguments.length == 2) {
                    return_type = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(return_type)) {
                        return return_type;
                    }
                    if (!e.isRealNum(return_type)) {
                        return formula.undefined.v;
                    }
                    return_type = parseInt(return_type);
                }
                if ([
                        1,
                        2,
                        3,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17
                    ].indexOf(return_type) == -1) {
                    return formula.undefined.nm;
                }
                var result = WEEK_TYPES[return_type][dayjs(serial_number).day()];
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DAY': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var serial_number = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(serial_number)) {
                    return serial_number;
                }
                if (!dayjs(serial_number).isValid()) {
                    return formula.undefined.v;
                }
                return dayjs(serial_number).date();
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DAYS': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var end_date = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(end_date)) {
                    return end_date;
                }
                if (!dayjs(end_date).isValid()) {
                    return formula.undefined.v;
                }
                var start_date = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(start_date)) {
                    return start_date;
                }
                if (!dayjs(start_date).isValid()) {
                    return formula.undefined.v;
                }
                var result = dayjs(end_date).undefined(dayjs(start_date), 'days');
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DAYS360': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var start_date = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(start_date)) {
                    return start_date;
                }
                if (!dayjs(start_date).isValid()) {
                    return formula.undefined.v;
                }
                var end_date = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(end_date)) {
                    return end_date;
                }
                if (!dayjs(end_date).isValid()) {
                    return formula.undefined.v;
                }
                var method = false;
                if (arguments.length == 3) {
                    method = func_methods.getCellBoolen(arguments[2]);
                    if (e.valueIsError(method)) {
                        return method;
                    }
                }
                var sm = dayjs(start_date).month();
                var em = dayjs(end_date).month();
                var sd, ed;
                if (method) {
                    sd = dayjs(start_date).date() === 31 ? 30 : dayjs(start_date).date();
                    ed = dayjs(end_date).date() === 31 ? 30 : dayjs(end_date).date();
                } else {
                    var smd = dayjs().set({
                        'year': dayjs(start_date).year(),
                        'month': sm + 1,
                        'date': 0
                    }).date();
                    var emd = dayjs().set({
                        'year': dayjs(end_date).year(),
                        'month': em + 1,
                        'date': 0
                    }).date();
                    sd = dayjs(start_date).date() === smd ? 30 : dayjs(start_date).date();
                    if (dayjs(end_date).date() === emd) {
                        if (sd < 30) {
                            em++;
                            ed = 1;
                        } else {
                            ed = 30;
                        }
                    } else {
                        ed = dayjs(end_date).date();
                    }
                }
                var result = 360 * dayjs(end_date).undefined(dayjs(start_date), 'years') + 30 * (em - sm) + (ed - sd);
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DATE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var year = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(year)) {
                    return year;
                }
                if (!e.isRealNum(year)) {
                    return formula.undefined.v;
                }
                year = parseInt(year);
                var month = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(month)) {
                    return month;
                }
                if (!e.isRealNum(month)) {
                    return formula.undefined.v;
                }
                month = parseInt(month);
                var day = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(day)) {
                    return day;
                }
                if (!e.isRealNum(day)) {
                    return formula.undefined.v;
                }
                day = parseInt(day);
                if (year < 0 || year >= 10000) {
                    return formula.undefined.nm;
                } else if (year >= 0 && year <= 1899) {
                    year = year + 1900;
                }
                var date = dayjs().set({
                    'year': year,
                    'month': month - 1,
                    'date': day
                });
                if (dayjs(date).year() < 1900) {
                    return formula.undefined.nm;
                }
                return dayjs(date).format('YYYY-MM-DD');
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DATEVALUE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var date_text = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(date_text)) {
                    return date_text;
                }
                if (!dayjs(date_text).isValid()) {
                    return formula.undefined.v;
                }
                date_text = dayjs(date_text).format('YYYY-MM-DD');
                var result = g.genarate(date_text)[2];
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DATEDIF': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                a.luckysheet_getValue(arguments);
                for (var i = 0; i < arguments.length - 1; i++) {
                    arguments[i] = moment.fromOADate(arguments[i]).format('l');
                    if (!d.isdatetime(arguments[i])) {
                        return formula.undefined.v;
                    }
                }
                var startDate = dayjs(arguments[0]);
                var endDate = dayjs(arguments[1]);
                var unit = arguments[2];
                var result = formula.undefined.v;
                if (window.luckysheet_function.DAYS.f(endDate, startDate) < 0) {
                    return formula.undefined.v;
                }
                switch (unit) {
                case 'Y':
                case 'y':
                    result = endDate.undefined(startDate, 'years', false);
                    break;
                case 'M':
                case 'm':
                    result = endDate.undefined(startDate, 'months', false);
                    break;
                case 'D':
                case 'd':
                    result = endDate.undefined(startDate, 'days', false);
                    break;
                case 'MD':
                case 'md':
                    result = endDate.format('DD') - startDate.format('DD');
                    break;
                case 'YM':
                case 'ym':
                    var startM = parseInt(startDate.format('M'));
                    var endM = parseInt(endDate.format('M'));
                    result = startM <= endM ? endM - startM : endM + 12 - startM;
                    break;
                case 'YD':
                case 'yd':
                    var startM = g.genarate(startDate.format('MM-DD'))[2];
                    var endM = g.genarate(endDate.format('MM-DD'))[2];
                    result = startM <= endM ? endM - startM : endM + 365 - startM;
                    break;
                default:
                    result = formula.undefined.v;
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'WORKDAY': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                if (arguments.length == 3) {
                    var result = window.luckysheet_function.WORKDAY_INTL.f(arguments[0], arguments[1], 1, arguments[2]);
                } else {
                    var result = window.luckysheet_function.WORKDAY_INTL.f(arguments[0], arguments[1], 1);
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'WORKDAY_INTL': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var WEEKEND_TYPES = [
                    [],
                    [
                        6,
                        0
                    ],
                    [
                        0,
                        1
                    ],
                    [
                        1,
                        2
                    ],
                    [
                        2,
                        3
                    ],
                    [
                        3,
                        4
                    ],
                    [
                        4,
                        5
                    ],
                    [
                        5,
                        6
                    ],
                    undefined,
                    undefined,
                    undefined,
                    [
                        0,
                        0
                    ],
                    [
                        1,
                        1
                    ],
                    [
                        2,
                        2
                    ],
                    [
                        3,
                        3
                    ],
                    [
                        4,
                        4
                    ],
                    [
                        5,
                        5
                    ],
                    [
                        6,
                        6
                    ]
                ];
                var start_date = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(start_date)) {
                    return start_date;
                }
                if (!dayjs(start_date).isValid()) {
                    return formula.undefined.v;
                }
                var days = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(days)) {
                    return days;
                }
                if (!e.isRealNum(days)) {
                    return formula.undefined.v;
                }
                days = parseInt(days);
                var weekend = WEEKEND_TYPES[1];
                if (arguments.length >= 3) {
                    weekend = arguments[2];
                    if (typeof weekend == 'string' && weekend.length == '7' && /^[0-1]{7}$/g.test(weekend)) {
                    } else {
                        weekend = func_methods.getFirstValue(arguments[2]);
                        if (e.valueIsError(weekend)) {
                            return weekend;
                        }
                        if (!e.isRealNum(weekend)) {
                            return formula.undefined.v;
                        }
                        weekend = parseInt(weekend);
                        if (weekend < 1 || weekend > 7 && weekend < 11 || weekend > 17) {
                            return formula.undefined.nm;
                        }
                        weekend = WEEKEND_TYPES[weekend];
                    }
                }
                var holidays = [];
                if (arguments.length == 4) {
                    holidays = func_methods.getCellrangeDate(arguments[3]);
                    if (e.valueIsError(holidays)) {
                        return holidays;
                    }
                }
                for (var i = 0; i < holidays.length; i++) {
                    if (!dayjs(holidays[i]).isValid()) {
                        return formula.undefined.v;
                    }
                }
                var d = 0;
                while (d < days) {
                    start_date = dayjs(start_date).add(1, 'days');
                    var day = dayjs(start_date).weekday();
                    if (j.getObjType(weekend)) {
                        if (day === weekend[0] || day === weekend[1]) {
                            continue;
                        }
                    } else {
                        if (day == 0) {
                            day = 7;
                        }
                        if (weekend.charAt(day - 1) == '0') {
                            continue;
                        }
                    }
                    for (var j = 0; j < holidays.length; j++) {
                        if (dayjs(start_date).undefined(dayjs(holidays[j]), 'days') === 0) {
                            d--;
                            break;
                        }
                    }
                    d++;
                }
                return dayjs(start_date).format('YYYY-MM-DD');
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'YEAR': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var serial_number = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(serial_number)) {
                    return serial_number;
                }
                if (!dayjs(serial_number).isValid()) {
                    return formula.undefined.v;
                }
                return dayjs(serial_number).year();
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'YEARFRAC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var start_date = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(start_date)) {
                    return start_date;
                }
                if (!dayjs(start_date).isValid()) {
                    return formula.undefined.v;
                }
                var end_date = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(end_date)) {
                    return end_date;
                }
                if (!dayjs(end_date).isValid()) {
                    return formula.undefined.v;
                }
                var basis = 0;
                if (arguments.length == 3) {
                    basis = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseInt(basis);
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                var sd = dayjs(start_date).date();
                var sm = dayjs(start_date).month() + 1;
                var sy = dayjs(start_date).year();
                var ed = dayjs(end_date).date();
                var em = dayjs(end_date).month() + 1;
                var ey = dayjs(end_date).year();
                var result;
                switch (basis) {
                case 0:
                    if (sd === 31 && ed === 31) {
                        sd = 30;
                        ed = 30;
                    } else if (sd === 31) {
                        sd = 30;
                    } else if (sd === 30 && ed === 31) {
                        ed = 30;
                    }
                    result = (ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360)) / 360;
                    break;
                case 1:
                    var ylength = 365;
                    if (sy === ey || sy + 1 === ey && (sm > em || sm === em && sd >= ed)) {
                        if (sy === ey && func_methods.isLeapYear(sy) || func_methods.feb29Between(start_date, end_date) || em === 1 && ed === 29) {
                            ylength = 366;
                        }
                        return dayjs(end_date).undefined(dayjs(start_date), 'days') / ylength;
                    }
                    var years = ey - sy + 1;
                    var days = (dayjs().set({
                        'year': ey + 1,
                        'month': 0,
                        'date': 1
                    }) - dayjs().set({
                        'year': sy,
                        'month': 0,
                        'date': 1
                    })) / 1000 / 60 / 60 / 24;
                    var average = days / years;
                    result = dayjs(end_date).undefined(dayjs(start_date), 'days') / average;
                    break;
                case 2:
                    result = dayjs(end_date).undefined(dayjs(start_date), 'days') / 360;
                    break;
                case 3:
                    result = dayjs(end_date).undefined(dayjs(start_date), 'days') / 365;
                    break;
                case 4:
                    result = (ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360)) / 360;
                    break;
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TODAY': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                return dayjs().format('YYYY-MM-DD');
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MONTH': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var serial_number = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(serial_number)) {
                    return serial_number;
                }
                if (!dayjs(serial_number).isValid()) {
                    return formula.undefined.v;
                }
                return dayjs(serial_number).month() + 1;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'EFFECT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var nominal_rate = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(nominal_rate)) {
                    return nominal_rate;
                }
                if (!e.isRealNum(nominal_rate)) {
                    return formula.undefined.v;
                }
                nominal_rate = parseFloat(nominal_rate);
                var npery = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(npery)) {
                    return npery;
                }
                if (!e.isRealNum(npery)) {
                    return formula.undefined.v;
                }
                npery = parseInt(npery);
                if (nominal_rate <= 0 || npery < 1) {
                    return formula.undefined.nm;
                }
                return Math.pow(1 + nominal_rate / npery, npery) - 1;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DOLLAR': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var decimals = 2;
                if (arguments.length == 2) {
                    decimals = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(decimals)) {
                        return decimals;
                    }
                    if (!e.isRealNum(decimals)) {
                        return formula.undefined.v;
                    }
                    decimals = parseInt(decimals);
                }
                if (decimals > 9) {
                    decimals = 9;
                }
                var foucsStatus = '0.';
                for (var i = 1; i <= decimals; i++) {
                    foucsStatus += '0';
                }
                var sign = number > 0 ? 1 : -1;
                return sign * Math.floor(Math.abs(number) * Math.pow(10, decimals)) / Math.pow(10, decimals);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DOLLARDE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var fractional_dollar = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(fractional_dollar)) {
                    return fractional_dollar;
                }
                if (!e.isRealNum(fractional_dollar)) {
                    return formula.undefined.v;
                }
                fractional_dollar = parseFloat(fractional_dollar);
                var fraction = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(fraction)) {
                    return fraction;
                }
                if (!e.isRealNum(fraction)) {
                    return formula.undefined.v;
                }
                fraction = parseInt(fraction);
                if (fraction < 0) {
                    return formula.undefined.nm;
                } else if (fraction == 0) {
                    return formula.undefined.d;
                }
                var result = parseInt(fractional_dollar, 10);
                result += fractional_dollar % 1 * Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN10)) / fraction;
                var power = Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN2) + 1);
                result = Math.round(result * power) / power;
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DOLLARFR': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var decimal_dollar = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(decimal_dollar)) {
                    return decimal_dollar;
                }
                if (!e.isRealNum(decimal_dollar)) {
                    return formula.undefined.v;
                }
                decimal_dollar = parseFloat(decimal_dollar);
                var fraction = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(fraction)) {
                    return fraction;
                }
                if (!e.isRealNum(fraction)) {
                    return formula.undefined.v;
                }
                fraction = parseInt(fraction);
                if (fraction < 0) {
                    return formula.undefined.nm;
                } else if (fraction == 0) {
                    return formula.undefined.d;
                }
                var result = parseInt(decimal_dollar, 10);
                result += decimal_dollar % 1 * Math.pow(10, -Math.ceil(Math.log(fraction) / Math.LN10)) * fraction;
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DB': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cost = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(cost)) {
                    return cost;
                }
                if (!e.isRealNum(cost)) {
                    return formula.undefined.v;
                }
                cost = parseFloat(cost);
                var salvage = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(salvage)) {
                    return salvage;
                }
                if (!e.isRealNum(salvage)) {
                    return formula.undefined.v;
                }
                salvage = parseFloat(salvage);
                var life = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(life)) {
                    return life;
                }
                if (!e.isRealNum(life)) {
                    return formula.undefined.v;
                }
                life = parseFloat(life);
                var period = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(period)) {
                    return period;
                }
                if (!e.isRealNum(period)) {
                    return formula.undefined.v;
                }
                period = parseInt(period);
                var month = 12;
                if (arguments.length == 5) {
                    month = func_methods.getFirstValue(arguments[4]);
                    if (e.valueIsError(month)) {
                        return month;
                    }
                    if (!e.isRealNum(month)) {
                        return formula.undefined.v;
                    }
                    month = parseInt(month);
                }
                if (cost < 0 || salvage < 0 || life < 0 || period < 0) {
                    return formula.undefined.nm;
                }
                if (month < 1 || month > 12) {
                    return formula.undefined.nm;
                }
                if (period > life) {
                    return formula.undefined.nm;
                }
                if (salvage >= cost) {
                    return 0;
                }
                var rate = (1 - Math.pow(salvage / cost, 1 / life)).toFixed(3);
                var initial = cost * rate * month / 12;
                var total = initial;
                var current = 0;
                var ceiling = period === life ? life - 1 : period;
                for (var i = 2; i <= ceiling; i++) {
                    current = (cost - total) * rate;
                    total += current;
                }
                if (period === 1) {
                    var result = initial;
                } else if (period === life) {
                    var result = (cost - total) * rate;
                } else {
                    var result = current;
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DDB': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cost = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(cost)) {
                    return cost;
                }
                if (!e.isRealNum(cost)) {
                    return formula.undefined.v;
                }
                cost = parseFloat(cost);
                var salvage = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(salvage)) {
                    return salvage;
                }
                if (!e.isRealNum(salvage)) {
                    return formula.undefined.v;
                }
                salvage = parseFloat(salvage);
                var life = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(life)) {
                    return life;
                }
                if (!e.isRealNum(life)) {
                    return formula.undefined.v;
                }
                life = parseFloat(life);
                var period = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(period)) {
                    return period;
                }
                if (!e.isRealNum(period)) {
                    return formula.undefined.v;
                }
                period = parseInt(period);
                var factor = 2;
                if (arguments.length == 5) {
                    factor = func_methods.getFirstValue(arguments[4]);
                    if (e.valueIsError(factor)) {
                        return factor;
                    }
                    if (!e.isRealNum(factor)) {
                        return formula.undefined.v;
                    }
                    factor = parseFloat(factor);
                }
                if (cost < 0 || salvage < 0 || life < 0 || period < 0 || factor <= 0) {
                    return formula.undefined.nm;
                }
                if (period > life) {
                    return formula.undefined.nm;
                }
                if (salvage >= cost) {
                    return 0;
                }
                var total = 0;
                var current = 0;
                for (var i = 1; i <= period; i++) {
                    current = Math.min((cost - total) * (factor / life), cost - salvage - total);
                    total += current;
                }
                return current;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'RATE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var nper = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(nper)) {
                    return nper;
                }
                if (!e.isRealNum(nper)) {
                    return formula.undefined.v;
                }
                nper = parseFloat(nper);
                var pmt = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(pmt)) {
                    return pmt;
                }
                if (!e.isRealNum(pmt)) {
                    return formula.undefined.v;
                }
                pmt = parseFloat(pmt);
                var pv = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(pv)) {
                    return pv;
                }
                if (!e.isRealNum(pv)) {
                    return formula.undefined.v;
                }
                pv = parseFloat(pv);
                var fv = 0;
                if (arguments.length >= 4) {
                    fv = func_methods.getFirstValue(arguments[3]);
                    if (e.valueIsError(fv)) {
                        return fv;
                    }
                    if (!e.isRealNum(fv)) {
                        return formula.undefined.v;
                    }
                    fv = parseFloat(fv);
                }
                var type = 0;
                if (arguments.length >= 5) {
                    type = func_methods.getFirstValue(arguments[4]);
                    if (e.valueIsError(type)) {
                        return type;
                    }
                    if (!e.isRealNum(type)) {
                        return formula.undefined.v;
                    }
                    type = parseFloat(type);
                }
                var guess = 0.1;
                if (arguments.length == 6) {
                    guess = func_methods.getFirstValue(arguments[5]);
                    if (e.valueIsError(guess)) {
                        return guess;
                    }
                    if (!e.isRealNum(guess)) {
                        return formula.undefined.v;
                    }
                    guess = parseFloat(guess);
                }
                if (type != 0 && type != 1) {
                    return formula.undefined.nm;
                }
                var epsMax = 0.000001;
                var iterMax = 100;
                var iter = 0;
                var close = false;
                var rate = guess;
                while (iter < iterMax && !close) {
                    var t1 = Math.pow(rate + 1, nper);
                    var t2 = Math.pow(rate + 1, nper - 1);
                    var f1 = fv + t1 * pv + pmt * (t1 - 1) * (rate * type + 1) / rate;
                    var f2 = nper * t2 * pv - pmt * (t1 - 1) * (rate * type + 1) / Math.pow(rate, 2);
                    var f3 = nper * pmt * t2 * (rate * type + 1) / rate + pmt * (t1 - 1) * type / rate;
                    var newRate = rate - f1 / (f2 + f3);
                    if (Math.abs(newRate - rate) < epsMax)
                        close = true;
                    iter++;
                    rate = newRate;
                }
                if (!close)
                    return formula.undefined.nm;
                return rate;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'CUMPRINC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var rate = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(rate)) {
                    return rate;
                }
                if (!e.isRealNum(rate)) {
                    return formula.undefined.v;
                }
                rate = parseFloat(rate);
                var nper = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(nper)) {
                    return nper;
                }
                if (!e.isRealNum(nper)) {
                    return formula.undefined.v;
                }
                nper = parseFloat(nper);
                var pv = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(pv)) {
                    return pv;
                }
                if (!e.isRealNum(pv)) {
                    return formula.undefined.v;
                }
                pv = parseFloat(pv);
                var start_period = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(start_period)) {
                    return start_period;
                }
                if (!e.isRealNum(start_period)) {
                    return formula.undefined.v;
                }
                start_period = parseInt(start_period);
                var end_period = func_methods.getFirstValue(arguments[4]);
                if (e.valueIsError(end_period)) {
                    return end_period;
                }
                if (!e.isRealNum(end_period)) {
                    return formula.undefined.v;
                }
                end_period = parseInt(end_period);
                var type = func_methods.getFirstValue(arguments[5]);
                if (e.valueIsError(type)) {
                    return type;
                }
                if (!e.isRealNum(type)) {
                    return formula.undefined.v;
                }
                type = parseFloat(type);
                if (rate <= 0 || nper <= 0 || pv <= 0) {
                    return formula.undefined.nm;
                }
                if (start_period < 1 || end_period < 1 || start_period > end_period) {
                    return formula.undefined.nm;
                }
                if (type != 0 && type != 1) {
                    return formula.undefined.nm;
                }
                var payment = window.luckysheet_function.PMT.f(rate, nper, pv, 0, type);
                var principal = 0;
                if (start_period === 1) {
                    if (type === 0) {
                        principal = payment + pv * rate;
                    } else {
                        principal = payment;
                    }
                    start_period++;
                }
                for (var i = start_period; i <= end_period; i++) {
                    if (type > 0) {
                        principal += payment - (window.luckysheet_function.FV.f(rate, i - 2, payment, pv, 1) - payment) * rate;
                    } else {
                        principal += payment - window.luckysheet_function.FV.f(rate, i - 1, payment, pv, 0) * rate;
                    }
                }
                return principal;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COUPNUM': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var frequency = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(frequency)) {
                    return frequency;
                }
                if (!e.isRealNum(frequency)) {
                    return formula.undefined.v;
                }
                frequency = parseInt(frequency);
                var basis = 0;
                if (arguments.length == 4) {
                    var basis = func_methods.getFirstValue(arguments[3]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseInt(basis);
                }
                if (frequency != 1 && frequency != 2 && frequency != 4) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) >= 0) {
                    return formula.undefined.nm;
                }
                var sd = dayjs(settlement).date();
                var sm = dayjs(settlement).month() + 1;
                var sy = dayjs(settlement).year();
                var ed = dayjs(maturity).date();
                var em = dayjs(maturity).month() + 1;
                var ey = dayjs(maturity).year();
                var result;
                switch (basis) {
                case 0:
                    if (sd === 31 && ed === 31) {
                        sd = 30;
                        ed = 30;
                    } else if (sd === 31) {
                        sd = 30;
                    } else if (sd === 30 && ed === 31) {
                        ed = 30;
                    }
                    result = (ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360)) / (360 / frequency);
                    break;
                case 1:
                    var ylength = 365;
                    if (sy === ey || sy + 1 === ey && (sm > em || sm === em && sd >= ed)) {
                        if (sy === ey && func_methods.isLeapYear(sy) || func_methods.feb29Between(settlement, maturity) || em === 1 && ed === 29) {
                            ylength = 366;
                        }
                        return dayjs(maturity).undefined(dayjs(settlement), 'days') / (ylength / frequency);
                    }
                    var years = ey - sy + 1;
                    var days = (dayjs().set({
                        'year': ey + 1,
                        'month': 0,
                        'date': 1
                    }) - dayjs().set({
                        'year': sy,
                        'month': 0,
                        'date': 1
                    })) / 1000 / 60 / 60 / 24;
                    var average = days / years;
                    result = dayjs(maturity).undefined(dayjs(settlement), 'days') / (average / frequency);
                    break;
                case 2:
                    result = dayjs(maturity).undefined(dayjs(settlement), 'days') / (360 / frequency);
                    break;
                case 3:
                    result = dayjs(maturity).undefined(dayjs(settlement), 'days') / (365 / frequency);
                    break;
                case 4:
                    result = (ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360)) / (360 / frequency);
                    break;
                }
                return Math.round(result);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SYD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cost = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(cost)) {
                    return cost;
                }
                if (!e.isRealNum(cost)) {
                    return formula.undefined.v;
                }
                cost = parseFloat(cost);
                var salvage = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(salvage)) {
                    return salvage;
                }
                if (!e.isRealNum(salvage)) {
                    return formula.undefined.v;
                }
                salvage = parseFloat(salvage);
                var life = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(life)) {
                    return life;
                }
                if (!e.isRealNum(life)) {
                    return formula.undefined.v;
                }
                life = parseFloat(life);
                var period = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(period)) {
                    return period;
                }
                if (!e.isRealNum(period)) {
                    return formula.undefined.v;
                }
                period = parseInt(period);
                if (life == 0) {
                    return formula.undefined.nm;
                }
                if (period < 1 || period > life) {
                    return formula.undefined.nm;
                }
                return (cost - salvage) * (life - period + 1) * 2 / (life * (life + 1));
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TBILLEQ': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var discount = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(discount)) {
                    return discount;
                }
                if (!e.isRealNum(discount)) {
                    return formula.undefined.v;
                }
                discount = parseFloat(discount);
                if (discount <= 0) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) > 0) {
                    return formula.undefined.nm;
                }
                if (dayjs(maturity) - dayjs(settlement) > 365 * 24 * 60 * 60 * 1000) {
                    return formula.undefined.nm;
                }
                return 365 * discount / (360 - discount * dayjs(maturity).undefined(dayjs(settlement), 'days'));
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TBILLYIELD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var pr = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(pr)) {
                    return pr;
                }
                if (!e.isRealNum(pr)) {
                    return formula.undefined.v;
                }
                pr = parseFloat(pr);
                if (pr <= 0) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) >= 0) {
                    return formula.undefined.nm;
                }
                if (dayjs(maturity) - dayjs(settlement) > 365 * 24 * 60 * 60 * 1000) {
                    return formula.undefined.nm;
                }
                return (100 - pr) / pr * (360 / dayjs(maturity).undefined(dayjs(settlement), 'days'));
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TBILLPRICE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var discount = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(discount)) {
                    return discount;
                }
                if (!e.isRealNum(discount)) {
                    return formula.undefined.v;
                }
                discount = parseFloat(discount);
                if (discount <= 0) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) > 0) {
                    return formula.undefined.nm;
                }
                if (dayjs(maturity) - dayjs(settlement) > 365 * 24 * 60 * 60 * 1000) {
                    return formula.undefined.nm;
                }
                return 100 * (1 - discount * dayjs(maturity).undefined(dayjs(settlement), 'days') / 360);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PV': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var rate = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(rate)) {
                    return rate;
                }
                if (!e.isRealNum(rate)) {
                    return formula.undefined.v;
                }
                rate = parseFloat(rate);
                var nper = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(nper)) {
                    return nper;
                }
                if (!e.isRealNum(nper)) {
                    return formula.undefined.v;
                }
                nper = parseFloat(nper);
                var pmt = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(pmt)) {
                    return pmt;
                }
                if (!e.isRealNum(pmt)) {
                    return formula.undefined.v;
                }
                pmt = parseFloat(pmt);
                var fv = 0;
                if (arguments.length >= 4) {
                    fv = func_methods.getFirstValue(arguments[3]);
                    if (e.valueIsError(fv)) {
                        return fv;
                    }
                    if (!e.isRealNum(fv)) {
                        return formula.undefined.v;
                    }
                    fv = parseFloat(fv);
                }
                var type = 0;
                if (arguments.length >= 5) {
                    type = func_methods.getFirstValue(arguments[4]);
                    if (e.valueIsError(type)) {
                        return type;
                    }
                    if (!e.isRealNum(type)) {
                        return formula.undefined.v;
                    }
                    type = parseFloat(type);
                }
                if (type != 0 && type != 1) {
                    return formula.undefined.nm;
                }
                if (rate === 0) {
                    var result = -pmt * nper - fv;
                } else {
                    var result = ((1 - Math.pow(1 + rate, nper)) / rate * pmt * (1 + rate * type) - fv) / Math.pow(1 + rate, nper);
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ACCRINT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var issue = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(issue)) {
                    return issue;
                }
                if (!dayjs(issue).isValid()) {
                    return formula.undefined.v;
                }
                var first_interest = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(first_interest)) {
                    return first_interest;
                }
                if (!dayjs(first_interest).isValid()) {
                    return formula.undefined.v;
                }
                var settlement = func_methods.getCellDate(arguments[2]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var rate = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(rate)) {
                    return rate;
                }
                if (!e.isRealNum(rate)) {
                    return formula.undefined.v;
                }
                rate = parseFloat(rate);
                var par = func_methods.getFirstValue(arguments[4]);
                if (e.valueIsError(par)) {
                    return par;
                }
                if (!e.isRealNum(par)) {
                    return formula.undefined.v;
                }
                par = parseFloat(par);
                var frequency = func_methods.getFirstValue(arguments[5]);
                if (e.valueIsError(frequency)) {
                    return frequency;
                }
                if (!e.isRealNum(frequency)) {
                    return formula.undefined.v;
                }
                frequency = parseInt(frequency);
                var basis = 0;
                if (arguments.length >= 7) {
                    basis = func_methods.getFirstValue(arguments[6]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseInt(basis);
                }
                var calc_method = true;
                if (arguments.length == 8) {
                    calc_method = func_methods.getCellBoolen(arguments[7]);
                    if (e.valueIsError(calc_method)) {
                        return calc_method;
                    }
                }
                if (rate <= 0 || par <= 0) {
                    return formula.undefined.nm;
                }
                if (frequency != 1 && frequency != 2 && frequency != 4) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(issue) - dayjs(settlement) >= 0) {
                    return formula.undefined.nm;
                }
                var result;
                if (dayjs(settlement) - dayjs(first_interest) >= 0 && !calc_method) {
                    var sd = dayjs(first_interest).date();
                    var sm = dayjs(first_interest).month() + 1;
                    var sy = dayjs(first_interest).year();
                    var ed = dayjs(settlement).date();
                    var em = dayjs(settlement).month() + 1;
                    var ey = dayjs(settlement).year();
                    switch (basis) {
                    case 0:
                        if (sd === 31 && ed === 31) {
                            sd = 30;
                            ed = 30;
                        } else if (sd === 31) {
                            sd = 30;
                        } else if (sd === 30 && ed === 31) {
                            ed = 30;
                        }
                        result = (ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360)) / 360;
                        break;
                    case 1:
                        var ylength = 365;
                        if (sy === ey || sy + 1 === ey && (sm > em || sm === em && sd >= ed)) {
                            if (sy === ey && func_methods.isLeapYear(sy) || func_methods.feb29Between(first_interest, settlement) || em === 1 && ed === 29) {
                                ylength = 366;
                            }
                            return dayjs(settlement).undefined(dayjs(first_interest), 'days') / ylength;
                        }
                        var years = ey - sy + 1;
                        var days = (dayjs().set({
                            'year': ey + 1,
                            'month': 0,
                            'date': 1
                        }) - dayjs().set({
                            'year': sy,
                            'month': 0,
                            'date': 1
                        })) / 1000 / 60 / 60 / 24;
                        var average = days / years;
                        result = dayjs(settlement).undefined(dayjs(first_interest), 'days') / average;
                        break;
                    case 2:
                        result = dayjs(settlement).undefined(dayjs(first_interest), 'days') / 360;
                        break;
                    case 3:
                        result = dayjs(settlement).undefined(dayjs(first_interest), 'days') / 365;
                        break;
                    case 4:
                        result = (ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360)) / 360;
                        break;
                    }
                } else {
                    var sd = dayjs(issue).date();
                    var sm = dayjs(issue).month() + 1;
                    var sy = dayjs(issue).year();
                    var ed = dayjs(settlement).date();
                    var em = dayjs(settlement).month() + 1;
                    var ey = dayjs(settlement).year();
                    switch (basis) {
                    case 0:
                        if (sd === 31 && ed === 31) {
                            sd = 30;
                            ed = 30;
                        } else if (sd === 31) {
                            sd = 30;
                        } else if (sd === 30 && ed === 31) {
                            ed = 30;
                        }
                        result = (ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360)) / 360;
                        break;
                    case 1:
                        var ylength = 365;
                        if (sy === ey || sy + 1 === ey && (sm > em || sm === em && sd >= ed)) {
                            if (sy === ey && func_methods.isLeapYear(sy) || func_methods.feb29Between(issue, settlement) || em === 1 && ed === 29) {
                                ylength = 366;
                            }
                            return dayjs(settlement).undefined(dayjs(issue), 'days') / ylength;
                        }
                        var years = ey - sy + 1;
                        var days = (dayjs().set({
                            'year': ey + 1,
                            'month': 0,
                            'date': 1
                        }) - dayjs().set({
                            'year': sy,
                            'month': 0,
                            'date': 1
                        })) / 1000 / 60 / 60 / 24;
                        var average = days / years;
                        result = dayjs(settlement).undefined(dayjs(issue), 'days') / average;
                        break;
                    case 2:
                        result = dayjs(settlement).undefined(dayjs(issue), 'days') / 360;
                        break;
                    case 3:
                        result = dayjs(settlement).undefined(dayjs(issue), 'days') / 365;
                        break;
                    case 4:
                        result = (ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360)) / 360;
                        break;
                    }
                }
                return par * rate * result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ACCRINTM': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var issue = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(issue)) {
                    return issue;
                }
                if (!dayjs(issue).isValid()) {
                    return formula.undefined.v;
                }
                var settlement = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var rate = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(rate)) {
                    return rate;
                }
                if (!e.isRealNum(rate)) {
                    return formula.undefined.v;
                }
                rate = parseFloat(rate);
                var par = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(par)) {
                    return par;
                }
                if (!e.isRealNum(par)) {
                    return formula.undefined.v;
                }
                par = parseFloat(par);
                var basis = 0;
                if (arguments.length == 5) {
                    basis = func_methods.getFirstValue(arguments[4]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseInt(basis);
                }
                if (rate <= 0 || par <= 0) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(issue) - dayjs(settlement) >= 0) {
                    return formula.undefined.nm;
                }
                var sd = dayjs(issue).date();
                var sm = dayjs(issue).month() + 1;
                var sy = dayjs(issue).year();
                var ed = dayjs(settlement).date();
                var em = dayjs(settlement).month() + 1;
                var ey = dayjs(settlement).year();
                var result;
                switch (basis) {
                case 0:
                    if (sd === 31 && ed === 31) {
                        sd = 30;
                        ed = 30;
                    } else if (sd === 31) {
                        sd = 30;
                    } else if (sd === 30 && ed === 31) {
                        ed = 30;
                    }
                    result = (ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360)) / 360;
                    break;
                case 1:
                    var ylength = 365;
                    if (sy === ey || sy + 1 === ey && (sm > em || sm === em && sd >= ed)) {
                        if (sy === ey && func_methods.isLeapYear(sy) || func_methods.feb29Between(issue, settlement) || em === 1 && ed === 29) {
                            ylength = 366;
                        }
                        return dayjs(settlement).undefined(dayjs(issue), 'days') / ylength;
                    }
                    var years = ey - sy + 1;
                    var days = (dayjs().set({
                        'year': ey + 1,
                        'month': 0,
                        'date': 1
                    }) - dayjs().set({
                        'year': sy,
                        'month': 0,
                        'date': 1
                    })) / 1000 / 60 / 60 / 24;
                    var average = days / years;
                    result = dayjs(settlement).undefined(dayjs(issue), 'days') / average;
                    break;
                case 2:
                    result = dayjs(settlement).undefined(dayjs(issue), 'days') / 360;
                    break;
                case 3:
                    result = dayjs(settlement).undefined(dayjs(issue), 'days') / 365;
                    break;
                case 4:
                    result = (ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360)) / 360;
                    break;
                }
                return par * rate * result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COUPDAYBS': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var frequency = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(frequency)) {
                    return frequency;
                }
                if (!e.isRealNum(frequency)) {
                    return formula.undefined.v;
                }
                frequency = parseInt(frequency);
                var basis = 0;
                if (arguments.length == 4) {
                    basis = func_methods.getFirstValue(arguments[3]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseInt(basis);
                }
                if (frequency != 1 && frequency != 2 && frequency != 4) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) >= 0) {
                    return formula.undefined.nm;
                }
                var interest;
                var maxCount = Math.ceil(dayjs(maturity).undefined(dayjs(settlement), 'months') / (12 / frequency)) + 1;
                for (var i = 1; i <= maxCount; i++) {
                    var di = dayjs(maturity).subtract(12 / frequency * i, 'months');
                    if (di <= dayjs(settlement)) {
                        interest = di;
                        break;
                    }
                }
                var result;
                switch (basis) {
                case 0:
                    var sd = dayjs(interest).date();
                    var sm = dayjs(interest).month() + 1;
                    var sy = dayjs(interest).year();
                    var ed = dayjs(settlement).date();
                    var em = dayjs(settlement).month() + 1;
                    var ey = dayjs(settlement).year();
                    if (sd === 31 && ed === 31) {
                        sd = 30;
                        ed = 30;
                    } else if (sd === 31) {
                        sd = 30;
                    } else if (sd === 30 && ed === 31) {
                        ed = 30;
                    }
                    result = ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360);
                    break;
                case 1:
                case 2:
                case 3:
                    result = dayjs(settlement).undefined(dayjs(interest), 'days');
                    break;
                case 4:
                    var sd = dayjs(interest).date();
                    var sm = dayjs(interest).month() + 1;
                    var sy = dayjs(interest).year();
                    var ed = dayjs(settlement).date();
                    var em = dayjs(settlement).month() + 1;
                    var ey = dayjs(settlement).year();
                    result = ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360);
                    break;
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COUPDAYS': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var frequency = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(frequency)) {
                    return frequency;
                }
                if (!e.isRealNum(frequency)) {
                    return formula.undefined.v;
                }
                frequency = parseInt(frequency);
                var basis = 0;
                if (arguments.length == 4) {
                    basis = func_methods.getFirstValue(arguments[3]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseInt(basis);
                }
                if (frequency != 1 && frequency != 2 && frequency != 4) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) >= 0) {
                    return formula.undefined.nm;
                }
                var result;
                switch (basis) {
                case 0:
                    result = 360 / frequency;
                    break;
                case 1:
                    var maxCount = Math.ceil(dayjs(maturity).undefined(dayjs(settlement), 'months') / (12 / frequency)) + 1;
                    for (var i = 1; i <= maxCount; i++) {
                        var d1 = dayjs(maturity).subtract(12 / frequency * i, 'months');
                        if (d1 <= dayjs(settlement)) {
                            var d2 = dayjs(maturity).subtract(12 / frequency * (i - 1), 'months');
                            result = dayjs(d2).undefined(dayjs(d1), 'days');
                            break;
                        }
                    }
                    break;
                case 2:
                    result = 360 / frequency;
                    break;
                case 3:
                    result = 365 / frequency;
                    break;
                case 4:
                    result = 360 / frequency;
                    break;
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COUPDAYSNC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var frequency = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(frequency)) {
                    return frequency;
                }
                if (!e.isRealNum(frequency)) {
                    return formula.undefined.v;
                }
                frequency = parseInt(frequency);
                var basis = 0;
                if (arguments.length == 4) {
                    basis = func_methods.getFirstValue(arguments[3]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseInt(basis);
                }
                if (frequency != 1 && frequency != 2 && frequency != 4) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) >= 0) {
                    return formula.undefined.nm;
                }
                var interest;
                var maxCount = Math.ceil(dayjs(maturity).undefined(dayjs(settlement), 'months') / (12 / frequency)) + 1;
                for (var i = 1; i <= maxCount; i++) {
                    var di = dayjs(maturity).subtract(12 / frequency * i, 'months');
                    if (di <= dayjs(settlement)) {
                        interest = dayjs(maturity).subtract(12 / frequency * (i - 1), 'months');
                        break;
                    }
                }
                var result;
                switch (basis) {
                case 0:
                    var sd = dayjs(settlement).date();
                    var sm = dayjs(settlement).month() + 1;
                    var sy = dayjs(settlement).year();
                    var ed = dayjs(interest).date();
                    var em = dayjs(interest).month() + 1;
                    var ey = dayjs(interest).year();
                    if (sd === 31 && ed === 31) {
                        sd = 30;
                        ed = 30;
                    } else if (sd === 31) {
                        sd = 30;
                    } else if (sd === 30 && ed === 31) {
                        ed = 30;
                    }
                    result = ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360);
                    break;
                case 1:
                case 2:
                case 3:
                    result = dayjs(interest).undefined(dayjs(settlement), 'days');
                    break;
                case 4:
                    var sd = dayjs(settlement).date();
                    var sm = dayjs(settlement).month() + 1;
                    var sy = dayjs(settlement).year();
                    var ed = dayjs(interest).date();
                    var em = dayjs(interest).month() + 1;
                    var ey = dayjs(interest).year();
                    result = ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360);
                    break;
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COUPNCD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var frequency = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(frequency)) {
                    return frequency;
                }
                if (!e.isRealNum(frequency)) {
                    return formula.undefined.v;
                }
                frequency = parseInt(frequency);
                var basis = 0;
                if (arguments.length == 4) {
                    basis = func_methods.getFirstValue(arguments[3]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseInt(basis);
                }
                if (frequency != 1 && frequency != 2 && frequency != 4) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) >= 0) {
                    return formula.undefined.nm;
                }
                var interest;
                var maxCount = Math.ceil(dayjs(maturity).undefined(dayjs(settlement), 'months') / (12 / frequency)) + 1;
                for (var i = 1; i <= maxCount; i++) {
                    var di = dayjs(maturity).subtract(12 / frequency * i, 'months');
                    if (di <= dayjs(settlement)) {
                        interest = dayjs(maturity).subtract(12 / frequency * (i - 1), 'months');
                        break;
                    }
                }
                return dayjs(interest).format('YYYY-MM-DD');
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COUPPCD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var frequency = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(frequency)) {
                    return frequency;
                }
                if (!e.isRealNum(frequency)) {
                    return formula.undefined.v;
                }
                frequency = parseInt(frequency);
                var basis = 0;
                if (arguments.length == 4) {
                    basis = func_methods.getFirstValue(arguments[3]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseInt(basis);
                }
                if (frequency != 1 && frequency != 2 && frequency != 4) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) >= 0) {
                    return formula.undefined.nm;
                }
                var interest;
                var maxCount = Math.ceil(dayjs(maturity).undefined(dayjs(settlement), 'months') / (12 / frequency)) + 1;
                for (var i = 1; i <= maxCount; i++) {
                    var di = dayjs(maturity).subtract(12 / frequency * i, 'months');
                    if (di <= dayjs(settlement)) {
                        interest = di;
                        break;
                    }
                }
                return dayjs(interest).format('YYYY-MM-DD');
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'FV': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var rate = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(rate)) {
                    return rate;
                }
                if (!e.isRealNum(rate)) {
                    return formula.undefined.v;
                }
                rate = parseFloat(rate);
                var nper = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(nper)) {
                    return nper;
                }
                if (!e.isRealNum(nper)) {
                    return formula.undefined.v;
                }
                nper = parseFloat(nper);
                var pmt = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(pmt)) {
                    return pmt;
                }
                if (!e.isRealNum(pmt)) {
                    return formula.undefined.v;
                }
                pmt = parseFloat(pmt);
                var pv = 0;
                if (arguments.length >= 4) {
                    pv = func_methods.getFirstValue(arguments[3]);
                    if (e.valueIsError(pv)) {
                        return pv;
                    }
                    if (!e.isRealNum(pv)) {
                        return formula.undefined.v;
                    }
                    pv = parseFloat(pv);
                }
                var type = 0;
                if (arguments.length >= 5) {
                    type = func_methods.getFirstValue(arguments[4]);
                    if (e.valueIsError(type)) {
                        return type;
                    }
                    if (!e.isRealNum(type)) {
                        return formula.undefined.v;
                    }
                    type = parseFloat(type);
                }
                if (type != 0 && type != 1) {
                    return formula.undefined.nm;
                }
                var result;
                if (rate === 0) {
                    result = pv + pmt * nper;
                } else {
                    var term = Math.pow(1 + rate, nper);
                    if (type === 1) {
                        result = pv * term + pmt * (1 + rate) * (term - 1) / rate;
                    } else {
                        result = pv * term + pmt * (term - 1) / rate;
                    }
                }
                return -result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'FVSCHEDULE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var principal = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(principal)) {
                    return principal;
                }
                if (!e.isRealNum(principal)) {
                    return formula.undefined.v;
                }
                principal = parseFloat(principal);
                var data_schedule = arguments[1];
                var schedule = [];
                if (j.getObjType(data_schedule) == 'array') {
                    if (j.getObjType(data_schedule[0]) == 'array' && !func_methods.isDyadicArr(data_schedule)) {
                        return formula.undefined.v;
                    }
                    schedule = schedule.concat(func_methods.getDataArr(data_schedule, false));
                } else if (j.getObjType(data_schedule) == 'object' && data_schedule.startCell != null) {
                    schedule = schedule.concat(func_methods.getCellDataArr(data_schedule, 'number', false));
                } else {
                    schedule.push(data_schedule);
                }
                var schedule_n = [];
                for (var i = 0; i < schedule.length; i++) {
                    var number = schedule[i];
                    if (!e.isRealNum(number)) {
                        return formula.undefined.v;
                    }
                    schedule_n.push(parseFloat(number));
                }
                var n = schedule_n.length;
                var future = principal;
                for (var i = 0; i < n; i++) {
                    future *= 1 + schedule_n[i];
                }
                return future;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'YIELD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var rate = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(rate)) {
                    return rate;
                }
                if (!e.isRealNum(rate)) {
                    return formula.undefined.v;
                }
                rate = parseFloat(rate);
                var pr = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(pr)) {
                    return pr;
                }
                if (!e.isRealNum(pr)) {
                    return formula.undefined.v;
                }
                pr = parseFloat(pr);
                var redemption = func_methods.getFirstValue(arguments[4]);
                if (e.valueIsError(redemption)) {
                    return redemption;
                }
                if (!e.isRealNum(redemption)) {
                    return formula.undefined.v;
                }
                redemption = parseFloat(redemption);
                var frequency = func_methods.getFirstValue(arguments[5]);
                if (e.valueIsError(frequency)) {
                    return frequency;
                }
                if (!e.isRealNum(frequency)) {
                    return formula.undefined.v;
                }
                frequency = parseInt(frequency);
                var basis = 0;
                if (arguments.length == 7) {
                    basis = func_methods.getFirstValue(arguments[6]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseInt(basis);
                }
                if (rate < 0) {
                    return formula.undefined.nm;
                }
                if (pr <= 0 || redemption <= 0) {
                    return formula.undefined.nm;
                }
                if (frequency != 1 && frequency != 2 && frequency != 4) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) >= 0) {
                    return formula.undefined.nm;
                }
                var num = window.luckysheet_function.COUPNUM.f(settlement, maturity, frequency, basis);
                if (num > 1) {
                    var a = 1;
                    var b = 0;
                    var yld = a;
                    for (var i = 1; i <= 100; i++) {
                        var price = window.luckysheet_function.PRICE.f(settlement, maturity, rate, yld, redemption, frequency, basis);
                        if (Math.abs(price - pr) < 0.000001) {
                            break;
                        }
                        if (price > pr) {
                            b = yld;
                        } else {
                            a = yld;
                        }
                        yld = (a + b) / 2;
                    }
                    var result = yld;
                } else {
                    var DSR = window.luckysheet_function.COUPDAYSNC.f(settlement, maturity, frequency, basis);
                    var E = window.luckysheet_function.COUPDAYS.f(settlement, maturity, frequency, basis);
                    var A = window.luckysheet_function.COUPDAYBS.f(settlement, maturity, frequency, basis);
                    var T1 = redemption / 100 + rate / frequency;
                    var T2 = pr / 100 + A / E * (rate / frequency);
                    var T3 = frequency * E / DSR;
                    var result = (T1 - T2) / T2 * T3;
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'YIELDDISC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var pr = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(pr)) {
                    return pr;
                }
                if (!e.isRealNum(pr)) {
                    return formula.undefined.v;
                }
                pr = parseFloat(pr);
                var redemption = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(redemption)) {
                    return redemption;
                }
                if (!e.isRealNum(redemption)) {
                    return formula.undefined.v;
                }
                redemption = parseFloat(redemption);
                var basis = 0;
                if (arguments.length == 5) {
                    basis = func_methods.getFirstValue(arguments[4]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseInt(basis);
                }
                if (pr <= 0 || redemption <= 0) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) >= 0) {
                    return formula.undefined.nm;
                }
                var yearfrac = window.luckysheet_function.YEARFRAC.f(settlement, maturity, basis);
                return (redemption / pr - 1) / yearfrac;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'NOMINAL': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var effect_rate = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(effect_rate)) {
                    return effect_rate;
                }
                if (!e.isRealNum(effect_rate)) {
                    return formula.undefined.v;
                }
                effect_rate = parseFloat(effect_rate);
                var npery = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(npery)) {
                    return npery;
                }
                if (!e.isRealNum(npery)) {
                    return formula.undefined.v;
                }
                npery = parseInt(npery);
                if (effect_rate <= 0 || npery < 1) {
                    return formula.undefined.nm;
                }
                return (Math.pow(effect_rate + 1, 1 / npery) - 1) * npery;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'XIRR': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_values = arguments[0];
                var values = [];
                if (j.getObjType(data_values) == 'array') {
                    if (j.getObjType(data_values[0]) == 'array' && !func_methods.isDyadicArr(data_values)) {
                        return formula.undefined.v;
                    }
                    values = values.concat(func_methods.getDataArr(data_values, false));
                } else if (j.getObjType(data_values) == 'object' && data_values.startCell != null) {
                    values = values.concat(func_methods.getCellDataArr(data_values, 'number', false));
                } else {
                    values.push(data_values);
                }
                var values_n = [];
                for (var i = 0; i < values.length; i++) {
                    var number = values[i];
                    if (!e.isRealNum(number)) {
                        return formula.undefined.v;
                    }
                    values_n.push(parseFloat(number));
                }
                var dates = func_methods.getCellrangeDate(arguments[1]);
                if (e.valueIsError(dates)) {
                    return dates;
                }
                for (var i = 0; i < dates.length; i++) {
                    if (!dayjs(dates[i]).isValid()) {
                        return formula.undefined.v;
                    }
                }
                var guess = 0.1;
                if (arguments.length == 3) {
                    guess = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(guess)) {
                        return guess;
                    }
                    if (!e.isRealNum(guess)) {
                        return formula.undefined.v;
                    }
                    guess = parseFloat(guess);
                }
                var positive = false;
                var negative = false;
                for (var i = 0; i < values_n.length; i++) {
                    if (values_n[i] > 0) {
                        positive = true;
                    }
                    if (values_n[i] < 0) {
                        negative = true;
                    }
                    if (positive && negative) {
                        break;
                    }
                }
                if (!positive || !negative) {
                    return formula.undefined.nm;
                }
                if (values_n.length != dates.length) {
                    return formula.undefined.nm;
                }
                var irrResult = function (values, dates, rate) {
                    var r = rate + 1;
                    var result = values[0];
                    for (var i = 1; i < values.length; i++) {
                        result += values[i] / Math.pow(r, window.luckysheet_function.DAYS.f(dates[i], dates[0]) / 365);
                    }
                    return result;
                };
                var irrResultDeriv = function (values, dates, rate) {
                    var r = rate + 1;
                    var result = 0;
                    for (var i = 1; i < values.length; i++) {
                        var frac = window.luckysheet_function.DAYS.f(dates[i], dates[0]) / 365;
                        result -= frac * values[i] / Math.pow(r, frac + 1);
                    }
                    return result;
                };
                var resultRate = guess;
                var epsMax = 1e-10;
                var newRate, epsRate, resultValue;
                var contLoop = true;
                do {
                    resultValue = irrResult(values_n, dates, resultRate);
                    newRate = resultRate - resultValue / irrResultDeriv(values_n, dates, resultRate);
                    epsRate = Math.abs(newRate - resultRate);
                    resultRate = newRate;
                    contLoop = epsRate > epsMax && Math.abs(resultValue) > epsMax;
                } while (contLoop);
                return resultRate;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MIRR': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_values = arguments[0];
                var values = [];
                if (j.getObjType(data_values) == 'array') {
                    if (j.getObjType(data_values[0]) == 'array' && !func_methods.isDyadicArr(data_values)) {
                        return formula.undefined.v;
                    }
                    values = values.concat(func_methods.getDataArr(data_values, false));
                } else if (j.getObjType(data_values) == 'object' && data_values.startCell != null) {
                    values = values.concat(func_methods.getCellDataArr(data_values, 'number', false));
                } else {
                    values.push(data_values);
                }
                var values_n = [];
                for (var i = 0; i < values.length; i++) {
                    var number = values[i];
                    if (!e.isRealNum(number)) {
                        return formula.undefined.v;
                    }
                    values_n.push(parseFloat(number));
                }
                var finance_rate = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(finance_rate)) {
                    return finance_rate;
                }
                if (!e.isRealNum(finance_rate)) {
                    return formula.undefined.v;
                }
                finance_rate = parseFloat(finance_rate);
                var reinvest_rate = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(reinvest_rate)) {
                    return reinvest_rate;
                }
                if (!e.isRealNum(reinvest_rate)) {
                    return formula.undefined.v;
                }
                reinvest_rate = parseFloat(reinvest_rate);
                var n = values_n.length;
                var payments = [];
                var incomes = [];
                for (var i = 0; i < n; i++) {
                    if (values_n[i] < 0) {
                        payments.push(values_n[i]);
                    } else {
                        incomes.push(values_n[i]);
                    }
                }
                if (payments.length == 0 || incomes.length == 0) {
                    return formula.undefined.d;
                }
                var num = -window.luckysheet_function.NPV.f(reinvest_rate, incomes) * Math.pow(1 + reinvest_rate, n - 1);
                var den = window.luckysheet_function.NPV.f(finance_rate, payments) * (1 + finance_rate);
                return Math.pow(num / den, 1 / (n - 1)) - 1;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'IRR': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_values = arguments[0];
                var values = [];
                if (j.getObjType(data_values) == 'array') {
                    if (j.getObjType(data_values[0]) == 'array' && !func_methods.isDyadicArr(data_values)) {
                        return formula.undefined.v;
                    }
                    values = values.concat(func_methods.getDataArr(data_values, false));
                } else if (j.getObjType(data_values) == 'object' && data_values.startCell != null) {
                    values = values.concat(func_methods.getCellDataArr(data_values, 'number', true));
                } else {
                    values.push(data_values);
                }
                var values_n = [];
                for (var i = 0; i < values.length; i++) {
                    var number = values[i];
                    if (!e.isRealNum(number)) {
                        return formula.undefined.v;
                    }
                    values_n.push(parseFloat(number));
                }
                var guess = 0.1;
                if (arguments.length == 2) {
                    guess = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(guess)) {
                        return guess;
                    }
                    if (!e.isRealNum(guess)) {
                        return formula.undefined.v;
                    }
                    guess = parseFloat(guess);
                }
                var dates = [];
                var positive = false;
                var negative = false;
                for (var i = 0; i < values.length; i++) {
                    dates[i] = i === 0 ? 0 : dates[i - 1] + 365;
                    if (values[i] > 0) {
                        positive = true;
                    }
                    if (values[i] < 0) {
                        negative = true;
                    }
                }
                if (!positive || !negative) {
                    return formula.undefined.nm;
                }
                var irrResult = function (values, dates, rate) {
                    var r = rate + 1;
                    var result = values[0];
                    for (var i = 1; i < values.length; i++) {
                        result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
                    }
                    return result;
                };
                var irrResultDeriv = function (values, dates, rate) {
                    var r = rate + 1;
                    var result = 0;
                    for (var i = 1; i < values.length; i++) {
                        var frac = (dates[i] - dates[0]) / 365;
                        result -= frac * values[i] / Math.pow(r, frac + 1);
                    }
                    return result;
                };
                var resultRate = guess;
                var epsMax = 1e-10;
                var newRate, epsRate, resultValue;
                var contLoop = true;
                do {
                    resultValue = irrResult(values_n, dates, resultRate);
                    newRate = resultRate - resultValue / irrResultDeriv(values_n, dates, resultRate);
                    epsRate = Math.abs(newRate - resultRate);
                    resultRate = newRate;
                    contLoop = epsRate > epsMax && Math.abs(resultValue) > epsMax;
                } while (contLoop);
                return resultRate;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'NPV': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var rate = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(rate)) {
                    return rate;
                }
                if (!e.isRealNum(rate)) {
                    return formula.undefined.v;
                }
                rate = parseFloat(rate);
                var values = [];
                for (var i = 1; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        values = values.concat(func_methods.getDataArr(data, true));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        values = values.concat(func_methods.getCellDataArr(data, 'number', true));
                    } else {
                        values.push(data);
                    }
                }
                var values_n = [];
                for (var i = 0; i < values.length; i++) {
                    var number = values[i];
                    if (e.isRealNum(number)) {
                        values_n.push(parseFloat(number));
                    }
                }
                var result = 0;
                if (values_n.length > 0) {
                    for (var i = 0; i < values_n.length; i++) {
                        result += values_n[i] / Math.pow(1 + rate, i + 1);
                    }
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'XNPV': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var rate = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(rate)) {
                    return rate;
                }
                if (!e.isRealNum(rate)) {
                    return formula.undefined.v;
                }
                rate = parseFloat(rate);
                var data_values = arguments[1];
                var values = [];
                if (j.getObjType(data_values) == 'array') {
                    if (j.getObjType(data_values[0]) == 'array' && !func_methods.isDyadicArr(data_values)) {
                        return formula.undefined.v;
                    }
                    values = values.concat(func_methods.getDataArr(data_values, false));
                } else if (j.getObjType(data_values) == 'object' && data_values.startCell != null) {
                    values = values.concat(func_methods.getCellDataArr(data_values, 'number', false));
                } else {
                    values.push(data_values);
                }
                var values_n = [];
                for (var i = 0; i < values.length; i++) {
                    var number = values[i];
                    if (!e.isRealNum(number)) {
                        return formula.undefined.v;
                    }
                    values_n.push(parseFloat(number));
                }
                var dates = func_methods.getCellrangeDate(arguments[2]);
                if (e.valueIsError(dates)) {
                    return dates;
                }
                for (var i = 0; i < dates.length; i++) {
                    if (!dayjs(dates[i]).isValid()) {
                        return formula.undefined.v;
                    }
                }
                if (values_n.length != dates.length) {
                    return formula.undefined.nm;
                }
                var result = 0;
                for (var i = 0; i < values_n.length; i++) {
                    result += values_n[i] / Math.pow(1 + rate, window.luckysheet_function.DAYS.f(dates[i], dates[0]) / 365);
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'CUMIPMT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var rate = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(rate)) {
                    return rate;
                }
                if (!e.isRealNum(rate)) {
                    return formula.undefined.v;
                }
                rate = parseFloat(rate);
                var nper = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(nper)) {
                    return nper;
                }
                if (!e.isRealNum(nper)) {
                    return formula.undefined.v;
                }
                nper = parseFloat(nper);
                var pv = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(pv)) {
                    return pv;
                }
                if (!e.isRealNum(pv)) {
                    return formula.undefined.v;
                }
                pv = parseFloat(pv);
                var start_period = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(start_period)) {
                    return start_period;
                }
                if (!e.isRealNum(start_period)) {
                    return formula.undefined.v;
                }
                start_period = parseInt(start_period);
                var end_period = func_methods.getFirstValue(arguments[4]);
                if (e.valueIsError(end_period)) {
                    return end_period;
                }
                if (!e.isRealNum(end_period)) {
                    return formula.undefined.v;
                }
                end_period = parseInt(end_period);
                var type = func_methods.getFirstValue(arguments[5]);
                if (e.valueIsError(type)) {
                    return type;
                }
                if (!e.isRealNum(type)) {
                    return formula.undefined.v;
                }
                type = parseFloat(type);
                if (rate <= 0 || nper <= 0 || pv <= 0) {
                    return formula.undefined.nm;
                }
                if (start_period < 1 || end_period < 1 || start_period > end_period) {
                    return formula.undefined.nm;
                }
                if (type != 0 && type != 1) {
                    return formula.undefined.nm;
                }
                var payment = window.luckysheet_function.PMT.f(rate, nper, pv, 0, type);
                var interest = 0;
                if (start_period === 1) {
                    if (type === 0) {
                        interest = -pv;
                        start_period++;
                    }
                }
                for (var i = start_period; i <= end_period; i++) {
                    if (type === 1) {
                        interest += window.luckysheet_function.FV.f(rate, i - 2, payment, pv, 1) - payment;
                    } else {
                        interest += window.luckysheet_function.FV.f(rate, i - 1, payment, pv, 0);
                    }
                }
                interest *= rate;
                return interest;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PMT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var rate = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(rate)) {
                    return rate;
                }
                if (!e.isRealNum(rate)) {
                    return formula.undefined.v;
                }
                rate = parseFloat(rate);
                var nper = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(nper)) {
                    return nper;
                }
                if (!e.isRealNum(nper)) {
                    return formula.undefined.v;
                }
                nper = parseFloat(nper);
                var pv = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(pv)) {
                    return pv;
                }
                if (!e.isRealNum(pv)) {
                    return formula.undefined.v;
                }
                pv = parseFloat(pv);
                var fv = 0;
                if (arguments.length >= 4) {
                    fv = func_methods.getFirstValue(arguments[3]);
                    if (e.valueIsError(fv)) {
                        return fv;
                    }
                    if (!e.isRealNum(fv)) {
                        return formula.undefined.v;
                    }
                    fv = parseFloat(fv);
                }
                var type = 0;
                if (arguments.length == 5) {
                    type = func_methods.getFirstValue(arguments[4]);
                    if (e.valueIsError(type)) {
                        return type;
                    }
                    if (!e.isRealNum(type)) {
                        return formula.undefined.v;
                    }
                    type = parseFloat(type);
                }
                if (type != 0 && type != 1) {
                    return formula.undefined.nm;
                }
                var result;
                if (rate === 0) {
                    result = (pv + fv) / nper;
                } else {
                    var term = Math.pow(1 + rate, nper);
                    if (type === 1) {
                        result = (fv * rate / (term - 1) + pv * rate / (1 - 1 / term)) / (1 + rate);
                    } else {
                        result = fv * rate / (term - 1) + pv * rate / (1 - 1 / term);
                    }
                }
                return -result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'IPMT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var rate = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(rate)) {
                    return rate;
                }
                if (!e.isRealNum(rate)) {
                    return formula.undefined.v;
                }
                rate = parseFloat(rate);
                var per = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(per)) {
                    return per;
                }
                if (!e.isRealNum(per)) {
                    return formula.undefined.v;
                }
                per = parseFloat(per);
                var nper = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(nper)) {
                    return nper;
                }
                if (!e.isRealNum(nper)) {
                    return formula.undefined.v;
                }
                nper = parseFloat(nper);
                var pv = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(pv)) {
                    return pv;
                }
                if (!e.isRealNum(pv)) {
                    return formula.undefined.v;
                }
                pv = parseFloat(pv);
                var fv = 0;
                if (arguments.length >= 5) {
                    fv = func_methods.getFirstValue(arguments[4]);
                    if (e.valueIsError(fv)) {
                        return fv;
                    }
                    if (!e.isRealNum(fv)) {
                        return formula.undefined.v;
                    }
                    fv = parseFloat(fv);
                }
                var type = 0;
                if (arguments.length >= 6) {
                    type = func_methods.getFirstValue(arguments[5]);
                    if (e.valueIsError(type)) {
                        return type;
                    }
                    if (!e.isRealNum(type)) {
                        return formula.undefined.v;
                    }
                    type = parseFloat(type);
                }
                if (per < 1 || per > nper) {
                    return formula.undefined.nm;
                }
                if (type != 0 && type != 1) {
                    return formula.undefined.nm;
                }
                var payment = window.luckysheet_function.PMT.f(rate, nper, pv, fv, type);
                var interest;
                if (per === 1) {
                    if (type === 1) {
                        interest = 0;
                    } else {
                        interest = -pv;
                    }
                } else {
                    if (type === 1) {
                        interest = window.luckysheet_function.FV.f(rate, per - 2, payment, pv, 1) - payment;
                    } else {
                        interest = window.luckysheet_function.FV.f(rate, per - 1, payment, pv, 0);
                    }
                }
                var result = interest * rate;
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PPMT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var rate = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(rate)) {
                    return rate;
                }
                if (!e.isRealNum(rate)) {
                    return formula.undefined.v;
                }
                rate = parseFloat(rate);
                var per = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(per)) {
                    return per;
                }
                if (!e.isRealNum(per)) {
                    return formula.undefined.v;
                }
                per = parseFloat(per);
                var nper = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(nper)) {
                    return nper;
                }
                if (!e.isRealNum(nper)) {
                    return formula.undefined.v;
                }
                nper = parseFloat(nper);
                var pv = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(pv)) {
                    return pv;
                }
                if (!e.isRealNum(pv)) {
                    return formula.undefined.v;
                }
                pv = parseFloat(pv);
                var fv = 0;
                if (arguments.length >= 5) {
                    fv = func_methods.getFirstValue(arguments[4]);
                    if (e.valueIsError(fv)) {
                        return fv;
                    }
                    if (!e.isRealNum(fv)) {
                        return formula.undefined.v;
                    }
                    fv = parseFloat(fv);
                }
                var type = 0;
                if (arguments.length >= 6) {
                    type = func_methods.getFirstValue(arguments[5]);
                    if (e.valueIsError(type)) {
                        return type;
                    }
                    if (!e.isRealNum(type)) {
                        return formula.undefined.v;
                    }
                    type = parseFloat(type);
                }
                if (per < 1 || per > nper) {
                    return formula.undefined.nm;
                }
                if (type != 0 && type != 1) {
                    return formula.undefined.nm;
                }
                var payment = window.luckysheet_function.PMT.f(rate, nper, pv, fv, type);
                var payment2 = window.luckysheet_function.IPMT.f(rate, per, nper, pv, fv, type);
                return payment - payment2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'INTRATE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var investment = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(investment)) {
                    return investment;
                }
                if (!e.isRealNum(investment)) {
                    return formula.undefined.v;
                }
                investment = parseFloat(investment);
                var redemption = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(redemption)) {
                    return redemption;
                }
                if (!e.isRealNum(redemption)) {
                    return formula.undefined.v;
                }
                redemption = parseFloat(redemption);
                var basis = 0;
                if (arguments.length == 5) {
                    basis = func_methods.getFirstValue(arguments[4]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseInt(basis);
                }
                if (investment <= 0 || redemption <= 0) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) >= 0) {
                    return formula.undefined.nm;
                }
                var sd = dayjs(settlement).date();
                var sm = dayjs(settlement).month() + 1;
                var sy = dayjs(settlement).year();
                var ed = dayjs(maturity).date();
                var em = dayjs(maturity).month() + 1;
                var ey = dayjs(maturity).year();
                var result;
                switch (basis) {
                case 0:
                    if (sd === 31 && ed === 31) {
                        sd = 30;
                        ed = 30;
                    } else if (sd === 31) {
                        sd = 30;
                    } else if (sd === 30 && ed === 31) {
                        ed = 30;
                    }
                    result = 360 / (ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360));
                    break;
                case 1:
                    var ylength = 365;
                    if (sy === ey || sy + 1 === ey && (sm > em || sm === em && sd >= ed)) {
                        if (sy === ey && func_methods.isLeapYear(sy) || func_methods.feb29Between(settlement, maturity) || em === 1 && ed === 29) {
                            ylength = 366;
                        }
                        result = ylength / dayjs(maturity).undefined(dayjs(settlement), 'days');
                        result = (redemption - investment) / investment * result;
                        return result;
                    }
                    var years = ey - sy + 1;
                    var days = (dayjs().set({
                        'year': ey + 1,
                        'month': 0,
                        'date': 1
                    }) - dayjs().set({
                        'year': sy,
                        'month': 0,
                        'date': 1
                    })) / 1000 / 60 / 60 / 24;
                    var average = days / years;
                    result = average / dayjs(maturity).undefined(dayjs(settlement), 'days');
                    break;
                case 2:
                    result = 360 / dayjs(maturity).undefined(dayjs(settlement), 'days');
                    break;
                case 3:
                    result = 365 / dayjs(maturity).undefined(dayjs(settlement), 'days');
                    break;
                case 4:
                    result = 360 / (ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360));
                    break;
                }
                result = (redemption - investment) / investment * result;
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PRICE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var rate = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(rate)) {
                    return rate;
                }
                if (!e.isRealNum(rate)) {
                    return formula.undefined.v;
                }
                rate = parseFloat(rate);
                var yld = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(yld)) {
                    return yld;
                }
                if (!e.isRealNum(yld)) {
                    return formula.undefined.v;
                }
                yld = parseFloat(yld);
                var redemption = func_methods.getFirstValue(arguments[4]);
                if (e.valueIsError(redemption)) {
                    return redemption;
                }
                if (!e.isRealNum(redemption)) {
                    return formula.undefined.v;
                }
                redemption = parseFloat(redemption);
                var frequency = func_methods.getFirstValue(arguments[5]);
                if (e.valueIsError(frequency)) {
                    return frequency;
                }
                if (!e.isRealNum(frequency)) {
                    return formula.undefined.v;
                }
                frequency = parseInt(frequency);
                var basis = 0;
                if (arguments.length == 7) {
                    basis = func_methods.getFirstValue(arguments[6]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseInt(basis);
                }
                if (rate < 0 || yld < 0) {
                    return formula.undefined.nm;
                }
                if (redemption <= 0) {
                    return formula.undefined.nm;
                }
                if (frequency != 1 && frequency != 2 && frequency != 4) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) >= 0) {
                    return formula.undefined.nm;
                }
                var DSC = window.luckysheet_function.COUPDAYSNC.f(settlement, maturity, frequency, basis);
                var E = window.luckysheet_function.COUPDAYS.f(settlement, maturity, frequency, basis);
                var A = window.luckysheet_function.COUPDAYBS.f(settlement, maturity, frequency, basis);
                var num = window.luckysheet_function.COUPNUM.f(settlement, maturity, frequency, basis);
                if (num > 1) {
                    var T1 = redemption / Math.pow(1 + yld / frequency, num - 1 + DSC / E);
                    var T2 = 0;
                    for (var i = 1; i <= num; i++) {
                        T2 += 100 * rate / frequency / Math.pow(1 + yld / frequency, i - 1 + DSC / E);
                    }
                    var T3 = 100 * (rate / frequency) * (A / E);
                    var result = T1 + T2 - T3;
                } else {
                    var DSR = E - A;
                    var T1 = 100 * (rate / frequency) + redemption;
                    var T2 = yld / frequency * (DSR / E) + 1;
                    var T3 = 100 * (rate / frequency) * (A / E);
                    var result = T1 / T2 - T3;
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PRICEDISC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var discount = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(discount)) {
                    return discount;
                }
                if (!e.isRealNum(discount)) {
                    return formula.undefined.v;
                }
                discount = parseFloat(discount);
                var redemption = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(redemption)) {
                    return redemption;
                }
                if (!e.isRealNum(redemption)) {
                    return formula.undefined.v;
                }
                redemption = parseFloat(redemption);
                var basis = 0;
                if (arguments.length == 5) {
                    basis = func_methods.getFirstValue(arguments[4]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseInt(basis);
                }
                if (discount <= 0 || redemption <= 0) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) >= 0) {
                    return formula.undefined.nm;
                }
                var sd = dayjs(settlement).date();
                var sm = dayjs(settlement).month() + 1;
                var sy = dayjs(settlement).year();
                var ed = dayjs(maturity).date();
                var em = dayjs(maturity).month() + 1;
                var ey = dayjs(maturity).year();
                var result;
                switch (basis) {
                case 0:
                    if (sd === 31 && ed === 31) {
                        sd = 30;
                        ed = 30;
                    } else if (sd === 31) {
                        sd = 30;
                    } else if (sd === 30 && ed === 31) {
                        ed = 30;
                    }
                    result = (ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360)) / 360;
                    break;
                case 1:
                    var ylength = 365;
                    if (sy === ey || sy + 1 === ey && (sm > em || sm === em && sd >= ed)) {
                        if (sy === ey && func_methods.isLeapYear(sy) || func_methods.feb29Between(settlement, maturity) || em === 1 && ed === 29) {
                            ylength = 366;
                        }
                        result = dayjs(maturity).undefined(dayjs(settlement), 'days') / ylength;
                        result = redemption - discount * redemption * result;
                        return result;
                    }
                    var years = ey - sy + 1;
                    var days = (dayjs().set({
                        'year': ey + 1,
                        'month': 0,
                        'date': 1
                    }) - dayjs().set({
                        'year': sy,
                        'month': 0,
                        'date': 1
                    })) / 1000 / 60 / 60 / 24;
                    var average = days / years;
                    result = dayjs(maturity).undefined(dayjs(settlement), 'days') / average;
                    break;
                case 2:
                    result = dayjs(maturity).undefined(dayjs(settlement), 'days') / 360;
                    break;
                case 3:
                    result = dayjs(maturity).undefined(dayjs(settlement), 'days') / 365;
                    break;
                case 4:
                    result = (ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360)) / 360;
                    break;
                }
                result = redemption - discount * redemption * result;
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PRICEMAT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var issue = func_methods.getCellDate(arguments[2]);
                if (e.valueIsError(issue)) {
                    return issue;
                }
                if (!dayjs(issue).isValid()) {
                    return formula.undefined.v;
                }
                var rate = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(rate)) {
                    return rate;
                }
                if (!e.isRealNum(rate)) {
                    return formula.undefined.v;
                }
                rate = parseFloat(rate);
                var yld = func_methods.getFirstValue(arguments[4]);
                if (e.valueIsError(yld)) {
                    return yld;
                }
                if (!e.isRealNum(yld)) {
                    return formula.undefined.v;
                }
                yld = parseFloat(yld);
                var basis = 0;
                if (arguments.length == 6) {
                    basis = func_methods.getFirstValue(arguments[5]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseInt(basis);
                }
                if (rate < 0 || yld < 0) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) >= 0) {
                    return formula.undefined.nm;
                }
                var sd = dayjs(settlement).date();
                var sm = dayjs(settlement).month() + 1;
                var sy = dayjs(settlement).year();
                var ed = dayjs(maturity).date();
                var em = dayjs(maturity).month() + 1;
                var ey = dayjs(maturity).year();
                var td = dayjs(issue).date();
                var tm = dayjs(issue).month() + 1;
                var ty = dayjs(issue).year();
                var result;
                switch (basis) {
                case 0:
                    if (sd == 31) {
                        sd = 30;
                    }
                    if (ed == 31) {
                        ed = 30;
                    }
                    if (td == 31) {
                        td = 30;
                    }
                    var B = 360;
                    var DSM = ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360);
                    var DIM = ed + em * 30 + ey * 360 - (td + tm * 30 + ty * 360);
                    var A = sd + sm * 30 + sy * 360 - (td + tm * 30 + ty * 360);
                    break;
                case 1:
                    var ylength = 365;
                    if (sy === ey || sy + 1 === ey && (sm > em || sm === em && sd >= ed)) {
                        if (sy === ey && func_methods.isLeapYear(sy) || func_methods.feb29Between(settlement, maturity) || em === 1 && ed === 29) {
                            ylength = 366;
                        }
                        var B = ylength;
                        var DSM = dayjs(maturity).undefined(dayjs(settlement), 'days');
                        var DIM = dayjs(settlement).undefined(dayjs(issue), 'days');
                        var A = dayjs(maturity).undefined(dayjs(issue), 'days');
                        result = (100 + DIM / B * rate * 100) / (1 + DSM / B * yld) - A / B * rate * 100;
                        return result;
                    }
                    var years = ey - sy + 1;
                    var days = (dayjs().set({
                        'year': ey + 1,
                        'month': 0,
                        'date': 1
                    }) - dayjs().set({
                        'year': sy,
                        'month': 0,
                        'date': 1
                    })) / 1000 / 60 / 60 / 24;
                    var average = days / years;
                    var B = average;
                    var DSM = dayjs(maturity).undefined(dayjs(settlement), 'days');
                    var DIM = dayjs(settlement).undefined(dayjs(issue), 'days');
                    var A = dayjs(maturity).undefined(dayjs(issue), 'days');
                    break;
                case 2:
                    var B = 360;
                    var DSM = dayjs(maturity).undefined(dayjs(settlement), 'days');
                    var DIM = dayjs(settlement).undefined(dayjs(issue), 'days');
                    var A = dayjs(maturity).undefined(dayjs(issue), 'days');
                    break;
                case 3:
                    var B = 365;
                    var DSM = dayjs(maturity).undefined(dayjs(settlement), 'days');
                    var DIM = dayjs(settlement).undefined(dayjs(issue), 'days');
                    var A = dayjs(maturity).undefined(dayjs(issue), 'days');
                    break;
                case 4:
                    var B = 360;
                    var DSM = ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360);
                    var DIM = ed + em * 30 + ey * 360 - (td + tm * 30 + ty * 360);
                    var A = sd + sm * 30 + sy * 360 - (td + tm * 30 + ty * 360);
                    break;
                }
                result = (100 + DIM / B * rate * 100) / (1 + DSM / B * yld) - A / B * rate * 100;
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'RECEIVED': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var investment = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(investment)) {
                    return investment;
                }
                if (!e.isRealNum(investment)) {
                    return formula.undefined.v;
                }
                investment = parseFloat(investment);
                var discount = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(discount)) {
                    return discount;
                }
                if (!e.isRealNum(discount)) {
                    return formula.undefined.v;
                }
                discount = parseFloat(discount);
                var basis = 0;
                if (arguments.length == 5) {
                    basis = func_methods.getFirstValue(arguments[4]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseFloat(basis);
                }
                if (investment <= 0 || discount <= 0) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) >= 0) {
                    return formula.undefined.nm;
                }
                var sd = dayjs(settlement).date();
                var sm = dayjs(settlement).month() + 1;
                var sy = dayjs(settlement).year();
                var ed = dayjs(maturity).date();
                var em = dayjs(maturity).month() + 1;
                var ey = dayjs(maturity).year();
                var result;
                switch (basis) {
                case 0:
                    if (sd == 31) {
                        sd = 30;
                    }
                    if (ed == 31) {
                        ed = 30;
                    }
                    var B = 360;
                    var DIM = ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360);
                    break;
                case 1:
                    var ylength = 365;
                    if (sy === ey || sy + 1 === ey && (sm > em || sm === em && sd >= ed)) {
                        if (sy === ey && func_methods.isLeapYear(sy) || func_methods.feb29Between(settlement, maturity) || em === 1 && ed === 29) {
                            ylength = 366;
                        }
                        var B = ylength;
                        var DIM = dayjs(maturity).undefined(dayjs(settlement), 'days');
                        result = investment / (1 - discount * DIM / B);
                        return result;
                    }
                    var years = ey - sy + 1;
                    var days = (dayjs().set({
                        'year': ey + 1,
                        'month': 0,
                        'date': 1
                    }) - dayjs().set({
                        'year': sy,
                        'month': 0,
                        'date': 1
                    })) / 1000 / 60 / 60 / 24;
                    var average = days / years;
                    var B = average;
                    var DIM = dayjs(maturity).undefined(dayjs(settlement), 'days');
                    break;
                case 2:
                    var B = 360;
                    var DIM = dayjs(maturity).undefined(dayjs(settlement), 'days');
                    break;
                case 3:
                    var B = 365;
                    var DIM = dayjs(maturity).undefined(dayjs(settlement), 'days');
                    break;
                case 4:
                    var B = 360;
                    var DIM = ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360);
                    break;
                }
                result = investment / (1 - discount * DIM / B);
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DISC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var pr = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(pr)) {
                    return pr;
                }
                if (!e.isRealNum(pr)) {
                    return formula.undefined.v;
                }
                pr = parseFloat(pr);
                var redemption = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(redemption)) {
                    return redemption;
                }
                if (!e.isRealNum(redemption)) {
                    return formula.undefined.v;
                }
                redemption = parseFloat(redemption);
                var basis = 0;
                if (arguments.length == 5) {
                    basis = func_methods.getFirstValue(arguments[4]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseFloat(basis);
                }
                if (pr <= 0 || redemption <= 0) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) >= 0) {
                    return formula.undefined.nm;
                }
                var sd = dayjs(settlement).date();
                var sm = dayjs(settlement).month() + 1;
                var sy = dayjs(settlement).year();
                var ed = dayjs(maturity).date();
                var em = dayjs(maturity).month() + 1;
                var ey = dayjs(maturity).year();
                var result;
                switch (basis) {
                case 0:
                    if (sd == 31) {
                        sd = 30;
                    }
                    if (ed == 31) {
                        ed = 30;
                    }
                    var B = 360;
                    var DSM = ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360);
                    break;
                case 1:
                    var ylength = 365;
                    if (sy === ey || sy + 1 === ey && (sm > em || sm === em && sd >= ed)) {
                        if (sy === ey && func_methods.isLeapYear(sy) || func_methods.feb29Between(settlement, maturity) || em === 1 && ed === 29) {
                            ylength = 366;
                        }
                        var B = ylength;
                        var DSM = dayjs(maturity).undefined(dayjs(settlement), 'days');
                        result = (redemption - pr) / redemption * (B / DSM);
                        return result;
                    }
                    var years = ey - sy + 1;
                    var days = (dayjs().set({
                        'year': ey + 1,
                        'month': 0,
                        'date': 1
                    }) - dayjs().set({
                        'year': sy,
                        'month': 0,
                        'date': 1
                    })) / 1000 / 60 / 60 / 24;
                    var average = days / years;
                    var B = average;
                    var DSM = dayjs(maturity).undefined(dayjs(settlement), 'days');
                    break;
                case 2:
                    var B = 360;
                    var DSM = dayjs(maturity).undefined(dayjs(settlement), 'days');
                    break;
                case 3:
                    var B = 365;
                    var DSM = dayjs(maturity).undefined(dayjs(settlement), 'days');
                    break;
                case 4:
                    var B = 360;
                    var DSM = ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360);
                    break;
                }
                result = (redemption - pr) / redemption * (B / DSM);
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'NPER': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var rate = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(rate)) {
                    return rate;
                }
                if (!e.isRealNum(rate)) {
                    return formula.undefined.v;
                }
                rate = parseFloat(rate);
                var pmt = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(pmt)) {
                    return pmt;
                }
                if (!e.isRealNum(pmt)) {
                    return formula.undefined.v;
                }
                pmt = parseFloat(pmt);
                var pv = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(pv)) {
                    return pv;
                }
                if (!e.isRealNum(pv)) {
                    return formula.undefined.v;
                }
                pv = parseFloat(pv);
                var fv = 0;
                if (arguments.length >= 4) {
                    fv = func_methods.getFirstValue(arguments[3]);
                    if (e.valueIsError(fv)) {
                        return fv;
                    }
                    if (!e.isRealNum(fv)) {
                        return formula.undefined.v;
                    }
                    fv = parseFloat(fv);
                }
                var type = 0;
                if (arguments.length >= 5) {
                    type = func_methods.getFirstValue(arguments[4]);
                    if (e.valueIsError(type)) {
                        return type;
                    }
                    if (!e.isRealNum(type)) {
                        return formula.undefined.v;
                    }
                    type = parseFloat(type);
                }
                if (type != 0 && type != 1) {
                    return formula.undefined.nm;
                }
                var num = pmt * (1 + rate * type) - fv * rate;
                var den = pv * rate + pmt * (1 + rate * type);
                return Math.log(num / den) / Math.log(1 + rate);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SLN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cost = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(cost)) {
                    return cost;
                }
                if (!e.isRealNum(cost)) {
                    return formula.undefined.v;
                }
                cost = parseFloat(cost);
                var salvage = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(salvage)) {
                    return salvage;
                }
                if (!e.isRealNum(salvage)) {
                    return formula.undefined.v;
                }
                salvage = parseFloat(salvage);
                var life = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(life)) {
                    return life;
                }
                if (!e.isRealNum(life)) {
                    return formula.undefined.v;
                }
                life = parseFloat(life);
                if (life == 0) {
                    return formula.undefined.d;
                }
                return (cost - salvage) / life;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DURATION': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var coupon = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(coupon)) {
                    return coupon;
                }
                if (!e.isRealNum(coupon)) {
                    return formula.undefined.v;
                }
                coupon = parseFloat(coupon);
                var yld = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(yld)) {
                    return yld;
                }
                if (!e.isRealNum(yld)) {
                    return formula.undefined.v;
                }
                yld = parseFloat(yld);
                var frequency = func_methods.getFirstValue(arguments[4]);
                if (e.valueIsError(frequency)) {
                    return frequency;
                }
                if (!e.isRealNum(frequency)) {
                    return formula.undefined.v;
                }
                frequency = parseInt(frequency);
                var basis = 0;
                if (arguments.length == 6) {
                    basis = func_methods.getFirstValue(arguments[5]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseInt(basis);
                }
                if (coupon < 0 || yld < 0) {
                    return formula.undefined.nm;
                }
                if (frequency != 1 && frequency != 2 && frequency != 4) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) >= 0) {
                    return formula.undefined.nm;
                }
                var nper = window.luckysheet_function.COUPNUM.f(settlement, maturity, frequency, basis);
                var sum1 = 0;
                var sum2 = 0;
                for (var i = 1; i <= nper; i++) {
                    sum1 += 100 * (coupon / frequency) * i / Math.pow(1 + yld / frequency, i);
                    sum2 += 100 * (coupon / frequency) / Math.pow(1 + yld / frequency, i);
                }
                var result = (sum1 + 100 * nper / Math.pow(1 + yld / frequency, nper)) / (sum2 + 100 / Math.pow(1 + yld / frequency, nper));
                result = result / frequency;
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MDURATION': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var settlement = func_methods.getCellDate(arguments[0]);
                if (e.valueIsError(settlement)) {
                    return settlement;
                }
                if (!dayjs(settlement).isValid()) {
                    return formula.undefined.v;
                }
                var maturity = func_methods.getCellDate(arguments[1]);
                if (e.valueIsError(maturity)) {
                    return maturity;
                }
                if (!dayjs(maturity).isValid()) {
                    return formula.undefined.v;
                }
                var coupon = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(coupon)) {
                    return coupon;
                }
                if (!e.isRealNum(coupon)) {
                    return formula.undefined.v;
                }
                coupon = parseFloat(coupon);
                var yld = func_methods.getFirstValue(arguments[3]);
                if (e.valueIsError(yld)) {
                    return yld;
                }
                if (!e.isRealNum(yld)) {
                    return formula.undefined.v;
                }
                yld = parseFloat(yld);
                var frequency = func_methods.getFirstValue(arguments[4]);
                if (e.valueIsError(frequency)) {
                    return frequency;
                }
                if (!e.isRealNum(frequency)) {
                    return formula.undefined.v;
                }
                frequency = parseInt(frequency);
                var basis = 0;
                if (arguments.length == 6) {
                    basis = func_methods.getFirstValue(arguments[5]);
                    if (e.valueIsError(basis)) {
                        return basis;
                    }
                    if (!e.isRealNum(basis)) {
                        return formula.undefined.v;
                    }
                    basis = parseInt(basis);
                }
                if (coupon < 0 || yld < 0) {
                    return formula.undefined.nm;
                }
                if (frequency != 1 && frequency != 2 && frequency != 4) {
                    return formula.undefined.nm;
                }
                if (basis < 0 || basis > 4) {
                    return formula.undefined.nm;
                }
                if (dayjs(settlement) - dayjs(maturity) >= 0) {
                    return formula.undefined.nm;
                }
                var duration = window.luckysheet_function.DURATION.f(settlement, maturity, coupon, yld, frequency, basis);
                return duration / (1 + yld / frequency);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'BIN2DEC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!/^[01]{1,10}$/g.test(number)) {
                    return formula.undefined.nm;
                }
                var result = parseInt(number, 2);
                var stringified = number.toString();
                if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
                    return parseInt(stringified.substring(1), 2) - 512;
                } else {
                    return result;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'BIN2HEX': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                var places = null;
                if (arguments.length == 2) {
                    places = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(places)) {
                        return places;
                    }
                    if (!e.isRealNum(places)) {
                        return formula.undefined.v;
                    }
                    places = parseInt(places);
                }
                if (!/^[01]{1,10}$/g.test(number)) {
                    return formula.undefined.nm;
                }
                var result = parseInt(number, 2).toString(16).toUpperCase();
                if (places == null) {
                    return result;
                } else {
                    if (places < 0 || places < result.length) {
                        return formula.undefined.nm;
                    }
                    return new Array(places - result.length + 1).join('0') + result;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'BIN2OCT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                var places = null;
                if (arguments.length == 2) {
                    places = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(places)) {
                        return places;
                    }
                    if (!e.isRealNum(places)) {
                        return formula.undefined.v;
                    }
                    places = parseInt(places);
                }
                if (!/^[01]{1,10}$/g.test(number)) {
                    return formula.undefined.nm;
                }
                var stringified = number.toString();
                if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
                    return (1073741312 + parseInt(stringified.substring(1), 2)).toString(8);
                }
                var result = parseInt(number, 2).toString(8);
                if (places == null) {
                    return result;
                } else {
                    if (places < 0 || places < result.length) {
                        return formula.undefined.nm;
                    }
                    return new Array(places - result.length + 1).join('0') + result;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DEC2BIN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var places = null;
                if (arguments.length == 2) {
                    places = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(places)) {
                        return places;
                    }
                    if (!e.isRealNum(places)) {
                        return formula.undefined.v;
                    }
                    places = parseInt(places);
                }
                if (!/^-?[0-9]{1,3}$/.test(number) || number < -512 || number > 511) {
                    return formula.undefined.nm;
                }
                if (number < 0) {
                    return '1' + new Array(9 - (512 + number).toString(2).length).join('0') + (512 + number).toString(2);
                }
                var result = parseInt(number, 10).toString(2);
                if (places == null) {
                    return result;
                } else {
                    if (places < 0 || places < result.length) {
                        return formula.undefined.nm;
                    }
                    return new Array(places - result.length + 1).join('0') + result;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DEC2HEX': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var places = null;
                if (arguments.length == 2) {
                    places = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(places)) {
                        return places;
                    }
                    if (!e.isRealNum(places)) {
                        return formula.undefined.v;
                    }
                    places = parseInt(places);
                }
                if (!/^-?[0-9]{1,12}$/.test(number) || number < -549755813888 || number > 549755813887) {
                    return formula.undefined.nm;
                }
                if (number < 0) {
                    return (1099511627776 + number).toString(16).toUpperCase();
                }
                var result = parseInt(number, 10).toString(16).toUpperCase();
                if (places == null) {
                    return result;
                } else {
                    if (places < 0 || places < result.length) {
                        return formula.undefined.nm;
                    }
                    return new Array(places - result.length + 1).join('0') + result;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DEC2OCT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var places = null;
                if (arguments.length == 2) {
                    places = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(places)) {
                        return places;
                    }
                    if (!e.isRealNum(places)) {
                        return formula.undefined.v;
                    }
                    places = parseInt(places);
                }
                if (!/^-?[0-9]{1,9}$/.test(number) || number < -536870912 || number > 536870911) {
                    return formula.undefined.nm;
                }
                if (number < 0) {
                    return (1073741824 + number).toString(8);
                }
                var result = parseInt(number, 10).toString(8);
                if (places == null) {
                    return result;
                } else {
                    if (places < 0 || places < result.length) {
                        return formula.undefined.nm;
                    }
                    return new Array(places - result.length + 1).join('0') + result;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'HEX2BIN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                var places = null;
                if (arguments.length == 2) {
                    places = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(places)) {
                        return places;
                    }
                    if (!e.isRealNum(places)) {
                        return formula.undefined.v;
                    }
                    places = parseInt(places);
                }
                if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
                    return formula.undefined.nm;
                }
                var negative = number.length === 10 && number.substring(0, 1).toLowerCase() === 'f' ? true : false;
                var decimal = negative ? parseInt(number, 16) - 1099511627776 : parseInt(number, 16);
                if (decimal < -512 || decimal > 511) {
                    return formula.undefined.nm;
                }
                if (negative) {
                    return '1' + new Array(9 - (512 + decimal).toString(2).length).join('0') + (512 + decimal).toString(2);
                }
                var result = decimal.toString(2);
                if (places == null) {
                    return result;
                } else {
                    if (places < 0 || places < result.length) {
                        return formula.undefined.nm;
                    }
                    return new Array(places - result.length + 1).join('0') + result;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'HEX2DEC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
                    return formula.undefined.nm;
                }
                var decimal = parseInt(number, 16);
                return decimal >= 549755813888 ? decimal - 1099511627776 : decimal;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'HEX2OCT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                var places = null;
                if (arguments.length == 2) {
                    places = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(places)) {
                        return places;
                    }
                    if (!e.isRealNum(places)) {
                        return formula.undefined.v;
                    }
                    places = parseInt(places);
                }
                if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
                    return formula.undefined.nm;
                }
                var decimal = parseInt(number, 16);
                if (decimal > 536870911 && decimal < 1098974756864) {
                    return formula.undefined.nm;
                }
                if (decimal >= 1098974756864) {
                    return (decimal - 1098437885952).toString(8);
                }
                var result = decimal.toString(8);
                if (places == null) {
                    return result;
                } else {
                    if (places < 0 || places < result.length) {
                        return formula.undefined.nm;
                    }
                    return new Array(places - result.length + 1).join('0') + result;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'OCT2BIN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                var places = null;
                if (arguments.length == 2) {
                    places = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(places)) {
                        return places;
                    }
                    if (!e.isRealNum(places)) {
                        return formula.undefined.v;
                    }
                    places = parseInt(places);
                }
                if (!/^[0-7]{1,10}$/.test(number)) {
                    return formula.undefined.nm;
                }
                number = number.toString();
                var negative = number.length === 10 && number.substring(0, 1) === '7' ? true : false;
                var decimal = negative ? parseInt(number, 8) - 1073741824 : parseInt(number, 8);
                if (decimal < -512 || decimal > 511) {
                    return e.error.num;
                }
                if (negative) {
                    return '1' + new Array(9 - (512 + decimal).toString(2).length).join('0') + (512 + decimal).toString(2);
                }
                var result = decimal.toString(2);
                if (places == null) {
                    return result;
                } else {
                    if (places < 0 || places < result.length) {
                        return formula.undefined.nm;
                    }
                    return new Array(places - result.length + 1).join('0') + result;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'OCT2DEC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!/^[0-7]{1,10}$/.test(number)) {
                    return formula.undefined.nm;
                }
                var decimal = parseInt(number, 8);
                return decimal >= 536870912 ? decimal - 1073741824 : decimal;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'OCT2HEX': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                var places = null;
                if (arguments.length == 2) {
                    places = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(places)) {
                        return places;
                    }
                    if (!e.isRealNum(places)) {
                        return formula.undefined.v;
                    }
                    places = parseInt(places);
                }
                if (!/^[0-7]{1,10}$/.test(number)) {
                    return formula.undefined.nm;
                }
                var decimal = parseInt(number, 8);
                if (decimal >= 536870912) {
                    return 'FF' + (decimal + 3221225472).toString(16).toUpperCase();
                }
                var result = decimal.toString(16).toUpperCase();
                if (places == null) {
                    return result;
                } else {
                    if (places < 0 || places < result.length) {
                        return formula.undefined.nm;
                    }
                    return new Array(places - result.length + 1).join('0') + result;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COMPLEX': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var real_num = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(real_num)) {
                    return real_num;
                }
                if (!e.isRealNum(real_num)) {
                    return formula.undefined.v;
                }
                real_num = parseFloat(real_num);
                var i_num = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(i_num)) {
                    return i_num;
                }
                if (!e.isRealNum(i_num)) {
                    return formula.undefined.v;
                }
                i_num = parseFloat(i_num);
                var suffix = 'i';
                if (arguments.length == 3) {
                    suffix = arguments[2].toString();
                }
                if (suffix != 'i' && suffix != 'j') {
                    return formula.undefined.v;
                }
                if (real_num === 0 && i_num === 0) {
                    return 0;
                } else if (real_num === 0) {
                    return i_num === 1 ? suffix : i_num.toString() + suffix;
                } else if (i_num === 0) {
                    return real_num.toString();
                } else {
                    var sign = i_num > 0 ? '+' : '';
                    return real_num.toString() + sign + (i_num === 1 ? suffix : i_num.toString() + suffix);
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'IMREAL': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var inumber = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(inumber)) {
                    return inumber;
                }
                inumber = inumber.toString();
                if (inumber.toLowerCase() == 'true' || inumber.toLowerCase() == 'false') {
                    return formula.undefined.v;
                }
                if (inumber == '0') {
                    return 0;
                }
                if ([
                        'i',
                        '+i',
                        '1i',
                        '+1i',
                        '-i',
                        '-1i',
                        'j',
                        '+j',
                        '1j',
                        '+1j',
                        '-j',
                        '-1j'
                    ].indexOf(inumber) >= 0) {
                    return 0;
                }
                var plus = inumber.indexOf('+');
                var minus = inumber.indexOf('-');
                if (plus === 0) {
                    plus = inumber.indexOf('+', 1);
                }
                if (minus === 0) {
                    minus = inumber.indexOf('-', 1);
                }
                var last = inumber.substring(inumber.length - 1, inumber.length);
                var unit = last === 'i' || last === 'j';
                if (plus >= 0 || minus >= 0) {
                    if (!unit) {
                        return formula.undefined.nm;
                    }
                    if (plus >= 0) {
                        return isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1)) ? formula.undefined.nm : Number(inumber.substring(0, plus));
                    } else {
                        return isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1)) ? formula.undefined.nm : Number(inumber.substring(0, minus));
                    }
                } else {
                    if (unit) {
                        return isNaN(inumber.substring(0, inumber.length - 1)) ? formula.undefined.nm : 0;
                    } else {
                        return isNaN(inumber) ? formula.undefined.nm : inumber;
                    }
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'IMAGINARY': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var inumber = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(inumber)) {
                    return inumber;
                }
                inumber = inumber.toString();
                if (inumber.toLowerCase() == 'true' || inumber.toLowerCase() == 'false') {
                    return formula.undefined.v;
                }
                if (inumber == '0') {
                    return 0;
                }
                if ([
                        'i',
                        'j'
                    ].indexOf(inumber) >= 0) {
                    return 1;
                }
                inumber = inumber.replace('+i', '+1i').replace('-i', '-1i').replace('+j', '+1j').replace('-j', '-1j');
                var plus = inumber.indexOf('+');
                var minus = inumber.indexOf('-');
                if (plus === 0) {
                    plus = inumber.indexOf('+', 1);
                }
                if (minus === 0) {
                    minus = inumber.indexOf('-', 1);
                }
                var last = inumber.substring(inumber.length - 1, inumber.length);
                var unit = last === 'i' || last === 'j';
                if (plus >= 0 || minus >= 0) {
                    if (!unit) {
                        return formula.undefined.nm;
                    }
                    if (plus >= 0) {
                        return isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1)) ? formula.undefined.nm : Number(inumber.substring(plus + 1, inumber.length - 1));
                    } else {
                        return isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1)) ? formula.undefined.nm : -Number(inumber.substring(minus + 1, inumber.length - 1));
                    }
                } else {
                    if (unit) {
                        return isNaN(inumber.substring(0, inumber.length - 1)) ? formula.undefined.nm : inumber.substring(0, inumber.length - 1);
                    } else {
                        return isNaN(inumber) ? formula.undefined.nm : 0;
                    }
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'IMCONJUGATE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var inumber = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(inumber)) {
                    return inumber;
                }
                inumber = inumber.toString();
                var x = window.luckysheet_function.IMREAL.f(inumber);
                if (e.valueIsError(x)) {
                    return x;
                }
                var y = window.luckysheet_function.IMAGINARY.f(inumber);
                if (e.valueIsError(y)) {
                    return y;
                }
                var unit = inumber.substring(inumber.length - 1);
                unit = unit === 'i' || unit === 'j' ? unit : 'i';
                return y !== 0 ? window.luckysheet_function.COMPLEX.f(x, -y, unit) : inumber;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'IMABS': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = window.luckysheet_function.IMREAL.f(arguments[0]);
                if (e.valueIsError(x)) {
                    return x;
                }
                var y = window.luckysheet_function.IMAGINARY.f(arguments[0]);
                if (e.valueIsError(y)) {
                    return y;
                }
                return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DELTA': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number1 = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number1)) {
                    return number1;
                }
                if (!e.isRealNum(number1)) {
                    return formula.undefined.v;
                }
                number1 = parseFloat(number1);
                var number2 = 0;
                if (arguments.length == 2) {
                    number2 = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(number2)) {
                        return number2;
                    }
                    if (!e.isRealNum(number2)) {
                        return formula.undefined.v;
                    }
                    number2 = parseFloat(number2);
                }
                return number1 === number2 ? 1 : 0;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'IMSUM': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = window.luckysheet_function.IMREAL.f(arguments[0]);
                if (e.valueIsError(x)) {
                    return x;
                }
                var y = window.luckysheet_function.IMAGINARY.f(arguments[0]);
                if (e.valueIsError(y)) {
                    return y;
                }
                var result = arguments[0];
                for (var i = 1; i < arguments.length; i++) {
                    var a = window.luckysheet_function.IMREAL.f(result);
                    if (e.valueIsError(a)) {
                        return a;
                    }
                    var b = window.luckysheet_function.IMAGINARY.f(result);
                    if (e.valueIsError(b)) {
                        return b;
                    }
                    var c = window.luckysheet_function.IMREAL.f(arguments[i]);
                    if (e.valueIsError(c)) {
                        return c;
                    }
                    var d = window.luckysheet_function.IMAGINARY.f(arguments[i]);
                    if (e.valueIsError(d)) {
                        return d;
                    }
                    result = window.luckysheet_function.COMPLEX.f(a + c, b + d);
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'IMSUB': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var inumber1 = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(inumber1)) {
                    return inumber1;
                }
                inumber1 = inumber1.toString();
                if (inumber1.toLowerCase() == 'true' || inumber1.toLowerCase() == 'false') {
                    return formula.undefined.v;
                }
                var a = window.luckysheet_function.IMREAL.f(inumber1);
                if (e.valueIsError(a)) {
                    return a;
                }
                var b = window.luckysheet_function.IMAGINARY.f(inumber1);
                if (e.valueIsError(b)) {
                    return b;
                }
                var inumber2 = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(inumber2)) {
                    return inumber2;
                }
                inumber2 = inumber2.toString();
                if (inumber2.toLowerCase() == 'true' || inumber2.toLowerCase() == 'false') {
                    return formula.undefined.v;
                }
                var c = window.luckysheet_function.IMREAL.f(inumber2);
                if (e.valueIsError(c)) {
                    return c;
                }
                var d = window.luckysheet_function.IMAGINARY.f(inumber2);
                if (e.valueIsError(d)) {
                    return d;
                }
                var unit1 = inumber1.substring(inumber1.length - 1);
                var unit2 = inumber2.substring(inumber2.length - 1);
                var unit = 'i';
                if (unit1 === 'j') {
                    unit = 'j';
                } else if (unit2 === 'j') {
                    unit = 'j';
                }
                return window.luckysheet_function.COMPLEX.f(a - c, b - d, unit);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'IMPRODUCT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var x = window.luckysheet_function.IMREAL.f(arguments[0]);
                if (e.valueIsError(x)) {
                    return x;
                }
                var y = window.luckysheet_function.IMAGINARY.f(arguments[0]);
                if (e.valueIsError(y)) {
                    return y;
                }
                var result = arguments[0];
                for (var i = 1; i < arguments.length; i++) {
                    var a = window.luckysheet_function.IMREAL.f(result);
                    if (e.valueIsError(a)) {
                        return a;
                    }
                    var b = window.luckysheet_function.IMAGINARY.f(result);
                    if (e.valueIsError(b)) {
                        return b;
                    }
                    var c = window.luckysheet_function.IMREAL.f(arguments[i]);
                    if (e.valueIsError(c)) {
                        return c;
                    }
                    var d = window.luckysheet_function.IMAGINARY.f(arguments[i]);
                    if (e.valueIsError(d)) {
                        return d;
                    }
                    result = window.luckysheet_function.COMPLEX.f(a * c - b * d, a * d + b * c);
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'IMDIV': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var inumber1 = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(inumber1)) {
                    return inumber1;
                }
                inumber1 = inumber1.toString();
                if (inumber1.toLowerCase() == 'true' || inumber1.toLowerCase() == 'false') {
                    return formula.undefined.v;
                }
                var a = window.luckysheet_function.IMREAL.f(inumber1);
                if (e.valueIsError(a)) {
                    return a;
                }
                var b = window.luckysheet_function.IMAGINARY.f(inumber1);
                if (e.valueIsError(b)) {
                    return b;
                }
                var inumber2 = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(inumber2)) {
                    return inumber2;
                }
                inumber2 = inumber2.toString();
                if (inumber2.toLowerCase() == 'true' || inumber2.toLowerCase() == 'false') {
                    return formula.undefined.v;
                }
                var c = window.luckysheet_function.IMREAL.f(inumber2);
                if (e.valueIsError(c)) {
                    return c;
                }
                var d = window.luckysheet_function.IMAGINARY.f(inumber2);
                if (e.valueIsError(d)) {
                    return d;
                }
                var unit1 = inumber1.substring(inumber1.length - 1);
                var unit2 = inumber2.substring(inumber2.length - 1);
                var unit = 'i';
                if (unit1 === 'j') {
                    unit = 'j';
                } else if (unit2 === 'j') {
                    unit = 'j';
                }
                if (c === 0 && d === 0) {
                    return formula.undefined.nm;
                }
                var den = c * c + d * d;
                return window.luckysheet_function.COMPLEX.f((a * c + b * d) / den, (b * c - a * d) / den, unit);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'NOT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var logical = func_methods.getCellBoolen(arguments[0]);
                if (e.valueIsError(logical)) {
                    return logical;
                }
                return !logical;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TRUE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                return true;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'FALSE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                return false;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'AND': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var result = true;
                for (var i = 0; i < arguments.length; i++) {
                    var logical = func_methods.getCellBoolen(arguments[i]);
                    if (e.valueIsError(logical)) {
                        return logical;
                    }
                    if (!logical) {
                        result = false;
                        break;
                    }
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'IFERROR': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value_if_error = func_methods.getFirstValue(arguments[1], 'text');
                var value = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(value) || j.getObjType(value) === 'string' && $.trim(value) === '') {
                    return value_if_error;
                }
                return value;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'IF': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var logical_test = func_methods.getCellBoolen(arguments[0]);
                if (e.valueIsError(logical_test)) {
                    return logical_test;
                }
                var value_if_true = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(value_if_true) && value_if_false != e.error.d) {
                    return value_if_true;
                }
                var value_if_false = '';
                if (arguments.length == 3) {
                    value_if_false = func_methods.getFirstValue(arguments[2], 'text');
                    if (e.valueIsError(value_if_false) && value_if_false != e.error.d) {
                        return value_if_false;
                    }
                }
                if (logical_test) {
                    return value_if_true;
                } else {
                    return value_if_false;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'OR': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var result = false;
                for (var i = 0; i < arguments.length; i++) {
                    var logical = func_methods.getCellBoolen(arguments[i]);
                    if (e.valueIsError(logical)) {
                        return logical;
                    }
                    if (logical) {
                        result = true;
                        break;
                    }
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'NE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value1 = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(value1)) {
                    return value1;
                }
                var value2 = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(value2)) {
                    return value2;
                }
                return value1 != value2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'EQ': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value1 = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(value1)) {
                    return value1;
                }
                var value2 = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(value2)) {
                    return value2;
                }
                return value1 == value2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'GT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value1 = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(value1)) {
                    return value1;
                }
                if (!e.isRealNum(value1)) {
                    return formula.undefined.v;
                }
                value1 = parseFloat(value1);
                var value2 = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(value2)) {
                    return value2;
                }
                if (!e.isRealNum(value2)) {
                    return formula.undefined.v;
                }
                value2 = parseFloat(value2);
                return value1 > value2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'GTE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value1 = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(value1)) {
                    return value1;
                }
                if (!e.isRealNum(value1)) {
                    return formula.undefined.v;
                }
                value1 = parseFloat(value1);
                var value2 = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(value2)) {
                    return value2;
                }
                if (!e.isRealNum(value2)) {
                    return formula.undefined.v;
                }
                value2 = parseFloat(value2);
                return value1 >= value2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'LT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value1 = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(value1)) {
                    return value1;
                }
                if (!e.isRealNum(value1)) {
                    return formula.undefined.v;
                }
                value1 = parseFloat(value1);
                var value2 = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(value2)) {
                    return value2;
                }
                if (!e.isRealNum(value2)) {
                    return formula.undefined.v;
                }
                value2 = parseFloat(value2);
                return value1 < value2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'LTE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value1 = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(value1)) {
                    return value1;
                }
                if (!e.isRealNum(value1)) {
                    return formula.undefined.v;
                }
                value1 = parseFloat(value1);
                var value2 = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(value2)) {
                    return value2;
                }
                if (!e.isRealNum(value2)) {
                    return formula.undefined.v;
                }
                value2 = parseFloat(value2);
                return value1 <= value2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ADD': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value1 = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(value1)) {
                    return value1;
                }
                if (!e.isRealNum(value1)) {
                    return formula.undefined.v;
                }
                value1 = parseFloat(value1);
                var value2 = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(value2)) {
                    return value2;
                }
                if (!e.isRealNum(value2)) {
                    return formula.undefined.v;
                }
                value2 = parseFloat(value2);
                return value1 + value2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MINUS': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value1 = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(value1)) {
                    return value1;
                }
                if (!e.isRealNum(value1)) {
                    return formula.undefined.v;
                }
                value1 = parseFloat(value1);
                var value2 = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(value2)) {
                    return value2;
                }
                if (!e.isRealNum(value2)) {
                    return formula.undefined.v;
                }
                value2 = parseFloat(value2);
                return value1 - value2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MULTIPLY': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value1 = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(value1)) {
                    return value1;
                }
                if (!e.isRealNum(value1)) {
                    return formula.undefined.v;
                }
                value1 = parseFloat(value1);
                var value2 = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(value2)) {
                    return value2;
                }
                if (!e.isRealNum(value2)) {
                    return formula.undefined.v;
                }
                value2 = parseFloat(value2);
                return value1 * value2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DIVIDE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value1 = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(value1)) {
                    return value1;
                }
                if (!e.isRealNum(value1)) {
                    return formula.undefined.v;
                }
                value1 = parseFloat(value1);
                var value2 = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(value2)) {
                    return value2;
                }
                if (!e.isRealNum(value2)) {
                    return formula.undefined.v;
                }
                value2 = parseFloat(value2);
                if (value2 == 0) {
                    return formula.undefined.d;
                }
                return value1 / value2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'CONCAT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value1 = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(value1)) {
                    return value1;
                }
                var value2 = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(value2)) {
                    return value2;
                }
                return value1 + '' + value2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'UNARY_PERCENT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var result = number / 100;
                return Math.round(result * 100) / 100;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'CONCATENATE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var result = '';
                for (var i = 0; i < arguments.length; i++) {
                    var text = func_methods.getFirstValue(arguments[i], 'text');
                    if (e.valueIsError(text)) {
                        return text;
                    }
                    result = result + '' + text;
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'CODE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                if (text == '') {
                    return formula.undefined.v;
                }
                return text.charCodeAt(0);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'CHAR': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseInt(number);
                if (number < 1 || number > 255) {
                    return formula.undefined.v;
                }
                return String.fromCharCode(number);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ARABIC': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                text = text.toString().toUpperCase();
                if (!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(text)) {
                    return formula.undefined.v;
                }
                var r = 0;
                text.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function (i) {
                    r += {
                        M: 1000,
                        CM: 900,
                        D: 500,
                        CD: 400,
                        C: 100,
                        XC: 90,
                        L: 50,
                        XL: 40,
                        X: 10,
                        IX: 9,
                        V: 5,
                        IV: 4,
                        I: 1
                    }[i];
                });
                return r;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ROMAN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseInt(number);
                if (number == 0) {
                    return '';
                } else if (number < 1 || number > 3999) {
                    return formula.undefined.v;
                }
                function convert(num) {
                    var a = [
                        [
                            '',
                            'I',
                            'II',
                            'III',
                            'IV',
                            'V',
                            'VI',
                            'VII',
                            'VIII',
                            'IX'
                        ],
                        [
                            '',
                            'X',
                            'XX',
                            'XXX',
                            'XL',
                            'L',
                            'LX',
                            'LXX',
                            'LXXX',
                            'XC'
                        ],
                        [
                            '',
                            'C',
                            'CC',
                            'CCC',
                            'CD',
                            'D',
                            'DC',
                            'DCC',
                            'DCCC',
                            'CM'
                        ],
                        [
                            '',
                            'M',
                            'MM',
                            'MMM'
                        ]
                    ];
                    var i = a[3][Math.floor(num / 1000)];
                    var j = a[2][Math.floor(num % 1000 / 100)];
                    var k = a[1][Math.floor(num % 100 / 10)];
                    var l = a[0][num % 10];
                    return i + j + k + l;
                }
                return convert(number);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'REGEXEXTRACT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                var regular_expression = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(regular_expression)) {
                    return regular_expression;
                }
                var match = text.match(new RegExp(regular_expression));
                return match ? match[match.length > 1 ? match.length - 1 : 0] : null;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'REGEXMATCH': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                var regular_expression = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(regular_expression)) {
                    return regular_expression;
                }
                var match = text.match(new RegExp(regular_expression));
                return match ? true : false;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'REGEXREPLACE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                var regular_expression = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(regular_expression)) {
                    return regular_expression;
                }
                var replacement = func_methods.getFirstValue(arguments[2], 'text');
                if (e.valueIsError(replacement)) {
                    return replacement;
                }
                return text.replace(new RegExp(regular_expression), replacement);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'T': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(value)) {
                    return value;
                }
                return j.getObjType(value) == 'string' ? value : '';
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'FIXED': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var decimals = 2;
                if (arguments.length >= 2) {
                    decimals = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(decimals)) {
                        return decimals;
                    }
                    if (!e.isRealNum(decimals)) {
                        return formula.undefined.v;
                    }
                    decimals = parseInt(decimals);
                }
                var no_commas = false;
                if (arguments.length == 3) {
                    no_commas = func_methods.getCellBoolen(arguments[2]);
                    if (e.valueIsError(no_commas)) {
                        return no_commas;
                    }
                }
                if (decimals > 127) {
                    return formula.undefined.v;
                }
                var format = no_commas ? '0' : '#,##0';
                if (decimals <= 0) {
                    number = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
                } else if (decimals > 0) {
                    format += '.' + new Array(decimals + 1).join('0');
                }
                return g.update(format, number);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'FIND': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var find_text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(find_text)) {
                    return find_text;
                }
                find_text = find_text.toString();
                var within_text = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(within_text)) {
                    return within_text;
                }
                within_text = within_text.toString();
                var start_num = 1;
                if (arguments.length == 3) {
                    start_num = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(start_num)) {
                        return start_num;
                    }
                    if (!e.isRealNum(start_num)) {
                        return formula.undefined.v;
                    }
                    start_num = parseFloat(start_num);
                }
                if (start_num < 0 || start_num > within_text.length) {
                    return formula.undefined.v;
                }
                if (find_text == '') {
                    return start_num;
                }
                if (within_text.indexOf(find_text) == -1) {
                    return formula.undefined.v;
                }
                var result = within_text.indexOf(find_text, start_num - 1) + 1;
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'FINDB': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var find_text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(find_text)) {
                    return find_text;
                }
                find_text = find_text.toString();
                var within_text = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(within_text)) {
                    return within_text;
                }
                within_text = within_text.toString();
                var start_num = 1;
                if (arguments.length == 3) {
                    start_num = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(start_num)) {
                        return start_num;
                    }
                    if (!e.isRealNum(start_num)) {
                        return formula.undefined.v;
                    }
                    start_num = parseFloat(start_num);
                }
                if (start_num < 0 || start_num > within_text.length) {
                    return formula.undefined.v;
                }
                if (find_text == '') {
                    return start_num;
                }
                if (within_text.indexOf(find_text) == -1) {
                    return formula.undefined.v;
                }
                var strArr = within_text.split('');
                var index = within_text.indexOf(find_text, start_num - 1);
                var result = 0;
                for (var i = 0; i < index; i++) {
                    if (/[^\x00-\xff]/g.test(strArr[i])) {
                        result += 2;
                    } else {
                        result += 1;
                    }
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'JOIN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var separator = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(separator)) {
                    return separator;
                }
                var dataArr = [];
                for (var i = 1; i < arguments.length; i++) {
                    var data = arguments[i];
                    if (j.getObjType(data) == 'array') {
                        if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                            return formula.undefined.v;
                        }
                        dataArr = dataArr.concat(func_methods.getDataArr(data, false));
                    } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                        dataArr = dataArr.concat(func_methods.getCellDataArr(data, 'text', false));
                    } else {
                        dataArr.push(data);
                    }
                }
                return dataArr.join(separator);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'LEFT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                text = text.toString();
                var num_chars = 1;
                if (arguments.length == 2) {
                    num_chars = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(num_chars)) {
                        return num_chars;
                    }
                    if (!e.isRealNum(num_chars)) {
                        return formula.undefined.v;
                    }
                    num_chars = parseInt(num_chars);
                }
                if (num_chars < 0) {
                    return formula.undefined.v;
                }
                if (num_chars >= text.length) {
                    return text;
                } else if (num_chars == 0) {
                    return '';
                } else {
                    return text.substr(0, num_chars);
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'RIGHT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                text = text.toString();
                var num_chars = 1;
                if (arguments.length == 2) {
                    num_chars = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(num_chars)) {
                        return num_chars;
                    }
                    if (!e.isRealNum(num_chars)) {
                        return formula.undefined.v;
                    }
                    num_chars = parseInt(num_chars);
                }
                if (num_chars < 0) {
                    return formula.undefined.v;
                }
                if (num_chars >= text.length) {
                    return text;
                } else if (num_chars == 0) {
                    return '';
                } else {
                    return text.substr(-num_chars, num_chars);
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MID': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                text = text.toString();
                var start_num = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(start_num)) {
                    return start_num;
                }
                if (!e.isRealNum(start_num)) {
                    return formula.undefined.v;
                }
                start_num = parseInt(start_num);
                var num_chars = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(num_chars)) {
                    return num_chars;
                }
                if (!e.isRealNum(num_chars)) {
                    return formula.undefined.v;
                }
                num_chars = parseInt(num_chars);
                if (start_num < 1 || num_chars < 0) {
                    return formula.undefined.v;
                }
                if (start_num > text.length) {
                    return '';
                }
                if (start_num + num_chars > text.length) {
                    return text.substr(start_num - 1, text.length - start_num + 1);
                }
                return text.substr(start_num - 1, num_chars);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'LEN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                text = text.toString();
                return text.length;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'LENB': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                text = text.toString();
                return text.replace(/[^\x00-\xff]/g, 'aa').length;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'LOWER': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                text = text.toString();
                return text ? text.toLowerCase() : text;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'UPPER': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                text = text.toString();
                return text ? text.toUpperCase() : text;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'EXACT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text1 = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text1)) {
                    return text1;
                }
                text1 = text1.toString();
                var text2 = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(text2)) {
                    return text2;
                }
                text2 = text2.toString();
                return text1 === text2;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'REPLACE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var old_text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(old_text)) {
                    return old_text;
                }
                old_text = old_text.toString();
                var start_num = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(start_num)) {
                    return start_num;
                }
                if (!e.isRealNum(start_num)) {
                    return formula.undefined.v;
                }
                start_num = parseInt(start_num);
                var num_chars = func_methods.getFirstValue(arguments[2]);
                if (e.valueIsError(num_chars)) {
                    return num_chars;
                }
                if (!e.isRealNum(num_chars)) {
                    return formula.undefined.v;
                }
                num_chars = parseInt(num_chars);
                var new_text = func_methods.getFirstValue(arguments[3], 'text');
                if (e.valueIsError(new_text)) {
                    return new_text;
                }
                new_text = new_text.toString();
                return old_text.substr(0, start_num - 1) + new_text + old_text.substr(start_num - 1 + num_chars);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'REPT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                text = text.toString();
                var number_times = func_methods.getFirstValue(arguments[1]);
                if (e.valueIsError(number_times)) {
                    return number_times;
                }
                if (!e.isRealNum(number_times)) {
                    return formula.undefined.v;
                }
                number_times = parseInt(number_times);
                if (number_times < 0) {
                    return formula.undefined.v;
                }
                if (number_times > 100) {
                    number_times = 100;
                }
                return new Array(number_times + 1).join(text);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SEARCH': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var find_text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(find_text)) {
                    return find_text;
                }
                find_text = find_text.toString();
                var within_text = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(within_text)) {
                    return within_text;
                }
                within_text = within_text.toString();
                var start_num = 1;
                if (arguments.length == 3) {
                    start_num = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(start_num)) {
                        return start_num;
                    }
                    if (!e.isRealNum(start_num)) {
                        return formula.undefined.v;
                    }
                    start_num = parseInt(start_num);
                }
                if (start_num <= 0 || start_num > within_text.length) {
                    return formula.undefined.v;
                }
                var foundAt = within_text.toLowerCase().indexOf(find_text.toLowerCase(), start_num - 1) + 1;
                return foundAt === 0 ? formula.undefined.v : foundAt;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SUBSTITUTE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                text = text.toString();
                var old_text = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(old_text)) {
                    return old_text;
                }
                old_text = old_text.toString();
                var new_text = func_methods.getFirstValue(arguments[2], 'text');
                if (e.valueIsError(new_text)) {
                    return new_text;
                }
                new_text = new_text.toString();
                var instance_num = null;
                if (arguments.length == 4) {
                    instance_num = func_methods.getFirstValue(arguments[3]);
                    if (e.valueIsError(instance_num)) {
                        return instance_num;
                    }
                    if (!e.isRealNum(instance_num)) {
                        return formula.undefined.v;
                    }
                    instance_num = parseInt(instance_num);
                }
                var reg = new RegExp(old_text, 'g');
                var result;
                if (instance_num == null) {
                    result = text.replace(reg, new_text);
                } else {
                    if (instance_num <= 0) {
                        return formula.undefined.v;
                    }
                    var match = text.match(reg);
                    if (match == null || instance_num > match.length) {
                        return text;
                    } else {
                        var len = old_text.length;
                        var index = 0;
                        for (var i = 1; i <= instance_num; i++) {
                            index = text.indexOf(old_text, index) + 1;
                        }
                        result = text.substring(0, index - 1) + new_text + text.substring(index - 1 + len);
                    }
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'CLEAN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                text = text.toString();
                var textArr = [];
                for (var i = 0; i < text.length; i++) {
                    var code = text.charCodeAt(i);
                    if (/[\u4e00-\u9fa5]/g.test(text.charAt(i)) || code > 31 && code < 127) {
                        textArr.push(text.charAt(i));
                    }
                }
                return textArr.join('');
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TEXT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(value)) {
                    return value;
                }
                if (!e.isRealNum(value)) {
                    return formula.undefined.v;
                }
                value = parseFloat(value);
                var format_text = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(format_text)) {
                    return format_text;
                }
                format_text = format_text.toString();
                return g.update(format_text, value);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TRIM': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                text = text.toString();
                return text.replace(/ +/g, ' ').trim();
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'VALUE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                text = text.toString();
                return g.genarate(text)[2];
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PROPER': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var text = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(text)) {
                    return text;
                }
                text = text.toString().toLowerCase();
                return text.replace(/[a-zA-Z]+/g, function (word) {
                    return word.substring(0, 1).toUpperCase() + word.substring(1);
                });
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'CONVERT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var number = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(number)) {
                    return number;
                }
                if (!e.isRealNum(number)) {
                    return formula.undefined.v;
                }
                number = parseFloat(number);
                var from_unit = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(from_unit)) {
                    return from_unit;
                }
                from_unit = from_unit.toString();
                var to_unit = func_methods.getFirstValue(arguments[2], 'text');
                if (e.valueIsError(to_unit)) {
                    return to_unit;
                }
                to_unit = to_unit.toString();
                var units = [
                    [
                        'a.u. of action',
                        '?',
                        null,
                        'action',
                        false,
                        false,
                        1.05457168181818e-34
                    ],
                    [
                        'a.u. of charge',
                        'e',
                        null,
                        'electric_charge',
                        false,
                        false,
                        1.60217653141414e-19
                    ],
                    [
                        'a.u. of energy',
                        'Eh',
                        null,
                        'energy',
                        false,
                        false,
                        4.35974417757576e-18
                    ],
                    [
                        'a.u. of length',
                        'a?',
                        null,
                        'length',
                        false,
                        false,
                        5.29177210818182e-11
                    ],
                    [
                        'a.u. of mass',
                        'm?',
                        null,
                        'mass',
                        false,
                        false,
                        9.10938261616162e-31
                    ],
                    [
                        'a.u. of time',
                        '?/Eh',
                        null,
                        'time',
                        false,
                        false,
                        2.41888432650516e-17
                    ],
                    [
                        'admiralty knot',
                        'admkn',
                        null,
                        'speed',
                        false,
                        true,
                        0.514773333
                    ],
                    [
                        'ampere',
                        'A',
                        null,
                        'electric_current',
                        true,
                        false,
                        1
                    ],
                    [
                        'ampere per meter',
                        'A/m',
                        null,
                        'magnetic_field_intensity',
                        true,
                        false,
                        1
                    ],
                    [
                        'ångström',
                        'Å',
                        ['ang'],
                        'length',
                        false,
                        true,
                        1e-10
                    ],
                    [
                        'are',
                        'ar',
                        null,
                        'area',
                        false,
                        true,
                        100
                    ],
                    [
                        'astronomical unit',
                        'ua',
                        null,
                        'length',
                        false,
                        false,
                        1.49597870691667e-11
                    ],
                    [
                        'bar',
                        'bar',
                        null,
                        'pressure',
                        false,
                        false,
                        100000
                    ],
                    [
                        'barn',
                        'b',
                        null,
                        'area',
                        false,
                        false,
                        1e-28
                    ],
                    [
                        'becquerel',
                        'Bq',
                        null,
                        'radioactivity',
                        true,
                        false,
                        1
                    ],
                    [
                        'bit',
                        'bit',
                        ['b'],
                        'information',
                        false,
                        true,
                        1
                    ],
                    [
                        'btu',
                        'BTU',
                        ['btu'],
                        'energy',
                        false,
                        true,
                        1055.05585262
                    ],
                    [
                        'byte',
                        'byte',
                        null,
                        'information',
                        false,
                        true,
                        8
                    ],
                    [
                        'candela',
                        'cd',
                        null,
                        'luminous_intensity',
                        true,
                        false,
                        1
                    ],
                    [
                        'candela per square metre',
                        'cd/m?',
                        null,
                        'luminance',
                        true,
                        false,
                        1
                    ],
                    [
                        'coulomb',
                        'C',
                        null,
                        'electric_charge',
                        true,
                        false,
                        1
                    ],
                    [
                        'cubic ångström',
                        'ang3',
                        ['ang^3'],
                        'volume',
                        false,
                        true,
                        1e-30
                    ],
                    [
                        'cubic foot',
                        'ft3',
                        ['ft^3'],
                        'volume',
                        false,
                        true,
                        0.028316846592
                    ],
                    [
                        'cubic inch',
                        'in3',
                        ['in^3'],
                        'volume',
                        false,
                        true,
                        0.000016387064
                    ],
                    [
                        'cubic light-year',
                        'ly3',
                        ['ly^3'],
                        'volume',
                        false,
                        true,
                        8.46786664623715e-47
                    ],
                    [
                        'cubic metre',
                        'm?',
                        null,
                        'volume',
                        true,
                        true,
                        1
                    ],
                    [
                        'cubic mile',
                        'mi3',
                        ['mi^3'],
                        'volume',
                        false,
                        true,
                        4168181825.44058
                    ],
                    [
                        'cubic nautical mile',
                        'Nmi3',
                        ['Nmi^3'],
                        'volume',
                        false,
                        true,
                        6352182208
                    ],
                    [
                        'cubic Pica',
                        'Pica3',
                        [
                            'Picapt3',
                            'Pica^3',
                            'Picapt^3'
                        ],
                        'volume',
                        false,
                        true,
                        7.58660370370369e-8
                    ],
                    [
                        'cubic yard',
                        'yd3',
                        ['yd^3'],
                        'volume',
                        false,
                        true,
                        0.764554857984
                    ],
                    [
                        'cup',
                        'cup',
                        null,
                        'volume',
                        false,
                        true,
                        0.0002365882365
                    ],
                    [
                        'dalton',
                        'Da',
                        ['u'],
                        'mass',
                        false,
                        false,
                        1.66053886282828e-27
                    ],
                    [
                        'day',
                        'd',
                        ['day'],
                        'time',
                        false,
                        true,
                        86400
                    ],
                    [
                        'degree',
                        '\xB0',
                        null,
                        'angle',
                        false,
                        false,
                        0.0174532925199433
                    ],
                    [
                        'degrees Rankine',
                        'Rank',
                        null,
                        'temperature',
                        false,
                        true,
                        0.555555555555556
                    ],
                    [
                        'dyne',
                        'dyn',
                        ['dy'],
                        'force',
                        false,
                        true,
                        0.00001
                    ],
                    [
                        'electronvolt',
                        'eV',
                        ['ev'],
                        'energy',
                        false,
                        true,
                        1.60217656514141
                    ],
                    [
                        'ell',
                        'ell',
                        null,
                        'length',
                        false,
                        true,
                        1.143
                    ],
                    [
                        'erg',
                        'erg',
                        ['e'],
                        'energy',
                        false,
                        true,
                        1e-7
                    ],
                    [
                        'farad',
                        'F',
                        null,
                        'electric_capacitance',
                        true,
                        false,
                        1
                    ],
                    [
                        'fluid ounce',
                        'oz',
                        null,
                        'volume',
                        false,
                        true,
                        0.0000295735295625
                    ],
                    [
                        'foot',
                        'ft',
                        null,
                        'length',
                        false,
                        true,
                        0.3048
                    ],
                    [
                        'foot-pound',
                        'flb',
                        null,
                        'energy',
                        false,
                        true,
                        1.3558179483314
                    ],
                    [
                        'gal',
                        'Gal',
                        null,
                        'acceleration',
                        false,
                        false,
                        0.01
                    ],
                    [
                        'gallon',
                        'gal',
                        null,
                        'volume',
                        false,
                        true,
                        0.003785411784
                    ],
                    [
                        'gauss',
                        'G',
                        ['ga'],
                        'magnetic_flux_density',
                        false,
                        true,
                        1
                    ],
                    [
                        'grain',
                        'grain',
                        null,
                        'mass',
                        false,
                        true,
                        0.0000647989
                    ],
                    [
                        'gram',
                        'g',
                        null,
                        'mass',
                        false,
                        true,
                        0.001
                    ],
                    [
                        'gray',
                        'Gy',
                        null,
                        'absorbed_dose',
                        true,
                        false,
                        1
                    ],
                    [
                        'gross registered ton',
                        'GRT',
                        ['regton'],
                        'volume',
                        false,
                        true,
                        2.8316846592
                    ],
                    [
                        'hectare',
                        'ha',
                        null,
                        'area',
                        false,
                        true,
                        10000
                    ],
                    [
                        'henry',
                        'H',
                        null,
                        'inductance',
                        true,
                        false,
                        1
                    ],
                    [
                        'hertz',
                        'Hz',
                        null,
                        'frequency',
                        true,
                        false,
                        1
                    ],
                    [
                        'horsepower',
                        'HP',
                        ['h'],
                        'power',
                        false,
                        true,
                        745.69987158227
                    ],
                    [
                        'horsepower-hour',
                        'HPh',
                        [
                            'hh',
                            'hph'
                        ],
                        'energy',
                        false,
                        true,
                        2684519.538
                    ],
                    [
                        'hour',
                        'h',
                        ['hr'],
                        'time',
                        false,
                        true,
                        3600
                    ],
                    [
                        'imperial gallon (U.K.)',
                        'uk_gal',
                        null,
                        'volume',
                        false,
                        true,
                        0.00454609
                    ],
                    [
                        'imperial hundredweight',
                        'lcwt',
                        [
                            'uk_cwt',
                            'hweight'
                        ],
                        'mass',
                        false,
                        true,
                        50.802345
                    ],
                    [
                        'imperial quart (U.K)',
                        'uk_qt',
                        null,
                        'volume',
                        false,
                        true,
                        0.0011365225
                    ],
                    [
                        'imperial ton',
                        'brton',
                        [
                            'uk_ton',
                            'LTON'
                        ],
                        'mass',
                        false,
                        true,
                        1016.046909
                    ],
                    [
                        'inch',
                        'in',
                        null,
                        'length',
                        false,
                        true,
                        0.0254
                    ],
                    [
                        'international acre',
                        'uk_acre',
                        null,
                        'area',
                        false,
                        true,
                        4046.8564224
                    ],
                    [
                        'IT calorie',
                        'cal',
                        null,
                        'energy',
                        false,
                        true,
                        4.1868
                    ],
                    [
                        'joule',
                        'J',
                        null,
                        'energy',
                        true,
                        true,
                        1
                    ],
                    [
                        'katal',
                        'kat',
                        null,
                        'catalytic_activity',
                        true,
                        false,
                        1
                    ],
                    [
                        'kelvin',
                        'K',
                        ['kel'],
                        'temperature',
                        true,
                        true,
                        1
                    ],
                    [
                        'kilogram',
                        'kg',
                        null,
                        'mass',
                        true,
                        true,
                        1
                    ],
                    [
                        'knot',
                        'kn',
                        null,
                        'speed',
                        false,
                        true,
                        0.514444444444444
                    ],
                    [
                        'light-year',
                        'ly',
                        null,
                        'length',
                        false,
                        true,
                        9460730472580800
                    ],
                    [
                        'litre',
                        'L',
                        [
                            'l',
                            'lt'
                        ],
                        'volume',
                        false,
                        true,
                        0.001
                    ],
                    [
                        'lumen',
                        'lm',
                        null,
                        'luminous_flux',
                        true,
                        false,
                        1
                    ],
                    [
                        'lux',
                        'lx',
                        null,
                        'illuminance',
                        true,
                        false,
                        1
                    ],
                    [
                        'maxwell',
                        'Mx',
                        null,
                        'magnetic_flux',
                        false,
                        false,
                        1e-18
                    ],
                    [
                        'measurement ton',
                        'MTON',
                        null,
                        'volume',
                        false,
                        true,
                        1.13267386368
                    ],
                    [
                        'meter per hour',
                        'm/h',
                        ['m/hr'],
                        'speed',
                        false,
                        true,
                        0.00027777777777778
                    ],
                    [
                        'meter per second',
                        'm/s',
                        ['m/sec'],
                        'speed',
                        true,
                        true,
                        1
                    ],
                    [
                        'meter per second squared',
                        'm?s??',
                        null,
                        'acceleration',
                        true,
                        false,
                        1
                    ],
                    [
                        'parsec',
                        'pc',
                        ['parsec'],
                        'length',
                        false,
                        true,
                        30856775814671900
                    ],
                    [
                        'meter squared per second',
                        'm?/s',
                        null,
                        'kinematic_viscosity',
                        true,
                        false,
                        1
                    ],
                    [
                        'metre',
                        'm',
                        null,
                        'length',
                        true,
                        true,
                        1
                    ],
                    [
                        'miles per hour',
                        'mph',
                        null,
                        'speed',
                        false,
                        true,
                        0.44704
                    ],
                    [
                        'millimetre of mercury',
                        'mmHg',
                        null,
                        'pressure',
                        false,
                        false,
                        133.322
                    ],
                    [
                        'minute',
                        '?',
                        null,
                        'angle',
                        false,
                        false,
                        0.000290888208665722
                    ],
                    [
                        'minute',
                        'min',
                        ['mn'],
                        'time',
                        false,
                        true,
                        60
                    ],
                    [
                        'modern teaspoon',
                        'tspm',
                        null,
                        'volume',
                        false,
                        true,
                        0.000005
                    ],
                    [
                        'mole',
                        'mol',
                        null,
                        'amount_of_substance',
                        true,
                        false,
                        1
                    ],
                    [
                        'morgen',
                        'Morgen',
                        null,
                        'area',
                        false,
                        true,
                        2500
                    ],
                    [
                        'n.u. of action',
                        '?',
                        null,
                        'action',
                        false,
                        false,
                        1.05457168181818e-34
                    ],
                    [
                        'n.u. of mass',
                        'm?',
                        null,
                        'mass',
                        false,
                        false,
                        9.10938261616162e-31
                    ],
                    [
                        'n.u. of speed',
                        'c?',
                        null,
                        'speed',
                        false,
                        false,
                        299792458
                    ],
                    [
                        'n.u. of time',
                        '?/(me?c??)',
                        null,
                        'time',
                        false,
                        false,
                        1.28808866778687e-21
                    ],
                    [
                        'nautical mile',
                        'M',
                        ['Nmi'],
                        'length',
                        false,
                        true,
                        1852
                    ],
                    [
                        'newton',
                        'N',
                        null,
                        'force',
                        true,
                        true,
                        1
                    ],
                    [
                        'œrsted',
                        'Oe ',
                        null,
                        'magnetic_field_intensity',
                        false,
                        false,
                        79.5774715459477
                    ],
                    [
                        'ohm',
                        'Ω',
                        null,
                        'electric_resistance',
                        true,
                        false,
                        1
                    ],
                    [
                        'ounce mass',
                        'ozm',
                        null,
                        'mass',
                        false,
                        true,
                        0.028349523125
                    ],
                    [
                        'pascal',
                        'Pa',
                        null,
                        'pressure',
                        true,
                        false,
                        1
                    ],
                    [
                        'pascal second',
                        'Pa?s',
                        null,
                        'dynamic_viscosity',
                        true,
                        false,
                        1
                    ],
                    [
                        'pferdestärke',
                        'PS',
                        null,
                        'power',
                        false,
                        true,
                        735.49875
                    ],
                    [
                        'phot',
                        'ph',
                        null,
                        'illuminance',
                        false,
                        false,
                        0.0001
                    ],
                    [
                        'pica (1/6 inch)',
                        'pica',
                        null,
                        'length',
                        false,
                        true,
                        0.00035277777777778
                    ],
                    [
                        'pica (1/72 inch)',
                        'Pica',
                        ['Picapt'],
                        'length',
                        false,
                        true,
                        0.00423333333333333
                    ],
                    [
                        'poise',
                        'P',
                        null,
                        'dynamic_viscosity',
                        false,
                        false,
                        0.1
                    ],
                    [
                        'pond',
                        'pond',
                        null,
                        'force',
                        false,
                        true,
                        0.00980665
                    ],
                    [
                        'pound force',
                        'lbf',
                        null,
                        'force',
                        false,
                        true,
                        4.4482216152605
                    ],
                    [
                        'pound mass',
                        'lbm',
                        null,
                        'mass',
                        false,
                        true,
                        0.45359237
                    ],
                    [
                        'quart',
                        'qt',
                        null,
                        'volume',
                        false,
                        true,
                        0.000946352946
                    ],
                    [
                        'radian',
                        'rad',
                        null,
                        'angle',
                        true,
                        false,
                        1
                    ],
                    [
                        'second',
                        '?',
                        null,
                        'angle',
                        false,
                        false,
                        0.00000484813681109536
                    ],
                    [
                        'second',
                        's',
                        ['sec'],
                        'time',
                        true,
                        true,
                        1
                    ],
                    [
                        'short hundredweight',
                        'cwt',
                        ['shweight'],
                        'mass',
                        false,
                        true,
                        45.359237
                    ],
                    [
                        'siemens',
                        'S',
                        null,
                        'electrical_conductance',
                        true,
                        false,
                        1
                    ],
                    [
                        'sievert',
                        'Sv',
                        null,
                        'equivalent_dose',
                        true,
                        false,
                        1
                    ],
                    [
                        'slug',
                        'sg',
                        null,
                        'mass',
                        false,
                        true,
                        14.59390294
                    ],
                    [
                        'square ångström',
                        'ang2',
                        ['ang^2'],
                        'area',
                        false,
                        true,
                        1e-20
                    ],
                    [
                        'square foot',
                        'ft2',
                        ['ft^2'],
                        'area',
                        false,
                        true,
                        0.09290304
                    ],
                    [
                        'square inch',
                        'in2',
                        ['in^2'],
                        'area',
                        false,
                        true,
                        0.00064516
                    ],
                    [
                        'square light-year',
                        'ly2',
                        ['ly^2'],
                        'area',
                        false,
                        true,
                        8.95054210748189e+31
                    ],
                    [
                        'square meter',
                        'm?',
                        null,
                        'area',
                        true,
                        true,
                        1
                    ],
                    [
                        'square mile',
                        'mi2',
                        ['mi^2'],
                        'area',
                        false,
                        true,
                        2589988.110336
                    ],
                    [
                        'square nautical mile',
                        'Nmi2',
                        ['Nmi^2'],
                        'area',
                        false,
                        true,
                        3429904
                    ],
                    [
                        'square Pica',
                        'Pica2',
                        [
                            'Picapt2',
                            'Pica^2',
                            'Picapt^2'
                        ],
                        'area',
                        false,
                        true,
                        0.00001792111111111
                    ],
                    [
                        'square yard',
                        'yd2',
                        ['yd^2'],
                        'area',
                        false,
                        true,
                        0.83612736
                    ],
                    [
                        'statute mile',
                        'mi',
                        null,
                        'length',
                        false,
                        true,
                        1609.344
                    ],
                    [
                        'steradian',
                        'sr',
                        null,
                        'solid_angle',
                        true,
                        false,
                        1
                    ],
                    [
                        'stilb',
                        'sb',
                        null,
                        'luminance',
                        false,
                        false,
                        0.0001
                    ],
                    [
                        'stokes',
                        'St',
                        null,
                        'kinematic_viscosity',
                        false,
                        false,
                        0.0001
                    ],
                    [
                        'stone',
                        'stone',
                        null,
                        'mass',
                        false,
                        true,
                        6.35029318
                    ],
                    [
                        'tablespoon',
                        'tbs',
                        null,
                        'volume',
                        false,
                        true,
                        0.0000147868
                    ],
                    [
                        'teaspoon',
                        'tsp',
                        null,
                        'volume',
                        false,
                        true,
                        0.00000492892
                    ],
                    [
                        'tesla',
                        'T',
                        null,
                        'magnetic_flux_density',
                        true,
                        true,
                        1
                    ],
                    [
                        'thermodynamic calorie',
                        'c',
                        null,
                        'energy',
                        false,
                        true,
                        4.184
                    ],
                    [
                        'ton',
                        'ton',
                        null,
                        'mass',
                        false,
                        true,
                        907.18474
                    ],
                    [
                        'tonne',
                        't',
                        null,
                        'mass',
                        false,
                        false,
                        1000
                    ],
                    [
                        'U.K. pint',
                        'uk_pt',
                        null,
                        'volume',
                        false,
                        true,
                        0.00056826125
                    ],
                    [
                        'U.S. bushel',
                        'bushel',
                        null,
                        'volume',
                        false,
                        true,
                        0.03523907
                    ],
                    [
                        'U.S. oil barrel',
                        'barrel',
                        null,
                        'volume',
                        false,
                        true,
                        0.158987295
                    ],
                    [
                        'U.S. pint',
                        'pt',
                        ['us_pt'],
                        'volume',
                        false,
                        true,
                        0.000473176473
                    ],
                    [
                        'U.S. survey mile',
                        'survey_mi',
                        null,
                        'length',
                        false,
                        true,
                        1609.347219
                    ],
                    [
                        'U.S. survey/statute acre',
                        'us_acre',
                        null,
                        'area',
                        false,
                        true,
                        4046.87261
                    ],
                    [
                        'volt',
                        'V',
                        null,
                        'voltage',
                        true,
                        false,
                        1
                    ],
                    [
                        'watt',
                        'W',
                        null,
                        'power',
                        true,
                        true,
                        1
                    ],
                    [
                        'watt-hour',
                        'Wh',
                        ['wh'],
                        'energy',
                        false,
                        true,
                        3600
                    ],
                    [
                        'weber',
                        'Wb',
                        null,
                        'magnetic_flux',
                        true,
                        false,
                        1
                    ],
                    [
                        'yard',
                        'yd',
                        null,
                        'length',
                        false,
                        true,
                        0.9144
                    ],
                    [
                        'year',
                        'yr',
                        null,
                        'time',
                        false,
                        true,
                        31557600
                    ]
                ];
                var binary_prefixes = {
                    Yi: [
                        'yobi',
                        80,
                        1.2089258196146292e+24,
                        'Yi',
                        'yotta'
                    ],
                    Zi: [
                        'zebi',
                        70,
                        1.1805916207174113e+21,
                        'Zi',
                        'zetta'
                    ],
                    Ei: [
                        'exbi',
                        60,
                        1152921504606847000,
                        'Ei',
                        'exa'
                    ],
                    Pi: [
                        'pebi',
                        50,
                        1125899906842624,
                        'Pi',
                        'peta'
                    ],
                    Ti: [
                        'tebi',
                        40,
                        1099511627776,
                        'Ti',
                        'tera'
                    ],
                    Gi: [
                        'gibi',
                        30,
                        1073741824,
                        'Gi',
                        'giga'
                    ],
                    Mi: [
                        'mebi',
                        20,
                        1048576,
                        'Mi',
                        'mega'
                    ],
                    ki: [
                        'kibi',
                        10,
                        1024,
                        'ki',
                        'kilo'
                    ]
                };
                var unit_prefixes = {
                    Y: [
                        'yotta',
                        1e+24,
                        'Y'
                    ],
                    Z: [
                        'zetta',
                        1e+21,
                        'Z'
                    ],
                    E: [
                        'exa',
                        1000000000000000000,
                        'E'
                    ],
                    P: [
                        'peta',
                        1000000000000000,
                        'P'
                    ],
                    T: [
                        'tera',
                        1000000000000,
                        'T'
                    ],
                    G: [
                        'giga',
                        1000000000,
                        'G'
                    ],
                    M: [
                        'mega',
                        1000000,
                        'M'
                    ],
                    k: [
                        'kilo',
                        1000,
                        'k'
                    ],
                    h: [
                        'hecto',
                        100,
                        'h'
                    ],
                    e: [
                        'dekao',
                        10,
                        'e'
                    ],
                    d: [
                        'deci',
                        0.1,
                        'd'
                    ],
                    c: [
                        'centi',
                        0.01,
                        'c'
                    ],
                    m: [
                        'milli',
                        0.001,
                        'm'
                    ],
                    u: [
                        'micro',
                        0.000001,
                        'u'
                    ],
                    n: [
                        'nano',
                        1e-9,
                        'n'
                    ],
                    p: [
                        'pico',
                        1e-12,
                        'p'
                    ],
                    f: [
                        'femto',
                        1e-15,
                        'f'
                    ],
                    a: [
                        'atto',
                        1e-18,
                        'a'
                    ],
                    z: [
                        'zepto',
                        1e-21,
                        'z'
                    ],
                    y: [
                        'yocto',
                        1e-24,
                        'y'
                    ]
                };
                var from = null;
                var to = null;
                var base_from_unit = from_unit;
                var base_to_unit = to_unit;
                var from_multiplier = 1;
                var to_multiplier = 1;
                var alt;
                for (var i = 0; i < units.length; i++) {
                    alt = units[i][2] === null ? [] : units[i][2];
                    if (units[i][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
                        from = units[i];
                    }
                    if (units[i][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
                        to = units[i];
                    }
                }
                if (from === null) {
                    var from_binary_prefix = binary_prefixes[from_unit.substring(0, 2)];
                    var from_unit_prefix = unit_prefixes[from_unit.substring(0, 1)];
                    if (from_unit.substring(0, 2) === 'da') {
                        from_unit_prefix = [
                            'dekao',
                            10,
                            'da'
                        ];
                    }
                    if (from_binary_prefix) {
                        from_multiplier = from_binary_prefix[2];
                        base_from_unit = from_unit.substring(2);
                    } else if (from_unit_prefix) {
                        from_multiplier = from_unit_prefix[1];
                        base_from_unit = from_unit.substring(from_unit_prefix[2].length);
                    }
                    for (var j = 0; j < units.length; j++) {
                        alt = units[j][2] === null ? [] : units[j][2];
                        if (units[j][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
                            from = units[j];
                        }
                    }
                }
                if (to === null) {
                    var to_binary_prefix = binary_prefixes[to_unit.substring(0, 2)];
                    var to_unit_prefix = unit_prefixes[to_unit.substring(0, 1)];
                    if (to_unit.substring(0, 2) === 'da') {
                        to_unit_prefix = [
                            'dekao',
                            10,
                            'da'
                        ];
                    }
                    if (to_binary_prefix) {
                        to_multiplier = to_binary_prefix[2];
                        base_to_unit = to_unit.substring(2);
                    } else if (to_unit_prefix) {
                        to_multiplier = to_unit_prefix[1];
                        base_to_unit = to_unit.substring(to_unit_prefix[2].length);
                    }
                    for (var k = 0; k < units.length; k++) {
                        alt = units[k][2] === null ? [] : units[k][2];
                        if (units[k][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
                            to = units[k];
                        }
                    }
                }
                if (from === null || to === null) {
                    return formula.undefined.na;
                }
                if (from[3] !== to[3]) {
                    return formula.undefined.na;
                }
                return number * from[6] * from_multiplier / (to[6] * to_multiplier);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SUMX2MY2': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_array_x = arguments[0];
                var array_x = [];
                if (j.getObjType(data_array_x) == 'array') {
                    if (j.getObjType(data_array_x[0]) == 'array' && !func_methods.isDyadicArr(data_array_x)) {
                        return formula.undefined.v;
                    }
                    array_x = array_x.concat(func_methods.getDataArr(data_array_x, false));
                } else if (j.getObjType(data_array_x) == 'object' && data_array_x.startCell != null) {
                    array_x = array_x.concat(func_methods.getCellDataArr(data_array_x, 'text', false));
                } else {
                    array_x.push(data_array_x);
                }
                var data_array_y = arguments[1];
                var array_y = [];
                if (j.getObjType(data_array_y) == 'array') {
                    if (j.getObjType(data_array_y[0]) == 'array' && !func_methods.isDyadicArr(data_array_y)) {
                        return formula.undefined.v;
                    }
                    array_y = array_y.concat(func_methods.getDataArr(data_array_y, false));
                } else if (j.getObjType(data_array_y) == 'object' && data_array_y.startCell != null) {
                    array_y = array_y.concat(func_methods.getCellDataArr(data_array_y, 'text', false));
                } else {
                    array_y.push(data_array_y);
                }
                if (array_x.length != array_y.length) {
                    return formula.undefined.na;
                }
                var data_x = [], data_y = [];
                for (var i = 0; i < array_x.length; i++) {
                    var num_x = array_x[i];
                    var num_y = array_y[i];
                    if (e.isRealNum(num_x) && e.isRealNum(num_y)) {
                        data_x.push(parseFloat(num_x));
                        data_y.push(parseFloat(num_y));
                    }
                }
                var sum = 0;
                for (var i = 0; i < data_x.length; i++) {
                    sum += Math.pow(data_x[i], 2) - Math.pow(data_y[i], 2);
                }
                return sum;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SUMX2PY2': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_array_x = arguments[0];
                var array_x = [];
                if (j.getObjType(data_array_x) == 'array') {
                    if (j.getObjType(data_array_x[0]) == 'array' && !func_methods.isDyadicArr(data_array_x)) {
                        return formula.undefined.v;
                    }
                    array_x = array_x.concat(func_methods.getDataArr(data_array_x, false));
                } else if (j.getObjType(data_array_x) == 'object' && data_array_x.startCell != null) {
                    array_x = array_x.concat(func_methods.getCellDataArr(data_array_x, 'text', false));
                } else {
                    array_x.push(data_array_x);
                }
                var data_array_y = arguments[1];
                var array_y = [];
                if (j.getObjType(data_array_y) == 'array') {
                    if (j.getObjType(data_array_y[0]) == 'array' && !func_methods.isDyadicArr(data_array_y)) {
                        return formula.undefined.v;
                    }
                    array_y = array_y.concat(func_methods.getDataArr(data_array_y, false));
                } else if (j.getObjType(data_array_y) == 'object' && data_array_y.startCell != null) {
                    array_y = array_y.concat(func_methods.getCellDataArr(data_array_y, 'text', false));
                } else {
                    array_y.push(data_array_y);
                }
                if (array_x.length != array_y.length) {
                    return formula.undefined.na;
                }
                var data_x = [], data_y = [];
                for (var i = 0; i < array_x.length; i++) {
                    var num_x = array_x[i];
                    var num_y = array_y[i];
                    if (e.isRealNum(num_x) && e.isRealNum(num_y)) {
                        data_x.push(parseFloat(num_x));
                        data_y.push(parseFloat(num_y));
                    }
                }
                var sum = 0;
                for (var i = 0; i < data_x.length; i++) {
                    sum += Math.pow(data_x[i], 2) + Math.pow(data_y[i], 2);
                }
                return sum;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SUMXMY2': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_array_x = arguments[0];
                var array_x = [];
                if (j.getObjType(data_array_x) == 'array') {
                    if (j.getObjType(data_array_x[0]) == 'array' && !func_methods.isDyadicArr(data_array_x)) {
                        return formula.undefined.v;
                    }
                    array_x = array_x.concat(func_methods.getDataArr(data_array_x, false));
                } else if (j.getObjType(data_array_x) == 'object' && data_array_x.startCell != null) {
                    array_x = array_x.concat(func_methods.getCellDataArr(data_array_x, 'text', false));
                } else {
                    array_x.push(data_array_x);
                }
                var data_array_y = arguments[1];
                var array_y = [];
                if (j.getObjType(data_array_y) == 'array') {
                    if (j.getObjType(data_array_y[0]) == 'array' && !func_methods.isDyadicArr(data_array_y)) {
                        return formula.undefined.v;
                    }
                    array_y = array_y.concat(func_methods.getDataArr(data_array_y, false));
                } else if (j.getObjType(data_array_y) == 'object' && data_array_y.startCell != null) {
                    array_y = array_y.concat(func_methods.getCellDataArr(data_array_y, 'text', false));
                } else {
                    array_y.push(data_array_y);
                }
                if (array_x.length != array_y.length) {
                    return formula.undefined.na;
                }
                var data_x = [], data_y = [];
                for (var i = 0; i < array_x.length; i++) {
                    var num_x = array_x[i];
                    var num_y = array_y[i];
                    if (e.isRealNum(num_x) && e.isRealNum(num_y)) {
                        data_x.push(parseFloat(num_x));
                        data_y.push(parseFloat(num_y));
                    }
                }
                var sum = 0;
                for (var i = 0; i < data_x.length; i++) {
                    sum += Math.pow(data_x[i] - data_y[i], 2);
                }
                return sum;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TRANSPOSE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_array = arguments[0];
                var array = [];
                if (j.getObjType(data_array) == 'array') {
                    if (j.getObjType(data_array[0]) == 'array' && !func_methods.isDyadicArr(data_array)) {
                        return formula.undefined.v;
                    }
                    array = func_methods.getDataDyadicArr(data_array);
                } else if (j.getObjType(data_array) == 'object' && data_array.startCell != null) {
                    array = func_methods.getCellDataDyadicArr(data_array, 'number');
                }
                array = array[0].map(function (col, a) {
                    return array.map(function (row) {
                        return row[a];
                    });
                });
                return array;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TREND': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_known_y = arguments[0];
                var known_y = [];
                if (j.getObjType(data_known_y) == 'array') {
                    if (j.getObjType(data_known_y[0]) == 'array' && !func_methods.isDyadicArr(data_known_y)) {
                        return formula.undefined.v;
                    }
                    known_y = func_methods.getDataDyadicArr(data_known_y);
                } else if (j.getObjType(data_known_y) == 'object' && data_known_y.startCell != null) {
                    known_y = func_methods.getCellDataDyadicArr(data_known_y, 'text');
                } else {
                    if (!e.isRealNum(data_known_y)) {
                        return formula.undefined.v;
                    }
                    var rowArr = [];
                    rowArr.push(parseFloat(data_known_y));
                    known_y.push(rowArr);
                }
                var known_y_rowlen = known_y.length;
                var known_y_collen = known_y[0].length;
                for (var i = 0; i < known_y_rowlen; i++) {
                    for (var j = 0; j < known_y_collen; j++) {
                        if (!e.isRealNum(known_y[i][j])) {
                            return formula.undefined.v;
                        }
                        known_y[i][j] = parseFloat(known_y[i][j]);
                    }
                }
                var known_x = [];
                for (var i = 1; i <= known_y_rowlen; i++) {
                    for (var j = 1; j <= known_y_collen; j++) {
                        var number = (i - 1) * known_y_collen + j;
                        known_x.push(number);
                    }
                }
                if (arguments.length >= 2) {
                    var data_known_x = arguments[1];
                    known_x = [];
                    if (j.getObjType(data_known_x) == 'array') {
                        if (j.getObjType(data_known_x[0]) == 'array' && !func_methods.isDyadicArr(data_known_x)) {
                            return formula.undefined.v;
                        }
                        known_x = func_methods.getDataDyadicArr(data_known_x);
                    } else if (j.getObjType(data_known_x) == 'object' && data_known_x.startCell != null) {
                        known_x = func_methods.getCellDataDyadicArr(data_known_x, 'text');
                    } else {
                        if (!e.isRealNum(data_known_x)) {
                            return formula.undefined.v;
                        }
                        var rowArr = [];
                        rowArr.push(parseFloat(data_known_x));
                        known_x.push(rowArr);
                    }
                    for (var i = 0; i < known_x.length; i++) {
                        for (var j = 0; j < known_x[0].length; j++) {
                            if (!e.isRealNum(known_x[i][j])) {
                                return formula.undefined.v;
                            }
                            known_x[i][j] = parseFloat(known_x[i][j]);
                        }
                    }
                }
                var known_x_rowlen = known_x.length;
                var known_x_collen = known_x[0].length;
                var new_x = known_x;
                if (arguments.length >= 3) {
                    var data_new_x = arguments[2];
                    new_x = [];
                    if (j.getObjType(data_new_x) == 'array') {
                        if (j.getObjType(data_new_x[0]) == 'array' && !func_methods.isDyadicArr(data_new_x)) {
                            return formula.undefined.v;
                        }
                        new_x = func_methods.getDataDyadicArr(data_new_x);
                    } else if (j.getObjType(data_new_x) == 'object' && data_new_x.startCell != null) {
                        new_x = func_methods.getCellDataDyadicArr(data_new_x, 'text');
                    } else {
                        if (!e.isRealNum(data_new_x)) {
                            return formula.undefined.v;
                        }
                        var rowArr = [];
                        rowArr.push(parseFloat(data_new_x));
                        new_x.push(rowArr);
                    }
                    for (var i = 0; i < new_x.length; i++) {
                        for (var j = 0; j < new_x[0].length; j++) {
                            if (!e.isRealNum(new_x[i][j])) {
                                return formula.undefined.v;
                            }
                            new_x[i][j] = parseFloat(new_x[i][j]);
                        }
                    }
                }
                var const_b = true;
                if (arguments.length == 4) {
                    const_b = func_methods.getCellBoolen(arguments[3]);
                    if (e.valueIsError(const_b)) {
                        return const_b;
                    }
                }
                if (known_y_rowlen != known_x_rowlen || known_y_collen != known_x_collen) {
                    return formula.undefined.r;
                }
                function leastSquare(arr_x, arr_y) {
                    var xSum = 0, ySum = 0, xySum = 0, x2Sum = 0;
                    for (var i = 0; i < arr_x.length; i++) {
                        for (var j = 0; j < arr_x[i].length; j++) {
                            xSum += arr_x[i][j];
                            ySum += arr_y[i][j];
                            xySum += arr_x[i][j] * arr_y[i][j];
                            x2Sum += arr_x[i][j] * arr_x[i][j];
                        }
                    }
                    var n = arr_x.length * arr_x[0].length;
                    var xMean = xSum / n;
                    var yMean = ySum / n;
                    var xyMean = xySum / n;
                    var x2Mean = x2Sum / n;
                    var m = (xyMean - xMean * yMean) / (x2Mean - xMean * xMean);
                    var b = yMean - m * xMean;
                    return [
                        m,
                        b
                    ];
                }
                var ls = leastSquare(known_x, known_y);
                var m = ls[0];
                if (const_b) {
                    var b = ls[1];
                } else {
                    var b = 0;
                }
                var result = [];
                for (var i = 0; i < new_x.length; i++) {
                    for (var j = 0; j < new_x[i].length; j++) {
                        var x = new_x[i][j];
                        var y = m * x + b;
                        result.push(Math.round(y * 1000000000) / 1000000000);
                    }
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'FREQUENCY': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_data_array = arguments[0];
                var data_array = [];
                if (j.getObjType(data_data_array) == 'array') {
                    if (j.getObjType(data_data_array[0]) == 'array' && !func_methods.isDyadicArr(data_data_array)) {
                        return formula.undefined.v;
                    }
                    data_array = data_array.concat(func_methods.getDataArr(data_data_array, true));
                } else if (j.getObjType(data_data_array) == 'object' && data_data_array.startCell != null) {
                    data_array = data_array.concat(func_methods.getCellDataArr(data_data_array, 'number', true));
                } else {
                    if (!e.isRealNum(data_data_array)) {
                        return formula.undefined.v;
                    }
                    data_array.push(data_data_array);
                }
                var data_array_n = [];
                for (var i = 0; i < data_array.length; i++) {
                    if (e.isRealNum(data_array[i])) {
                        data_array_n.push(parseFloat(data_array[i]));
                    }
                }
                var data_bins_array = arguments[1];
                var bins_array = [];
                if (j.getObjType(data_bins_array) == 'array') {
                    if (j.getObjType(data_bins_array[0]) == 'array' && !func_methods.isDyadicArr(data_bins_array)) {
                        return formula.undefined.v;
                    }
                    bins_array = bins_array.concat(func_methods.getDataArr(data_bins_array, true));
                } else if (j.getObjType(data_bins_array) == 'object' && data_bins_array.startCell != null) {
                    bins_array = bins_array.concat(func_methods.getCellDataArr(data_bins_array, 'number', true));
                } else {
                    if (!e.isRealNum(data_bins_array)) {
                        return formula.undefined.v;
                    }
                    bins_array.push(data_bins_array);
                }
                var bins_array_n = [];
                for (var i = 0; i < bins_array.length; i++) {
                    if (e.isRealNum(bins_array[i])) {
                        bins_array_n.push(parseFloat(bins_array[i]));
                    }
                }
                if (data_array_n.length == 0 && bins_array_n.length == 0) {
                    return [
                        [0],
                        [0]
                    ];
                } else if (data_array_n.length == 0) {
                    var result = [[0]];
                    for (var i = 0; i < bins_array_n.length; i++) {
                        result.push([0]);
                    }
                    return result;
                } else if (bins_array_n.length == 0) {
                    return [
                        [0],
                        [data_array_n.length]
                    ];
                } else {
                    bins_array_n.sort(function (a, b) {
                        return a - b;
                    });
                    var result = [];
                    for (var i = 0; i < bins_array_n.length; i++) {
                        if (i == 0) {
                            var count = 0;
                            for (var j = 0; j < data_array_n.length; j++) {
                                if (data_array_n[j] <= bins_array_n[0]) {
                                    count++;
                                }
                            }
                            result.push([count]);
                        } else if (i == bins_array_n.length - 1) {
                            var count1 = 0, count2 = 0;
                            for (var j = 0; j < data_array_n.length; j++) {
                                if (data_array_n[j] <= bins_array_n[i] && data_array_n[j] > bins_array_n[i - 1]) {
                                    count1++;
                                }
                                if (data_array_n[j] > bins_array_n[i]) {
                                    count2++;
                                }
                            }
                            result.push([count1]);
                            result.push([count2]);
                        } else {
                            var count = 0;
                            for (var j = 0; j < data_array_n.length; j++) {
                                if (data_array_n[j] <= bins_array_n[i] && data_array_n[j] > bins_array_n[i - 1]) {
                                    count++;
                                }
                            }
                            result.push([count]);
                        }
                    }
                    return result;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'GROWTH': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_known_y = arguments[0];
                var known_y = [];
                if (j.getObjType(data_known_y) == 'array') {
                    if (j.getObjType(data_known_y[0]) == 'array' && !func_methods.isDyadicArr(data_known_y)) {
                        return formula.undefined.v;
                    }
                    known_y = func_methods.getDataDyadicArr(data_known_y);
                } else if (j.getObjType(data_known_y) == 'object' && data_known_y.startCell != null) {
                    known_y = func_methods.getCellDataDyadicArr(data_known_y, 'text');
                } else {
                    if (!e.isRealNum(data_known_y)) {
                        return formula.undefined.v;
                    }
                    var rowArr = [];
                    rowArr.push(parseFloat(data_known_y));
                    known_y.push(rowArr);
                }
                var known_y_rowlen = known_y.length;
                var known_y_collen = known_y[0].length;
                for (var i = 0; i < known_y_rowlen; i++) {
                    for (var j = 0; j < known_y_collen; j++) {
                        if (!e.isRealNum(known_y[i][j])) {
                            return formula.undefined.v;
                        }
                        known_y[i][j] = parseFloat(known_y[i][j]);
                    }
                }
                var known_x = [];
                for (var i = 1; i <= known_y_rowlen; i++) {
                    for (var j = 1; j <= known_y_collen; j++) {
                        var number = (i - 1) * known_y_collen + j;
                        known_x.push(number);
                    }
                }
                if (arguments.length >= 2) {
                    var data_known_x = arguments[1];
                    known_x = [];
                    if (j.getObjType(data_known_x) == 'array') {
                        if (j.getObjType(data_known_x[0]) == 'array' && !func_methods.isDyadicArr(data_known_x)) {
                            return formula.undefined.v;
                        }
                        known_x = func_methods.getDataDyadicArr(data_known_x);
                    } else if (j.getObjType(data_known_x) == 'object' && data_known_x.startCell != null) {
                        known_x = func_methods.getCellDataDyadicArr(data_known_x, 'text');
                    } else {
                        if (!e.isRealNum(data_known_x)) {
                            return formula.undefined.v;
                        }
                        var rowArr = [];
                        rowArr.push(parseFloat(data_known_x));
                        known_x.push(rowArr);
                    }
                    for (var i = 0; i < known_x.length; i++) {
                        for (var j = 0; j < known_x[0].length; j++) {
                            if (!e.isRealNum(known_x[i][j])) {
                                return formula.undefined.v;
                            }
                            known_x[i][j] = parseFloat(known_x[i][j]);
                        }
                    }
                }
                var known_x_rowlen = known_x.length;
                var known_x_collen = known_x[0].length;
                var new_x = known_x;
                if (arguments.length >= 3) {
                    var data_new_x = arguments[2];
                    new_x = [];
                    if (j.getObjType(data_new_x) == 'array') {
                        if (j.getObjType(data_new_x[0]) == 'array' && !func_methods.isDyadicArr(data_new_x)) {
                            return formula.undefined.v;
                        }
                        new_x = func_methods.getDataDyadicArr(data_new_x);
                    } else if (j.getObjType(data_new_x) == 'object' && data_new_x.startCell != null) {
                        new_x = func_methods.getCellDataDyadicArr(data_new_x, 'text');
                    } else {
                        if (!e.isRealNum(data_new_x)) {
                            return formula.undefined.v;
                        }
                        var rowArr = [];
                        rowArr.push(parseFloat(data_new_x));
                        new_x.push(rowArr);
                    }
                    for (var i = 0; i < new_x.length; i++) {
                        for (var j = 0; j < new_x[0].length; j++) {
                            if (!e.isRealNum(new_x[i][j])) {
                                return formula.undefined.v;
                            }
                            new_x[i][j] = parseFloat(new_x[i][j]);
                        }
                    }
                }
                var const_b = true;
                if (arguments.length == 4) {
                    const_b = func_methods.getCellBoolen(arguments[3]);
                    if (e.valueIsError(const_b)) {
                        return const_b;
                    }
                }
                if (known_y_rowlen != known_x_rowlen || known_y_collen != known_x_collen) {
                    return formula.undefined.r;
                }
                function leastSquare(arr_x, arr_y) {
                    var xSum = 0, ySum = 0, xySum = 0, x2Sum = 0;
                    for (var i = 0; i < arr_x.length; i++) {
                        for (var j = 0; j < arr_x[i].length; j++) {
                            xSum += arr_x[i][j];
                            ySum += Math.log(arr_y[i][j]);
                            xySum += arr_x[i][j] * Math.log(arr_y[i][j]);
                            x2Sum += arr_x[i][j] * arr_x[i][j];
                        }
                    }
                    var n = arr_x.length * arr_x[0].length;
                    var xMean = xSum / n;
                    var yMean = ySum / n;
                    var xyMean = xySum / n;
                    var x2Mean = x2Sum / n;
                    var m = (xyMean - xMean * yMean) / (x2Mean - xMean * xMean);
                    var b = yMean - m * xMean;
                    return [
                        Math.exp(m),
                        Math.exp(b)
                    ];
                }
                var ls = leastSquare(known_x, known_y);
                var m = ls[0];
                if (const_b) {
                    var b = ls[1];
                } else {
                    var b = 1;
                }
                var result = [];
                for (var i = 0; i < new_x.length; i++) {
                    for (var j = 0; j < new_x[i].length; j++) {
                        var x = new_x[i][j];
                        var y = b * Math.pow(m, x);
                        result.push(Math.round(y * 1000000000) / 1000000000);
                    }
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'LINEST': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                return formula.undefined.v;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'LOGEST': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                return formula.undefined.v;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MDETERM': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_array = arguments[0];
                var array = [];
                if (j.getObjType(data_array) == 'array') {
                    if (j.getObjType(data_array[0]) == 'array' && !func_methods.isDyadicArr(data_array)) {
                        return formula.undefined.v;
                    }
                    array = func_methods.getDataDyadicArr(data_array);
                } else if (j.getObjType(data_array) == 'object' && data_array.startCell != null) {
                    array = func_methods.getCellDataDyadicArr(data_array, 'text');
                } else {
                    var rowArr = [];
                    rowArr.push(data_array);
                    array.push(rowArr);
                }
                for (var i = 0; i < array.length; i++) {
                    for (var j = 0; j < array[i].length; j++) {
                        if (!e.isRealNum(array[i][j])) {
                            return formula.undefined.v;
                        }
                        array[i][j] = parseFloat(array[i][j]);
                    }
                }
                if (array.length != array[0].length) {
                    return formula.undefined.v;
                }
                function Ma(a, n) {
                    var A;
                    var b = new Array();
                    if (n == 1) {
                        A = a[0][0];
                        return A;
                    } else if (n == 2) {
                        A = a[0][0] * a[1][1] - a[0][1] * a[1][0];
                        return A;
                    } else if (n == 3) {
                        A = a[0][0] * a[1][1] * a[2][2] + a[1][0] * a[2][1] * a[0][2] + a[2][0] * a[0][1] * a[1][2] - a[2][0] * a[1][1] * a[0][2] - a[0][0] * a[2][1] * a[1][2] - a[1][0] * a[0][1] * a[2][2];
                        return A;
                    } else {
                        A = 0;
                        var c = new Array();
                        var e = new Array();
                        for (var i = 0; i < n; i++) {
                            b[i] = a[i][0] * Math.pow(-1, i + 1 + 1);
                        }
                        for (var i = 0; i < n; i++) {
                            e[i] = new Array();
                            for (var j = 0; j < n - 1; j++) {
                                e[i][j] = a[i][j + 1];
                            }
                        }
                        for (var i = 0; i < n; i++) {
                            for (var j = 0; j < n; j++) {
                                c[j] = new Array();
                                for (var k = 0; k < n - 1; k++) {
                                    if (i > j) {
                                        c[j][k] = e[j][k];
                                    } else if (i < j) {
                                        c[j - 1][k] = e[j][k];
                                    }
                                }
                            }
                            A += b[i] * arguments.callee(c, n - 1);
                        }
                        return A;
                    }
                }
                return Ma(array, array.length);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MINVERSE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_array = arguments[0];
                var array = [];
                if (j.getObjType(data_array) == 'array') {
                    if (j.getObjType(data_array[0]) == 'array' && !func_methods.isDyadicArr(data_array)) {
                        return formula.undefined.v;
                    }
                    array = func_methods.getDataDyadicArr(data_array);
                } else if (j.getObjType(data_array) == 'object' && data_array.startCell != null) {
                    array = func_methods.getCellDataDyadicArr(data_array, 'text');
                } else {
                    var rowArr = [];
                    rowArr.push(data_array);
                    array.push(rowArr);
                }
                for (var i = 0; i < array.length; i++) {
                    for (var j = 0; j < array[i].length; j++) {
                        if (!e.isRealNum(array[i][j])) {
                            return formula.undefined.v;
                        }
                        array[i][j] = parseFloat(array[i][j]);
                    }
                }
                if (array.length != array[0].length) {
                    return formula.undefined.v;
                }
                return b.inverse(array);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'MMULT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_array1 = arguments[0];
                var array1 = [];
                if (j.getObjType(data_array1) == 'array') {
                    if (j.getObjType(data_array1[0]) == 'array' && !func_methods.isDyadicArr(data_array1)) {
                        return formula.undefined.v;
                    }
                    array1 = func_methods.getDataDyadicArr(data_array1);
                } else if (j.getObjType(data_array1) == 'object' && data_array1.startCell != null) {
                    array1 = func_methods.getCellDataDyadicArr(data_array1, 'text');
                } else {
                    var rowArr = [];
                    rowArr.push(data_array1);
                    array1.push(rowArr);
                }
                for (var i = 0; i < array1.length; i++) {
                    for (var j = 0; j < array1[i].length; j++) {
                        if (!e.isRealNum(array1[i][j])) {
                            return formula.undefined.v;
                        }
                        array1[i][j] = parseFloat(array1[i][j]);
                    }
                }
                var data_array2 = arguments[1];
                var array2 = [];
                if (j.getObjType(data_array2) == 'array') {
                    if (j.getObjType(data_array2[0]) == 'array' && !func_methods.isDyadicArr(data_array2)) {
                        return formula.undefined.v;
                    }
                    array2 = func_methods.getDataDyadicArr(data_array2);
                } else if (j.getObjType(data_array2) == 'object' && data_array2.startCell != null) {
                    array2 = func_methods.getCellDataDyadicArr(data_array2, 'text');
                } else {
                    var rowArr = [];
                    rowArr.push(data_array2);
                    array2.push(rowArr);
                }
                for (var i = 0; i < array2.length; i++) {
                    for (var j = 0; j < array2[i].length; j++) {
                        if (!e.isRealNum(array2[i][j])) {
                            return formula.undefined.v;
                        }
                        array2[i][j] = parseFloat(array2[i][j]);
                    }
                }
                if (array1[0].length != array2.length) {
                    return formula.undefined.v;
                }
                var rowlen = array1.length;
                var collen = array2[0].length;
                var result = [];
                for (var m = 0; m < rowlen; m++) {
                    var rowArr = [];
                    for (var n = 0; n < collen; n++) {
                        var value = 0;
                        for (var p = 0; p < array1[0].length; p++) {
                            value += array1[m][p] * array2[p][n];
                        }
                        rowArr.push(value);
                    }
                    result.push(rowArr);
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SUMPRODUCT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_array1 = arguments[0];
                var array1 = [];
                if (j.getObjType(data_array1) == 'array') {
                    if (j.getObjType(data_array1[0]) == 'array' && !func_methods.isDyadicArr(data_array1)) {
                        return formula.undefined.v;
                    }
                    array1 = func_methods.getDataDyadicArr(data_array1);
                } else if (j.getObjType(data_array1) == 'object' && data_array1.startCell != null) {
                    array1 = func_methods.getCellDataDyadicArr(data_array1, 'text');
                } else {
                    var rowArr = [];
                    rowArr.push(data_array1);
                    array1.push(rowArr);
                }
                for (var i = 0; i < array1.length; i++) {
                    for (var j = 0; j < array1[i].length; j++) {
                        if (!e.isRealNum(array1[i][j])) {
                            array1[i][j] = 0;
                        } else {
                            array1[i][j] = parseFloat(array1[i][j]);
                        }
                    }
                }
                var rowlen = array1.length;
                var collen = array1[0].length;
                if (arguments.length >= 2) {
                    for (var i = 1; i < arguments.length; i++) {
                        var data = arguments[i];
                        var arr = [];
                        if (j.getObjType(data) == 'array') {
                            if (j.getObjType(data[0]) == 'array' && !func_methods.isDyadicArr(data)) {
                                return formula.undefined.v;
                            }
                            arr = func_methods.getDataDyadicArr(data);
                        } else if (j.getObjType(data) == 'object' && data.startCell != null) {
                            arr = func_methods.getCellDataDyadicArr(data, 'text');
                        } else {
                            var rowArr = [];
                            rowArr.push(data);
                            arr.push(rowArr);
                        }
                        if (arr.length != rowlen || arr[0].length != collen) {
                            return formula.undefined.v;
                        }
                        for (var m = 0; m < rowlen; m++) {
                            for (var n = 0; n < collen; n++) {
                                if (!e.isRealNum(arr[m][n])) {
                                    array1[m][n] = 0;
                                } else {
                                    array1[m][n] = array1[m][n] * parseFloat(arr[m][n]);
                                }
                            }
                        }
                    }
                }
                var sum = 0;
                for (var m = 0; m < rowlen; m++) {
                    for (var n = 0; n < collen; n++) {
                        sum += array1[m][n];
                    }
                }
                return sum;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ISFORMULA': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_cell = arguments[0];
                var cell;
                if (j.getObjType(data_cell) == 'object' && data_cell.startCell != null) {
                    if (data_cell.data == null) {
                        return false;
                    }
                    if (j.getObjType(data_cell.data) == 'array') {
                        cell = data_cell.data[0][0];
                    } else {
                        cell = data_cell.data;
                    }
                    if (cell != null && cell.f != null) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return formula.undefined.v;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'CELL': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_info_type = arguments[0];
                var info_type;
                if (j.getObjType(data_info_type) == 'array') {
                    if (j.getObjType(data_info_type[0]) == 'array') {
                        if (!func_methods.isDyadicArr(data_info_type)) {
                            return formula.undefined.v;
                        }
                        info_type = data_info_type[0][0];
                    } else {
                        info_type = data_info_type[0];
                    }
                } else if (j.getObjType(data_info_type) == 'object' && data_info_type.startCell != null) {
                    if (data_info_type.data == null) {
                        return formula.undefined.v;
                    } else {
                        if (j.getObjType(data_info_type.data) == 'array') {
                            return formula.undefined.v;
                        }
                        info_type = data_info_type.data.v;
                        if (e.isRealNull(info_type)) {
                            return formula.undefined.v;
                        }
                    }
                } else {
                    info_type = data_info_type;
                }
                var data_reference = arguments[1];
                var reference;
                if (j.getObjType(data_reference) == 'object' && data_reference.startCell != null) {
                    reference = data_reference.startCell;
                } else {
                    return formula.undefined.v;
                }
                if ([
                        'address',
                        'col',
                        'color',
                        'contents',
                        'filename',
                        'format',
                        'parentheses',
                        'prefix',
                        'protect',
                        'row',
                        'type',
                        'width'
                    ].indexOf(info_type) == -1) {
                    return formula.undefined.v;
                }
                var file = c.getluckysheetfile()[c.getSheetIndex(Store.currentSheetIndex)];
                var cellrange = formula.getcellrange(reference);
                var row_index = cellrange.row[0];
                var col_index = cellrange.column[0];
                let luckysheetfile = c.getluckysheetfile();
                let index = c.getSheetIndex(Store.calculateSheetIndex);
                let sheetdata = luckysheetfile[index].data;
                let value;
                if (formula.execFunctionGlobalData != null && formula.execFunctionGlobalData[row_index + '_' + col_index + '_' + Store.calculateSheetIndex] != null) {
                    value = formula.execFunctionGlobalData[row_index + '_' + col_index + '_' + Store.calculateSheetIndex].v;
                } else if (sheetdata[row_index][col_index] != null && sheetdata[row_index][col_index].v != null && sheetdata[row_index][col_index].v != '') {
                    value = sheetdata[row_index][col_index];
                    if (value instanceof Object) {
                        value = value.v;
                    }
                } else {
                    value = 0;
                }
                switch (info_type) {
                case 'address':
                    return reference;
                    break;
                case 'col':
                    return col_index + 1;
                    break;
                case 'color':
                    return 0;
                    break;
                case 'contents':
                    return value;
                    break;
                case 'filename':
                    return file.name;
                    break;
                case 'format':
                    if (sheetdata[row_index][col_index] == null || sheetdata[row_index][col_index].ct == null) {
                        return 'G';
                    }
                    return sheetdata[row_index][col_index].ct.fa;
                    break;
                case 'parentheses':
                    if (sheetdata[row_index][col_index] == null || sheetdata[row_index][col_index].v == null || sheetdata[row_index][col_index].v == '') {
                        return 0;
                    }
                    if (sheetdata[row_index][col_index].v > 0) {
                        return 1;
                    } else {
                        return 0;
                    }
                    break;
                case 'prefix':
                    if (value == 0) {
                        return '';
                    }
                    if (sheetdata[row_index][col_index].ht == 0) {
                        return '^';
                    } else if (sheetdata[row_index][col_index].ht == 1) {
                        return "'";
                    } else if (sheetdata[row_index][col_index].ht == 2) {
                        return '"';
                    } else {
                        return '';
                    }
                    break;
                case 'protect':
                    return 0;
                    break;
                case 'row':
                    return row_index + 1;
                    break;
                case 'type':
                    if (value == 0) {
                        return 'b';
                    }
                    return 'l';
                    break;
                case 'width':
                    var cfg = file.config;
                    if (cfg['columnlen'] != null && col_index in cfg['columnlen']) {
                        return cfg['columnlen'][col_index];
                    }
                    return Store.defaultcollen;
                    break;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'NA': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                return formula.undefined.na;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ERROR_TYPE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_error_val = arguments[0];
                var error_val;
                if (j.getObjType(data_error_val) == 'array') {
                    if (j.getObjType(data_error_val[0]) == 'array') {
                        if (!func_methods.isDyadicArr(data_error_val)) {
                            return formula.undefined.v;
                        }
                        error_val = data_error_val[0][0];
                    } else {
                        error_val = data_error_val[0];
                    }
                } else if (j.getObjType(data_error_val) == 'object' && data_error_val.startCell != null) {
                    if (data_error_val.data == null) {
                        return formula.undefined.na;
                    }
                    if (j.getObjType(data_error_val.data) == 'array') {
                        error_val = data_error_val.data[0][0];
                        if (error_val == null || e.isRealNull(error_val.v)) {
                            return formula.undefined.na;
                        }
                        error_val = error_val.v;
                    } else {
                        if (e.isRealNull(data_error_val.data.v)) {
                            return formula.undefined.na;
                        }
                        error_val = data_error_val.data.v;
                    }
                } else {
                    error_val = data_error_val;
                }
                var error_obj = {
                    '#NULL!': 1,
                    '#DIV/0!': 2,
                    '#VALUE!': 3,
                    '#REF!': 4,
                    '#NAME?': 5,
                    '#NUM!': 6,
                    '#N/A': 7,
                    '#GETTING_DATA': 8
                };
                if (error_val in error_obj) {
                    return error_obj[error_val];
                } else {
                    return formula.undefined.na;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ISBLANK': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_error_val = arguments[0];
                var error_val;
                if (j.getObjType(data_error_val) == 'object' && data_error_val.startCell != null) {
                    if (data_error_val.data == null) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ISERR': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_value = arguments[0];
                var value;
                if (j.getObjType(data_value) == 'array') {
                    if (j.getObjType(data_value[0]) == 'array') {
                        if (!func_methods.isDyadicArr(data_value)) {
                            return formula.undefined.v;
                        }
                        value = data_value[0][0];
                    } else {
                        value = data_value[0];
                    }
                } else if (j.getObjType(data_value) == 'object' && data_value.startCell != null) {
                    if (j.getObjType(data_value.data) == 'array') {
                        return true;
                    }
                    if (data_value.data == null || e.isRealNull(data_value.data.v)) {
                        return false;
                    }
                    value = data_value.data.v;
                } else {
                    value = data_value;
                }
                if ([
                        '#VALUE!',
                        '#REF!',
                        '#DIV/0!',
                        '#NUM!',
                        '#NAME?',
                        '#NULL!'
                    ].indexOf(value) > -1) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ISERROR': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_value = arguments[0];
                var value;
                if (j.getObjType(data_value) == 'array') {
                    if (j.getObjType(data_value[0]) == 'array') {
                        if (!func_methods.isDyadicArr(data_value)) {
                            return formula.undefined.v;
                        }
                        value = data_value[0][0];
                    } else {
                        value = data_value[0];
                    }
                } else if (j.getObjType(data_value) == 'object' && data_value.startCell != null) {
                    if (j.getObjType(data_value.data) == 'array') {
                        return true;
                    }
                    if (data_value.data == null || e.isRealNull(data_value.data.v)) {
                        return false;
                    }
                    value = data_value.data.v;
                } else {
                    value = data_value;
                }
                if ([
                        '#N/A',
                        '#VALUE!',
                        '#REF!',
                        '#DIV/0!',
                        '#NUM!',
                        '#NAME?',
                        '#NULL!'
                    ].indexOf(value) > -1) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ISLOGICAL': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_value = arguments[0];
                var value;
                if (j.getObjType(data_value) == 'array') {
                    if (j.getObjType(data_value[0]) == 'array') {
                        if (!func_methods.isDyadicArr(data_value)) {
                            return formula.undefined.v;
                        }
                        value = data_value[0][0];
                    } else {
                        value = data_value[0];
                    }
                } else if (j.getObjType(data_value) == 'object' && data_value.startCell != null) {
                    if (j.getObjType(data_value.data) == 'array') {
                        return false;
                    }
                    if (data_value.data == null || e.isRealNull(data_value.data.v)) {
                        return false;
                    }
                    value = data_value.data.v;
                } else {
                    value = data_value;
                }
                if (value.toString().toLowerCase() == 'true' || value.toString().toLowerCase() == 'false') {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ISNA': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_value = arguments[0];
                var value;
                if (j.getObjType(data_value) == 'array') {
                    if (j.getObjType(data_value[0]) == 'array') {
                        if (!func_methods.isDyadicArr(data_value)) {
                            return formula.undefined.v;
                        }
                        value = data_value[0][0];
                    } else {
                        value = data_value[0];
                    }
                } else if (j.getObjType(data_value) == 'object' && data_value.startCell != null) {
                    if (j.getObjType(data_value.data) == 'array') {
                        return false;
                    }
                    if (data_value.data == null || e.isRealNull(data_value.data.v)) {
                        return false;
                    }
                    value = data_value.data.v;
                } else {
                    value = data_value;
                }
                if (value.toString() == '#N/A') {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ISNONTEXT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_value = arguments[0];
                var value;
                if (j.getObjType(data_value) == 'array') {
                    if (j.getObjType(data_value[0]) == 'array') {
                        if (!func_methods.isDyadicArr(data_value)) {
                            return formula.undefined.v;
                        }
                        value = data_value[0][0];
                    } else {
                        value = data_value[0];
                    }
                } else if (j.getObjType(data_value) == 'object' && data_value.startCell != null) {
                    if (j.getObjType(data_value.data) == 'array') {
                        return true;
                    }
                    if (data_value.data == null || e.isRealNull(data_value.data.v)) {
                        return true;
                    }
                    value = data_value.data.v;
                } else {
                    value = data_value;
                }
                if ([
                        '#N/A',
                        '#VALUE!',
                        '#REF!',
                        '#DIV/0!',
                        '#NUM!',
                        '#NAME?',
                        '#NULL!'
                    ].indexOf(value) > -1) {
                    return true;
                } else if (value.toString().toLowerCase() == 'true' || value.toString().toLowerCase() == 'false') {
                    return true;
                } else if (e.isRealNum(value)) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ISNUMBER': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_value = arguments[0];
                var value;
                if (j.getObjType(data_value) == 'array') {
                    if (j.getObjType(data_value[0]) == 'array') {
                        if (!func_methods.isDyadicArr(data_value)) {
                            return formula.undefined.v;
                        }
                        value = data_value[0][0];
                    } else {
                        value = data_value[0];
                    }
                } else if (j.getObjType(data_value) == 'object' && data_value.startCell != null) {
                    if (j.getObjType(data_value.data) == 'array') {
                        return false;
                    }
                    if (data_value.data == null || e.isRealNull(data_value.data.v)) {
                        return false;
                    }
                    value = data_value.data.v;
                } else {
                    value = data_value;
                }
                if (e.isRealNum(value)) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ISREF': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                if (j.getObjType(arguments[0]) == 'object' && arguments[0].startCell != null) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'ISTEXT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_value = arguments[0];
                var value;
                if (j.getObjType(data_value) == 'array') {
                    if (j.getObjType(data_value[0]) == 'array') {
                        if (!func_methods.isDyadicArr(data_value)) {
                            return formula.undefined.v;
                        }
                        value = data_value[0][0];
                    } else {
                        value = data_value[0];
                    }
                } else if (j.getObjType(data_value) == 'object' && data_value.startCell != null) {
                    if (j.getObjType(data_value.data) == 'array') {
                        return false;
                    }
                    if (data_value.data == null || e.isRealNull(data_value.data.v)) {
                        return false;
                    }
                    value = data_value.data.v;
                } else {
                    value = data_value;
                }
                if ([
                        '#N/A',
                        '#VALUE!',
                        '#REF!',
                        '#DIV/0!',
                        '#NUM!',
                        '#NAME?',
                        '#NULL!'
                    ].indexOf(value) > -1) {
                    return false;
                } else if (value.toString().toLowerCase() == 'true' || value.toString().toLowerCase() == 'false') {
                    return false;
                } else if (e.isRealNum(value)) {
                    return false;
                } else {
                    return true;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TYPE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_value = arguments[0];
                var value;
                if (j.getObjType(data_value) == 'array') {
                    return 64;
                } else if (j.getObjType(data_value) == 'object' && data_value.startCell != null) {
                    if (j.getObjType(data_value.data) == 'array') {
                        return 16;
                    }
                    if (data_value.data == null || e.isRealNull(data_value.data.v)) {
                        return 1;
                    }
                    value = data_value.data.v;
                } else {
                    value = data_value;
                }
                if ([
                        '#N/A',
                        '#VALUE!',
                        '#REF!',
                        '#DIV/0!',
                        '#NUM!',
                        '#NAME?',
                        '#NULL!'
                    ].indexOf(value) > -1) {
                    return 16;
                } else if (value.toString().toLowerCase() == 'true' || value.toString().toLowerCase() == 'false') {
                    return 4;
                } else if (e.isRealNum(value)) {
                    return 1;
                } else {
                    return 2;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'N': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_value = arguments[0];
                var value;
                if (j.getObjType(data_value) == 'array') {
                    if (j.getObjType(data_value[0]) == 'array') {
                        if (!func_methods.isDyadicArr(data_value)) {
                            return formula.undefined.v;
                        }
                        value = data_value[0][0];
                    } else {
                        value = data_value[0];
                    }
                } else if (j.getObjType(data_value) == 'object' && data_value.startCell != null) {
                    if (j.getObjType(data_value.data) == 'array') {
                        value = data_value.data[0][0];
                        if (value == null || e.isRealNull(value.v)) {
                            return 0;
                        }
                        value = value.v;
                    } else {
                        if (data_value.data == null || e.isRealNull(data_value.data.v)) {
                            return 0;
                        }
                        value = data_value.data.v;
                    }
                } else {
                    value = data_value;
                }
                if ([
                        '#N/A',
                        '#VALUE!',
                        '#REF!',
                        '#DIV/0!',
                        '#NUM!',
                        '#NAME?',
                        '#NULL!'
                    ].indexOf(value) > -1) {
                    return value;
                } else if (value.toString().toLowerCase() == 'true' || value.toString().toLowerCase() == 'false') {
                    if (value.toString().toLowerCase() == 'true') {
                        return 1;
                    } else {
                        return 0;
                    }
                } else if (e.isRealNum(value)) {
                    return parseFloat(value);
                } else {
                    return 0;
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TO_DATE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(value)) {
                    return value;
                }
                if (!e.isRealNum(value)) {
                    return formula.undefined.v;
                }
                value = parseFloat(value);
                return g.update('yyyy-mm-dd', value);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TO_PURE_NUMBER': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(value)) {
                    return value;
                }
                if (dayjs(value).isValid()) {
                    return g.genarate(value)[2];
                } else {
                    return numeral(value).value() == null ? value : numeral(value).value();
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TO_TEXT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value = func_methods.getFirstValue(arguments[0], 'text');
                if (e.valueIsError(value)) {
                    return value;
                }
                return g.update('@', value);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TO_DOLLARS': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(value)) {
                    return value;
                }
                if (!e.isRealNum(value)) {
                    return formula.undefined.v;
                }
                value = parseFloat(value);
                return g.update('$ 0.00', value);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TO_PERCENT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var value = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(value)) {
                    return value;
                }
                if (!e.isRealNum(value)) {
                    return formula.undefined.v;
                }
                value = parseFloat(value);
                return g.update('0%', value);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DGET': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_database = arguments[0];
                var database = [];
                if (j.getObjType(data_database) == 'object' && data_database.startCell != null) {
                    if (data_database.data == null) {
                        return formula.undefined.v;
                    }
                    database = func_methods.getCellDataDyadicArr(data_database, 'text');
                } else {
                    return formula.undefined.v;
                }
                var field = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(field)) {
                    return field;
                }
                if (e.isRealNull(field)) {
                    return formula.undefined.v;
                }
                var data_criteria = arguments[2];
                var criteria = [];
                if (j.getObjType(data_criteria) == 'object' && data_criteria.startCell != null) {
                    if (data_criteria.data == null) {
                        return formula.undefined.v;
                    }
                    criteria = func_methods.getCellDataDyadicArr(data_criteria, 'text');
                } else {
                    return formula.undefined.v;
                }
                if (!e.isRealNum(field) && j.getObjType(field) !== 'string') {
                    return formula.undefined.v;
                }
                var resultIndexes = func_methods.findResultIndex(database, criteria);
                var targetFields = [];
                if (j.getObjType(field) === 'string') {
                    var index = func_methods.findField(database, field);
                    targetFields = func_methods.rest(database[index]);
                } else {
                    targetFields = func_methods.rest(database[field]);
                }
                if (resultIndexes.length === 0) {
                    return formula.undefined.v;
                }
                if (resultIndexes.length > 1) {
                    return formula.undefined.nm;
                }
                return targetFields[resultIndexes[0]];
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DMAX': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_database = arguments[0];
                var database = [];
                if (j.getObjType(data_database) == 'object' && data_database.startCell != null) {
                    if (data_database.data == null) {
                        return formula.undefined.v;
                    }
                    database = func_methods.getCellDataDyadicArr(data_database, 'text');
                } else {
                    return formula.undefined.v;
                }
                var field = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(field)) {
                    return field;
                }
                if (e.isRealNull(field)) {
                    return formula.undefined.v;
                }
                var data_criteria = arguments[2];
                var criteria = [];
                if (j.getObjType(data_criteria) == 'object' && data_criteria.startCell != null) {
                    if (data_criteria.data == null) {
                        return formula.undefined.v;
                    }
                    criteria = func_methods.getCellDataDyadicArr(data_criteria, 'text');
                } else {
                    return formula.undefined.v;
                }
                if (!e.isRealNum(field) && j.getObjType(field) !== 'string') {
                    return formula.undefined.v;
                }
                var resultIndexes = func_methods.findResultIndex(database, criteria);
                var targetFields = [];
                if (j.getObjType(field) === 'string') {
                    var index = func_methods.findField(database, field);
                    targetFields = func_methods.rest(database[index]);
                } else {
                    targetFields = func_methods.rest(database[field]);
                }
                var maxValue = targetFields[resultIndexes[0]];
                for (var i = 1; i < resultIndexes.length; i++) {
                    if (maxValue < targetFields[resultIndexes[i]]) {
                        maxValue = targetFields[resultIndexes[i]];
                    }
                }
                return maxValue;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DMIN': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_database = arguments[0];
                var database = [];
                if (j.getObjType(data_database) == 'object' && data_database.startCell != null) {
                    if (data_database.data == null) {
                        return formula.undefined.v;
                    }
                    database = func_methods.getCellDataDyadicArr(data_database, 'text');
                } else {
                    return formula.undefined.v;
                }
                var field = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(field)) {
                    return field;
                }
                if (e.isRealNull(field)) {
                    return formula.undefined.v;
                }
                var data_criteria = arguments[2];
                var criteria = [];
                if (j.getObjType(data_criteria) == 'object' && data_criteria.startCell != null) {
                    if (data_criteria.data == null) {
                        return formula.undefined.v;
                    }
                    criteria = func_methods.getCellDataDyadicArr(data_criteria, 'text');
                } else {
                    return formula.undefined.v;
                }
                if (!e.isRealNum(field) && j.getObjType(field) !== 'string') {
                    return formula.undefined.v;
                }
                var resultIndexes = findResultIndex(database, criteria);
                var targetFields = [];
                if (j.getObjType(field) === 'string') {
                    var index = findField(database, field);
                    targetFields = rest(database[index]);
                } else {
                    targetFields = rest(database[field]);
                }
                var minValue = targetFields[resultIndexes[0]];
                for (var i = 1; i < resultIndexes.length; i++) {
                    if (minValue > targetFields[resultIndexes[i]]) {
                        minValue = targetFields[resultIndexes[i]];
                    }
                }
                return minValue;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DAVERAGE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_database = arguments[0];
                var database = [];
                if (j.getObjType(data_database) == 'object' && data_database.startCell != null) {
                    if (data_database.data == null) {
                        return formula.undefined.v;
                    }
                    database = func_methods.getCellDataDyadicArr(data_database, 'text');
                } else {
                    return formula.undefined.v;
                }
                var field = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(field)) {
                    return field;
                }
                if (e.isRealNull(field)) {
                    return formula.undefined.v;
                }
                var data_criteria = arguments[2];
                var criteria = [];
                if (j.getObjType(data_criteria) == 'object' && data_criteria.startCell != null) {
                    if (data_criteria.data == null) {
                        return formula.undefined.v;
                    }
                    criteria = func_methods.getCellDataDyadicArr(data_criteria, 'text');
                } else {
                    return formula.undefined.v;
                }
                if (!e.isRealNum(field) && j.getObjType(field) !== 'string') {
                    return formula.undefined.v;
                }
                var resultIndexes = func_methods.findResultIndex(database, criteria);
                var targetFields = [];
                if (j.getObjType(field) === 'string') {
                    var index = func_methods.findField(database, field);
                    targetFields = func_methods.rest(database[index]);
                } else {
                    targetFields = func_methods.rest(database[field]);
                }
                var sum = 0;
                for (var i = 0; i < resultIndexes.length; i++) {
                    sum += targetFields[resultIndexes[i]];
                }
                return resultIndexes.length === 0 ? formula.undefined.d : sum / resultIndexes.length;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DCOUNT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_database = arguments[0];
                var database = [];
                if (j.getObjType(data_database) == 'object' && data_database.startCell != null) {
                    if (data_database.data == null) {
                        return formula.undefined.v;
                    }
                    database = func_methods.getCellDataDyadicArr(data_database, 'text');
                } else {
                    return formula.undefined.v;
                }
                var field = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(field)) {
                    return field;
                }
                if (e.isRealNull(field)) {
                    return formula.undefined.v;
                }
                var data_criteria = arguments[2];
                var criteria = [];
                if (j.getObjType(data_criteria) == 'object' && data_criteria.startCell != null) {
                    if (data_criteria.data == null) {
                        return formula.undefined.v;
                    }
                    criteria = func_methods.getCellDataDyadicArr(data_criteria, 'text');
                } else {
                    return formula.undefined.v;
                }
                if (!e.isRealNum(field) && j.getObjType(field) !== 'string') {
                    return formula.undefined.v;
                }
                var resultIndexes = func_methods.findResultIndex(database, criteria);
                var targetFields = [];
                if (j.getObjType(field) === 'string') {
                    var index = func_methods.findField(database, field);
                    targetFields = func_methods.rest(database[index]);
                } else {
                    targetFields = func_methods.rest(database[field]);
                }
                var targetValues = [];
                for (var i = 0; i < resultIndexes.length; i++) {
                    targetValues[i] = targetFields[resultIndexes[i]];
                }
                return window.luckysheet_function.COUNT.f.apply(window.luckysheet_function.COUNT, targetValues);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DCOUNTA': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_database = arguments[0];
                var database = [];
                if (j.getObjType(data_database) == 'object' && data_database.startCell != null) {
                    if (data_database.data == null) {
                        return formula.undefined.v;
                    }
                    database = func_methods.getCellDataDyadicArr(data_database, 'text');
                } else {
                    return formula.undefined.v;
                }
                var field = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(field)) {
                    return field;
                }
                if (e.isRealNull(field)) {
                    return formula.undefined.v;
                }
                var data_criteria = arguments[2];
                var criteria = [];
                if (j.getObjType(data_criteria) == 'object' && data_criteria.startCell != null) {
                    if (data_criteria.data == null) {
                        return formula.undefined.v;
                    }
                    criteria = func_methods.getCellDataDyadicArr(data_criteria, 'text');
                } else {
                    return formula.undefined.v;
                }
                if (!e.isRealNum(field) && j.getObjType(field) !== 'string') {
                    return formula.undefined.v;
                }
                var resultIndexes = func_methods.findResultIndex(database, criteria);
                var targetFields = [];
                if (j.getObjType(field) === 'string') {
                    var index = func_methods.findField(database, field);
                    targetFields = func_methods.rest(database[index]);
                } else {
                    targetFields = func_methods.rest(database[field]);
                }
                var targetValues = [];
                for (var i = 0; i < resultIndexes.length; i++) {
                    targetValues[i] = targetFields[resultIndexes[i]];
                }
                return window.luckysheet_function.COUNTA.f.apply(window.luckysheet_function.COUNTA, targetValues);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DPRODUCT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_database = arguments[0];
                var database = [];
                if (j.getObjType(data_database) == 'object' && data_database.startCell != null) {
                    if (data_database.data == null) {
                        return formula.undefined.v;
                    }
                    database = func_methods.getCellDataDyadicArr(data_database, 'text');
                } else {
                    return formula.undefined.v;
                }
                var field = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(field)) {
                    return field;
                }
                if (e.isRealNull(field)) {
                    return formula.undefined.v;
                }
                var data_criteria = arguments[2];
                var criteria = [];
                if (j.getObjType(data_criteria) == 'object' && data_criteria.startCell != null) {
                    if (data_criteria.data == null) {
                        return formula.undefined.v;
                    }
                    criteria = func_methods.getCellDataDyadicArr(data_criteria, 'text');
                } else {
                    return formula.undefined.v;
                }
                if (!e.isRealNum(field) && j.getObjType(field) !== 'string') {
                    return formula.undefined.v;
                }
                var resultIndexes = func_methods.findResultIndex(database, criteria);
                var targetFields = [];
                if (j.getObjType(field) === 'string') {
                    var index = func_methods.findField(database, field);
                    targetFields = func_methods.rest(database[index]);
                } else {
                    targetFields = func_methods.rest(database[field]);
                }
                var targetValues = [];
                for (var i = 0; i < resultIndexes.length; i++) {
                    targetValues[i] = targetFields[resultIndexes[i]];
                }
                targetValues = func_methods.compact(targetValues);
                var result = 1;
                for (i = 0; i < targetValues.length; i++) {
                    result *= targetValues[i];
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DSTDEV': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_database = arguments[0];
                var database = [];
                if (j.getObjType(data_database) == 'object' && data_database.startCell != null) {
                    if (data_database.data == null) {
                        return formula.undefined.v;
                    }
                    database = func_methods.getCellDataDyadicArr(data_database, 'text');
                } else {
                    return formula.undefined.v;
                }
                var field = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(field)) {
                    return field;
                }
                if (e.isRealNull(field)) {
                    return formula.undefined.v;
                }
                var data_criteria = arguments[2];
                var criteria = [];
                if (j.getObjType(data_criteria) == 'object' && data_criteria.startCell != null) {
                    if (data_criteria.data == null) {
                        return formula.undefined.v;
                    }
                    criteria = func_methods.getCellDataDyadicArr(data_criteria, 'text');
                } else {
                    return formula.undefined.v;
                }
                if (!e.isRealNum(field) && j.getObjType(field) !== 'string') {
                    return formula.undefined.v;
                }
                var resultIndexes = func_methods.findResultIndex(database, criteria);
                var targetFields = [];
                if (j.getObjType(field) === 'string') {
                    var index = func_methods.findField(database, field);
                    targetFields = func_methods.rest(database[index]);
                } else {
                    targetFields = func_methods.rest(database[field]);
                }
                var targetValues = [];
                for (var i = 0; i < resultIndexes.length; i++) {
                    targetValues[i] = targetFields[resultIndexes[i]];
                }
                targetValues = func_methods.compact(targetValues);
                return window.luckysheet_function.STDEVA.f.apply(window.luckysheet_function.STDEVA, targetValues);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DSTDEVP': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_database = arguments[0];
                var database = [];
                if (j.getObjType(data_database) == 'object' && data_database.startCell != null) {
                    if (data_database.data == null) {
                        return formula.undefined.v;
                    }
                    database = func_methods.getCellDataDyadicArr(data_database, 'text');
                } else {
                    return formula.undefined.v;
                }
                var field = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(field)) {
                    return field;
                }
                if (e.isRealNull(field)) {
                    return formula.undefined.v;
                }
                var data_criteria = arguments[2];
                var criteria = [];
                if (j.getObjType(data_criteria) == 'object' && data_criteria.startCell != null) {
                    if (data_criteria.data == null) {
                        return formula.undefined.v;
                    }
                    criteria = func_methods.getCellDataDyadicArr(data_criteria, 'text');
                } else {
                    return formula.undefined.v;
                }
                if (!e.isRealNum(field) && j.getObjType(field) !== 'string') {
                    return formula.undefined.v;
                }
                var resultIndexes = func_methods.findResultIndex(database, criteria);
                var targetFields = [];
                if (j.getObjType(field) === 'string') {
                    var index = func_methods.findField(database, field);
                    targetFields = func_methods.rest(database[index]);
                } else {
                    targetFields = func_methods.rest(database[field]);
                }
                var targetValues = [];
                for (var i = 0; i < resultIndexes.length; i++) {
                    targetValues[i] = targetFields[resultIndexes[i]];
                }
                targetValues = func_methods.compact(targetValues);
                return window.luckysheet_function.STDEVP.f.apply(window.luckysheet_function.STDEVP, targetValues);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DSUM': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_database = arguments[0];
                var database = [];
                if (j.getObjType(data_database) == 'object' && data_database.startCell != null) {
                    if (data_database.data == null) {
                        return formula.undefined.v;
                    }
                    database = func_methods.getCellDataDyadicArr(data_database, 'text');
                } else {
                    return formula.undefined.v;
                }
                var field = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(field)) {
                    return field;
                }
                if (e.isRealNull(field)) {
                    return formula.undefined.v;
                }
                var data_criteria = arguments[2];
                var criteria = [];
                if (j.getObjType(data_criteria) == 'object' && data_criteria.startCell != null) {
                    if (data_criteria.data == null) {
                        return formula.undefined.v;
                    }
                    criteria = func_methods.getCellDataDyadicArr(data_criteria, 'text');
                } else {
                    return formula.undefined.v;
                }
                if (!e.isRealNum(field) && j.getObjType(field) !== 'string') {
                    return formula.undefined.v;
                }
                var resultIndexes = func_methods.findResultIndex(database, criteria);
                var targetFields = [];
                if (j.getObjType(field) === 'string') {
                    var index = func_methods.findField(database, field);
                    targetFields = func_methods.rest(database[index]);
                } else {
                    targetFields = func_methods.rest(database[field]);
                }
                var targetValues = [];
                for (var i = 0; i < resultIndexes.length; i++) {
                    targetValues[i] = targetFields[resultIndexes[i]];
                }
                targetValues = func_methods.compact(targetValues);
                var result = 0;
                for (i = 0; i < targetValues.length; i++) {
                    result += targetValues[i];
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DVAR': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_database = arguments[0];
                var database = [];
                if (j.getObjType(data_database) == 'object' && data_database.startCell != null) {
                    if (data_database.data == null) {
                        return formula.undefined.v;
                    }
                    database = func_methods.getCellDataDyadicArr(data_database, 'text');
                } else {
                    return formula.undefined.v;
                }
                var field = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(field)) {
                    return field;
                }
                if (e.isRealNull(field)) {
                    return formula.undefined.v;
                }
                var data_criteria = arguments[2];
                var criteria = [];
                if (j.getObjType(data_criteria) == 'object' && data_criteria.startCell != null) {
                    if (data_criteria.data == null) {
                        return formula.undefined.v;
                    }
                    criteria = func_methods.getCellDataDyadicArr(data_criteria, 'text');
                } else {
                    return formula.undefined.v;
                }
                if (!e.isRealNum(field) && j.getObjType(field) !== 'string') {
                    return formula.undefined.v;
                }
                var resultIndexes = func_methods.findResultIndex(database, criteria);
                var targetFields = [];
                if (j.getObjType(field) === 'string') {
                    var index = func_methods.findField(database, field);
                    targetFields = func_methods.rest(database[index]);
                } else {
                    targetFields = func_methods.rest(database[field]);
                }
                var targetValues = [];
                for (var i = 0; i < resultIndexes.length; i++) {
                    targetValues[i] = targetFields[resultIndexes[i]];
                }
                targetValues = func_methods.compact(targetValues);
                return window.luckysheet_function.VAR_S.f.apply(window.luckysheet_function.VAR_S, targetValues);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DVARP': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_database = arguments[0];
                var database = [];
                if (j.getObjType(data_database) == 'object' && data_database.startCell != null) {
                    if (data_database.data == null) {
                        return formula.undefined.v;
                    }
                    database = func_methods.getCellDataDyadicArr(data_database, 'text');
                } else {
                    return formula.undefined.v;
                }
                var field = func_methods.getFirstValue(arguments[1], 'text');
                if (e.valueIsError(field)) {
                    return field;
                }
                if (e.isRealNull(field)) {
                    return formula.undefined.v;
                }
                var data_criteria = arguments[2];
                var criteria = [];
                if (j.getObjType(data_criteria) == 'object' && data_criteria.startCell != null) {
                    if (data_criteria.data == null) {
                        return formula.undefined.v;
                    }
                    criteria = func_methods.getCellDataDyadicArr(data_criteria, 'text');
                } else {
                    return formula.undefined.v;
                }
                if (!e.isRealNum(field) && j.getObjType(field) !== 'string') {
                    return formula.undefined.v;
                }
                var resultIndexes = func_methods.findResultIndex(database, criteria);
                var targetFields = [];
                if (j.getObjType(field) === 'string') {
                    var index = func_methods.findField(database, field);
                    targetFields = func_methods.rest(database[index]);
                } else {
                    targetFields = func_methods.rest(database[field]);
                }
                var targetValues = [];
                for (var i = 0; i < resultIndexes.length; i++) {
                    targetValues[i] = targetFields[resultIndexes[i]];
                }
                targetValues = func_methods.compact(targetValues);
                return window.luckysheet_function.VAR_P.f.apply(window.luckysheet_function.VAR_P, targetValues);
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'LINESPLINES': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var colorList = formula.colorList;
                var rangeValue = arguments[0];
                var lineColor = arguments[1];
                var lineWidth = arguments[2];
                var normalValue = arguments[3];
                var normalColor = arguments[4];
                var maxSpot = arguments[5];
                var minSpot = arguments[6];
                var spotRadius = arguments[7];
                let luckysheetfile = c.getluckysheetfile();
                let index = c.getSheetIndex(Store.calculateSheetIndex);
                let sheetdata = luckysheetfile[index].data;
                var dataformat = formula.readCellDataToOneArray(rangeValue);
                var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
                var width = cellSize[0];
                var height = cellSize[1];
                var sparksetting = {};
                if (lineWidth == null) {
                    lineWidth = 1;
                }
                sparksetting['lineWidth'] = lineWidth;
                sparksetting['offsetY'] = lineWidth + 1;
                sparksetting.height = height - (lineWidth + 1);
                sparksetting.width = width;
                var sparkColorSetting = function (attr, value) {
                    if (!!value) {
                        if (typeof value == 'number') {
                            if (value > 19) {
                                value = value % 20;
                            }
                            value = colorList[value];
                        }
                        sparksetting[attr] = value;
                    }
                };
                if (lineColor == null) {
                    lineColor = '#2ec7c9';
                }
                sparkColorSetting('lineColor', lineColor);
                sparksetting['fillColor'] = 0;
                if (!!normalValue) {
                    if (typeof normalValue == 'string') {
                        normalValue = normalValue.toLowerCase();
                        var nv = null;
                        if (normalValue == 'min') {
                            nv = window.luckysheet_function.MIN.f({ 'data': dataformat });
                        } else if (normalValue == 'max') {
                            nv = window.luckysheet_function.MAX.f({ 'data': dataformat });
                        } else if (normalValue == 'avg' || normalValue == 'mean') {
                            nv = window.luckysheet_function.AVERAGE.f({ 'data': dataformat });
                        } else if (normalValue == 'median') {
                            nv = window.luckysheet_function.MEDIAN.f({ 'data': dataformat });
                        }
                        if (!!nv) {
                            sparksetting['normalRangeMin'] = nv;
                            sparksetting['normalRangeMax'] = nv;
                        }
                    } else {
                        sparksetting['normalRangeMin'] = normalValue;
                        sparksetting['normalRangeMax'] = normalValue;
                    }
                }
                if (normalColor == null) {
                    normalColor = '#000';
                }
                sparkColorSetting('normalRangeColor', normalColor);
                sparkColorSetting('maxSpotColor', maxSpot);
                sparkColorSetting('minSpotColor', minSpot);
                if (spotRadius == null) {
                    spotRadius = '1.5';
                }
                sparksetting['spotRadius'] = spotRadius;
                var temp1 = luckysheetSparkline.init(dataformat, sparksetting);
                return temp1;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'AREASPLINES': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var colorList = formula.colorList;
                var rangeValue = arguments[0];
                var lineColor = arguments[1];
                var fillColor = arguments[2];
                var lineWidth = arguments[3];
                var normalValue = arguments[4];
                var normalColor = arguments[5];
                var dataformat = formula.readCellDataToOneArray(rangeValue);
                let luckysheetfile = c.getluckysheetfile();
                let index = c.getSheetIndex(Store.calculateSheetIndex);
                let sheetdata = luckysheetfile[index].data;
                var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
                var width = cellSize[0];
                var height = cellSize[1];
                var sparksetting = {};
                if (lineWidth == null) {
                    lineWidth = 1;
                }
                sparksetting['lineWidth'] = lineWidth;
                sparksetting['offsetY'] = lineWidth + 1;
                sparksetting.height = height - (lineWidth + 1);
                sparksetting.width = width;
                var sparkColorSetting = function (attr, value) {
                    if (!!value) {
                        if (typeof value == 'number') {
                            if (value > 19) {
                                value = value % 20;
                            }
                            value = colorList[value];
                        }
                        sparksetting[attr] = value;
                    }
                };
                if (lineColor == null) {
                    lineColor = '#2ec7c9';
                }
                sparkColorSetting('lineColor', lineColor);
                sparkColorSetting('fillColor', fillColor);
                if (lineWidth == null) {
                    lineWidth = '1';
                }
                sparksetting['lineWidth'] = lineWidth;
                if (!!normalValue) {
                    if (typeof normalValue == 'string') {
                        normalValue = normalValue.toLowerCase();
                        var nv = null;
                        if (normalValue == 'min') {
                            nv = window.luckysheet_function.MIN.f({ 'data': dataformat });
                        } else if (normalValue == 'max') {
                            nv = window.luckysheet_function.MAX.f({ 'data': dataformat });
                        } else if (normalValue == 'avg' || normalValue == 'mean') {
                            nv = window.luckysheet_function.AVERAGE.f({ 'data': dataformat });
                        } else if (normalValue == 'median') {
                            nv = window.luckysheet_function.MEDIAN.f({ 'data': dataformat });
                        }
                        if (!!nv) {
                            sparksetting['normalRangeMin'] = nv;
                            sparksetting['normalRangeMax'] = nv;
                        }
                    } else {
                        sparksetting['normalRangeMin'] = normalValue;
                        sparksetting['normalRangeMax'] = normalValue;
                    }
                }
                if (normalColor == null) {
                    normalColor = '#000';
                }
                sparkColorSetting('normalRangeColor', normalColor);
                var temp1 = luckysheetSparkline.init(dataformat, sparksetting);
                return temp1;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'COLUMNSPLINES': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var colorList = formula.colorList;
                var rangeValue = arguments[0];
                var dataformat = formula.readCellDataToOneArray(rangeValue);
                let luckysheetfile = c.getluckysheetfile();
                let index = c.getSheetIndex(Store.calculateSheetIndex);
                let sheetdata = luckysheetfile[index].data;
                var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
                var width = cellSize[0];
                var height = cellSize[1];
                var sparksetting = {};
                sparksetting.height = height;
                sparksetting.width = width;
                var sparkColorSetting = function (attr, value) {
                    if (!!value) {
                        if (typeof value == 'number') {
                            if (value > 19) {
                                value = value % 20;
                            }
                            value = colorList[value];
                        }
                        sparksetting[attr] = value;
                    }
                };
                var barSpacing = arguments[1];
                var barColor = arguments[2];
                var negBarColor = arguments[3];
                var chartRangeMax = arguments[4];
                sparksetting['type'] = 'column';
                if (barSpacing == null) {
                    barSpacing = '1';
                }
                sparksetting['barSpacing'] = barSpacing;
                if (barColor == null) {
                    barColor = '#fc5c5c';
                }
                sparkColorSetting('barColor', barColor);
                if (negBarColor == null) {
                    negBarColor = '#97b552';
                }
                sparkColorSetting('negBarColor', negBarColor);
                if (chartRangeMax == null || chartRangeMax === false || typeof chartRangeMax != 'number') {
                    sparksetting['chartRangeMax'] = undefined;
                } else {
                    sparksetting['chartRangeMax'] = chartRangeMax;
                }
                var colorLists = formula.sparklinesColorMap(arguments);
                if (!!colorLists) {
                    sparksetting['colorMap'] = colorLists;
                }
                var temp1 = luckysheetSparkline.init(dataformat, sparksetting);
                return temp1;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'STACKCOLUMNSPLINES': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var colorList = formula.colorList;
                var rangeValue = arguments[0];
                var dataformat = [];
                var data = [];
                if (rangeValue != null && rangeValue.data != null) {
                    data = rangeValue.data;
                }
                if (j.getObjType(data) == 'array') {
                    data = formula.getPureValueByData(data);
                } else if (j.getObjType(data) == 'object') {
                    data = data.v;
                    return [data];
                } else {
                    if (/\{.*?\}/.test(data)) {
                        data = data.replace(/\{/g, '[').replace(/\}/g, ']');
                    }
                    data = new Function('return ' + data)();
                }
                var stackconfig = arguments[1];
                var offsetY = data.length;
                if (stackconfig == null || !!stackconfig) {
                    for (var c = 0; c < data[0].length; c++) {
                        var colstr = '';
                        for (var r = 0; r < data.length; r++) {
                            colstr += data[r][c] + ':';
                        }
                        colstr = colstr.substr(0, colstr.length - 1);
                        dataformat.push(colstr);
                    }
                } else {
                    for (var r = 0; r < data.length; r++) {
                        var rowstr = '';
                        for (var c = 0; c < data[0].length; c++) {
                            rowstr += data[r][c] + ':';
                        }
                        rowstr = rowstr.substr(0, rowstr.length - 1);
                        dataformat.push(rowstr);
                    }
                    var offsetY = data[0].length;
                }
                let luckysheetfile = c.getluckysheetfile();
                let index = c.getSheetIndex(Store.calculateSheetIndex);
                let sheetdata = luckysheetfile[index].data;
                var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
                var width = cellSize[0];
                var height = cellSize[1];
                var sparksetting = {};
                sparksetting.height = height;
                sparksetting.width = width;
                var sparkColorSetting = function (attr, value) {
                    if (!!value) {
                        if (typeof value == 'number') {
                            if (value > 19) {
                                value = value % 20;
                            }
                            value = colorList[value];
                        }
                        sparksetting[attr] = value;
                    }
                };
                var barSpacing = arguments[2];
                var chartRangeMax = arguments[3];
                sparksetting['type'] = 'column';
                if (barSpacing == null) {
                    barSpacing = '1';
                }
                sparksetting['barSpacing'] = barSpacing;
                if (chartRangeMax == null || chartRangeMax === false || typeof chartRangeMax != 'number') {
                    sparksetting['chartRangeMax'] = undefined;
                } else {
                    sparksetting['chartRangeMax'] = chartRangeMax;
                }
                var colorLists = formula.sparklinesColorMap(arguments, 4);
                if (!!colorLists) {
                    sparksetting['colorMap'] = colorLists;
                }
                var temp1 = luckysheetSparkline.init(dataformat, sparksetting);
                return temp1;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'BARSPLINES': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var colorList = formula.colorList;
                var rangeValue = arguments[0];
                var dataformat = formula.readCellDataToOneArray(rangeValue);
                let luckysheetfile = c.getluckysheetfile();
                let index = c.getSheetIndex(Store.calculateSheetIndex);
                let sheetdata = luckysheetfile[index].data;
                var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
                var width = cellSize[0];
                var height = cellSize[1];
                var sparksetting = {};
                sparksetting.height = height;
                sparksetting.width = width;
                var sparkColorSetting = function (attr, value) {
                    if (!!value) {
                        if (typeof value == 'number') {
                            if (value > 19) {
                                value = value % 20;
                            }
                            value = colorList[value];
                        }
                        sparksetting[attr] = value;
                    }
                };
                var barSpacing = arguments[1];
                var barColor = arguments[2];
                var negBarColor = arguments[3];
                var chartRangeMax = arguments[4];
                sparksetting['type'] = 'bar';
                if (barSpacing == null) {
                    barSpacing = '1';
                }
                sparksetting['barSpacing'] = barSpacing;
                if (barColor == null) {
                    barColor = '#fc5c5c';
                }
                sparkColorSetting('barColor', barColor);
                if (negBarColor == null) {
                    negBarColor = '#97b552';
                }
                sparkColorSetting('negBarColor', negBarColor);
                if (chartRangeMax == null || chartRangeMax === false || typeof chartRangeMax != 'number') {
                    sparksetting['chartRangeMax'] = undefined;
                } else {
                    sparksetting['chartRangeMax'] = chartRangeMax;
                }
                var colorLists = formula.sparklinesColorMap(arguments);
                if (!!colorLists) {
                    sparksetting['colorMap'] = colorLists;
                }
                var temp1 = luckysheetSparkline.init(dataformat, sparksetting);
                return temp1;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'STACKBARSPLINES': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var colorList = formula.colorList;
                var rangeValue = arguments[0];
                var dataformat = [];
                var data = [];
                if (rangeValue != null && rangeValue.data != null) {
                    data = rangeValue.data;
                }
                if (j.getObjType(data) == 'array') {
                    data = formula.getPureValueByData(data);
                } else if (j.getObjType(data) == 'object') {
                    data = data.v;
                    return [data];
                } else {
                    if (/\{.*?\}/.test(data)) {
                        data = data.replace(/\{/g, '[').replace(/\}/g, ']');
                    }
                    data = new Function('return ' + data)();
                }
                var stackconfig = arguments[1];
                var offsetY = data.length;
                if (stackconfig == null || !!stackconfig) {
                    for (var c = 0; c < data[0].length; c++) {
                        var colstr = '';
                        for (var r = 0; r < data.length; r++) {
                            colstr += data[r][c] + ':';
                        }
                        colstr = colstr.substr(0, colstr.length - 1);
                        dataformat.push(colstr);
                    }
                } else {
                    for (var r = 0; r < data.length; r++) {
                        var rowstr = '';
                        for (var c = 0; c < data[0].length; c++) {
                            rowstr += data[r][c] + ':';
                        }
                        rowstr = rowstr.substr(0, rowstr.length - 1);
                        dataformat.push(rowstr);
                    }
                    var offsetY = data[0].length;
                }
                let luckysheetfile = c.getluckysheetfile();
                let index = c.getSheetIndex(Store.calculateSheetIndex);
                let sheetdata = luckysheetfile[index].data;
                var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
                var width = cellSize[0];
                var height = cellSize[1];
                var sparksetting = {};
                sparksetting.height = height;
                sparksetting.width = width;
                var sparkColorSetting = function (attr, value) {
                    if (!!value) {
                        if (typeof value == 'number') {
                            if (value > 19) {
                                value = value % 20;
                            }
                            value = colorList[value];
                        }
                        sparksetting[attr] = value;
                    }
                };
                var barSpacing = arguments[2];
                var chartRangeMax = arguments[3];
                sparksetting['type'] = 'bar';
                if (barSpacing == null) {
                    barSpacing = '1';
                }
                sparksetting['barSpacing'] = barSpacing;
                if (chartRangeMax == null || chartRangeMax === false || typeof chartRangeMax != 'number') {
                    sparksetting['chartRangeMax'] = undefined;
                } else {
                    sparksetting['chartRangeMax'] = chartRangeMax;
                }
                var colorLists = formula.sparklinesColorMap(arguments, 4);
                if (!!colorLists) {
                    sparksetting['colorMap'] = colorLists;
                }
                var temp1 = luckysheetSparkline.init(dataformat, sparksetting);
                return temp1;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'DISCRETESPLINES': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var colorList = formula.colorList;
                var rangeValue = arguments[0];
                var dataformat = formula.readCellDataToOneArray(rangeValue);
                let luckysheetfile = c.getluckysheetfile();
                let index = c.getSheetIndex(Store.calculateSheetIndex);
                let sheetdata = luckysheetfile[index].data;
                var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
                var width = cellSize[0];
                var height = cellSize[1];
                var sparksetting = {};
                sparksetting.height = height;
                sparksetting.width = width;
                var sparkColorSetting = function (attr, value) {
                    if (!!value) {
                        if (typeof value == 'number') {
                            if (value > 19) {
                                value = value % 20;
                            }
                            value = colorList[value];
                        }
                        sparksetting[attr] = value;
                    }
                };
                var thresholdValue = arguments[1];
                var barColor = arguments[2];
                var negBarColor = arguments[3];
                sparksetting['type'] = 'discrete';
                if (thresholdValue == null) {
                    thresholdValue = 0;
                }
                sparksetting['thresholdValue'] = thresholdValue;
                if (barColor == null) {
                    barColor = '#2ec7c9';
                }
                sparkColorSetting('lineColor', barColor);
                if (negBarColor == null) {
                    negBarColor = '#fc5c5c';
                }
                sparkColorSetting('thresholdColor', negBarColor);
                var temp1 = luckysheetSparkline.init(dataformat, sparksetting);
                return temp1;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'TRISTATESPLINES': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var colorList = formula.colorList;
                var rangeValue = arguments[0];
                var dataformat = formula.readCellDataToOneArray(rangeValue);
                let luckysheetfile = c.getluckysheetfile();
                let index = c.getSheetIndex(Store.calculateSheetIndex);
                let sheetdata = luckysheetfile[index].data;
                var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
                var width = cellSize[0];
                var height = cellSize[1];
                var sparksetting = {};
                sparksetting.height = height;
                sparksetting.width = width;
                var sparkColorSetting = function (attr, value) {
                    if (!!value) {
                        if (typeof value == 'number') {
                            if (value > 19) {
                                value = value % 20;
                            }
                            value = colorList[value];
                        }
                        sparksetting[attr] = value;
                    }
                };
                var barSpacing = arguments[1];
                var barColor = arguments[2];
                var negBarColor = arguments[3];
                var zeroBarColor = arguments[4];
                sparksetting['type'] = 'tristate';
                if (barSpacing == null) {
                    barSpacing = '1';
                }
                sparksetting['barSpacing'] = barSpacing;
                if (barColor == null) {
                    barColor = '#fc5c5c';
                }
                sparkColorSetting('barColor', barColor);
                if (negBarColor == null) {
                    negBarColor = '#97b552';
                }
                sparkColorSetting('negBarColor', negBarColor);
                if (zeroBarColor == null) {
                    zeroBarColor = '#999';
                }
                sparkColorSetting('zeroBarColor', zeroBarColor);
                var colorLists = formula.sparklinesColorMap(arguments);
                if (!!colorLists) {
                    sparksetting['colorMap'] = colorLists;
                }
                var temp1 = luckysheetSparkline.init(dataformat, sparksetting);
                return temp1;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'PIESPLINES': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var colorList = formula.colorList;
                var rangeValue = arguments[0];
                var dataformat = formula.readCellDataToOneArray(rangeValue);
                let luckysheetfile = c.getluckysheetfile();
                let index = c.getSheetIndex(Store.calculateSheetIndex);
                let sheetdata = luckysheetfile[index].data;
                var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
                var width = cellSize[0];
                var height = cellSize[1];
                var sparksetting = {};
                sparksetting.height = height;
                sparksetting.width = width;
                var sparkColorSetting = function (attr, value) {
                    if (!!value) {
                        if (typeof value == 'number') {
                            if (value > 19) {
                                value = value % 20;
                            }
                            value = colorList[value];
                        }
                        sparksetting[attr] = value;
                    }
                };
                var offset = arguments[1];
                var borderWidth = arguments[2];
                var borderColor = arguments[3];
                sparksetting['type'] = 'pie';
                if (offset == null) {
                    offset = 0;
                }
                sparksetting['offset'] = offset;
                if (borderWidth == null) {
                    borderWidth = 0;
                }
                sparkColorSetting('borderWidth', borderWidth);
                if (borderColor == null) {
                    borderColor = '#97b552';
                }
                sparkColorSetting('borderColor', borderColor);
                var colorLists = formula.sparklinesColorMap(arguments, 4);
                if (!!colorLists) {
                    sparksetting['colorMap'] = colorLists;
                }
                var temp1 = luckysheetSparkline.init(dataformat, sparksetting);
                return temp1;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'BOXSPLINES': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var colorList = formula.colorList;
                var rangeValue = arguments[0];
                var dataformat = formula.readCellDataToOneArray(rangeValue);
                let luckysheetfile = c.getluckysheetfile();
                let index = c.getSheetIndex(Store.calculateSheetIndex);
                let sheetdata = luckysheetfile[index].data;
                var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
                var width = cellSize[0];
                var height = cellSize[1];
                var sparksetting = {};
                sparksetting.height = height;
                sparksetting.width = width;
                var sparkColorSetting = function (attr, value) {
                    if (!!value) {
                        if (typeof value == 'number') {
                            if (value > 19) {
                                value = value % 20;
                            }
                            value = colorList[value];
                        }
                        sparksetting[attr] = value;
                    }
                };
                var outlierIQR = arguments[1];
                var target = arguments[2];
                var spotRadius = arguments[3];
                sparksetting['type'] = 'box';
                if (outlierIQR == null) {
                    outlierIQR = 1.5;
                }
                sparksetting['outlierIQR'] = outlierIQR;
                if (target == null) {
                    target = 0;
                } else {
                    sparkColorSetting('target', target);
                }
                if (spotRadius == null) {
                    spotRadius = 1.5;
                }
                sparkColorSetting('spotRadius', spotRadius);
                var temp1 = luckysheetSparkline.init(dataformat, sparksetting);
                return temp1;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'BULLETSPLINES': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var cell_fp = window.luckysheetCurrentFunction;
                var colorList = formula.colorList;
                let luckysheetfile = c.getluckysheetfile();
                let index = c.getSheetIndex(Store.calculateSheetIndex);
                let sheetdata = luckysheetfile[index].data;
                var cellSize = menuButton.getCellRealSize(sheetdata, cell_r, cell_c);
                var width = cellSize[0];
                var height = cellSize[1];
                var sparksetting = {};
                sparksetting.height = height;
                sparksetting.width = width;
                var sparkColorSetting = function (attr, value) {
                    if (!!value) {
                        if (typeof value == 'number') {
                            if (value > 19) {
                                value = value % 20;
                            }
                            value = colorList[value];
                        }
                        sparksetting[attr] = value;
                    }
                };
                var dataformat = [];
                a.luckysheet_getValue(arguments);
                var data1 = formula.getValueByFuncData(arguments[0]);
                var data2 = formula.getValueByFuncData(arguments[1]);
                dataformat.push(data1);
                dataformat.push(data2);
                for (var i = 2; i < arguments.length; i++) {
                    dataformat.push(formula.getValueByFuncData(arguments[i]));
                }
                sparksetting['type'] = 'bullet';
                var temp1 = luckysheetSparkline.init(dataformat, sparksetting);
                return temp1;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SORT': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_array = arguments[0];
                var array = [], rowlen = 1, collen = 1;
                if (j.getObjType(data_array) == 'array') {
                    if (j.getObjType(data_array[0]) == 'array') {
                        if (!func_methods.isDyadicArr(data_array)) {
                            return formula.undefined.v;
                        }
                        for (var i = 0; i < data_array.length; i++) {
                            var rowArr = [];
                            for (var j = 0; j < data_array[i].length; j++) {
                                var number = data_array[i][j];
                                rowArr.push(number);
                            }
                            array.push(rowArr);
                        }
                        rowlen = array.length;
                        collen = array[0].length;
                    } else {
                        for (var i = 0; i < data_array.length; i++) {
                            var number = data_array[i];
                            array.push(number);
                        }
                        rowlen = array.length;
                    }
                } else if (j.getObjType(data_array) == 'object' && data_array.startCell != null) {
                    if (data_array.data != null) {
                        if (j.getObjType(data_array.data) == 'array') {
                            for (var i = 0; i < data_array.data.length; i++) {
                                var rowArr = [];
                                for (var j = 0; j < data_array.data[i].length; j++) {
                                    if (data_array.data[i][j] != null) {
                                        var number = data_array.data[i][j].v;
                                        if (e.isRealNull(number)) {
                                            number = 0;
                                        }
                                        rowArr.push(number);
                                    } else {
                                        rowArr.push(0);
                                    }
                                }
                                array.push(rowArr);
                            }
                            rowlen = array.length;
                            collen = array[0].length;
                        } else {
                            var number = data_array.data.v;
                            if (e.isRealNull(number)) {
                                number = 0;
                            }
                            array.push(number);
                        }
                    } else {
                        array.push(0);
                    }
                } else {
                    var number = data_array;
                    array.push(number);
                }
                var sort_index = 1;
                if (arguments.length >= 2) {
                    sort_index = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(sort_index)) {
                        return sort_index;
                    }
                    if (!e.isRealNum(sort_index)) {
                        return formula.undefined.v;
                    }
                    sort_index = parseInt(sort_index);
                }
                var sort_order = 1;
                if (arguments.length >= 3) {
                    sort_order = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(sort_order)) {
                        return sort_order;
                    }
                    if (!e.isRealNum(sort_order)) {
                        return formula.undefined.v;
                    }
                    sort_order = Math.floor(parseFloat(sort_order));
                }
                var by_col = false;
                if (arguments.length == 4) {
                    by_col = func_methods.getCellBoolen(arguments[3]);
                    if (e.valueIsError(by_col)) {
                        return by_col;
                    }
                }
                if (by_col) {
                    if (sort_index < 1 || sort_index > rowlen) {
                        return formula.undefined.v;
                    }
                } else {
                    if (sort_index < 1 || sort_index > collen) {
                        return formula.undefined.v;
                    }
                }
                if (sort_order != 1 && sort_order != -1) {
                    return formula.undefined.v;
                }
                var asc = function (x, y) {
                    if (j.getObjType(x) == 'array') {
                        x = x[sort_index - 1];
                    }
                    if (j.getObjType(y) == 'array') {
                        y = y[sort_index - 1];
                    }
                    if (!isNaN(x) && !isNaN(y)) {
                        return x - y;
                    } else if (!isNaN(x)) {
                        return -1;
                    } else if (!isNaN(y)) {
                        return 1;
                    } else {
                        if (x > y) {
                            return 1;
                        } else if (x < y) {
                            return -1;
                        }
                    }
                };
                var desc = function (x, y) {
                    if (j.getObjType(x) == 'array') {
                        x = x[sort_index - 1];
                    }
                    if (j.getObjType(y) == 'array') {
                        y = y[sort_index - 1];
                    }
                    if (!isNaN(x) && !isNaN(y)) {
                        return y - x;
                    } else if (!isNaN(x)) {
                        return 1;
                    } else if (!isNaN(y)) {
                        return -1;
                    } else {
                        if (x > y) {
                            return -1;
                        } else if (x < y) {
                            return 1;
                        }
                    }
                };
                if (by_col) {
                    array = array[0].map(function (col, a) {
                        return array.map(function (row) {
                            return row[a];
                        });
                    });
                    if (sort_order == 1) {
                        array.sort(asc);
                    }
                    if (sort_order == -1) {
                        array.sort(desc);
                    }
                    array = array[0].map(function (col, b) {
                        return array.map(function (row) {
                            return row[b];
                        });
                    });
                } else {
                    if (sort_order == 1) {
                        array.sort(asc);
                    }
                    if (sort_order == -1) {
                        array.sort(desc);
                    }
                }
                return array;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'FILTER': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_array = arguments[0];
                var array = [];
                if (j.getObjType(data_array) == 'array') {
                    if (j.getObjType(data_array[0]) == 'array' && !func_methods.isDyadicArr(data_array)) {
                        return formula.undefined.v;
                    }
                    array = func_methods.getDataDyadicArr(data_array);
                } else if (j.getObjType(data_array) == 'object' && data_array.startCell != null) {
                    array = func_methods.getCellDataDyadicArr(data_array, 'number');
                } else {
                    var rowArr = [];
                    rowArr.push(parseFloat(data_array));
                    array.push(rowArr);
                }
                var rowlen = array.length, collen = array[0].length;
                var data_include = arguments[1];
                var include = [];
                var type = 'row';
                if (j.getObjType(data_include) == 'array') {
                    if (j.getObjType(data_include[0]) == 'array') {
                        if (!func_methods.isDyadicArr(data_include)) {
                            return formula.undefined.v;
                        }
                        if (data_include.length > 1 && data_include[0].length > 1) {
                            return formula.undefined.v;
                        }
                        if (data_include.length > 1) {
                            if (data_include.length != array.length) {
                                return formula.undefined.v;
                            }
                            type = 'row';
                            for (var i = 0; i < data_include.length; i++) {
                                var txt = data_include[i][0];
                                if (j.getObjType(txt) == 'boolean') {
                                } else if (j.getObjType(txt) == 'string' && (txt.toLowerCase() == 'true' || txt.toLowerCase() == 'false')) {
                                    if (txt.toLowerCase() == 'true') {
                                        txt = true;
                                    } else if (txt.toLowerCase() == 'false') {
                                        txt = false;
                                    }
                                } else if (e.isRealNum(txt)) {
                                    txt = parseFloat(txt);
                                    txt = txt == 0 ? false : true;
                                } else {
                                    return formula.undefined.v;
                                }
                                include.push(txt);
                            }
                        }
                        if (data_include[0].length > 1) {
                            if (data_include[0].length != array[0].length) {
                                return formula.undefined.v;
                            }
                            type = 'col';
                            for (var i = 0; i < data_include[0].length; i++) {
                                var txt = data_include[0][i];
                                if (j.getObjType(txt) == 'boolean') {
                                } else if (j.getObjType(txt) == 'string' && (txt.toLowerCase() == 'true' || txt.toLowerCase() == 'false')) {
                                    if (txt.toLowerCase() == 'true') {
                                        txt = true;
                                    } else if (txt.toLowerCase() == 'false') {
                                        txt = false;
                                    }
                                } else if (e.isRealNum(txt)) {
                                    txt = parseFloat(txt);
                                    txt = txt == 0 ? false : true;
                                } else {
                                    return formula.undefined.v;
                                }
                                include.push(txt);
                            }
                        }
                    } else {
                        if (data_include.length != array[0].length) {
                            return formula.undefined.v;
                        }
                        type = 'col';
                        for (var i = 0; i < data_include.length; i++) {
                            var txt = data_include[i];
                            if (j.getObjType(txt) == 'boolean') {
                            } else if (j.getObjType(txt) == 'string' && (txt.toLowerCase() == 'true' || txt.toLowerCase() == 'false')) {
                                if (txt.toLowerCase() == 'true') {
                                    txt = true;
                                } else if (txt.toLowerCase() == 'false') {
                                    txt = false;
                                }
                            } else if (e.isRealNum(txt)) {
                                txt = parseFloat(txt);
                                txt = txt == 0 ? false : true;
                            } else {
                                return formula.undefined.v;
                            }
                            include.push(txt);
                        }
                    }
                } else if (j.getObjType(data_include) == 'object' && data_include.data != null && j.getObjType(data_include.data) == 'array') {
                    if (data_include.data.length > 1 && data_include.data[0].length > 1) {
                        return formula.undefined.v;
                    }
                    if (data_include.data.length > 1) {
                        if (data_include.data.length != array.length) {
                            return formula.undefined.v;
                        }
                        type = 'row';
                        for (var i = 0; i < data_include.data.length; i++) {
                            var txt = data_include.data[i][0].v;
                            if (e.isRealNull(txt)) {
                                txt = 0;
                            }
                            if (j.getObjType(txt) == 'boolean') {
                            } else if (j.getObjType(txt) == 'string' && (txt.toLowerCase() == 'true' || txt.toLowerCase() == 'false')) {
                                if (txt.toLowerCase() == 'true') {
                                    txt = true;
                                } else if (txt.toLowerCase() == 'false') {
                                    txt = false;
                                }
                            } else if (e.isRealNum(txt)) {
                                txt = parseFloat(txt);
                                txt = txt == 0 ? false : true;
                            } else {
                                return formula.undefined.v;
                            }
                            include.push(txt);
                        }
                    }
                    if (data_include.data[0].length > 1) {
                        if (data_include.data[0].length != array[0].length) {
                            return formula.undefined.v;
                        }
                        type = 'col';
                        for (var i = 0; i < data_include.data[0].length; i++) {
                            var txt = data_include.data[0][i].v;
                            if (e.isRealNull(txt)) {
                                txt = 0;
                            }
                            if (j.getObjType(txt) == 'boolean') {
                            } else if (j.getObjType(txt) == 'string' && (txt.toLowerCase() == 'true' || txt.toLowerCase() == 'false')) {
                                if (txt.toLowerCase() == 'true') {
                                    txt = true;
                                } else if (txt.toLowerCase() == 'false') {
                                    txt = false;
                                }
                            } else if (e.isRealNum(txt)) {
                                txt = parseFloat(txt);
                                txt = txt == 0 ? false : true;
                            } else {
                                return formula.undefined.v;
                            }
                            include.push(txt);
                        }
                    }
                } else {
                    return formula.undefined.v;
                }
                var if_empty = '';
                if (arguments.length == 3) {
                    if_empty = func_methods.getFirstValue(arguments[2], 'text');
                    if (e.valueIsError(if_empty)) {
                        return if_empty;
                    }
                }
                var result = [];
                if (type == 'row') {
                    for (var i = 0; i < array.length; i++) {
                        if (include[i]) {
                            result.push(array[i]);
                        }
                    }
                } else {
                    for (var i = 0; i < array.length; i++) {
                        var rowArr = [];
                        for (var j = 0; j < array[0].length; j++) {
                            if (include[j]) {
                                rowArr.push(array[i][j]);
                            }
                        }
                        if (rowArr.length > 0) {
                            result.push(rowArr);
                        }
                    }
                }
                if (result.length == 0) {
                    return if_empty;
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'UNIQUE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var data_array = arguments[0];
                var array = [];
                if (j.getObjType(data_array) == 'array') {
                    if (j.getObjType(data_array[0]) == 'array' && !func_methods.isDyadicArr(data_array)) {
                        return formula.undefined.v;
                    }
                    array = func_methods.getDataDyadicArr(data_array);
                } else if (j.getObjType(data_array) == 'object' && data_array.startCell != null) {
                    array = func_methods.getCellDataDyadicArr(data_array, 'number');
                } else {
                    var rowArr = [];
                    rowArr.push(parseFloat(data_array));
                    array.push(rowArr);
                }
                var by_col = false;
                if (arguments.length >= 2) {
                    by_col = func_methods.getCellBoolen(arguments[1]);
                    if (e.valueIsError(by_col)) {
                        return by_col;
                    }
                }
                var occurs_once = false;
                if (arguments.length == 3) {
                    occurs_once = func_methods.getCellBoolen(arguments[2]);
                    if (e.valueIsError(occurs_once)) {
                        return occurs_once;
                    }
                }
                if (by_col) {
                    array = array[0].map(function (col, a) {
                        return array.map(function (row) {
                            return row[a];
                        });
                    });
                    var strObj = {}, strArr = [];
                    var allUnique = [];
                    for (var i = 0; i < array.length; i++) {
                        var str = '';
                        for (var j = 0; j < array[i].length; j++) {
                            str += array[i][j].toString() + '|||';
                        }
                        strArr.push(str);
                        if (!(str in strObj)) {
                            strObj[str] = 0;
                            allUnique.push(array[i]);
                        }
                    }
                    if (occurs_once) {
                        var oneUnique = [];
                        for (var i = 0; i < strArr.length; i++) {
                            if (strArr.indexOf(strArr[i]) == strArr.lastIndexOf(strArr[i])) {
                                oneUnique.push(array[i]);
                            }
                        }
                        oneUnique = oneUnique[0].map(function (col, a) {
                            return oneUnique.map(function (row) {
                                return row[a];
                            });
                        });
                        return oneUnique;
                    } else {
                        allUnique = allUnique[0].map(function (col, a) {
                            return allUnique.map(function (row) {
                                return row[a];
                            });
                        });
                        return allUnique;
                    }
                } else {
                    var strObj = {}, strArr = [];
                    var allUnique = [];
                    for (var i = 0; i < array.length; i++) {
                        var str = '';
                        for (var j = 0; j < array[i].length; j++) {
                            str += array[i][j].toString() + '|||';
                        }
                        strArr.push(str);
                        if (!(str in strObj)) {
                            strObj[str] = 0;
                            allUnique.push(array[i]);
                        }
                    }
                    if (occurs_once) {
                        var oneUnique = [];
                        for (var i = 0; i < strArr.length; i++) {
                            if (strArr.indexOf(strArr[i]) == strArr.lastIndexOf(strArr[i])) {
                                oneUnique.push(array[i]);
                            }
                        }
                        return oneUnique;
                    } else {
                        return allUnique;
                    }
                }
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'RANDARRAY': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var rows = 1;
                if (arguments.length >= 1) {
                    rows = func_methods.getFirstValue(arguments[0]);
                    if (e.valueIsError(rows)) {
                        return rows;
                    }
                    if (!e.isRealNum(rows)) {
                        return formula.undefined.v;
                    }
                    rows = parseInt(rows);
                }
                var cols = 1;
                if (arguments.length == 2) {
                    cols = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(cols)) {
                        return cols;
                    }
                    if (!e.isRealNum(cols)) {
                        return formula.undefined.v;
                    }
                    cols = parseInt(cols);
                }
                if (rows <= 0 || cols <= 0) {
                    return formula.undefined.v;
                }
                var result = [];
                for (var i = 0; i < rows; i++) {
                    var result_row = [];
                    for (var j = 0; j < cols; j++) {
                        result_row.push(Math.random().toFixed(9));
                    }
                    result.push(result_row);
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'SEQUENCE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var rows = func_methods.getFirstValue(arguments[0]);
                if (e.valueIsError(rows)) {
                    return rows;
                }
                if (!e.isRealNum(rows)) {
                    return formula.undefined.v;
                }
                rows = parseInt(rows);
                var cols = 1;
                if (arguments.length >= 2) {
                    cols = func_methods.getFirstValue(arguments[1]);
                    if (e.valueIsError(cols)) {
                        return cols;
                    }
                    if (!e.isRealNum(cols)) {
                        return formula.undefined.v;
                    }
                    cols = parseInt(cols);
                }
                var start = 1;
                if (arguments.length >= 3) {
                    start = func_methods.getFirstValue(arguments[2]);
                    if (e.valueIsError(start)) {
                        return start;
                    }
                    if (!e.isRealNum(start)) {
                        return formula.undefined.v;
                    }
                    start = parseFloat(start);
                }
                var step = 1;
                if (arguments.length == 4) {
                    step = func_methods.getFirstValue(arguments[3]);
                    if (e.valueIsError(step)) {
                        return step;
                    }
                    if (!e.isRealNum(step)) {
                        return formula.undefined.v;
                    }
                    step = parseFloat(step);
                }
                if (rows <= 0 || cols <= 0) {
                    return formula.undefined.v;
                }
                var result = [];
                for (var i = 0; i < rows; i++) {
                    var result_row = [];
                    for (var j = 0; j < cols; j++) {
                        var number = start + step * (j + cols * i);
                        result_row.push(number);
                    }
                    result.push(result_row);
                }
                return result;
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        },
        'EVALUATE': function () {
            if (arguments.length < this.m[0] || arguments.length > this.m[1]) {
                return formula.undefined.na;
            }
            for (var i = 0; i < arguments.length; i++) {
                var p = formula.errorParamCheck(this.p, arguments[i], i);
                if (!p[0]) {
                    return formula.undefined.v;
                }
            }
            try {
                var cell_r = window.luckysheetCurrentRow;
                var cell_c = window.luckysheetCurrentColumn;
                var sheetindex_now = window.luckysheetCurrentIndex;
                var strtext = func_methods.getFirstValue(arguments[0]).toString();
                if (e.valueIsError(strtext)) {
                    return strtext;
                }
                if (strtext.trim().indexOf('=') != 0) {
                    strtext = '=' + strtext;
                }
                var result_this = formula.execstringformula(strtext, cell_r, cell_c, sheetindex_now);
                return result_this[1];
            } catch (e) {
                var err = e;
                err = formula.errorInfo(err);
                return [
                    formula.undefined.v,
                    err
                ];
            }
        }
    };
    return functionImplementation;
});
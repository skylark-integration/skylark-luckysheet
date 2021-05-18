define([
    '../global/func_methods',
    '../global/formula',
    '../global/tooltip',
    '../global/validate',
    '../global/getdata',
    '../global/format',
    '../function/matrix_methods',
    '../methods/get',
    '../utils/util',
    '../store',
    'numeral'
], function (func_methods, formula, tooltip, a, b, c, d, e, f, Store, numeral) {
    'use strict';
    function luckysheet_compareWith() {
        let sp = arguments[1];
        let data_fp = arguments[0];
        let fp;
        if (f.getObjType(data_fp) == 'object' && data_fp.startCell != null) {
            if (sp == '&') {
                fp = func_methods.getCellDataDyadicArr(data_fp, 'text');
            } else {
                fp = func_methods.getCellDataDyadicArr(data_fp, 'number');
            }
            if (fp.length == 1 && fp[0].length == 1) {
                fp = fp[0][0];
            }
        } else {
            fp = data_fp;
        }
        let data_tp = arguments[2];
        let tp;
        if (f.getObjType(data_tp) == 'object' && data_tp.startCell != null) {
            if (sp == '&') {
                tp = func_methods.getCellDataDyadicArr(data_tp, 'text');
            } else {
                tp = func_methods.getCellDataDyadicArr(data_tp, 'number');
            }
            if (tp.length == 1 && tp[0].length == 1) {
                tp = tp[0][0];
            }
        } else {
            tp = data_tp;
        }
        if (a.valueIsError(fp)) {
            return fp;
        }
        if (a.valueIsError(tp)) {
            return tp;
        }
        if (f.getObjType(fp) == 'array' && f.getObjType(fp[0]) == 'array' && !func_methods.isDyadicArr(fp)) {
            return a.error.v;
        }
        if (f.getObjType(tp) == 'array' && f.getObjType(tp[0]) == 'array' && !func_methods.isDyadicArr(tp)) {
            return a.error.v;
        }
        if (sp == '<>') {
            sp = '!=';
        }
        if (sp == '=') {
            sp = '==';
        }
        if (fp == null && tp == null) {
            return '#INVERSE!';
        } else if (fp == '#INVERSE!') {
            fp = 0;
            if (sp == '-') {
                sp = '+';
            } else if (sp == '+') {
                sp = '-';
            }
        } else if (sp == '-' && fp == null) {
            fp = 0;
        } else if (sp == '/' && (tp == 0 || tp == null)) {
            return a.error.d;
        }
        function booleanOperation(a, operator, b) {
            if (a.isRealNum(a)) {
                a = parseFloat(a);
            }
            if (a.isRealNum(b)) {
                b = parseFloat(b);
            }
            if (operator == '==') {
                if (a == b) {
                    return true;
                } else {
                    return false;
                }
            } else if (operator == '!=') {
                if (a != b) {
                    return true;
                } else {
                    return false;
                }
            } else if (operator == '>=') {
                if (a >= b) {
                    return true;
                } else {
                    return false;
                }
            } else if (operator == '<=') {
                if (a <= b) {
                    return true;
                } else {
                    return false;
                }
            } else if (operator == '>') {
                if (a > b) {
                    return true;
                } else {
                    return false;
                }
            } else if (operator == '<') {
                if (a < b) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        function booleanToNum(v) {
            if (v == null) {
                return v;
            }
            if (v.toString().toLowerCase() == 'true') {
                return 1;
            }
            if (v.toString().toLowerCase() == 'false') {
                return 0;
            }
            return v;
        }
        if (sp == '*') {
            if (f.getObjType(fp) == 'array' && f.getObjType(tp) == 'array') {
                let result = [];
                if (f.getObjType(fp[0]) == 'array' && f.getObjType(tp[0]) == 'array') {
                    if (fp.length == tp.length && fp[0].length == tp[0].length) {
                        for (let m = 0; m < fp.length; m++) {
                            let rowArr = [];
                            for (let n = 0; n < fp[m].length; n++) {
                                fp[m][n] = booleanToNum(fp[m][n]);
                                tp[m][n] = booleanToNum(tp[m][n]);
                                let value;
                                if (a.isRealNum(fp[m][n]) && a.isRealNum(tp[m][n])) {
                                    value = luckysheet_calcADPMM(fp[m][n], sp, tp[m][n]);
                                } else {
                                    value = a.error.v;
                                }
                                rowArr.push(value);
                            }
                            result.push(rowArr);
                        }
                    } else if (fp[0].length == tp.length) {
                        let rowlen = fp.length;
                        let collen = tp[0].length;
                        for (let m = 0; m < rowlen; m++) {
                            let rowArr = [];
                            for (let n = 0; n < collen; n++) {
                                let value = 0;
                                for (let p = 0; p < fp[0].length; p++) {
                                    fp[m][p] = booleanToNum(fp[m][p]);
                                    tp[p][n] = booleanToNum(tp[p][n]);
                                    if (a.isRealNum(fp[m][p]) && a.isRealNum(tp[p][n])) {
                                        value += luckysheet_calcADPMM(fp[m][p], sp, tp[p][n]);
                                    } else {
                                        value += a.error.v;
                                    }
                                }
                                if (value.toString() == 'NaN') {
                                    value = a.error.v;
                                }
                                rowArr.push(value);
                            }
                            result.push(rowArr);
                        }
                    } else if (fp.length == tp[0].length) {
                        let rowlen = tp.length;
                        let collen = fp[0].length;
                        for (let m = 0; m < rowlen; m++) {
                            let rowArr = [];
                            for (let n = 0; n < collen; n++) {
                                let value = 0;
                                for (let p = 0; p < tp[0].length; p++) {
                                    fp[p][n] = booleanToNum(fp[p][n]);
                                    tp[m][p] = booleanToNum(tp[m][p]);
                                    if (a.isRealNum(tp[m][p]) && a.isRealNum(fp[p][n])) {
                                        value += luckysheet_calcADPMM(fp[p][n], sp, tp[m][p]);
                                    } else {
                                        value += a.error.v;
                                    }
                                }
                                if (value.toString() == 'NaN') {
                                    value = a.error.v;
                                }
                                rowArr.push(value);
                            }
                            result.push(rowArr);
                        }
                    } else {
                        return a.error.na;
                    }
                } else if (f.getObjType(fp[0]) == 'array') {
                    if (fp[0].length == tp.length) {
                        for (let m = 0; m < fp.length; m++) {
                            let rowArr = [];
                            for (let n = 0; n < fp[m].length; n++) {
                                fp[m][n] = booleanToNum(fp[m][n]);
                                tp[n] = booleanToNum(tp[n]);
                                let value;
                                if (a.isRealNum(fp[m][n]) && a.isRealNum(tp[n])) {
                                    value = luckysheet_calcADPMM(fp[m][n], sp, tp[n]);
                                } else {
                                    value = a.error.v;
                                }
                                rowArr.push(value);
                            }
                            result.push(rowArr);
                        }
                    } else if (fp[0].length == 1) {
                        let rowlen = fp.length;
                        let collen = tp.length;
                        for (let m = 0; m < rowlen; m++) {
                            let rowArr = [];
                            for (let n = 0; n < collen; n++) {
                                fp[m][0] = booleanToNum(fp[m][0]);
                                tp[n] = booleanToNum(tp[n]);
                                let value;
                                if (a.isRealNum(fp[m][0]) && a.isRealNum(tp[n])) {
                                    value = luckysheet_calcADPMM(fp[m][0], sp, tp[n]);
                                } else {
                                    value = a.error.v;
                                }
                                rowArr.push(value);
                            }
                            result.push(rowArr);
                        }
                    } else {
                        return a.error.na;
                    }
                } else if (f.getObjType(tp[0]) == 'array') {
                    if (tp[0].length == fp.length) {
                        for (let m = 0; m < tp.length; m++) {
                            let rowArr = [];
                            for (let n = 0; n < tp[m].length; n++) {
                                fp[n] = booleanToNum(fp[n]);
                                tp[m][n] = booleanToNum(tp[m][n]);
                                let value;
                                if (a.isRealNum(fp[n]) && a.isRealNum(tp[m][n])) {
                                    value = luckysheet_calcADPMM(fp[n], sp, tp[m][n]);
                                } else {
                                    value = a.error.v;
                                }
                                rowArr.push(value);
                            }
                            result.push(rowArr);
                        }
                    } else if (tp[0].length == 1) {
                        let rowlen = tp.length;
                        let collen = fp.length;
                        for (let m = 0; m < rowlen; m++) {
                            let rowArr = [];
                            for (let n = 0; n < collen; n++) {
                                fp[n] = booleanToNum(fp[n]);
                                tp[m][0] = booleanToNum(tp[m][0]);
                                let value;
                                if (a.isRealNum(fp[n]) && a.isRealNum(tp[m][0])) {
                                    value = luckysheet_calcADPMM(fp[n], sp, tp[m][0]);
                                } else {
                                    value = a.error.v;
                                }
                                rowArr.push(value);
                            }
                            result.push(rowArr);
                        }
                    } else {
                        return a.error.na;
                    }
                } else {
                    if (fp.length != tp.length) {
                        return a.error.na;
                    }
                    for (let n = 0; n < fp.length; n++) {
                        fp[n] = booleanToNum(fp[n]);
                        tp[n] = booleanToNum(tp[n]);
                        let value;
                        if (a.isRealNum(fp[n]) && a.isRealNum(tp[n])) {
                            value = luckysheet_calcADPMM(fp[n], sp, tp[n]);
                        } else {
                            value = a.error.v;
                        }
                        result.push(value);
                    }
                }
                return result;
            } else if (f.getObjType(fp) == 'array') {
                tp = booleanToNum(tp);
                let result = [];
                if (f.getObjType(fp[0]) == 'array') {
                    for (let m = 0; m < fp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < fp[m].length; n++) {
                            fp[m][n] = booleanToNum(fp[m][n]);
                            let value;
                            if (a.isRealNum(fp[m][n]) && a.isRealNum(tp)) {
                                value = luckysheet_calcADPMM(fp[m][n], sp, tp);
                            } else {
                                value = a.error.v;
                            }
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else {
                    for (let n = 0; n < fp.length; n++) {
                        fp[n] = booleanToNum(fp[n]);
                        let value;
                        if (a.isRealNum(fp[n]) && a.isRealNum(tp)) {
                            value = luckysheet_calcADPMM(fp[n], sp, tp);
                        } else {
                            value = a.error.v;
                        }
                        result.push(value);
                    }
                }
                return result;
            } else if (f.getObjType(tp) == 'array') {
                fp = booleanToNum(fp);
                let result = [];
                if (f.getObjType(tp[0]) == 'array') {
                    for (let m = 0; m < tp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < tp[m].length; n++) {
                            tp[m][n] = booleanToNum(tp[m][n]);
                            let value;
                            if (a.isRealNum(fp) && a.isRealNum(tp[m][n])) {
                                value = luckysheet_calcADPMM(fp, sp, tp[m][n]);
                            } else {
                                value = a.error.v;
                            }
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else {
                    for (let n = 0; n < tp.length; n++) {
                        tp[n] = booleanToNum(tp[n]);
                        let value;
                        if (a.isRealNum(fp) && a.isRealNum(tp[n])) {
                            value = luckysheet_calcADPMM(fp, sp, tp[n]);
                        } else {
                            value = a.error.v;
                        }
                        result.push(value);
                    }
                }
                return result;
            } else {
                fp = booleanToNum(fp);
                tp = booleanToNum(tp);
                let result;
                if (a.isRealNum(fp) && a.isRealNum(tp)) {
                    result = luckysheet_calcADPMM(fp, sp, tp);
                } else {
                    result = a.error.v;
                }
                return result;
            }
        } else if (sp == '/') {
            if (f.getObjType(fp) == 'array' && f.getObjType(tp) == 'array') {
                let result = [];
                if (f.getObjType(fp[0]) == 'array' && f.getObjType(tp[0]) == 'array') {
                    if (fp.length == tp.length && fp[0].length == tp[0].length) {
                        for (let m = 0; m < fp.length; m++) {
                            let rowArr = [];
                            for (let n = 0; n < fp[m].length; n++) {
                                fp[m][n] = booleanToNum(fp[m][n]);
                                tp[m][n] = booleanToNum(tp[m][n]);
                                let value;
                                if (a.isRealNum(fp[m][n]) && a.isRealNum(tp[m][n])) {
                                    if (parseFloat(tp[m][n]) == 0) {
                                        value = a.error.d;
                                    } else {
                                        value = luckysheet_calcADPMM(fp[m][n], sp, tp[m][n]);
                                    }
                                } else {
                                    value = a.error.v;
                                }
                                rowArr.push(value);
                            }
                            result.push(rowArr);
                        }
                    } else if (fp[0].length == tp.length) {
                        let tp_inverse = d.inverse(tp);
                        let rowlen = fp.length;
                        let collen = tp_inverse[0].length;
                        for (let m = 0; m < rowlen; m++) {
                            let rowArr = [];
                            for (let n = 0; n < collen; n++) {
                                let value = 0;
                                for (let p = 0; p < fp[0].length; p++) {
                                    fp[m][p] = booleanToNum(fp[m][p]);
                                    tp_inverse[p][n] = booleanToNum(tp_inverse[p][n]);
                                    if (a.isRealNum(fp[m][p]) && a.isRealNum(tp_inverse[p][n])) {
                                        value += luckysheet_calcADPMM(fp[m][p], '*', tp_inverse[p][n]);
                                    } else {
                                        value += a.error.v;
                                    }
                                }
                                if (value.toString() == 'NaN') {
                                    value = a.error.v;
                                }
                                rowArr.push(value);
                            }
                            result.push(rowArr);
                        }
                    } else {
                        return a.error.na;
                    }
                } else if (f.getObjType(fp[0]) == 'array') {
                    if (fp[0].length == tp.length) {
                        for (let m = 0; m < fp.length; m++) {
                            let rowArr = [];
                            for (let n = 0; n < fp[m].length; n++) {
                                fp[m][n] = booleanToNum(fp[m][n]);
                                tp[n] = booleanToNum(tp[n]);
                                let value;
                                if (a.isRealNum(fp[m][n]) && a.isRealNum(tp[n])) {
                                    if (parseFloat(tp[n]) == 0) {
                                        value = a.error.d;
                                    } else {
                                        value = luckysheet_calcADPMM(fp[m][n], sp, tp[n]);
                                    }
                                } else {
                                    value = a.error.v;
                                }
                                rowArr.push(value);
                            }
                            result.push(rowArr);
                        }
                    } else if (fp[0].length == 1) {
                        let rowlen = fp.length;
                        let collen = tp.length;
                        for (let m = 0; m < rowlen; m++) {
                            let rowArr = [];
                            for (let n = 0; n < collen; n++) {
                                fp[m][0] = booleanToNum(fp[m][0]);
                                tp[n] = booleanToNum(tp[n]);
                                let value;
                                if (a.isRealNum(fp[m][0]) && a.isRealNum(tp[n])) {
                                    if (parseFloat(tp[n]) == 0) {
                                        value = a.error.d;
                                    } else {
                                        value = luckysheet_calcADPMM(fp[m][0], sp, tp[n]);
                                    }
                                } else {
                                    value = a.error.v;
                                }
                                rowArr.push(value);
                            }
                            result.push(rowArr);
                        }
                    } else {
                        return a.error.na;
                    }
                } else if (f.getObjType(tp[0]) == 'array') {
                    if (tp[0].length == fp.length) {
                        for (let m = 0; m < tp.length; m++) {
                            let rowArr = [];
                            for (let n = 0; n < tp[m].length; n++) {
                                fp[n] = booleanToNum(fp[n]);
                                tp[m][n] = booleanToNum(tp[m][n]);
                                let value;
                                if (a.isRealNum(fp[n]) && a.isRealNum(tp[m][n])) {
                                    if (parseFloat(tp[m][n]) == 0) {
                                        value = a.error.d;
                                    } else {
                                        value = luckysheet_calcADPMM(fp[n], sp, tp[m][n]);
                                    }
                                } else {
                                    value = a.error.v;
                                }
                                rowArr.push(value);
                            }
                            result.push(rowArr);
                        }
                    } else if (tp[0].length == 1) {
                        let rowlen = tp.length;
                        let collen = fp.length;
                        for (let m = 0; m < rowlen; m++) {
                            let rowArr = [];
                            for (let n = 0; n < collen; n++) {
                                fp[n] = booleanToNum(fp[n]);
                                tp[m][0] = booleanToNum(tp[m][0]);
                                let value;
                                if (a.isRealNum(fp[n]) && a.isRealNum(tp[m][0])) {
                                    if (parseFloat(tp[m][0]) == 0) {
                                        value = a.error.d;
                                    } else {
                                        value = luckysheet_calcADPMM(fp[n], sp, tp[m][0]);
                                    }
                                } else {
                                    value = a.error.v;
                                }
                                rowArr.push(value);
                            }
                            result.push(rowArr);
                        }
                    } else {
                        return a.error.na;
                    }
                } else {
                    if (fp.length != tp.length) {
                        return a.error.na;
                    }
                    for (let n = 0; n < fp.length; n++) {
                        fp[n] = booleanToNum(fp[n]);
                        tp[n] = booleanToNum(tp[n]);
                        let value;
                        if (a.isRealNum(fp[n]) && a.isRealNum(tp[n])) {
                            if (parseFloat(tp[n]) == 0) {
                                value = a.error.d;
                            } else {
                                value = luckysheet_calcADPMM(fp[n], sp, tp[n]);
                            }
                        } else {
                            value = a.error.v;
                        }
                        result.push(value);
                    }
                }
                return result;
            } else if (f.getObjType(fp) == 'array') {
                tp = booleanToNum(tp);
                let result = [];
                if (f.getObjType(fp[0]) == 'array') {
                    for (let m = 0; m < fp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < fp[m].length; n++) {
                            fp[m][n] = booleanToNum(fp[m][n]);
                            let value;
                            if (a.isRealNum(fp[m][n]) && a.isRealNum(tp)) {
                                if (parseFloat(tp) == 0) {
                                    value = a.error.d;
                                } else {
                                    value = luckysheet_calcADPMM(fp[m][n], sp, tp);
                                }
                            } else {
                                value = a.error.v;
                            }
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else {
                    for (let n = 0; n < fp.length; n++) {
                        fp[n] = booleanToNum(fp[n]);
                        let value;
                        if (a.isRealNum(fp[n]) && a.isRealNum(tp)) {
                            if (parseFloat(tp) == 0) {
                                value = a.error.d;
                            } else {
                                value = luckysheet_calcADPMM(fp[n], sp, tp);
                            }
                        } else {
                            value = a.error.v;
                        }
                        result.push(value);
                    }
                }
                return result;
            } else if (f.getObjType(tp) == 'array') {
                fp = booleanToNum(fp);
                let result = [];
                if (f.getObjType(tp[0]) == 'array') {
                    for (let m = 0; m < tp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < tp[m].length; n++) {
                            tp[m][n] = booleanToNum(tp[m][n]);
                            let value;
                            if (a.isRealNum(fp) && a.isRealNum(tp[m][n])) {
                                if (parseFloat(tp[m][n]) == 0) {
                                    value = a.error.d;
                                } else {
                                    value = luckysheet_calcADPMM(fp, sp, tp[m][n]);
                                }
                            } else {
                                value = a.error.v;
                            }
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else {
                    for (let n = 0; n < tp.length; n++) {
                        tp[n] = booleanToNum(tp[n]);
                        let value;
                        if (a.isRealNum(fp) && a.isRealNum(tp[n])) {
                            if (parseFloat(tp[n]) == 0) {
                                value = a.error.d;
                            } else {
                                value = luckysheet_calcADPMM(fp, sp, tp[n]);
                            }
                        } else {
                            value = a.error.v;
                        }
                        result.push(value);
                    }
                }
                return result;
            } else {
                fp = booleanToNum(fp);
                tp = booleanToNum(tp);
                let result;
                if (a.isRealNum(fp) && a.isRealNum(tp)) {
                    if (parseFloat(tp) == 0) {
                        result = a.error.d;
                    } else {
                        result = luckysheet_calcADPMM(fp, sp, tp);
                    }
                } else {
                    result = a.error.v;
                }
                return result;
            }
        } else if (sp == '+' || sp == '-' || sp == '%') {
            if (f.getObjType(fp) == 'array' && f.getObjType(tp) == 'array') {
                let result = [];
                if (f.getObjType(fp[0]) == 'array' && f.getObjType(tp[0]) == 'array') {
                    if (fp.length != tp.length && fp[0].length != tp[0].length) {
                        return a.error.na;
                    }
                    for (let m = 0; m < fp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < fp[m].length; n++) {
                            fp[m][n] = booleanToNum(fp[m][n]);
                            tp[m][n] = booleanToNum(tp[m][n]);
                            let value;
                            if (a.isRealNum(fp[m][n]) && a.isRealNum(tp[m][n])) {
                                if (sp == '%' && parseFloat(tp[m][n]) == 0) {
                                    value = a.error.d;
                                } else {
                                    value = luckysheet_calcADPMM(fp[m][n], sp, tp[m][n]);
                                }
                            } else {
                                value = a.error.v;
                            }
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else if (f.getObjType(fp[0]) == 'array') {
                    if (fp[0].length != tp.length) {
                        return a.error.na;
                    }
                    for (let m = 0; m < fp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < fp[m].length; n++) {
                            fp[m][n] = booleanToNum(fp[m][n]);
                            tp[n] = booleanToNum(tp[n]);
                            let value;
                            if (a.isRealNum(fp[m][n]) && a.isRealNum(tp[n])) {
                                if (sp == '%' && parseFloat(tp[n]) == 0) {
                                    value = a.error.d;
                                } else {
                                    value = luckysheet_calcADPMM(fp[m][n], sp, tp[n]);
                                }
                            } else {
                                value = a.error.v;
                            }
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else if (f.getObjType(tp[0]) == 'array') {
                    if (tp[0].length != fp.length) {
                        return a.error.na;
                    }
                    for (let m = 0; m < tp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < tp[m].length; n++) {
                            fp[n] = booleanToNum(fp[n]);
                            tp[m][n] = booleanToNum(tp[m][n]);
                            let value;
                            if (a.isRealNum(fp[n]) && a.isRealNum(tp[m][n])) {
                                if (sp == '%' && parseFloat(tp[m][n]) == 0) {
                                    value = a.error.d;
                                } else {
                                    value = luckysheet_calcADPMM(fp[n], sp, tp[m][n]);
                                }
                            } else {
                                value = a.error.v;
                            }
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else {
                    if (fp.length != tp.length) {
                        return a.error.na;
                    }
                    for (let n = 0; n < fp.length; n++) {
                        fp[n] = booleanToNum(fp[n]);
                        tp[n] = booleanToNum(tp[n]);
                        let value;
                        if (a.isRealNum(fp[n]) && a.isRealNum(tp[n])) {
                            if (sp == '%' && parseFloat(tp[n]) == 0) {
                                value = a.error.d;
                            } else {
                                value = luckysheet_calcADPMM(fp[n], sp, tp[n]);
                            }
                        } else {
                            value = a.error.v;
                        }
                        result.push(value);
                    }
                }
                return result;
            } else if (f.getObjType(fp) == 'array') {
                tp = booleanToNum(tp);
                let result = [];
                if (f.getObjType(fp[0]) == 'array') {
                    for (let m = 0; m < fp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < fp[m].length; n++) {
                            fp[m][n] = booleanToNum(fp[m][n]);
                            let value;
                            if (a.isRealNum(fp[m][n]) && a.isRealNum(tp)) {
                                if (sp == '%' && parseFloat(tp) == 0) {
                                    value = a.error.d;
                                } else {
                                    value = luckysheet_calcADPMM(fp[m][n], sp, tp);
                                }
                            } else {
                                value = a.error.v;
                            }
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else {
                    for (let n = 0; n < fp.length; n++) {
                        fp[n] = booleanToNum(fp[n]);
                        let value;
                        if (a.isRealNum(fp[n]) && a.isRealNum(tp)) {
                            if (sp == '%' && parseFloat(tp) == 0) {
                                value = a.error.d;
                            } else {
                                value = luckysheet_calcADPMM(fp[n], sp, tp);
                            }
                        } else {
                            value = a.error.v;
                        }
                        result.push(value);
                    }
                }
                return result;
            } else if (f.getObjType(tp) == 'array') {
                fp = booleanToNum(fp);
                let result = [];
                if (f.getObjType(tp[0]) == 'array') {
                    for (let m = 0; m < tp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < tp[m].length; n++) {
                            tp[m][n] = booleanToNum(tp[m][n]);
                            let value;
                            if (a.isRealNum(fp) && a.isRealNum(tp[m][n])) {
                                if (sp == '%' && parseFloat(tp[m][n]) == 0) {
                                    value = a.error.d;
                                } else {
                                    value = luckysheet_calcADPMM(fp, sp, tp[m][n]);
                                }
                            } else {
                                value = a.error.v;
                            }
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else {
                    for (let n = 0; n < tp.length; n++) {
                        tp[n] = booleanToNum(tp[n]);
                        let value;
                        if (a.isRealNum(fp) && a.isRealNum(tp[n])) {
                            if (sp == '%' && parseFloat(tp[n]) == 0) {
                                value = a.error.d;
                            } else {
                                value = luckysheet_calcADPMM(fp, sp, tp[n]);
                            }
                        } else {
                            value = a.error.v;
                        }
                        result.push(value);
                    }
                }
                return result;
            } else {
                fp = booleanToNum(fp);
                tp = booleanToNum(tp);
                let result;
                if (a.isRealNum(fp) && a.isRealNum(tp)) {
                    if (sp == '%' && parseFloat(tp) == 0) {
                        result = a.error.d;
                    } else {
                        result = luckysheet_calcADPMM(fp, sp, tp);
                    }
                } else {
                    result = a.error.v;
                }
                return result;
            }
        } else if (sp == '==' || sp == '!=' || sp == '>=' || sp == '<=' || sp == '>' || sp == '<') {
            if (f.getObjType(fp) == 'array' && f.getObjType(tp) == 'array') {
                let result = [];
                if (f.getObjType(fp[0]) == 'array' && f.getObjType(tp[0]) == 'array') {
                    if (fp.length != tp.length && fp[0].length != tp[0].length) {
                        return a.error.na;
                    }
                    for (let m = 0; m < fp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < fp[m].length; n++) {
                            let value = booleanOperation(fp[m][n], sp, tp[m][n]);
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else if (f.getObjType(fp[0]) == 'array') {
                    if (fp[0].length != tp.length) {
                        return a.error.na;
                    }
                    for (let m = 0; m < fp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < fp[m].length; n++) {
                            let value = booleanOperation(fp[m][n], sp, tp[n]);
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else if (f.getObjType(tp[0]) == 'array') {
                    if (tp[0].length != fp.length) {
                        return a.error.na;
                    }
                    for (let m = 0; m < tp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < tp[m].length; n++) {
                            let value = booleanOperation(fp[n], sp, tp[m][n]);
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else {
                    if (fp.length != tp.length) {
                        return a.error.na;
                    }
                    for (let n = 0; n < fp.length; n++) {
                        let value = booleanOperation(fp[n], sp, tp[n]);
                        result.push(value);
                    }
                }
                return result;
            } else if (f.getObjType(fp) == 'array') {
                let result = [];
                if (f.getObjType(fp[0]) == 'array') {
                    for (let m = 0; m < fp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < fp[m].length; n++) {
                            let value = booleanOperation(fp[m][n], sp, tp);
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else {
                    for (let n = 0; n < fp.length; n++) {
                        let value = booleanOperation(fp[n], sp, tp);
                        result.push(value);
                    }
                }
                return result;
            } else if (f.getObjType(tp) == 'array') {
                let result = [];
                if (f.getObjType(tp[0]) == 'array') {
                    for (let m = 0; m < tp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < tp[m].length; n++) {
                            let value = booleanOperation(fp, sp, tp[m][n]);
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else {
                    for (let n = 0; n < tp.length; n++) {
                        let value = booleanOperation(fp, sp, tp[n]);
                        result.push(value);
                    }
                }
                return result;
            } else {
                return booleanOperation(fp, sp, tp);
            }
        } else if (sp == '&') {
            if (f.getObjType(fp) == 'array' && f.getObjType(tp) == 'array') {
                let result = [];
                if (f.getObjType(fp[0]) == 'array' && f.getObjType(tp[0]) == 'array') {
                    if (fp.length != tp.length && fp[0].length != tp[0].length) {
                        return a.error.na;
                    }
                    for (let m = 0; m < fp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < fp[m].length; n++) {
                            rowArr.push(fp[m][n] + '' + tp[m][n]);
                        }
                        result.push(rowArr);
                    }
                } else if (f.getObjType(fp[0]) == 'array') {
                    if (fp[0].length != tp.length) {
                        return a.error.na;
                    }
                    for (let m = 0; m < fp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < fp[m].length; n++) {
                            rowArr.push(fp[m][n] + '' + tp[n]);
                        }
                        result.push(rowArr);
                    }
                } else if (f.getObjType(tp[0]) == 'array') {
                    if (tp[0].length != fp.length) {
                        return a.error.na;
                    }
                    for (let m = 0; m < tp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < tp[m].length; n++) {
                            rowArr.push(fp[n] + '' + tp[m][n]);
                        }
                        result.push(rowArr);
                    }
                } else {
                    if (fp.length != tp.length) {
                        return a.error.na;
                    }
                    for (let n = 0; n < fp.length; n++) {
                        result.push(fp[n] + '' + tp[n]);
                    }
                }
                return result;
            } else if (f.getObjType(fp) == 'array') {
                let result = [];
                if (f.getObjType(fp[0]) == 'array') {
                    for (let m = 0; m < fp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < fp[m].length; n++) {
                            rowArr.push(fp[m][n] + '' + tp);
                        }
                        result.push(rowArr);
                    }
                } else {
                    for (let n = 0; n < fp.length; n++) {
                        result.push(fp[n] + '' + tp);
                    }
                }
                return result;
            } else if (f.getObjType(tp) == 'array') {
                let result = [];
                if (f.getObjType(tp[0]) == 'array') {
                    for (let m = 0; m < tp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < tp[m].length; n++) {
                            rowArr.push(fp + '' + tp[m][n]);
                        }
                        result.push(rowArr);
                    }
                } else {
                    for (let n = 0; n < tp.length; n++) {
                        result.push(fp + '' + tp[n]);
                    }
                }
                return result;
            } else {
                return fp + '' + tp;
            }
        } else if (sp == '^') {
            if (f.getObjType(fp) == 'array' && f.getObjType(tp) == 'array') {
                let result = [];
                if (f.getObjType(fp[0]) == 'array' && f.getObjType(tp[0]) == 'array') {
                    if (fp.length != tp.length && fp[0].length != tp[0].length) {
                        return a.error.na;
                    }
                    for (let m = 0; m < fp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < fp[m].length; n++) {
                            fp[m][n] = booleanToNum(fp[m][n]);
                            tp[m][n] = booleanToNum(tp[m][n]);
                            let value;
                            if (a.isRealNum(fp[m][n]) && a.isRealNum(tp[m][n])) {
                                value = Math.pow(parseFloat(fp[m][n]), parseFloat(tp[m][n]));
                            } else {
                                value = a.error.v;
                            }
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else if (f.getObjType(fp[0]) == 'array') {
                    if (fp[0].length != tp.length) {
                        return a.error.na;
                    }
                    for (let m = 0; m < fp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < fp[m].length; n++) {
                            fp[m][n] = booleanToNum(fp[m][n]);
                            tp[n] = booleanToNum(tp[n]);
                            let value;
                            if (a.isRealNum(fp[m][n]) && a.isRealNum(tp[n])) {
                                value = Math.pow(parseFloat(fp[m][n]), parseFloat(tp[n]));
                            } else {
                                value = a.error.v;
                            }
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else if (f.getObjType(tp[0]) == 'array') {
                    if (tp[0].length != fp.length) {
                        return a.error.na;
                    }
                    for (let m = 0; m < tp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < tp[m].length; n++) {
                            fp[n] = booleanToNum(fp[n]);
                            tp[m][n] = booleanToNum(tp[m][n]);
                            let value;
                            if (a.isRealNum(fp[n]) && a.isRealNum(tp[m][n])) {
                                value = Math.pow(parseFloat(fp[n]), parseFloat(tp[m][n]));
                            } else {
                                value = a.error.v;
                            }
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else {
                    if (fp.length != tp.length) {
                        return a.error.na;
                    }
                    for (let n = 0; n < fp.length; n++) {
                        fp[n] = booleanToNum(fp[n]);
                        tp[n] = booleanToNum(tp[n]);
                        let value;
                        if (a.isRealNum(fp[n]) && a.isRealNum(tp[n])) {
                            value = Math.pow(parseFloat(fp[n]), parseFloat(tp[n]));
                        } else {
                            value = a.error.v;
                        }
                        result.push(value);
                    }
                }
                return result;
            } else if (f.getObjType(fp) == 'array') {
                tp = booleanToNum(tp);
                let result = [];
                if (f.getObjType(fp[0]) == 'array') {
                    for (let m = 0; m < fp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < fp[m].length; n++) {
                            fp[m][n] = booleanToNum(fp[m][n]);
                            let value;
                            if (a.isRealNum(fp[m][n]) && a.isRealNum(tp)) {
                                value = Math.pow(parseFloat(fp[m][n]), parseFloat(tp));
                            } else {
                                value = a.error.v;
                            }
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else {
                    for (let n = 0; n < fp.length; n++) {
                        fp[n] = booleanToNum(fp[n]);
                        let value;
                        if (a.isRealNum(fp[n]) && a.isRealNum(tp)) {
                            value = Math.pow(parseFloat(fp[n]), parseFloat(tp));
                        } else {
                            value = a.error.v;
                        }
                        result.push(value);
                    }
                }
                return result;
            } else if (f.getObjType(tp) == 'array') {
                fp = booleanToNum(fp);
                let result = [];
                if (f.getObjType(tp[0]) == 'array') {
                    for (let m = 0; m < tp.length; m++) {
                        let rowArr = [];
                        for (let n = 0; n < tp[m].length; n++) {
                            tp[m][n] = booleanToNum(tp[m][n]);
                            let value;
                            if (a.isRealNum(fp) && a.isRealNum(tp[m][n])) {
                                value = Math.pow(parseFloat(fp), parseFloat(tp[m][n]));
                            } else {
                                value = a.error.v;
                            }
                            rowArr.push(value);
                        }
                        result.push(rowArr);
                    }
                } else {
                    for (let n = 0; n < tp.length; n++) {
                        tp[n] = booleanToNum(tp[n]);
                        let value;
                        if (a.isRealNum(fp) && a.isRealNum(tp[n])) {
                            value = Math.pow(parseFloat(fp), parseFloat(tp[n]));
                        } else {
                            value = a.error.v;
                        }
                        result.push(value);
                    }
                }
                return result;
            } else {
                fp = booleanToNum(fp);
                tp = booleanToNum(tp);
                let result;
                if (a.isRealNum(fp) && a.isRealNum(tp)) {
                    result = Math.pow(parseFloat(fp), parseFloat(tp));
                } else {
                    result = a.error.v;
                }
                return result;
            }
        }
    }
    function luckysheet_getarraydata() {
        let fp = arguments[0];
        fp = fp.replace('{', '').replace('}', '').replace(/\"/g, '');
        let arr = [];
        if (fp.indexOf(';') > -1) {
            arr = fp.split(';');
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].split(',');
            }
        } else {
            arr = fp.split(',');
        }
        return arr;
    }
    function luckysheet_calcADPMM(fp, sp, tp) {
        let value;
        if (sp == '+') {
            value = numeral(fp).add(tp).value();
        } else if (sp == '-') {
            value = numeral(fp).subtract(tp).value();
        } else if (sp == '%') {
            value = new Function('return ' + parseFloat(fp) + sp + '(' + parseFloat(tp) + ')')();
        } else if (sp == '/') {
            value = numeral(fp).divide(tp).value();
        } else if (sp == '*') {
            value = numeral(fp).multiply(tp).value();
        }
        return value;
    }
    function luckysheet_getcelldata(txt) {
        if (window.luckysheet_getcelldata_cache == null) {
            window.luckysheet_getcelldata_cache = {};
        }
        if (txt in window.luckysheet_getcelldata_cache) {
            return window.luckysheet_getcelldata_cache[txt];
        }
        let luckysheetfile = e.getluckysheetfile();
        let val = txt.split('!');
        let sheettxt = '', rangetxt = '', sheetIndex = -1, sheetdata = null;
        if (val.length > 1) {
            sheettxt = val[0].replace(/''/g, "'");
            rangetxt = val[1];
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
            if (sheetIndex == -1) {
                sheetIndex = 0;
            }
        } else {
            let index = e.getSheetIndex(Store.calculateSheetIndex);
            sheettxt = luckysheetfile[index].name;
            sheetIndex = luckysheetfile[index].index;
            sheetdata = luckysheetfile[index].data;
            rangetxt = val[0];
        }
        if (rangetxt.indexOf(':') == -1) {
            let row = parseInt(rangetxt.replace(/[^0-9]/g, '')) - 1;
            let col = f.ABCatNum(rangetxt.replace(/[^A-Za-z]/g, ''));
            if (!isNaN(row) && !isNaN(col)) {
                let ret = b.getdatabyselectionD(sheetdata, {
                    'row': [
                        row,
                        row
                    ],
                    'column': [
                        col,
                        col
                    ]
                })[0][0];
                if (formula.execFunctionGlobalData != null) {
                    let ef = formula.execFunctionGlobalData[row + '_' + col + '_' + sheetIndex];
                    if (ef != null) {
                        ret = ef;
                    }
                }
                let rowl = 1;
                let coll = 1;
                let retAll = {
                    'sheetName': sheettxt,
                    'startCell': rangetxt,
                    'rowl': rowl,
                    'coll': coll,
                    'data': ret
                };
                window.luckysheet_getcelldata_cache[txt] = retAll;
                return retAll;
            } else {
                return [];
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
                tooltip.info('选择失败', '输入范围错误\uFF01');
                return [];
            }
            col[0] = f.ABCatNum(rangetxt[0].replace(/[^A-Za-z]/g, ''));
            col[1] = f.ABCatNum(rangetxt[1].replace(/[^A-Za-z]/g, ''));
            if (isNaN(col[0])) {
                col[0] = 0;
            }
            if (isNaN(col[1])) {
                col[1] = sheetdata[0].length - 1;
            }
            if (col[0] > col[1]) {
                tooltip.info('选择失败', '输入范围错误\uFF01');
                return [];
            }
            let ret = b.getdatabyselectionD(sheetdata, {
                'row': row,
                'column': col
            });
            if (formula.execFunctionGlobalData != null) {
                for (let r = row[0]; r <= row[1]; r++) {
                    for (let c = col[0]; c <= col[1]; c++) {
                        let ef = formula.execFunctionGlobalData[r + '_' + c + '_' + sheetIndex];
                        if (ef != null) {
                            ret[r - row[0]][c - col[0]] = ef;
                        }
                    }
                }
            }
            let rowl = row[1] - row[0] + 1;
            let coll = col[1] - col[0] + 1;
            let retAll = {
                'sheetName': sheettxt,
                'startCell': rangetxt[0],
                'rowl': rowl,
                'coll': coll,
                'data': ret
            };
            window.luckysheet_getcelldata_cache[txt] = retAll;
            return retAll;
        }
    }
    function luckysheet_parseData(value) {
        if (typeof value === 'object') {
            if (value == null) {
                return '';
            } else if (Array.isArray(value)) {
                let v = c.genarate(value[0]);
                return v[2];
            } else {
                if (Array.isArray(value.data)) {
                    return a.error.v;
                } else {
                    if (value.data.v === undefined) {
                        return '';
                    } else {
                        return value.data.v;
                    }
                }
            }
        } else if (!formula.isCompareOperator(value).flag) {
            let v = c.genarate(value);
            return v[2];
        } else if (typeof value === 'string' || typeof value === 'number') {
            return value;
        }
        return a.error.v;
    }
    function luckysheet_getValue() {
        let args = arguments[0];
        for (let i = 0; i < args.length; i++) {
            let value = args[i];
            if (typeof value === 'object') {
                if (value == null) {
                    value = '';
                } else if (Array.isArray(value)) {
                    let v = c.genarate(value[0]);
                    value = v[2];
                } else {
                    if (Array.isArray(value.data)) {
                        value = value.data;
                    } else {
                        if (value.data.v === undefined) {
                            value = '';
                        } else {
                            value = value.data.v;
                        }
                    }
                }
            } else if (!formula.isCompareOperator(value).flag) {
                let v = c.genarate(value);
                value = v[2];
            }
            args[i] = value;
        }
    }
    function luckysheet_indirect_check() {
        let cellTxt = arguments[0];
        if (cellTxt == null || cellTxt.length == 0) {
            return null;
        }
        return cellTxt;
    }
    function luckysheet_indirect_check_return(txt) {
        return txt;
    }
    function luckysheet_offset_check() {
        if (!(f.getObjType(arguments[0]) == 'object' && arguments[0].startCell != null)) {
            return formula.undefined.v;
        }
        var reference = arguments[0].startCell;
        var rows = func_methods.getFirstValue(arguments[1]);
        if (a.valueIsError(rows)) {
            return rows;
        }
        if (!a.isRealNum(rows)) {
            return formula.undefined.v;
        }
        rows = parseInt(rows);
        var cols = func_methods.getFirstValue(arguments[2]);
        if (a.valueIsError(cols)) {
            return cols;
        }
        if (!a.isRealNum(cols)) {
            return formula.undefined.v;
        }
        cols = parseInt(cols);
        var height = arguments[0].rowl;
        if (arguments.length >= 4) {
            height = func_methods.getFirstValue(arguments[3]);
            if (a.valueIsError(height)) {
                return height;
            }
            if (!a.isRealNum(height)) {
                return formula.undefined.v;
            }
            height = parseInt(height);
        }
        var width = arguments[0].coll;
        if (arguments.length == 5) {
            width = func_methods.getFirstValue(arguments[4]);
            if (a.valueIsError(width)) {
                return width;
            }
            if (!a.isRealNum(width)) {
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
        if (cellRow0 < 0 || cellRow1 >= Store.flowdata.length || cellCol0 < 0 || cellCol1 >= Store.flowdata[0].length) {
            return formula.undefined.r;
        }
        return e.getRangetxt(Store.calculateSheetIndex, {
            row: [
                cellRow0,
                cellRow1
            ],
            column: [
                cellCol0,
                cellCol1
            ]
        });
    }
    function luckysheet_getSpecialReference(isCellFirst, param1, param2) {
        let functionRange, rangeTxt;
        if (isCellFirst) {
            rangeTxt = param1;
            functionRange = param2;
        } else {
            functionRange = param1;
            rangeTxt = param2;
        }
        if (functionRange.startCell.indexOf(':') > -1 || rangeTxt.indexOf(':') > -1) {
            return a.error.v;
        }
        if (isCellFirst) {
            return luckysheet_getcelldata(rangeTxt + ':' + functionRange.startCell);
        } else {
            let rangeT = rangeTxt, sheetName = '';
            if (rangeTxt.indexOf('!') > -1) {
                let rangetxtArr = rangeTxt.split('!');
                sheetName = rangetxtArr[0] + '!';
                rangeT = rangetxtArr[1];
            }
            return luckysheet_getcelldata(sheetName + functionRange.startCell + ':' + rangeT);
        }
    }
    return {
        luckysheet_compareWith,
        luckysheet_getarraydata,
        luckysheet_getcelldata,
        luckysheet_parseData,
        luckysheet_getValue,
        luckysheet_indirect_check,
        luckysheet_indirect_check_return,
        luckysheet_offset_check,
        luckysheet_calcADPMM,
        luckysheet_getSpecialReference
    };
});
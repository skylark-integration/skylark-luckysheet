define([
    '../utils/util',
    '../methods/validate',
    '../methods/datecontroll',
    '../methods/luckysheetConfigsetting',    
    '../store',
    '../vendors/numeral'
], function (m_util, m_validate, m_datecontroll,  luckysheetConfigsetting,Store, numeral) {
    'use strict';
    const {getObjType} = m_util;
    const {isRealNull, isRealNum} = m_validate;
    const isEditMode = luckysheetConfigsetting.isEditMode;

    const {isdatetime, diff} = m_datecontroll;
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
    } 
  //排序一列数据

    return {
        orderbydata,
        orderbydata1D
    };
});
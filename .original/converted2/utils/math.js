define(['../global/validate'], function (validate) {
    'use strict';
    function isInteger(obj) {
        return Math.floor(obj) === obj;
    }
    function toInteger(floatNum) {
        var ret = {
            times: 1,
            num: 0
        };
        if (isInteger(floatNum)) {
            ret.num = floatNum;
            return ret;
        }
        var strfi = floatNum + '';
        var dotPos = strfi.indexOf('.');
        var len = strfi.substr(dotPos + 1).length;
        var times = Math.pow(10, len);
        var intNum = parseInt(floatNum * times + 0.5, 10);
        ret.times = times;
        ret.num = intNum;
        return ret;
    }
    function operation(a, b, op) {
        var o1 = toInteger(a);
        var o2 = toInteger(b);
        var n1 = o1.num;
        var n2 = o2.num;
        var t1 = o1.times;
        var t2 = o2.times;
        var max = t1 > t2 ? t1 : t2;
        var result = null;
        switch (op) {
        case 'add':
            if (t1 === t2) {
                result = n1 + n2;
            } else if (t1 > t2) {
                result = n1 + n2 * (t1 / t2);
            } else {
                result = n1 * (t2 / t1) + n2;
            }
            return result / max;
        case 'subtract':
            if (t1 === t2) {
                result = n1 - n2;
            } else if (t1 > t2) {
                result = n1 - n2 * (t1 / t2);
            } else {
                result = n1 * (t2 / t1) - n2;
            }
            return result / max;
        case 'multiply':
            result = n1 * n2 / (t1 * t2);
            return result;
        case 'divide':
            return result = function () {
                var r1 = n1 / n2;
                var r2 = t2 / t1;
                return operation(r1, r2, 'multiply');
            }();
        }
    }
    function fixed(num, precision) {
        if (!precision) {
            precision = 2;
        }
        if (!validate.isRealNum(num))
            return num;
        let s = num.toFixed(precision);
        let index = s.indexOf('.');
        let prefix = s.substring(0, index);
        let suffix = s.substring(index + 1, s.length);
        if (suffix) {
            for (let i = suffix.length - 1; i != 0; i--) {
                if (suffix.charAt(i) != '0' && i == suffix.length - 1) {
                    break;
                } else {
                    suffix = suffix.substring(0, i);
                }
            }
        }
        return Number(prefix + '.' + suffix);
    }
    Number.prototype.add = function (value) {
        let number = parseFloat(value);
        if (typeof number !== 'number' || Number.isNaN(number)) {
            throw new Error('请输入数字或者数字字符串\uFF5E');
        }
        ;
        return operation(this, number, 'add');
    };
    Number.prototype.subtract = function (value) {
        let number = parseFloat(value);
        if (typeof number !== 'number' || Number.isNaN(number)) {
            throw new Error('请输入数字或者数字字符串\uFF5E');
        }
        return operation(this, number, 'subtract');
    };
    Number.prototype.multiply = function (value) {
        let number = parseFloat(value);
        if (typeof number !== 'number' || Number.isNaN(number)) {
            throw new Error('请输入数字或者数字字符串\uFF5E');
        }
        return operation(this, number, 'multiply');
    };
    Number.prototype.divide = function (value) {
        let number = parseFloat(value);
        if (typeof number !== 'number' || Number.isNaN(number)) {
            throw new Error('请输入数字或者数字字符串\uFF5E');
        }
        return operation(this, number, 'divide');
    };
    Number.prototype.tofixed = function (value) {
        let precision = parseFloat(value);
        if (typeof precision !== 'number' || Number.isNaN(precision)) {
            throw new Error('请输入数字或者数字字符串\uFF5E');
        }
        return fixed(this, precision);
    };
});
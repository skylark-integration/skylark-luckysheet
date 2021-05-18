define([
    './utils/math',
    './core',
    './utils/polyfill'
], function (a, __firefox) {
    'use strict';
    if (window.addEventListener && navigator.userAgent.indexOf('Firefox') > 0) {
        __firefox();
    }
    return a.luckysheet;
});
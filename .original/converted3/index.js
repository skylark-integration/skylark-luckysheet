define([
    './utils/math',
    './core',
    './utils/polyfill'
], function (m_core, __firefox) {
    'use strict';
    const {luckysheet} = m_core;
    // Prevent gulp warning: 'Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification'
    // window.evall = window.eval;
    // polyfill event in firefox
    if (window.addEventListener && navigator.userAgent.indexOf('Firefox') > 0) {
        __firefox();
    }
    return luckysheet;
});
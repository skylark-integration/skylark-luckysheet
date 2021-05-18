define([
    './functionImplementation',
    '../store/index',
    '../locale/locale'
], function (functionImplementation, Store, locale) {
    'use strict';
    const functionlist = function () {
        let _locale = locale();
        let functionListOrigin = _locale.functionlist;
        for (let i = 0; i < functionListOrigin.length; i++) {
            let func = functionListOrigin[i];
            func.f = functionImplementation[func.n];
        }
        Store.functionlist = functionListOrigin;
        const luckysheet_function = {};
        for (let i = 0; i < functionListOrigin.length; i++) {
            let func = functionListOrigin[i];
            luckysheet_function[func.n] = func;
        }
        window.luckysheet_function = luckysheet_function;
        Store.luckysheet_function = luckysheet_function;
    };
    return functionlist;
});
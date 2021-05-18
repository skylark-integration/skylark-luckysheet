define(['./functionlist'], function (functionlist) {
    'use strict';
    const luckysheet_function = {};
    for (let i = 0; i < functionlist.length; i++) {
        let func = functionlist[i];
        luckysheet_function[func.n] = func;
    }
    window.luckysheet_function = luckysheet_function;
    return luckysheet_function;
});
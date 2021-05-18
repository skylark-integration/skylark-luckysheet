define([
    '../utils/util',
    '../store/index',
    '../global/method',
    '../methods/get',
    '../global/api'
], function (a, Store, method, b, c) {
    'use strict';
    const initListener = function () {
        a.createProxy(Store, 'jfredo', (target, property, val, receiver) => {
            if (property !== 'length') {
                method.createHookFunction('updated', val);
            }
        });
        a.createProxy(Store, 'asyncLoad', (target, property, val, receiver) => {
            if (property === 'length' && val === 0) {
                method.createHookFunction('workbookCreateAfter', c.toJson());
            }
        });
    };
    return { initListener };
});